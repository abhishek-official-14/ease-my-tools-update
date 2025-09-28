import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/QRCodeGenerator.css';

const QRCodeGenerator = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [text, setText] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [size, setSize] = useState(200);
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef(null);

    const generateQRCode = () => {
        if (!text.trim()) {
            alert(t('qrGenerator', 'enterText') || 'Please enter some text or URL');
            return;
        }

        setIsGenerating(true);
        
        // Using QRServer API
        const encodedText = encodeURIComponent(text);
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedText}&size=${size}x${size}&format=png`;
        
        setQrCodeUrl(qrUrl);
        setIsGenerating(false);
    };

    const downloadQRCode = () => {
        if (!qrCodeUrl) return;

        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearAll = () => {
        setText('');
        setQrCodeUrl('');
        setSize(200);
    };

    const copyToClipboard = async () => {
        if (!qrCodeUrl) return;

        try {
            const response = await fetch(qrCodeUrl);
            const blob = await response.blob();
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            alert(t('qrGenerator', 'copied') || 'QR Code copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy QR code:', err);
            alert(t('qrGenerator', 'copyError') || 'Failed to copy QR code');
        }
    };

    return (
        <div className={`qr-generator ${theme}`}>
            <div className="generator-header">
                <h1>{t('qrGenerator', 'title') || 'QR Code Generator'}</h1>
                <p>{t('qrGenerator', 'subtitle') || 'Generate QR codes from text, URLs, or any data'}</p>
            </div>

            <div className="generator-container">
                <div className="input-section">
                    <label>{t('qrGenerator', 'inputLabel') || 'Enter Text or URL'}</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={t('qrGenerator', 'placeholder') || 'Enter text, URL, or any data to generate QR code...'}
                        className="text-input"
                        rows="4"
                    />
                    
                    <div className="size-control">
                        <label>{t('qrGenerator', 'size') || 'QR Code Size'}: {size}px</label>
                        <input
                            type="range"
                            min="100"
                            max="400"
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value))}
                            className="size-slider"
                        />
                    </div>
                </div>

                <div className="action-buttons">
                    <button 
                        onClick={generateQRCode} 
                        className="generate-btn"
                        disabled={isGenerating}
                    >
                        {isGenerating 
                            ? (t('qrGenerator', 'generating') || 'Generating...') 
                            : (t('qrGenerator', 'generate') || 'Generate QR Code')
                        }
                    </button>
                    <button onClick={clearAll} className="clear-btn">
                        {t('qrGenerator', 'clear') || 'Clear'}
                    </button>
                </div>

                {qrCodeUrl && (
                    <div className="output-section">
                        <h3>{t('qrGenerator', 'qrCode') || 'Your QR Code'}</h3>
                        <div className="qr-code-container">
                            <img 
                                src={qrCodeUrl} 
                                alt="Generated QR Code"
                                className="qr-code-image"
                            />
                        </div>
                        
                        <div className="output-actions">
                            <button onClick={downloadQRCode} className="download-btn">
                                {t('qrGenerator', 'download') || 'Download PNG'}
                            </button>
                            <button onClick={copyToClipboard} className="copy-btn">
                                {t('qrGenerator', 'copy') || 'Copy to Clipboard'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="tips-section">
                    <h4>{t('qrGenerator', 'tips') || 'Tips'}:</h4>
                    <ul>
                        <li>{t('qrGenerator', 'tip1') || 'Enter URLs to create QR codes that open websites'}</li>
                        <li>{t('qrGenerator', 'tip2') || 'Enter text messages for sharing contact information'}</li>
                        <li>{t('qrGenerator', 'tip3') || 'Use WiFi format for sharing WiFi credentials'}</li>
                        <li>{t('qrGenerator', 'tip4') || 'Larger sizes work better for printing'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;