import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/AgeCalculator.css';

const AgeCalculator = () => {
    const { t } = useTranslation('ageCalculator');
    const { theme } = useTheme();
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);

    const calculateAge = () => {
        if (!birthDate) {
            alert(t('selectDate') || 'Please select your birth date');
            return;
        }

        const birth = new Date(birthDate);
        const today = new Date();
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            // Get days in previous month
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate total days
        // @ts-ignore
        const diffTime = Math.abs(today - birth);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calculate next birthday
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        // @ts-ignore
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        setAge({
            years,
            months,
            days,
            totalDays,
            nextBirthday: daysUntilBirthday
        });
    };

    const clearAll = () => {
        setBirthDate('');
        setAge(null);
    };

    return (
        <div className={`age-calculator ${theme}`}>
            <div className="calculator-header">
                <h1>{t('title') || 'Age Calculator'}</h1>
                <p>{t('subtitle') || 'Calculate your exact age in years, months, and days'}</p>
            </div>

            <div className="calculator-container">
                <div className="input-section">
                    <label>{t('birthDate') || 'Your Birth Date'}</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="date-input"
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="action-buttons">
                    <button onClick={calculateAge} className="calculate-btn">
                        {t('calculateAge') || 'Calculate Age'}
                    </button>
                    <button onClick={clearAll} className="clear-btn">
                        {t('clear') || 'Clear'}
                    </button>
                </div>

                {age && (
                    <div className="results-section">
                        <h3>{t('yourAge') || 'Your Age'}</h3>
                        <div className="age-display">
                            <div className="age-unit">
                                <span className="age-number">{age.years}</span>
                                <span className="age-label">{t('years') || 'Years'}</span>
                            </div>
                            <div className="age-unit">
                                <span className="age-number">{age.months}</span>
                                <span className="age-label">{t('months') || 'Months'}</span>
                            </div>
                            <div className="age-unit">
                                <span className="age-number">{age.days}</span>
                                <span className="age-label">{t('days') || 'Days'}</span>
                            </div>
                        </div>

                        <div className="additional-stats">
                            <div className="stat">
                                <span className="stat-label">{t('totalDays') || 'Total Days'}:</span>
                                <span className="stat-value">{age.totalDays.toLocaleString()}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">{t('nextBirthday') || 'Days until next birthday'}:</span>
                                <span className="stat-value">{age.nextBirthday}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">{t('birthDay') || 'Birth Day'}:</span>
                                <span className="stat-value">{new Date(birthDate).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="fun-facts">
                    <h4>{t('funFacts') || 'Fun Facts'}</h4>
                    <ul>
                        <li>{t('fact1') || 'You have lived through approximately ' + (age ? Math.floor(age.totalDays / 30.44) : '0') + ' months'}</li>
                        <li>{t('fact2') || 'You have experienced about ' + (age ? Math.floor(age.totalDays / 7) : '0') + ' weekends'}</li>
                        <li>{t('fact3') || 'Your next birthday is in ' + (age ? age.nextBirthday : '0') + ' days'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AgeCalculator;