import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/FaviconGenerator.css';

const FaviconGenerator = () => {
  const { t } = useTranslation('faviconGenerator');
  const { theme } = useTheme();
  
  const [originalImage, setOriginalImage] = useState('');
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [settings, setSettings] = useState({
    format: 'ico',
    sizes: [16, 32, 48, 64, 128, 256],
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    preserveAspectRatio: true
  });

  const fileInputRef = useRef();
  const canvasRef = useRef();

  // Supported formats with descriptions
  const formatOptions = [
    { value: 'ico', label: 'ICO', description: t('icoDescription'), extensions: ['.ico'] },
    { value: 'png', label: 'PNG', description: t('pngDescription'), extensions: ['.png'] },
    { value: 'all', label: t('allFormats'), description: t('allDescription'), extensions: ['.ico', '.png', '.svg'] }
  ];

  // Common favicon sizes
  const sizeOptions = [
    { value: 16, label: '16×16', description: t('size16') },
    { value: 32, label: '32×32', description: t('size32') },
    { value: 48, label: '48×48', description: t('size48') },
    { value: 64, label: '64×64', description: t('size64') },
    { value: 128, label: '128×128', description: t('size128') },
    { value: 256, label: '256×256', description: t('size256') },
    { value: 512, label: '512×512', description: t('size512') }
  ];

  // Handle file upload
  const handleFileUpload = useCallback((uploadedFile) => {
    if (!uploadedFile) return;
    
    if (uploadedFile.size > 5 * 1024 * 1024) {
      alert(t('fileTooLarge'));
      return;
    }
    
    if (!uploadedFile.type.startsWith('image/')) {
      alert(t('invalidFile'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      setFile(uploadedFile);
      setGeneratedIcons([]);
    };
    reader.readAsDataURL(uploadedFile);
  }, [t]);

  // Handle drag and drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    handleFileUpload(uploadedFile);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Toggle size selection
  const toggleSize = (size) => {
    setSettings(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b)
    }));
  };

  // Select all sizes
  const selectAllSizes = () => {
    setSettings(prev => ({
      ...prev,
      sizes: sizeOptions.map(opt => opt.value)
    }));
  };

  // Clear all sizes
  const clearAllSizes = () => {
    setSettings(prev => ({
      ...prev,
      sizes: []
    }));
  };

  // Generate favicons
  const generateFavicons = async () => {
    if (!file) {
      alert(t('uploadFirst'));
      return;
    }

    if (settings.sizes.length === 0) {
      alert(t('selectSizes'));
      return;
    }

    setProcessing(true);
    setGeneratedIcons([]);

    try {
      // Simulate processing - in real implementation, this would use canvas or server-side processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const icons = settings.sizes.map(size => ({
        size,
        format: settings.format === 'all' ? (size <= 64 ? 'ico' : 'png') : settings.format,
        url: originalImage, // In real implementation, this would be the processed icon
        name: `favicon-${size}x${size}.${settings.format === 'all' ? (size <= 64 ? 'ico' : 'png') : settings.format}`
      }));

      setGeneratedIcons(icons);
    } catch (error) {
      console.error('Favicon generation error:', error);
      alert(t('generationError'));
    } finally {
      setProcessing(false);
    }
  };

  // Download single icon
  const downloadIcon = (icon) => {
    const link = document.createElement('a');
    link.download = icon.name;
    link.href = icon.url;
    link.click();
  };

  // Download all icons as zip
  const downloadAllIcons = () => {
    alert(t('zipDownloadMessage')); // In real implementation, this would create and download a zip file
    generatedIcons.forEach(icon => downloadIcon(icon));
  };

  // Copy HTML code to clipboard
  const copyHTMLCode = () => {
    const htmlCode = generatedIcons.map(icon => {
      if (icon.format === 'ico' && icon.size === 16) {
        return `<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="16x16">`;
      }
      return `<link rel="icon" type="image/${icon.format}" href="/favicon-${icon.size}x${icon.size}.${icon.format}" sizes="${icon.size}x${icon.size}">`;
    }).join('\n');

    navigator.clipboard.writeText(htmlCode)
      .then(() => alert(t('htmlCopied')))
      .catch(() => alert(t('copyError')));
  };

  // Clear all
  const clearAll = () => {
    setFile(null);
    setOriginalImage('');
    setGeneratedIcons([]);
    setSettings({
      format: 'ico',
      sizes: [16, 32, 48, 64, 128, 256],
      backgroundColor: 'transparent',
      padding: 0,
      borderRadius: 0,
      preserveAspectRatio: true
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`favicon-generator ${theme}`}>
      <div className="tool-header">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </div>

      <div className="generator-container">
        {/* Upload Section */}
        <div className="upload-section">
          <div 
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {!originalImage ? (
              <div className="upload-content">
                <div className="upload-icon">🖼️</div>
                <h3>{t('uploadArea')}</h3>
                <p>{t('dragDrop')}</p>
                <small>{t('supportedFormats')}</small>
                <small>{t('maxSize')}</small>
              </div>
            ) : (
              <div className="image-preview">
                <img src={originalImage} alt="Uploaded" className="preview-image" />
                <div className="image-info">
                  <strong>{file.name}</strong>
                  <small>{(file.size / 1024).toFixed(2)} KB</small>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Settings Section */}
        {file && (
          <div className="settings-section">
            <h3>{t('settings')}</h3>
            
            <div className="settings-grid">
              {/* Format Selection */}
              <div className="setting-group">
                <label>{t('outputFormat')}</label>
                <div className="format-options">
                  {formatOptions.map(format => (
                    <div
                      key={format.value}
                      className={`format-option ${settings.format === format.value ? 'active' : ''}`}
                      onClick={() => setSettings(prev => ({ ...prev, format: format.value }))}
                    >
                      <div className="format-header">
                        <span className="format-label">{format.label}</span>
                        <span className="format-badge">{format.extensions.join(', ')}</span>
                      </div>
                      <p className="format-description">{format.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="setting-group">
                <div className="size-header">
                  <label>{t('sizes')}</label>
                  <div className="size-actions">
                    <button type="button" onClick={selectAllSizes} className="size-action-btn">
                      {t('selectAll')}
                    </button>
                    <button type="button" onClick={clearAllSizes} className="size-action-btn">
                      {t('clearAll')}
                    </button>
                  </div>
                </div>
                <div className="size-options">
                  {sizeOptions.map(size => (
                    <div
                      key={size.value}
                      className={`size-option ${settings.sizes.includes(size.value) ? 'selected' : ''}`}
                      onClick={() => toggleSize(size.value)}
                    >
                      <div className="size-checkbox">
                        {settings.sizes.includes(size.value) && '✓'}
                      </div>
                      <span className="size-label">{size.label}</span>
                      <span className="size-description">{size.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Options */}
              <div className="setting-group">
                <label>{t('advancedOptions')}</label>
                <div className="advanced-options">
                  <div className="option-row">
                    <label>{t('backgroundColor')}</label>
                    <input
                      type="color"
                      value={settings.backgroundColor === 'transparent' ? '#ffffff' : settings.backgroundColor}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        backgroundColor: e.target.value 
                      }))}
                    />
                    <button
                      type="button"
                      className={`transparent-btn ${settings.backgroundColor === 'transparent' ? 'active' : ''}`}
                      onClick={() => setSettings(prev => ({ 
                        ...prev, 
                        backgroundColor: 'transparent' 
                      }))}
                    >
                      {t('transparent')}
                    </button>
                  </div>

                  <div className="option-row">
                    <label>
                      {t('padding')}: {settings.padding}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={settings.padding}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        padding: parseInt(e.target.value) 
                      }))}
                      className="slider"
                    />
                  </div>

                  <div className="option-row">
                    <label>
                      {t('borderRadius')}: {settings.borderRadius}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={settings.borderRadius}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        borderRadius: parseInt(e.target.value) 
                      }))}
                      className="slider"
                    />
                  </div>

                  <div className="option-row checkbox-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={settings.preserveAspectRatio}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          preserveAspectRatio: e.target.checked 
                        }))}
                      />
                      {t('preserveAspectRatio')}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="generate-section">
              <button 
                onClick={generateFavicons}
                className={`generate-btn ${processing ? 'processing' : ''}`}
                disabled={processing || settings.sizes.length === 0}
              >
                {processing ? (
                  <>
                    <span className="spinner"></span>
                    {t('generating')}
                  </>
                ) : (
                  `🎨 ${t('generateFavicons')} (${settings.sizes.length})`
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {generatedIcons.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h3>{t('generatedIcons')}</h3>
              <div className="results-actions">
                <button onClick={copyHTMLCode} className="action-btn secondary">
                  📋 {t('copyHTML')}
                </button>
                <button onClick={downloadAllIcons} className="action-btn primary">
                  📦 {t('downloadAll')}
                </button>
              </div>
            </div>

            <div className="icons-grid">
              {generatedIcons.map((icon, index) => (
                <div key={index} className="icon-card">
                  <div className="icon-preview">
                    <img src={originalImage} alt={`Favicon ${icon.size}x${icon.size}`} />
                    <div className="icon-badge">{icon.size}×{icon.size}</div>
                  </div>
                  <div className="icon-info">
                    <span className="icon-format">{icon.format.toUpperCase()}</span>
                    <span className="icon-size">{icon.size}px</span>
                  </div>
                  <button 
                    onClick={() => downloadIcon(icon)}
                    className="download-icon-btn"
                  >
                    ⬇️ {t('download')}
                  </button>
                </div>
              ))}
            </div>

            {/* HTML Code Preview */}
            <div className="code-section">
              <h4>{t('htmlCode')}</h4>
              <div className="code-preview">
                <pre>
{`<!-- Favicon HTML Code -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
${generatedIcons.filter(icon => icon.format === 'png').map(icon => 
`<link rel="icon" type="image/png" href="/favicon-${icon.size}x${icon.size}.png" sizes="${icon.size}x${icon.size}">`
).join('\n')}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="tips-section">
          <h3>💡 {t('tips')}</h3>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">🎯</span>
              <div>
                <strong>{t('tip1Title')}</strong>
                <p>{t('tip1Description')}</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📐</span>
              <div>
                <strong>{t('tip2Title')}</strong>
                <p>{t('tip2Description')}</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">⚡</span>
              <div>
                <strong>{t('tip3Title')}</strong>
                <p>{t('tip3Description')}</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🎨</span>
              <div>
                <strong>{t('tip4Title')}</strong>
                <p>{t('tip4Description')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="status-section">
          <div className="status-indicator">
            <div className={`status-dot ${processing ? 'processing' : 'ready'}`}></div>
            <span>
              {processing ? t('processingStatus') : t('readyStatus')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaviconGenerator;