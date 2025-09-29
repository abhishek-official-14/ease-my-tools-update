import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/PercentageCalculator.css';

const PercentageCalculator = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [calculationType, setCalculationType] = useState('percentage');
    const [values, setValues] = useState({
        percentage: '',
        number: '',
        result: '',
        original: '',
        change: '',
        final: ''
    });

    const calculatePercentage = () => {
        const num = parseFloat(values.number);
        const perc = parseFloat(values.percentage);
        
        if (!isNaN(num) && !isNaN(perc)) {
            const result = (num * perc) / 100;
            setValues(prev => ({ ...prev, result: result.toFixed(2) }));
        }
    };

    const calculatePercentageChange = () => {
        const original = parseFloat(values.original);
        const final = parseFloat(values.final);
        
        if (!isNaN(original) && !isNaN(final)) {
            const change = ((final - original) / original) * 100;
            setValues(prev => ({ ...prev, change: change.toFixed(2) }));
        }
    };

    const calculateNumberFromPercentage = () => {
        const percentage = parseFloat(values.percentage);
        const result = parseFloat(values.result);
        
        if (!isNaN(percentage) && !isNaN(result)) {
            const number = (result * 100) / percentage;
            setValues(prev => ({ ...prev, number: number.toFixed(2) }));
        }
    };

    const clearAll = () => {
        setValues({
            percentage: '',
            number: '',
            result: '',
            original: '',
            change: '',
            final: ''
        });
    };

    return (
        <div className={`percentage-calculator ${theme}`}>
            <div className="calculator-header">
                <h1>{t('percentageCalculator', 'title') || 'Percentage Calculator'}</h1>
                <p>{t('percentageCalculator', 'subtitle') || 'Calculate percentages, discounts, and changes'}</p>
            </div>

            <div className="calculator-container">
                <div className="calculation-types">
                    <button 
                        className={`type-btn ${calculationType === 'percentage' ? 'active' : ''}`}
                        onClick={() => setCalculationType('percentage')}
                    >
                        {t('percentageCalculator', 'basicPercentage') || 'Basic Percentage'}
                    </button>
                    <button 
                        className={`type-btn ${calculationType === 'change' ? 'active' : ''}`}
                        onClick={() => setCalculationType('change')}
                    >
                        {t('percentageCalculator', 'percentageChange') || 'Percentage Change'}
                    </button>
                    <button 
                        className={`type-btn ${calculationType === 'findNumber' ? 'active' : ''}`}
                        onClick={() => setCalculationType('findNumber')}
                    >
                        {t('percentageCalculator', 'findNumber') || 'Find Number'}
                    </button>
                </div>

                {calculationType === 'percentage' && (
                    <div className="calculation-section">
                        <h3>{t('percentageCalculator', 'basicPercentage') || 'Basic Percentage'}</h3>
                        <div className="input-group">
                            <label>{t('percentageCalculator', 'whatIs') || 'What is'} </label>
                            <input
                                type="number"
                                value={values.percentage}
                                onChange={(e) => setValues(prev => ({ ...prev, percentage: e.target.value }))}
                                placeholder="%"
                            />
                            <label> {t('percentageCalculator', 'of') || 'of'} </label>
                            <input
                                type="number"
                                value={values.number}
                                onChange={(e) => setValues(prev => ({ ...prev, number: e.target.value }))}
                                placeholder={t('percentageCalculator', 'number') || 'Number'}
                            />
                            <span>?</span>
                        </div>
                        <button onClick={calculatePercentage} className="calculate-btn">
                            {t('percentageCalculator', 'calculate') || 'Calculate'}
                        </button>
                        {values.result && (
                            <div className="result">
                                <strong>{values.percentage}% {t('percentageCalculator', 'of') || 'of'} {values.number} = {values.result}</strong>
                            </div>
                        )}
                    </div>
                )}

                {calculationType === 'change' && (
                    <div className="calculation-section">
                        <h3>{t('percentageCalculator', 'percentageChange') || 'Percentage Change'}</h3>
                        <div className="input-group vertical">
                            <label>{t('percentageCalculator', 'originalValue') || 'Original Value'}</label>
                            <input
                                type="number"
                                value={values.original}
                                onChange={(e) => setValues(prev => ({ ...prev, original: e.target.value }))}
                                placeholder={t('percentageCalculator', 'originalValue') || 'Original Value'}
                            />
                            <label>{t('percentageCalculator', 'finalValue') || 'Final Value'}</label>
                            <input
                                type="number"
                                value={values.final}
                                onChange={(e) => setValues(prev => ({ ...prev, final: e.target.value }))}
                                placeholder={t('percentageCalculator', 'finalValue') || 'Final Value'}
                            />
                        </div>
                        <button onClick={calculatePercentageChange} className="calculate-btn">
                            {t('percentageCalculator', 'calculate') || 'Calculate'}
                        </button>
                        {values.change && (
                            <div className="result">
                                <strong>{t('percentageCalculator', 'percentageChange') || 'Percentage Change'}: {values.change}%</strong>
                            </div>
                        )}
                    </div>
                )}

                {calculationType === 'findNumber' && (
                    <div className="calculation-section">
                        <h3>{t('percentageCalculator', 'findNumber') || 'Find Number'}</h3>
                        <div className="input-group">
                            <label>{values.result} {t('percentageCalculator', 'is') || 'is'} </label>
                            <input
                                type="number"
                                value={values.percentage}
                                onChange={(e) => setValues(prev => ({ ...prev, percentage: e.target.value }))}
                                placeholder="%"
                            />
                            <label> {t('percentageCalculator', 'ofWhatNumber') || 'of what number?'} </label>
                            <input
                                type="number"
                                value={values.result}
                                onChange={(e) => setValues(prev => ({ ...prev, result: e.target.value }))}
                                placeholder={t('percentageCalculator', 'result') || 'Result'}
                            />
                        </div>
                        <button onClick={calculateNumberFromPercentage} className="calculate-btn">
                            {t('percentageCalculator', 'calculate') || 'Calculate'}
                        </button>
                        {values.number && (
                            <div className="result">
                                <strong>{values.result} {t('percentageCalculator', 'is') || 'is'} {values.percentage}% {t('percentageCalculator', 'of') || 'of'} {values.number}</strong>
                            </div>
                        )}
                    </div>
                )}

                <button onClick={clearAll} className="clear-btn">
                    {t('percentageCalculator', 'clear') || 'Clear All'}
                </button>
            </div>
        </div>
    );
};

export default PercentageCalculator;