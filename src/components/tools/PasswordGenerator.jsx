import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/PasswordGenerator.css';

const PasswordGenerator = () => {
    const { t } = useTranslation('passwordGenerator');
    const { theme } = useTheme();
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [excludeSimilar, setExcludeSimilar] = useState(false);
    const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
    const [copied, setCopied] = useState(false);

    const characters = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const similarChars = 'il1Lo0O';
    const ambiguousChars = '{}[]()/\\\'"`~,;:.<> ';

    const generatePassword = () => {
        let charPool = '';
        
        if (includeUppercase) charPool += characters.uppercase;
        if (includeLowercase) charPool += characters.lowercase;
        if (includeNumbers) charPool += characters.numbers;
        if (includeSymbols) charPool += characters.symbols;

        if (charPool === '') {
            alert('Please select at least one character type');
            return;
        }

        if (excludeSimilar) {
            charPool = charPool.split('').filter(char => !similarChars.includes(char)).join('');
        }

        if (excludeAmbiguous) {
            charPool = charPool.split('').filter(char => !ambiguousChars.includes(char)).join('');
        }

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            generatedPassword += charPool[randomIndex];
        }

        setPassword(generatedPassword);
        setCopied(false);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const calculateStrength = () => {
        let score = 0;
        if (length >= 8) score++;
        if (length >= 12) score++;
        if (length >= 16) score++;
        if (includeUppercase) score++;
        if (includeLowercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;
        if (excludeSimilar) score++;
        if (excludeAmbiguous) score++;

        if (score <= 3) return { strength: 'veryWeak', level: 1 };
        if (score <= 5) return { strength: 'weak', level: 2 };
        if (score <= 7) return { strength: 'fair', level: 3 };
        if (score <= 9) return { strength: 'good', level: 4 };
        return { strength: 'strong', level: 5 };
    };

    const strength = calculateStrength();

    useEffect(() => {
        generatePassword();
    }, []);

    return (
        <div className={`password-generator ${theme}`}>
            <div className="tool-header">
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </div>

            <div className="generator-container">
                <div className="password-display">
                    <div className="password-field">
                        <input
                            type="text"
                            value={password}
                            readOnly
                            className="password-input"
                        />
                        <button 
                            onClick={copyPassword}
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            disabled={!password}
                        >
                            {copied ? '✓' : t('copyPassword')}
                        </button>
                    </div>
                    {copied && (
                        <div className="copied-message">
                            {t('passwordCopied')}
                        </div>
                    )}
                </div>

                <div className="strength-meter">
                    <label>{t('passwordStrength')}:</label>
                    <div className="strength-bars">
                        {[1, 2, 3, 4, 5].map(level => (
                            <div
                                key={level}
                                className={`strength-bar ${level <= strength.level ? 'active' : ''} ${strength.strength}`}
                            />
                        ))}
                    </div>
                    <span className={`strength-text ${strength.strength}`}>
                        {t(strength.strength)}
                    </span>
                </div>

                <div className="settings-section">
                    <div className="setting-group">
                        <label htmlFor="length">{t('passwordLength')}: {length}</label>
                        <input
                            id="length"
                            type="range"
                            min="4"
                            max="32"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="length-slider"
                        />
                    </div>

                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                            />
                            {t('includeUppercase')}
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                            />
                            {t('includeLowercase')}
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                            />
                            {t('includeNumbers')}
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                            />
                            {t('includeSymbols')}
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={excludeSimilar}
                                onChange={(e) => setExcludeSimilar(e.target.checked)}
                            />
                            {t('excludeSimilar')}
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={excludeAmbiguous}
                                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                            />
                            {t('excludeAmbiguous')}
                        </label>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={generatePassword} className="primary-btn">
                        {t('regenerate')}
                    </button>
                </div>

                <div className="password-tips">
                    <h4>{t('passwordTips')}</h4>
                    <ul>
                        <li>{t('tip1')}</li>
                        <li>{t('tip2')}</li>
                        <li>{t('tip3')}</li>
                        <li>{t('tip4')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;