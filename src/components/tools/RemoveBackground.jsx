import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/RemoveBackground.css';

const RemoveBackground = () => {
    const { t } = useTranslation('removeBg');
    const { theme } = useTheme();
    
    const [file, setFile] = useState(null);
    const [originalImage, setOriginalImage] = useState('');
    const [processedImage, setProcessedImage] = useState('');
    const [processing, setProcessing] = useState(false);
    const [processingSettings, setProcessingSettings] = useState({
        bg_mode: 'transparent',
        bg_color: '#ffffff'
    });
    
    const fileInputRef = useRef();
    const originalDimensions = useRef({ width: 0, height: 0 });

    const API_BASE_URL = 'http://localhost:8000';

    const removeBackground = async () => {
        if (!file) {
            alert(t('noFile'));
            return;
        }

        setProcessing(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('bg_mode', processingSettings.bg_mode);
            
            if (processingSettings.bg_mode === 'color' && processingSettings.bg_color) {
                formData.append('bg_color', processingSettings.bg_color);
            }

            const response = await fetch(`${API_BASE_URL}/remove-bg`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || t('processingError'));
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            
            setProcessedImage(imageUrl);
            setProcessing(false);

        } catch (error) {
            console.error('Background removal error:', error);
            setProcessing(false);
            alert(error.message || t('processingError'));
        }
    };

    const handleFileUpload = useCallback((uploadedFile) => {
        if (!uploadedFile) return;

        if (uploadedFile.size > 10 * 1024 * 1024) {
            alert(t('fileTooLarge'));
            return;
        }

        if (!uploadedFile.type.startsWith('image/')) {
            alert(t('invalidFile'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            setFile(uploadedFile);
            setOriginalImage(imageUrl);
            setProcessedImage('');
            
            const img = new Image();
            img.onload = () => {
                originalDimensions.current = {
                    width: img.width,
                    height: img.height
                };
            };
            img.src = imageUrl;
        };
        reader.readAsDataURL(uploadedFile);
    }, [t]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files[0];
        handleFileUpload(uploadedFile);
    }, [handleFileUpload]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const downloadImage = () => {
        if (!processedImage) return;

        const link = document.createElement('a');
        const fileName = `${t('downloadFileName')}-${Date.now()}.png`;
        
        link.download = fileName;
        link.href = processedImage;
        link.click();
    };

    const clearAll = () => {
        setFile(null);
        setOriginalImage('');
        setProcessedImage('');
        setProcessingSettings({
            bg_mode: 'transparent',
            bg_color: '#ffffff'
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        
        if (processedImage) {
            URL.revokeObjectURL(processedImage);
        }
    };

    const bgColorOptions = [
        { value: '#ffffff', label: t('white'), color: '#ffffff' },
        { value: '#000000', label: t('black'), color: '#000000' },
        { value: '#f3f4f6', label: t('lightGray'), color: '#f3f4f6' },
        { value: '#1f2937', label: t('darkGray'), color: '#1f2937' },
        { value: '#3b82f6', label: t('blue'), color: '#3b82f6' },
        { value: '#10b981', label: t('green'), color: '#10b981' },
        { value: '#f59e0b', label: t('orange'), color: '#f59e0b' },
        { value: '#ef4444', label: t('red'), color: '#ef4444' },
        { value: '#8b5cf6', label: t('purple'), color: '#8b5cf6' },
    ];

    return (
        <div className={`remove-background ${theme}`}>
            <div className="tool-header">
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </div>

            <div className="remover-container">
                <div className="upload-section">
                    <div 
                        className="upload-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-content">
                            <div className="upload-icon">🖼️</div>
                            <h3>{t('uploadArea')}</h3>
                            <p>{t('dragDrop')}</p>
                            <small>{t('supportedFormats')}</small>
                            <small>{t('maxSize')}</small>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {file && (
                        <div className="file-info">
                            <strong>{file.name}</strong>
                            <br />
                            <small>
                                {t('fileSize')}: {(file.size / 1024).toFixed(2)} KB
                                {originalDimensions.current.width > 0 && (
                                    <> | {t('dimensions')}: {originalDimensions.current.width} × {originalDimensions.current.height}</>
                                )}
                            </small>
                        </div>
                    )}
                </div>

                {file && (
                    <div className="settings-section">
                        <h3>{t('advancedOptions')}</h3>
                        
                        <div className="settings-grid">
                            <div className="setting-group">
                                <label>{t('backgroundMode')}</label>
                                <select
                                    value={processingSettings.bg_mode}
                                    onChange={(e) => setProcessingSettings(prev => ({
                                        ...prev,
                                        bg_mode: e.target.value
                                    }))}
                                >
                                    <option value="transparent">{t('transparentMode')}</option>
                                    <option value="color">{t('colorMode')}</option>
                                </select>
                            </div>

                            {processingSettings.bg_mode === 'color' && (
                                <div className="setting-group full-width">
                                    <label>{t('selectColor')}</label>
                                    <div className="color-options">
                                        {bgColorOptions.map((colorOption) => (
                                            <button
                                                key={colorOption.value}
                                                type="button"
                                                className={`color-option ${processingSettings.bg_color === colorOption.value ? 'active' : ''}`}
                                                style={{ backgroundColor: colorOption.color }}
                                                onClick={() => setProcessingSettings(prev => ({
                                                    ...prev,
                                                    bg_color: colorOption.value
                                                }))}
                                                title={colorOption.label}
                                            />
                                        ))}
                                    </div>
                                    <div className="selected-color">
                                        {t('selectedColor')}: 
                                        <span style={{ 
                                            color: processingSettings.bg_color,
                                            fontWeight: 'bold',
                                            marginLeft: '0.5rem'
                                        }}>
                                            {bgColorOptions.find(opt => opt.value === processingSettings.bg_color)?.label}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="setting-group full-width">
                                <div className="api-info">
                                    <small>⚡ {t('subtitle')}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {file && (
                    <div className="action-buttons">
                        <button 
                            onClick={removeBackground} 
                            className={`primary-btn ${processing ? 'processing' : ''}`}
                            disabled={processing}
                        >
                            {processing ? t('processing') : t('removeBackground')}
                        </button>
                        <button onClick={clearAll} className="secondary-btn">
                            {t('clear')}
                        </button>
                    </div>
                )}

                {(originalImage || processedImage) && (
                    <div className="preview-section">
                        <div className="preview-container">
                            {originalImage && (
                                <div className="preview-item">
                                    <h4>{t('original')}</h4>
                                    <img 
                                        src={originalImage} 
                                        alt="Original" 
                                        className="preview-image"
                                    />
                                </div>
                            )}
                            {processedImage && (
                                <div className="preview-item">
                                    <h4>{t('result')}</h4>
                                    <div className="result-container">
                                        <img 
                                            src={processedImage} 
                                            alt="Background Removed" 
                                            className={`preview-image result-image ${
                                                processingSettings.bg_mode === 'transparent' ? 'transparent-bg' : ''
                                            }`}
                                        />
                                        <div className="result-actions">
                                            <button onClick={downloadImage} className="download-btn">
                                                {t('download')}
                                            </button>
                                        </div>
                                        {processingSettings.bg_mode === 'transparent' ? (
                                            <div className="transparency-note">
                                                <small>✓ {t('transparency')}</small>
                                            </div>
                                        ) : (
                                            <div className="color-note">
                                                <small>
                                                    ✓ {bgColorOptions.find(opt => opt.value === processingSettings.bg_color)?.label} {t('background')}
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="tips-section">
                    <h3>💡 {t('tips')}</h3>
                    <div className="tips-list">
                        <li>{t('tip1')}</li>
                        <li>{t('tip2')}</li>
                        <li>{t('tip3')}</li>
                        <li>{t('tip4')}</li>
                        <li>{t('tip5')}</li>
                    </div>
                </div>

                <div className="api-status">
                    <div className="status-indicator">
                        <div className={`status-dot ${processing ? 'processing' : 'ready'}`}></div>
                        <small>
                            {processing ? t('aiProcessing') : t('apiReady')}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveBackground;