import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/SvgConverter.css';

const SvgConverter = () => {
    const { t } = useTranslation('svgConverter');
    const { theme } = useTheme();
    const [file, setFile] = useState(null);
    const [originalSvg, setOriginalSvg] = useState('');
    const [convertedImage, setConvertedImage] = useState('');
    const [converting, setConverting] = useState(false);
    const [conversionSettings, setConversionSettings] = useState({
        format: 'png',
        width: 800,
        height: 600,
        quality: 90,
        backgroundColor: 'transparent',
        maintainAspectRatio: true,
        customBackground: '#ffffff'
    });
    
    const fileInputRef = useRef();
    const canvasRef = useRef();
    const originalDimensions = useRef({ width: 0, height: 0 });

    const handleFileUpload = useCallback((uploadedFile) => {
        if (!uploadedFile) return;

        if (uploadedFile.size > 5 * 1024 * 1024) {
            alert(t('fileTooLarge'));
            return;
        }

        if (!uploadedFile.type.includes('svg')) {
            alert(t('invalidFile'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const svgContent = e.target.result;
            setFile(uploadedFile);
            setOriginalSvg(svgContent);
            
            // Extract original dimensions from SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;
            const width = parseInt(svgElement.getAttribute('width')) || 800;
            const height = parseInt(svgElement.getAttribute('height')) || 600;
            
            originalDimensions.current = { width, height };
            
            setConversionSettings(prev => ({
                ...prev,
                width: width,
                height: height
            }));
        };
        reader.readAsText(uploadedFile);
    }, [t]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files[0];
        handleFileUpload(uploadedFile);
    }, [handleFileUpload]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const convertSvgToImage = async () => {
        if (!originalSvg) {
            alert(t('noFile'));
            return;
        }

        setConverting(true);
        setConvertedImage('');

        try {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Create an image from SVG
            const svgBlob = new Blob([originalSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            
            const img = new Image();
            
            img.onload = () => {
                // Set canvas dimensions
                canvas.width = conversionSettings.width;
                canvas.height = conversionSettings.height;

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Set background color
                if (conversionSettings.backgroundColor !== 'transparent') {
                    let bgColor = conversionSettings.backgroundColor;
                    if (bgColor === 'custom') {
                        bgColor = conversionSettings.customBackground;
                    } else if (bgColor === 'white') {
                        bgColor = '#ffffff';
                    } else if (bgColor === 'black') {
                        bgColor = '#000000';
                    }
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                // Calculate scaling to maintain aspect ratio if needed
                let drawWidth = canvas.width;
                let drawHeight = canvas.height;
                let offsetX = 0;
                let offsetY = 0;

                if (conversionSettings.maintainAspectRatio) {
                    const scale = Math.min(
                        canvas.width / img.width,
                        canvas.height / img.height
                    );
                    drawWidth = img.width * scale;
                    drawHeight = img.height * scale;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                // Draw the SVG image
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                // Convert to desired format
                let mimeType;
                let quality = conversionSettings.quality / 100;

                switch (conversionSettings.format) {
                    case 'jpg':
                        mimeType = 'image/jpeg';
                        break;
                    case 'webp':
                        mimeType = 'image/webp';
                        break;
                    case 'png':
                    default:
                        mimeType = 'image/png';
                        quality = undefined; // PNG doesn't use quality
                        break;
                }

                const dataUrl = canvas.toDataURL(mimeType, quality);
                setConvertedImage(dataUrl);
                setConverting(false);
                
                URL.revokeObjectURL(url);
            };

            img.onerror = () => {
                setConverting(false);
                alert(t('conversionError'));
                URL.revokeObjectURL(url);
            };

            img.src = url;

        } catch (error) {
            console.error('Conversion error:', error);
            setConverting(false);
            alert(t('conversionError'));
        }
    };

    const downloadImage = () => {
        if (!convertedImage) return;

        const link = document.createElement('a');
        const extension = conversionSettings.format;
        const fileName = `${t('downloadFileName')}-${Date.now()}.${extension}`;
        
        link.download = fileName;
        link.href = convertedImage;
        link.click();
    };

    const clearAll = () => {
        setFile(null);
        setOriginalSvg('');
        setConvertedImage('');
        setConversionSettings({
            format: 'png',
            width: 800,
            height: 600,
            quality: 90,
            backgroundColor: 'transparent',
            maintainAspectRatio: true,
            customBackground: '#ffffff'
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDimensionChange = (dimension, value) => {
        const numValue = parseInt(value) || 0;
        
        setConversionSettings(prev => {
            if (dimension === 'width' && prev.maintainAspectRatio && originalDimensions.current.width) {
                const ratio = originalDimensions.current.height / originalDimensions.current.width;
                return {
                    ...prev,
                    width: numValue,
                    height: Math.round(numValue * ratio)
                };
            } else if (dimension === 'height' && prev.maintainAspectRatio && originalDimensions.current.height) {
                const ratio = originalDimensions.current.width / originalDimensions.current.height;
                return {
                    ...prev,
                    height: numValue,
                    width: Math.round(numValue * ratio)
                };
            } else {
                return {
                    ...prev,
                    [dimension]: numValue
                };
            }
        });
    };

    const presetSizes = [
        { label: 'Original', width: originalDimensions.current.width, height: originalDimensions.current.height },
        { label: 'Small (400x300)', width: 400, height: 300 },
        { label: 'Medium (800x600)', width: 800, height: 600 },
        { label: 'Large (1200x900)', width: 1200, height: 900 },
        { label: 'HD (1920x1080)', width: 1920, height: 1080 }
    ];

    return (
        <div className={`svg-converter ${theme}`}>
            <div className="tool-header">
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </div>

            <div className="converter-container">
                {/* Upload Section */}
                <div className="upload-section">
                    <div 
                        className="upload-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-content">
                            <div className="upload-icon">📁</div>
                            <h3>{t('uploadArea')}</h3>
                            <p>{t('dragDrop')}</p>
                            <small>{t('supportedFormats')}</small>
                            <small>{t('maxSize')}</small>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".svg,image/svg+xml"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {file && (
                        <div className="file-info">
                            <strong>Selected file:</strong> {file.name}
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

                {/* Conversion Settings */}
                {file && (
                    <div className="settings-section">
                        <h3>{t('convertTo')}</h3>
                        
                        <div className="settings-grid">
                            <div className="setting-group">
                                <label>{t('format')}</label>
                                <select
                                    value={conversionSettings.format}
                                    onChange={(e) => setConversionSettings(prev => ({
                                        ...prev,
                                        format: e.target.value
                                    }))}
                                >
                                    <option value="png">PNG</option>
                                    <option value="jpg">JPG</option>
                                    <option value="webp">WebP</option>
                                </select>
                            </div>

                            <div className="setting-group">
                                <label>{t('backgroundColor')}</label>
                                <select
                                    value={conversionSettings.backgroundColor}
                                    onChange={(e) => setConversionSettings(prev => ({
                                        ...prev,
                                        backgroundColor: e.target.value
                                    }))}
                                >
                                    <option value="transparent">{t('transparent')}</option>
                                    <option value="white">{t('white')}</option>
                                    <option value="black">{t('black')}</option>
                                    <option value="custom">{t('custom')}</option>
                                </select>
                                {conversionSettings.backgroundColor === 'custom' && (
                                    <input
                                        type="color"
                                        value={conversionSettings.customBackground}
                                        onChange={(e) => setConversionSettings(prev => ({
                                            ...prev,
                                            customBackground: e.target.value
                                        }))}
                                        className="color-picker"
                                    />
                                )}
                            </div>

                            <div className="setting-group">
                                <label>{t('quality')}: {conversionSettings.quality}%</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={conversionSettings.quality}
                                    onChange={(e) => setConversionSettings(prev => ({
                                        ...prev,
                                        quality: parseInt(e.target.value)
                                    }))}
                                    disabled={conversionSettings.format === 'png'}
                                />
                            </div>

                            <div className="setting-group full-width">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={conversionSettings.maintainAspectRatio}
                                        onChange={(e) => setConversionSettings(prev => ({
                                            ...prev,
                                            maintainAspectRatio: e.target.checked
                                        }))}
                                    />
                                    {t('maintainAspectRatio')}
                                </label>
                            </div>
                        </div>

                        <div className="dimensions-section">
                            <h4>{t('resize')}</h4>
                            <div className="preset-sizes">
                                {presetSizes.map((preset, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setConversionSettings(prev => ({
                                                ...prev,
                                                width: preset.width,
                                                height: preset.height
                                            }));
                                        }}
                                        className="preset-size-btn"
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                            <div className="dimension-inputs">
                                <div className="dimension-group">
                                    <label>{t('width')}</label>
                                    <input
                                        type="number"
                                        value={conversionSettings.width}
                                        onChange={(e) => handleDimensionChange('width', e.target.value)}
                                        min="1"
                                        max="5000"
                                    />
                                </div>
                                <div className="dimension-group">
                                    <label>{t('height')}</label>
                                    <input
                                        type="number"
                                        value={conversionSettings.height}
                                        onChange={(e) => handleDimensionChange('height', e.target.value)}
                                        min="1"
                                        max="5000"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                {file && (
                    <div className="action-buttons">
                        <button 
                            onClick={convertSvgToImage} 
                            className="primary-btn"
                            disabled={converting}
                        >
                            {converting ? 'Converting...' : t('convert')}
                        </button>
                        <button onClick={clearAll} className="secondary-btn">
                            {t('clear')}
                        </button>
                    </div>
                )}

                {/* Preview Section */}
                {(originalSvg || convertedImage) && (
                    <div className="preview-section">
                        <div className="preview-container">
                            {originalSvg && (
                                <div className="preview-item">
                                    <h4>{t('original')}</h4>
                                    <div 
                                        className="preview-image original-svg"
                                        dangerouslySetInnerHTML={{ __html: originalSvg }}
                                    />
                                </div>
                            )}
                            {convertedImage && (
                                <div className="preview-item">
                                    <h4>{t('converted')} ({conversionSettings.format.toUpperCase()})</h4>
                                    <img 
                                        src={convertedImage} 
                                        alt="Converted" 
                                        className="preview-image"
                                    />
                                    <button onClick={downloadImage} className="download-btn">
                                        {t('download')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden canvas for conversion */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default SvgConverter;