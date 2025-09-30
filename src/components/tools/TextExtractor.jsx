import React, { useState, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/TextExtractor.css';

const TextExtractor = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert(t('textExtractor', 'selectImage') || 'Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
            // Simulate OCR processing
            simulateOCRProcessing();
        };
        reader.readAsDataURL(file);
    };

    const simulateOCRProcessing = () => {
        setIsProcessing(true);
        setExtractedText('');

        // Simulate processing delay
        setTimeout(() => {
            // This is a simulation - in a real app, you'd use an OCR API
            const simulatedText = `Simulated extracted text from image:

This is a demonstration of text extraction.
In a real application, this would use OCR technology
to extract actual text from your uploaded image.

Sample extracted content:
- Line 1: Example text
- Line 2: More example content
- Line 3: Additional text lines

Note: This is a simulation. For real OCR functionality,
you would need to integrate with an OCR service like:
• Google Cloud Vision API
• Amazon Textract
• Tesseract.js (client-side)`;

            setExtractedText(simulatedText);
            setIsProcessing(false);
        }, 2000);
    };

    const handlePaste = async (event) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (let item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setUploadedImage(e.target.result);
                        simulateOCRProcessing();
                    };
                    reader.readAsDataURL(file);
                }
                break;
            }
        }
    };

    const clearAll = () => {
        setUploadedImage(null);
        setExtractedText('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(extractedText);
        alert(t('textExtractor', 'copied') || 'Text copied to clipboard!');
    };

    const downloadText = () => {
        const blob = new Blob([extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'extracted-text.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`text-extractor ${theme}`} onPaste={handlePaste}>
            <div className="extractor-header">
                <h1>{t('textExtractor', 'title') || 'Text Extractor'}</h1>
                <p>{t('textExtractor', 'subtitle') || 'Extract text from images (OCR simulation)'}</p>
            </div>

            <div className="extractor-container">
                <div className="upload-section">
                    <div className="upload-area">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="file-input"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="upload-label">
                            <div className="upload-icon">📁</div>
                            <div className="upload-text">
                                {t('textExtractor', 'clickToUpload') || 'Click to upload image'}
                            </div>
                            <div className="upload-hint">
                                {t('textExtractor', 'orPaste') || 'or paste image from clipboard'}
                            </div>
                            <div className="supported-formats">
                                {t('textExtractor', 'supportedFormats') || 'Supported formats: JPG, PNG, GIF, BMP'}
                            </div>
                        </label>
                    </div>

                    {uploadedImage && (
                        <div className="image-preview">
                            <h4>{t('textExtractor', 'imagePreview') || 'Image Preview'}</h4>
                            <img src={uploadedImage} alt="Uploaded preview" />
                        </div>
                    )}
                </div>

                {isProcessing && (
                    <div className="processing-indicator">
                        <div className="spinner"></div>
                        <p>{t('textExtractor', 'processing') || 'Processing image...'}</p>
                    </div>
                )}

                {extractedText && (
                    <div className="result-section">
                        <h3>{t('textExtractor', 'extractedText') || 'Extracted Text'}</h3>
                        <div className="text-output">
                            <pre>{extractedText}</pre>
                        </div>
                        <div className="result-actions">
                            <button onClick={copyToClipboard} className="copy-btn">
                                {t('textExtractor', 'copyText') || 'Copy Text'}
                            </button>
                            <button onClick={downloadText} className="download-btn">
                                {t('textExtractor', 'downloadText') || 'Download Text'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="action-buttons">
                    <button onClick={clearAll} className="clear-btn">
                        {t('textExtractor', 'clearAll') || 'Clear All'}
                    </button>
                </div>

                <div className="info-section">
                    <h4>{t('textExtractor', 'aboutOCR') || 'About OCR Technology'}</h4>
                    <p>{t('textExtractor', 'ocrInfo') || 'OCR (Optical Character Recognition) technology converts different types of documents, such as scanned paper documents, PDF files or images captured by a digital camera into editable and searchable data.'}</p>
                    
                    <h5>{t('textExtractor', 'commonUses') || 'Common Uses:'}</h5>
                    <ul>
                        <li>{t('textExtractor', 'use1') || 'Digitizing printed documents'}</li>
                        <li>{t('textExtractor', 'use2') || 'Automating data entry from forms'}</li>
                        <li>{t('textExtractor', 'use3') || 'Extracting text from screenshots'}</li>
                        <li>{t('textExtractor', 'use4') || 'Processing business cards'}</li>
                    </ul>

                    <div className="limitations">
                        <h5>{t('textExtractor', 'limitations') || 'Limitations:'}</h5>
                        <p>{t('textExtractor', 'limitationNote') || 'Note: This is a simulation. For production use, consider:'}</p>
                        <ul>
                            <li>{t('textExtractor', 'limitation1') || 'Google Cloud Vision API'}</li>
                            <li>{t('textExtractor', 'limitation2') || 'Amazon Textract'}</li>
                            <li>{t('textExtractor', 'limitation3') || 'Tesseract.js (open source)'}</li>
                            <li>{t('textExtractor', 'limitation4') || 'Microsoft Azure Computer Vision'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextExtractor;