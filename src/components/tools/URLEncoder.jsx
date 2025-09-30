import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/URLEncoder.css';

const URLEncoder = () => {
    const { t } = useTranslation('urlEncoder');
    const { theme } = useTheme();
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [operation, setOperation] = useState('encode');

    const processText = () => {
        if (!inputText.trim()) {
            alert(t('enterText') || 'Please enter some text');
            return;
        }

        try {
            if (operation === 'encode') {
                const encoded = encodeURIComponent(inputText);
                setOutputText(encoded);
            } else {
                const decoded = decodeURIComponent(inputText);
                setOutputText(decoded);
            }
        } catch (error) {
            alert(t('invalidInput') || 'Invalid input for the selected operation');
        }
    };

    const clearAll = () => {
        setInputText('');
        setOutputText('');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(t('copied') || 'Copied to clipboard!');
    };

    const swapOperation = () => {
        setOperation(operation === 'encode' ? 'decode' : 'encode');
        setInputText(outputText);
        setOutputText(inputText);
    };

    const processFullURL = () => {
        if (!inputText.trim()) {
            alert(t('enterURL') || 'Please enter a URL');
            return;
        }

        try {
            if (operation === 'encode') {
                const encoded = encodeURI(inputText);
                setOutputText(encoded);
            } else {
                const decoded = decodeURI(inputText);
                setOutputText(decoded);
            }
        } catch (error) {
            alert(t('invalidURL') || 'Invalid URL for the selected operation');
        }
    };

    return (
        <div className={`url-encoder ${theme}`}>
            <div className="encoder-header">
                <h1>{t('title') || 'URL Encoder/Decoder'}</h1>
                <p>{t('subtitle') || 'Encode and decode URL strings online'}</p>
            </div>

            <div className="encoder-container">
                <div className="operation-selector">
                    <button 
                        className={`op-btn ${operation === 'encode' ? 'active' : ''}`}
                        onClick={() => setOperation('encode')}
                    >
                        {t('encode') || 'Encode'}
                    </button>
                    <button 
                        className={`op-btn ${operation === 'decode' ? 'active' : ''}`}
                        onClick={() => setOperation('decode')}
                    >
                        {t('decode') || 'Decode'}
                    </button>
                </div>

                <div className="input-section">
                    <label>
                        {operation === 'encode' 
                            ? t('textToEncode') || 'Text to Encode'
                            : t('urlToDecode') || 'URL to Decode'
                        }
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                            operation === 'encode' 
                                ? t('enterTextToEncode') || 'Enter text to encode to URL format...'
                                : t('enterURLToDecode') || 'Enter URL to decode...'
                        }
                        className="text-input"
                        rows="4"
                    />
                </div>

                <div className="action-buttons">
                    <button onClick={processText} className="process-btn">
                        {operation === 'encode' 
                            ? t('encodeComponent') || 'Encode Component'
                            : t('decodeComponent') || 'Decode Component'
                        }
                    </button>
                    <button onClick={processFullURL} className="process-btn full">
                        {operation === 'encode' 
                            ? t('encodeFullURL') || 'Encode Full URL'
                            : t('decodeFullURL') || 'Decode Full URL'
                        }
                    </button>
                    <button onClick={swapOperation} className="swap-btn">
                        {t('swap') || 'Swap'}
                    </button>
                    <button onClick={clearAll} className="clear-btn">
                        {t('clear') || 'Clear All'}
                    </button>
                </div>

                {outputText && (
                    <div className="output-section">
                        <label>
                            {operation === 'encode' 
                                ? t('encodedResult') || 'Encoded Result'
                                : t('decodedResult') || 'Decoded Result'
                            }
                        </label>
                        <div className="output-container">
                            <pre className="output-text">{outputText}</pre>
                            <button 
                                onClick={() => copyToClipboard(outputText)} 
                                className="copy-btn"
                            >
                                {t('copy') || 'Copy'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="info-section">
                    <h4>{t('aboutURLEncoding') || 'About URL Encoding'}</h4>
                    <p><strong>{t('encodeURIComponent') || 'encodeURIComponent()'}:</strong> {t('componentInfo') || 'Encodes all characters except: A-Z a-z 0-9 - _ . ! ~ * \' ( )'}</p>
                    <p><strong>{t('encodeURI') || 'encodeURI()'}:</strong> {t('uriInfo') || 'Encodes a complete URL, preserving characters like : / ? & ='}</p>
                    
                    <h5>{t('commonUses') || 'Common Uses:'}</h5>
                    <ul>
                        <li>{t('use1') || 'Query parameters in URLs'}</li>
                        <li>{t('use2') || 'Form data submission'}</li>
                        <li>{t('use3') || 'API requests with special characters'}</li>
                        <li>{t('use4') || 'Handling user input in web applications'}</li>
                    </ul>

                    <div className="examples">
                        <h5>{t('examples') || 'Examples:'}</h5>
                        <div className="example">
                            <strong>{t('encodeExample') || 'Encode:'}</strong> "hello world" → "hello%20world"
                        </div>
                        <div className="example">
                            <strong>{t('decodeExample') || 'Decode:'}</strong> "hello%20world" → "hello world"
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default URLEncoder;