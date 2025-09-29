import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/ImageResizer2.css';

const ImageResizer = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [originalImage, setOriginalImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [quality, setQuality] = useState(0.8);
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert(t('imageResizer', 'selectImage') || 'Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setOriginalImage(e.target.result);
                setOriginalSize({ width: img.width, height: img.height });
                setWidth(img.width);
                setHeight(img.height);
                setResizedImage(null);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const resizeImage = () => {
        if (!originalImage) {
            alert(t('imageResizer', 'uploadImage') || 'Please upload an image first');
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calculate dimensions maintaining aspect ratio if enabled
            let newWidth = width;
            let newHeight = height;

            if (maintainAspectRatio) {
                const aspectRatio = img.width / img.height;
                if (newWidth / newHeight > aspectRatio) {
                    newWidth = newHeight * aspectRatio;
                } else {
                    newHeight = newWidth / aspectRatio;
                }
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            // Draw image with high quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Convert to data URL with specified quality
            const resizedDataURL = canvas.toDataURL('image/jpeg', quality);
            setResizedImage(resizedDataURL);
        };

        img.src = originalImage;
    };

    const handleWidthChange = (newWidth) => {
        setWidth(newWidth);
        if (maintainAspectRatio && originalSize.width > 0) {
            const aspectRatio = originalSize.width / originalSize.height;
            setHeight(Math.round(newWidth / aspectRatio));
        }
    };

    const handleHeightChange = (newHeight) => {
        setHeight(newHeight);
        if (maintainAspectRatio && originalSize.height > 0) {
            const aspectRatio = originalSize.width / originalSize.height;
            setWidth(Math.round(newHeight * aspectRatio));
        }
    };

    const clearAll = () => {
        setOriginalImage(null);
        setResizedImage(null);
        setWidth(800);
        setHeight(600);
        setOriginalSize({ width: 0, height: 0 });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const downloadResizedImage = () => {
        if (!resizedImage) return;

        const link = document.createElement('a');
        link.href = resizedImage;
        link.download = `resized-image-${width}x${height}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const applyPreset = (preset) => {
        switch (preset) {
            case 'facebook':
                setWidth(1200);
                setHeight(630);
                break;
            case 'instagram':
                setWidth(1080);
                setHeight(1080);
                break;
            case 'twitter':
                setWidth(1200);
                setHeight(675);
                break;
            case 'thumbnail':
                setWidth(300);
                setHeight(300);
                break;
            case 'hd':
                setWidth(1920);
                setHeight(1080);
                break;
            default:
                break;
        }
    };

    return (
        <div className={`image-resizer ${theme}`}>
            <div className="resizer-header">
                <h1>{t('imageResizer', 'title') || 'Image Resizer'}</h1>
                <p>{t('imageResizer', 'subtitle') || 'Resize images while maintaining quality'}</p>
            </div>

            <div className="resizer-container">
                <div className="upload-section">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="file-input"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="upload-label">
                        <div className="upload-icon">🖼️</div>
                        <div className="upload-text">
                            {t('imageResizer', 'clickToUpload') || 'Click to upload image'}
                        </div>
                        <div className="upload-hint">
                            {t('imageResizer', 'supportedFormats') || 'Supported formats: JPG, PNG, GIF, BMP, WebP'}
                        </div>
                    </label>
                </div>

                {originalImage && (
                    <div className="resize-controls">
                        <h3>{t('imageResizer', 'resizeSettings') || 'Resize Settings'}</h3>
                        
                        <div className="preset-buttons">
                            <h4>{t('imageResizer', 'presets') || 'Quick Presets:'}</h4>
                            <div className="preset-grid">
                                <button onClick={() => applyPreset('facebook')} className="preset-btn">
                                    Facebook (1200×630)
                                </button>
                                <button onClick={() => applyPreset('instagram')} className="preset-btn">
                                    Instagram (1080×1080)
                                </button>
                                <button onClick={() => applyPreset('twitter')} className="preset-btn">
                                    Twitter (1200×675)
                                </button>
                                <button onClick={() => applyPreset('thumbnail')} className="preset-btn">
                                    Thumbnail (300×300)
                                </button>
                                <button onClick={() => applyPreset('hd')} className="preset-btn">
                                    HD (1920×1080)
                                </button>
                            </div>
                        </div>

                        <div className="size-controls">
                            <div className="size-input">
                                <label>{t('imageResizer', 'width') || 'Width'}</label>
                                <input
                                    type="number"
                                    value={width}
                                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
                                    min="1"
                                    max="5000"
                                />
                                <span>px</span>
                            </div>
                            <div className="size-input">
                                <label>{t('imageResizer', 'height') || 'Height'}</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
                                    min="1"
                                    max="5000"
                                />
                                <span>px</span>
                            </div>
                        </div>

                        <div className="settings-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={maintainAspectRatio}
                                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                />
                                {t('imageResizer', 'maintainAspectRatio') || 'Maintain aspect ratio'}
                            </label>
                            
                            <div className="quality-control">
                                <label>{t('imageResizer', 'quality') || 'Quality'}: {Math.round(quality * 100)}%</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={quality}
                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                    className="quality-slider"
                                />
                            </div>
                        </div>

                        <button onClick={resizeImage} className="resize-btn">
                            {t('imageResizer', 'resizeImage') || 'Resize Image'}
                        </button>
                    </div>
                )}

                <div className="preview-section">
                    {originalImage && (
                        <div className="image-preview original">
                            <h4>{t('imageResizer', 'original') || 'Original'}</h4>
                            <img src={originalImage} alt="Original" />
                            <div className="image-info">
                                {originalSize.width} × {originalSize.height} px
                            </div>
                        </div>
                    )}

                    {resizedImage && (
                        <div className="image-preview resized">
                            <h4>{t('imageResizer', 'resized') || 'Resized'}</h4>
                            <img src={resizedImage} alt="Resized" />
                            <div className="image-info">
                                {width} × {height} px
                            </div>
                            <button onClick={downloadResizedImage} className="download-btn">
                                {t('imageResizer', 'download') || 'Download Resized Image'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="action-buttons">
                    <button onClick={clearAll} className="clear-btn">
                        {t('imageResizer', 'clearAll') || 'Clear All'}
                    </button>
                </div>

                <canvas ref={canvasRef} style={{ display: 'none' }} />

                <div className="info-section">
                    <h4>{t('imageResizer', 'aboutImageResizing') || 'About Image Resizing'}</h4>
                    <p>{t('imageResizer', 'resizeInfo') || 'Image resizing is the process of changing the dimensions of an image while maintaining its visual quality. This is useful for optimizing images for web, social media, or storage.'}</p>
                    
                    <h5>{t('imageResizer', 'tips') || 'Tips:'}</h5>
                    <ul>
                        <li>{t('imageResizer', 'tip1') || 'Maintain aspect ratio to prevent distortion'}</li>
                        <li>{t('imageResizer', 'tip2') || 'Use higher quality for important images'}</li>
                        <li>{t('imageResizer', 'tip3') || 'Consider file size for web optimization'}</li>
                        <li>{t('imageResizer', 'tip4') || 'Test different sizes for different platforms'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ImageResizer;