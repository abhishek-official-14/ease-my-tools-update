import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/TimeCalculator.css';

const TimeCalculator = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [calculationType, setCalculationType] = useState('add');
    const [time1, setTime1] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [time2, setTime2] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [result, setResult] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateResult, setDateResult] = useState(null);

    const calculateTime = () => {
        const totalSeconds1 = time1.hours * 3600 + time1.minutes * 60 + time1.seconds;
        const totalSeconds2 = time2.hours * 3600 + time2.minutes * 60 + time2.seconds;

        let resultSeconds;
        if (calculationType === 'add') {
            resultSeconds = totalSeconds1 + totalSeconds2;
        } else {
            resultSeconds = totalSeconds1 - totalSeconds2;
            if (resultSeconds < 0) resultSeconds = 0;
        }

        const hours = Math.floor(resultSeconds / 3600);
        const minutes = Math.floor((resultSeconds % 3600) / 60);
        const seconds = resultSeconds % 60;

        setResult({ hours, minutes, seconds, totalSeconds: resultSeconds });
    };

    const calculateDateDifference = () => {
        if (!startDate || !endDate) {
            alert(t('timeCalculator', 'selectBothDates') || 'Please select both dates');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (start > end) {
            alert(t('timeCalculator', 'startBeforeEnd') || 'Start date must be before end date');
            return;
        }

        // @ts-ignore
        const diffTime = Math.abs(end - start);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        setDateResult({
            days: diffDays,
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds,
            totalDays: diffTime / (1000 * 60 * 60 * 24),
            totalHours: diffTime / (1000 * 60 * 60),
            totalMinutes: diffTime / (1000 * 60),
            totalSeconds: diffTime / 1000
        });
    };

    const clearAll = () => {
        setTime1({ hours: 0, minutes: 0, seconds: 0 });
        setTime2({ hours: 0, minutes: 0, seconds: 0 });
        setResult(null);
        setStartDate('');
        setEndDate('');
        setDateResult(null);
    };

    const formatTime = (time) => {
        return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`time-calculator ${theme}`}>
            <div className="calculator-header">
                <h1>{t('timeCalculator', 'title') || 'Time Calculator'}</h1>
                <p>{t('timeCalculator', 'subtitle') || 'Add, subtract time and calculate date differences'}</p>
            </div>

            <div className="calculator-container">
                <div className="calculation-types">
                    <button 
                        className={`type-btn ${calculationType === 'add' ? 'active' : ''}`}
                        onClick={() => setCalculationType('add')}
                    >
                        {t('timeCalculator', 'addSubtractTime') || 'Add/Subtract Time'}
                    </button>
                    <button 
                        className={`type-btn ${calculationType === 'date' ? 'active' : ''}`}
                        onClick={() => setCalculationType('date')}
                    >
                        {t('timeCalculator', 'dateDifference') || 'Date Difference'}
                    </button>
                </div>

                {calculationType === 'add' && (
                    <div className="time-section">
                        <h3>{t('timeCalculator', 'addSubtractTime') || 'Add/Subtract Time'}</h3>
                        
                        <div className="time-inputs">
                            <div className="time-group">
                                <label>{t('timeCalculator', 'time1') || 'Time 1'}</label>
                                <div className="time-controls">
                                    <input
                                        type="number"
                                        value={time1.hours}
                                        onChange={(e) => setTime1(prev => ({ ...prev, hours: parseInt(e.target.value) || 0 }))}
                                        min="0"
                                        placeholder="HH"
                                    />
                                    <span>:</span>
                                    <input
                                        type="number"
                                        value={time1.minutes}
                                        onChange={(e) => setTime1(prev => ({ ...prev, minutes: Math.min(59, parseInt(e.target.value) || 0) }))}
                                        min="0"
                                        max="59"
                                        placeholder="MM"
                                    />
                                    <span>:</span>
                                    <input
                                        type="number"
                                        value={time1.seconds}
                                        onChange={(e) => setTime1(prev => ({ ...prev, seconds: Math.min(59, parseInt(e.target.value) || 0) }))}
                                        min="0"
                                        max="59"
                                        placeholder="SS"
                                    />
                                </div>
                            </div>

                            <div className="operation-selector">
                                <button 
                                    className={`op-btn ${calculationType === 'add' ? 'active' : ''}`}
                                    onClick={() => setCalculationType('add')}
                                >
                                    +
                                </button>
                                <button 
                                    // @ts-ignore
                                    className={`op-btn ${calculationType === 'subtract' ? 'active' : ''}`}
                                    onClick={() => setCalculationType('subtract')}
                                >
                                    -
                                </button>
                            </div>

                            <div className="time-group">
                                <label>{t('timeCalculator', 'time2') || 'Time 2'}</label>
                                <div className="time-controls">
                                    <input
                                        type="number"
                                        value={time2.hours}
                                        onChange={(e) => setTime2(prev => ({ ...prev, hours: parseInt(e.target.value) || 0 }))}
                                        min="0"
                                        placeholder="HH"
                                    />
                                    <span>:</span>
                                    <input
                                        type="number"
                                        value={time2.minutes}
                                        onChange={(e) => setTime2(prev => ({ ...prev, minutes: Math.min(59, parseInt(e.target.value) || 0) }))}
                                        min="0"
                                        max="59"
                                        placeholder="MM"
                                    />
                                    <span>:</span>
                                    <input
                                        type="number"
                                        value={time2.seconds}
                                        onChange={(e) => setTime2(prev => ({ ...prev, seconds: Math.min(59, parseInt(e.target.value) || 0) }))}
                                        min="0"
                                        max="59"
                                        placeholder="SS"
                                    />
                                </div>
                            </div>
                        </div>

                        <button onClick={calculateTime} className="calculate-btn">
                            {t('timeCalculator', 'calculate') || 'Calculate'}
                        </button>

                        {result && (
                            <div className="result-section">
                                <h4>{t('timeCalculator', 'result') || 'Result'}</h4>
                                <div className="result-display">
                                    <div className="result-time">{formatTime(result)}</div>
                                    <div className="result-breakdown">
                                        <div>{result.hours} {t('timeCalculator', 'hours') || 'hours'}</div>
                                        <div>{result.minutes} {t('timeCalculator', 'minutes') || 'minutes'}</div>
                                        <div>{result.seconds} {t('timeCalculator', 'seconds') || 'seconds'}</div>
                                        <div>{result.totalSeconds} {t('timeCalculator', 'totalSeconds') || 'total seconds'}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {calculationType === 'date' && (
                    <div className="date-section">
                        <h3>{t('timeCalculator', 'dateDifference') || 'Date Difference'}</h3>
                        
                        <div className="date-inputs">
                            <div className="date-group">
                                <label>{t('timeCalculator', 'startDate') || 'Start Date'}</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="date-input"
                                />
                            </div>
                            <div className="date-group">
                                <label>{t('timeCalculator', 'endDate') || 'End Date'}</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="date-input"
                                />
                            </div>
                        </div>

                        <button onClick={calculateDateDifference} className="calculate-btn">
                            {t('timeCalculator', 'calculateDifference') || 'Calculate Difference'}
                        </button>

                        {dateResult && (
                            <div className="result-section">
                                <h4>{t('timeCalculator', 'difference') || 'Difference'}</h4>
                                <div className="date-result">
                                    <div className="result-grid">
                                        <div className="result-item">
                                            <span className="value">{dateResult.days}</span>
                                            <span className="label">{t('timeCalculator', 'days') || 'Days'}</span>
                                        </div>
                                        <div className="result-item">
                                            <span className="value">{dateResult.hours}</span>
                                            <span className="label">{t('timeCalculator', 'hours') || 'Hours'}</span>
                                        </div>
                                        <div className="result-item">
                                            <span className="value">{dateResult.minutes}</span>
                                            <span className="label">{t('timeCalculator', 'minutes') || 'Minutes'}</span>
                                        </div>
                                        <div className="result-item">
                                            <span className="value">{dateResult.seconds}</span>
                                            <span className="label">{t('timeCalculator', 'seconds') || 'Seconds'}</span>
                                        </div>
                                    </div>
                                    <div className="total-breakdown">
                                        <div>{t('timeCalculator', 'totalDays') || 'Total Days'}: {dateResult.totalDays.toFixed(2)}</div>
                                        <div>{t('timeCalculator', 'totalHours') || 'Total Hours'}: {dateResult.totalHours.toFixed(2)}</div>
                                        <div>{t('timeCalculator', 'totalMinutes') || 'Total Minutes'}: {dateResult.totalMinutes.toFixed(2)}</div>
                                        <div>{t('timeCalculator', 'totalSeconds') || 'Total Seconds'}: {dateResult.totalSeconds.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <button onClick={clearAll} className="clear-btn">
                    {t('timeCalculator', 'clearAll') || 'Clear All'}
                </button>
            </div>
        </div>
    );
};

export default TimeCalculator;