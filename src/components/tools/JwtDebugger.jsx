import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/JwtDebugger.css';

const JwtDebugger = () => {
    const { t } = useTranslation('jwtDebugger');
    const { theme } = useTheme();
    const [jwtToken, setJwtToken] = useState('');
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState('');

    const decodeJWT = () => {
        try {
            setError('');
            if (!jwtToken.trim()) {
                setError(t('invalidToken'));
                return;
            }

            const parts = jwtToken.split('.');
            if (parts.length !== 3) {
                throw new Error(t('invalidToken'));
            }

            const header = JSON.parse(atob(parts[0]));
            const payload = JSON.parse(atob(parts[1]));
            const signature = parts[2];

            // Calculate expiration info
            const now = Math.floor(Date.now() / 1000);
            const isExpired = payload.exp && payload.exp < now;
            const expiresIn = payload.exp ? payload.exp - now : null;

            setDecoded({
                header,
                payload,
                signature,
                isExpired,
                expiresIn
            });
        } catch (err) {
            setError(err.message);
            setDecoded(null);
        }
    };

    const clearAll = () => {
        setJwtToken('');
        setDecoded(null);
        setError('');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    const formatTimeRemaining = (seconds) => {
        if (!seconds) return 'N/A';
        if (seconds < 0) return 'Expired';
        
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    return (
        <div className={`jwt-debugger ${theme}`}>
            <div className="tool-header">
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </div>

            <div className="debugger-container">
                <div className="input-section">
                    <label>{t('jwtInput')}</label>
                    <textarea
                        value={jwtToken}
                        onChange={(e) => setJwtToken(e.target.value)}
                        placeholder={t('jwtPlaceholder')}
                        rows="4"
                        className={error ? 'error' : ''}
                    />
                </div>

                <div className="action-buttons">
                    <button onClick={decodeJWT} className="primary-btn">
                        {t('decode')}
                    </button>
                    <button onClick={clearAll} className="secondary-btn">
                        {t('clear')}
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {decoded && (
                    <div className="results-section">
                        <div className="token-info">
                            <h3>{t('tokenInfo')}</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">{t('algorithm')}:</span>
                                    <span className="info-value">{decoded.header.alg || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('tokenType')}:</span>
                                    <span className="info-value">{decoded.header.typ || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('expiration')}:</span>
                                    <span className={`info-value ${decoded.isExpired ? 'expired' : ''}`}>
                                        {formatTimestamp(decoded.payload.exp)}
                                        {decoded.expiresIn && (
                                            <span className="time-remaining">
                                                ({formatTimeRemaining(decoded.expiresIn)})
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('issuedAt')}:</span>
                                    <span className="info-value">{formatTimestamp(decoded.payload.iat)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('issuer')}:</span>
                                    <span className="info-value">{decoded.payload.iss || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('subject')}:</span>
                                    <span className="info-value">{decoded.payload.sub || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('audience')}:</span>
                                    <span className="info-value">{decoded.payload.aud || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">{t('tokenId')}:</span>
                                    <span className="info-value">{decoded.payload.jti || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="jwt-parts">
                            <div className="jwt-part">
                                <div className="part-header">
                                    <h4>{t('header')}</h4>
                                    <button 
                                        onClick={() => copyToClipboard(decoded.header)}
                                        className="copy-btn-small"
                                    >
                                        {t('copyHeader')}
                                    </button>
                                </div>
                                <pre className="json-output">{JSON.stringify(decoded.header, null, 2)}</pre>
                            </div>

                            <div className="jwt-part">
                                <div className="part-header">
                                    <h4>{t('payload')}</h4>
                                    <button 
                                        onClick={() => copyToClipboard(decoded.payload)}
                                        className="copy-btn-small"
                                    >
                                        {t('copyPayload')}
                                    </button>
                                </div>
                                <pre className="json-output">{JSON.stringify(decoded.payload, null, 2)}</pre>
                            </div>

                            <div className="jwt-part">
                                <div className="part-header">
                                    <h4>{t('signature')}</h4>
                                    <span className={`verification ${decoded.signature ? 'verified' : 'not-verified'}`}>
                                        {decoded.signature ? t('verified') : t('notVerified')}
                                    </span>
                                </div>
                                <div className="signature-output">
                                    {decoded.signature}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="jwt-info">
                    <h4>JWT Information</h4>
                    <ul>
                        <li>{t('info1')}</li>
                        <li>{t('info2')}</li>
                        <li>{t('info3')}</li>
                        <li>{t('info4')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JwtDebugger;