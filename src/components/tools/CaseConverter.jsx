import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/CaseConverter.css';

const CaseConverter = () => {
    const { t } = useTranslation(); // <-- i18next
    const { theme } = useTheme();
    const [inputText, setInputText] = useState('');
    const [convertedText, setConvertedText] = useState('');

    const convertToUpperCase = () => {
        setConvertedText(inputText.toUpperCase());
    };

    const convertToLowerCase = () => {
        setConvertedText(inputText.toLowerCase());
    };

    const convertToSentenceCase = () => {
        const sentences = inputText.toLowerCase().split('. ');
        const sentenceCase = sentences.map(sentence =>
            sentence.charAt(0).toUpperCase() + sentence.slice(1)
        ).join('. ');
        setConvertedText(sentenceCase);
    };

    const convertToTitleCase = () => {
        const titleCase = inputText.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        setConvertedText(titleCase);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(convertedText);
        alert(t('caseConverter:copied', 'Text copied to clipboard!'));
    };

    const clearText = () => {
        setInputText('');
        setConvertedText('');
    };

    return (
        <div className={`case-converter ${theme}`}>
            <div className="converter-header">
                <h1>{t('caseConverter:title', 'Text Case Converter')}</h1>
                <p>{t('caseConverter:subtitle', 'Convert text between different cases instantly')}</p>
            </div>

            <div className="converter-container">
                <div className="input-section">
                    <label>{t('caseConverter:inputLabel', 'Input Text')}</label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={t('caseConverter:inputPlaceholder', 'Enter your text here...')}
                        className="text-input"
                        // @ts-ignore
                        rows="6"
                    />
                </div>

                <div className="button-group">
                    <button onClick={convertToUpperCase} className="convert-btn">
                        {t('caseConverter:upperCase', 'UPPERCASE')}
                    </button>
                    <button onClick={convertToLowerCase} className="convert-btn">
                        {t('caseConverter:lowerCase', 'lowercase')}
                    </button>
                    <button onClick={convertToSentenceCase} className="convert-btn">
                        {t('caseConverter:sentenceCase', 'Sentence case')}
                    </button>
                    <button onClick={convertToTitleCase} className="convert-btn">
                        {t('caseConverter:titleCase', 'Title Case')}
                    </button>
                    <button onClick={clearText} className="clear-btn">
                        {t('caseConverter:clear', 'Clear')}
                    </button>
                </div>

                <div className="output-section">
                    <label>{t('caseConverter:outputLabel', 'Converted Text')}</label>
                    <textarea
                        value={convertedText}
                        readOnly
                        placeholder={t('caseConverter:outputPlaceholder', 'Converted text will appear here...')}
                        className="text-output"
                        // @ts-ignore
                        rows="6"
                    />
                </div>

                {convertedText && (
                    <div className="action-buttons">
                        <button onClick={copyToClipboard} className="copy-btn">
                            {t('caseConverter:copy', 'Copy to Clipboard')}
                        </button>
                        <div className="text-stats">
                            <span>{t('caseConverter:characters', 'Characters')}: {convertedText.length}</span>
                            <span>{t('caseConverter:words', 'Words')}: {convertedText.split(/\s+/).filter(word => word.length > 0).length}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseConverter;
