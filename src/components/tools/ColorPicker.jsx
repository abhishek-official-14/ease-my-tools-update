import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/ColorPicker.css';

const ColorPicker = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [selectedColor, setSelectedColor] = useState('#667eea');
    const [colorHistory, setColorHistory] = useState([]);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setSelectedColor(newColor);
        
        // Add to history (remove duplicates and limit to 8)
        setColorHistory(prev => {
            const filtered = prev.filter(color => color !== newColor);
            return [newColor, ...filtered].slice(0, 8);
        });
    };

    const getColorValues = (hex) => {
        // Convert hex to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        // Convert RGB to HSL
        const rNormalized = r / 255;
        const gNormalized = g / 255;
        const bNormalized = b / 255;
        
        const max = Math.max(rNormalized, gNormalized, bNormalized);
        const min = Math.min(rNormalized, gNormalized, bNormalized);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rNormalized: h = (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0); break;
                case gNormalized: h = (bNormalized - rNormalized) / d + 2; break;
                case bNormalized: h = (rNormalized - gNormalized) / d + 4; break;
            }
            h /= 6;
        }

        return {
            hex: hex.toUpperCase(),
            rgb: `rgb(${r}, ${g}, ${b})`,
            hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
        };
    };

    const colorValues = getColorValues(selectedColor);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
    };

    return (
        <div className={`color-picker ${theme}`}>
            <div className="picker-header">
                <h1>{t('colorPicker', 'title') || 'Color Picker'}</h1>
                <p>{t('colorPicker', 'subtitle') || 'Pick colors and get their values in different formats'}</p>
            </div>

            <div className="picker-container">
                <div className="color-display-section">
                    <div 
                        className="color-display" 
                        style={{ backgroundColor: selectedColor }}
                    >
                        <span className="color-text">{selectedColor.toUpperCase()}</span>
                    </div>
                    
                    <div className="color-input">
                        <label>{t('colorPicker', 'selectColor') || 'Select Color'}</label>
                        <input
                            type="color"
                            value={selectedColor}
                            onChange={handleColorChange}
                            className="color-input-field"
                        />
                        <input
                            type="text"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="color-hex-input"
                            placeholder="#000000"
                        />
                    </div>
                </div>

                <div className="color-values">
                    <h3>{t('colorPicker', 'colorValues') || 'Color Values'}</h3>
                    <div className="value-cards">
                        <div className="value-card" onClick={() => copyToClipboard(colorValues.hex)}>
                            <div className="value-type">HEX</div>
                            <div className="value">{colorValues.hex}</div>
                            <div className="copy-hint">{t('colorPicker', 'clickToCopy') || 'Click to copy'}</div>
                        </div>
                        <div className="value-card" onClick={() => copyToClipboard(colorValues.rgb)}>
                            <div className="value-type">RGB</div>
                            <div className="value">{colorValues.rgb}</div>
                            <div className="copy-hint">{t('colorPicker', 'clickToCopy') || 'Click to copy'}</div>
                        </div>
                        <div className="value-card" onClick={() => copyToClipboard(colorValues.hsl)}>
                            <div className="value-type">HSL</div>
                            <div className="value">{colorValues.hsl}</div>
                            <div className="copy-hint">{t('colorPicker', 'clickToCopy') || 'Click to copy'}</div>
                        </div>
                    </div>
                </div>

                {colorHistory.length > 0 && (
                    <div className="color-history">
                        <h3>{t('colorPicker', 'recentColors') || 'Recent Colors'}</h3>
                        <div className="history-grid">
                            {colorHistory.map((color, index) => (
                                <div
                                    key={index}
                                    className="history-color"
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColorPicker;