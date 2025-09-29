import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/Base64Tool.css';

const Base64Tool = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [operation, setOperation] = useState('encode');

    const processText = () => {
        if (!inputText.trim()) {
            alert(t('base64Tool', 'enterText') || 'Please enter some text');
            return;
        }

        try {
            if (operation === 'encode') {
                const encoded = btoa(unescape(encodeURIComponent(inputText)));
                setOutputText(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(inputText)));
                setOutputText(decoded);
            }
        } catch (error) {
            alert(t('base64Tool', 'invalidInput') || 'Invalid input for the selected operation');
        }
    };

    const clearAll = () => {
        setInputText('');
        setOutputText('');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(t('base64Tool', 'copied') || 'Copied to clipboard!');
    };

    const swapOperation = () => {
        setOperation(operation === 'encode' ? 'decode' : 'encode');
        setInputText(outputText);
        setOutputText(inputText);
    };

    return (
        <div className={`base64-tool ${theme}`}>
            <div className="tool-header">
                <h1>{t('base64Tool', 'title') || 'Base64 Encoder/Decoder'}</h1>
                <p>{t('base64Tool', 'subtitle') || 'Encode and decode Base64 strings online'}</p>
            </div>

            <div className="tool-container">
                <div className="operation-selector">
                    <button 
                        className={`op-btn ${operation === 'encode' ? 'active' : ''}`}
                        onClick={() => setOperation('encode')}
                    >
                        {t('base64Tool', 'encode') || 'Encode'}
                    </button>
                    <button 
                        className={`op-btn ${operation === 'decode' ? 'active' : ''}`}
                        onClick={() => setOperation('decode')}
                    >
                        {t('base64Tool', 'decode') || 'Decode'}
                    </button>
                </div>

                <div className="input-section">
                    <label>
                        {operation === 'encode' 
                            ? (t('base64Tool', 'textToEncode') || 'Text to Encode')
                            : (t('base64Tool', 'base64ToDecode') || 'Base64 to Decode')
                        }
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                            operation === 'encode' 
                                ? (t('base64Tool', 'enterTextToEncode') || 'Enter text to encode to Base64...')
                                : (t('base64Tool', 'enterBase64ToDecode') || 'Enter Base64 string to decode...')
                        }
                        className="text-input"
                        rows="6"
                    />
                </div>

                <div className="action-buttons">
                    <button onClick={processText} className="process-btn">
                        {operation === 'encode' 
                            ? (t('base64Tool', 'encodeToBase64') || 'Encode to Base64')
                            : (t('base64Tool', 'decodeFromBase64') || 'Decode from Base64')
                        }
                    </button>
                    <button onClick={swapOperation} className="swap-btn">
                        {t('base64Tool', 'swap') || 'Swap'}
                    </button>
                    <button onClick={clearAll} className="clear-btn">
                        {t('base64Tool', 'clear') || 'Clear All'}
                    </button>
                </div>

                {outputText && (
                    <div className="output-section">
                        <label>
                            {operation === 'encode' 
                                ? (t('base64Tool', 'encodedResult') || 'Encoded Result')
                                : (t('base64Tool', 'decodedResult') || 'Decoded Result')
                            }
                        </label>
                        <div className="output-container">
                            <pre className="output-text">{outputText}</pre>
                            <button 
                                onClick={() => copyToClipboard(outputText)} 
                                className="copy-btn"
                            >
                                {t('base64Tool', 'copy') || 'Copy'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="info-section">
                    <h4>{t('base64Tool', 'aboutBase64') || 'About Base64'}</h4>
                    <p>{t('base64Tool', 'base64Info') || 'Base64 is a encoding scheme that converts binary data into text format. It is commonly used to encode data that needs to be stored and transferred over media designed to deal with text.'}</p>
                    
                    <h5>{t('base64Tool', 'commonUses') || 'Common Uses:'}</h5>
                    <ul>
                        <li>{t('base64Tool', 'use1') || 'Email attachments (MIME)'}</li>
                        <li>{t('base64Tool', 'use2') || 'Data URIs in web pages'}</li>
                        <li>{t('base64Tool', 'use3') || 'Storing complex data in JSON'}</li>
                        <li>{t('base64Tool', 'use4') || 'Basic authentication headers'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Base64Tool;