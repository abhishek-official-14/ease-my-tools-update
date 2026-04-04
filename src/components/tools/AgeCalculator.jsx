// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/AgeCalculator.css';

// const AgeCalculator = () => {
//     const { t } = useTranslation('ageCalculator');
//     const { theme } = useTheme();
//     const [birthDate, setBirthDate] = useState('');
//     const [age, setAge] = useState(null);

//     const calculateAge = () => {
//         if (!birthDate) {
//             alert(t('selectDate') || 'Please select your birth date');
//             return;
//         }

//         const birth = new Date(birthDate);
//         const today = new Date();
        
//         let years = today.getFullYear() - birth.getFullYear();
//         let months = today.getMonth() - birth.getMonth();
//         let days = today.getDate() - birth.getDate();

//         if (days < 0) {
//             months--;
//             // Get days in previous month
//             const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//             days += prevMonth.getDate();
//         }

//         if (months < 0) {
//             years--;
//             months += 12;
//         }

//         // Calculate total days
//         // @ts-ignore
//         const diffTime = Math.abs(today - birth);
//         const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         // Calculate next birthday
//         const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
//         if (nextBirthday < today) {
//             nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
//         }
//         // @ts-ignore
//         const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

//         setAge({
//             years,
//             months,
//             days,
//             totalDays,
//             nextBirthday: daysUntilBirthday
//         });
//     };

//     const clearAll = () => {
//         setBirthDate('');
//         setAge(null);
//     };

//     return (
//         <div className={`age-calculator ${theme}`}>
//             <div className="calculator-header">
//                 <h1>{t('title') || 'Age Calculator'}</h1>
//                 <p>{t('subtitle') || 'Calculate your exact age in years, months, and days'}</p>
//             </div>

//             <div className="calculator-container">
//                 <div className="input-section">
//                     <label>{t('birthDate') || 'Your Birth Date'}</label>
//                     <input
//                         type="date"
//                         value={birthDate}
//                         onChange={(e) => setBirthDate(e.target.value)}
//                         className="date-input"
//                         max={new Date().toISOString().split('T')[0]}
//                     />
//                 </div>

//                 <div className="action-buttons">
//                     <button onClick={calculateAge} className="calculate-btn">
//                         {t('calculateAge') || 'Calculate Age'}
//                     </button>
//                     <button onClick={clearAll} className="clear-btn">
//                         {t('clear') || 'Clear'}
//                     </button>
//                 </div>

//                 {age && (
//                     <div className="results-section">
//                         <h3>{t('yourAge') || 'Your Age'}</h3>
//                         <div className="age-display">
//                             <div className="age-unit">
//                                 <span className="age-number">{age.years}</span>
//                                 <span className="age-label">{t('years') || 'Years'}</span>
//                             </div>
//                             <div className="age-unit">
//                                 <span className="age-number">{age.months}</span>
//                                 <span className="age-label">{t('months') || 'Months'}</span>
//                             </div>
//                             <div className="age-unit">
//                                 <span className="age-number">{age.days}</span>
//                                 <span className="age-label">{t('days') || 'Days'}</span>
//                             </div>
//                         </div>

//                         <div className="additional-stats">
//                             <div className="stat">
//                                 <span className="stat-label">{t('totalDays') || 'Total Days'}:</span>
//                                 <span className="stat-value">{age.totalDays.toLocaleString()}</span>
//                             </div>
//                             <div className="stat">
//                                 <span className="stat-label">{t('nextBirthday') || 'Days until next birthday'}:</span>
//                                 <span className="stat-value">{age.nextBirthday}</span>
//                             </div>
//                             <div className="stat">
//                                 <span className="stat-label">{t('birthDay') || 'Birth Day'}:</span>
//                                 <span className="stat-value">{new Date(birthDate).toLocaleDateString('en-US', { weekday: 'long' })}</span>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div className="fun-facts">
//                     <h4>{t('funFacts') || 'Fun Facts'}</h4>
//                     <ul>
//                         <li>{t('fact1') || 'You have lived through approximately ' + (age ? Math.floor(age.totalDays / 30.44) : '0') + ' months'}</li>
//                         <li>{t('fact2') || 'You have experienced about ' + (age ? Math.floor(age.totalDays / 7) : '0') + ' weekends'}</li>
//                         <li>{t('fact3') || 'Your next birthday is in ' + (age ? age.nextBirthday : '0') + ' days'}</li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AgeCalculator;
























// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/AgeCalculator.css';

// const AgeCalculator = () => {
//     const { t } = useTranslation('ageCalculator');
//     const { theme } = useTheme();
//     const [birthDate, setBirthDate] = useState('');
//     const [age, setAge] = useState(null);
    
//     const [comparisonMode, setComparisonMode] = useState(false);
//     const [personA, setPersonA] = useState('');
//     const [personB, setPersonB] = useState('');
//     const [comparisonResult, setComparisonResult] = useState(null);
//     const [comparisonError, setComparisonError] = useState('');

//     const calculateAgeFromDate = (dateString) => {
//         if (!dateString) return null;

//         const birth = new Date(dateString);
//         const today = new Date();
        
//         let years = today.getFullYear() - birth.getFullYear();
//         let months = today.getMonth() - birth.getMonth();
//         let days = today.getDate() - birth.getDate();

//         if (days < 0) {
//             months--;
//             const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//             days += prevMonth.getDate();
//         }

//         if (months < 0) {
//             years--;
//             months += 12;
//         }

//         // Calculate total days
//         const diffTime = Math.abs(today - birth);
//         const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         // Calculate next birthday
//         const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
//         if (nextBirthday < today) {
//             nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
//         }
//         const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

//         return {
//             years,
//             months,
//             days,
//             totalDays,
//             nextBirthday: daysUntilBirthday,
//             birthDate: dateString
//         };
//     };

//     const calculateAge = () => {
//         if (!birthDate) {
//             alert(t('selectDate') || 'Please select your birth date');
//             return;
//         }

//         const calculatedAge = calculateAgeFromDate(birthDate);
//         setAge(calculatedAge);
//     };

//     const calculateComparison = () => {
//         setComparisonError('');
//         setComparisonResult(null);

//         if (!personA || !personB) {
//             setComparisonError(t('bothDatesRequired') || 'Please select both dates for comparison');
//             return;
//         }

//         const ageA = calculateAgeFromDate(personA);
//         const ageB = calculateAgeFromDate(personB);

//         if (!ageA || !ageB) {
//             setComparisonError(t('invalidDates') || 'Invalid dates provided');
//             return;
//         }

//         const birthDateA = new Date(personA);
//         const birthDateB = new Date(personB);
//         const isAOlder = birthDateA < birthDateB;
//         const isSameDate = birthDateA.getTime() === birthDateB.getTime();

//         if (isSameDate) {
//             setComparisonResult({
//                 message: t('sameAge') || 'Both are the same age',
//                 personA: ageA,
//                 personB: ageB,
//                 difference: { years: 0, months: 0, days: 0, totalDays: 0 }
//             });
//             return;
//         }

//         // Calculate difference
//         let diffYears = Math.abs(ageA.years - ageB.years);
//         let diffMonths = Math.abs(ageA.months - ageB.months);
//         let diffDays = Math.abs(ageA.days - ageB.days);
//         const totalDiffDays = Math.abs(ageA.totalDays - ageB.totalDays);

//         if (diffDays < 0) {
//             diffMonths--;
//             const prevMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
//             diffDays += prevMonth.getDate();
//         }

//         if (diffMonths < 0) {
//             diffYears--;
//             diffMonths += 12;
//         }

//         setComparisonResult({
//             olderPerson: isAOlder ? 'A' : 'B',
//             olderName: isAOlder ? (t('personA') || 'Person A') : (t('personB') || 'Person B'),
//             personA: ageA,
//             personB: ageB,
//             difference: {
//                 years: diffYears,
//                 months: diffMonths,
//                 days: diffDays,
//                 totalDays: totalDiffDays
//             }
//         });
//     };

//     const clearAll = () => {
//         setBirthDate('');
//         setAge(null);
//         setPersonA('');
//         setPersonB('');
//         setComparisonResult(null);
//         setComparisonError('');
//     };

//     const toggleComparisonMode = () => {
//         const newMode = !comparisonMode;
//         setComparisonMode(newMode);
//         if (!newMode) {
//             setPersonA('');
//             setPersonB('');
//             setComparisonResult(null);
//             setComparisonError('');
//         }
//     };

//     const getDayOfWeek = (dateString) => {
//         if (!dateString) return '';
//         return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
//     };

//     return (
//         <div className={`age-calculator ${theme}`}>
//             {/* Header Section */}
//             <header className="calculator-header">
//                 <h1 className="header-title">{t('title') || 'Age Calculator'}</h1>
//                 <p className="header-subtitle">
//                     {t('subtitle') || 'Calculate your exact age in years, months, and days'}
//                 </p>
//             </header>

//             <main className="calculator-container">
//                 {/* Mode Toggle */}
//                 <div className="mode-toggle-section">
//                     <button 
//                         onClick={toggleComparisonMode}
//                         className={`mode-toggle-btn ${comparisonMode ? 'active' : ''}`}
//                         aria-label={comparisonMode ? 'Switch to single age mode' : 'Switch to comparison mode'}
//                     >
//                         <span className="mode-icon">
//                             {comparisonMode ? '👤' : '👥'}
//                         </span>
//                         <span className="mode-text">
//                             {comparisonMode ? 
//                                 (t('singleMode') || 'Single Age') : 
//                                 (t('comparisonMode') || 'Age Comparison')
//                             }
//                         </span>
//                     </button>
//                 </div>

//                 {/* Calculator Card */}
//                 <div className="calculator-card">
//                     {!comparisonMode ? (
//                         <>
//                             <div className="input-group">
//                                 <label htmlFor="birthDate" className="input-label">
//                                     {t('birthDate') || 'Your Birth Date'}
//                                 </label>
//                                 <input
//                                     id="birthDate"
//                                     type="date"
//                                     value={birthDate}
//                                     onChange={(e) => setBirthDate(e.target.value)}
//                                     className="date-input"
//                                     max={new Date().toISOString().split('T')[0]}
//                                     aria-required="true"
//                                 />
//                             </div>
                            
//                             <div className="action-buttons">
//                                 <button 
//                                     onClick={calculateAge} 
//                                     className="btn btn-primary"
//                                     disabled={!birthDate}
//                                 >
//                                     <span className="btn-icon">🧮</span>
//                                     {t('calculateAge') || 'Calculate Age'}
//                                 </button>
//                                 <button onClick={clearAll} className="btn btn-secondary">
//                                     <span className="btn-icon">🗑️</span>
//                                     {t('clear') || 'Clear All'}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="comparison-inputs">
//                             <h3 className="comparison-title">{t('ageComparison') || 'Compare Ages'}</h3>
                            
//                             <div className="input-grid">
//                                 <div className="input-card">
//                                     <label htmlFor="personA" className="input-label">
//                                         <span className="person-label">👤</span>
//                                         {t('personA') || 'Person A'}
//                                     </label>
//                                     <input
//                                         id="personA"
//                                         type="date"
//                                         value={personA}
//                                         onChange={(e) => setPersonA(e.target.value)}
//                                         className="date-input"
//                                         max={new Date().toISOString().split('T')[0]}
//                                     />
//                                 </div>
                                
//                                 <div className="vs-divider">vs</div>
                                
//                                 <div className="input-card">
//                                     <label htmlFor="personB" className="input-label">
//                                         <span className="person-label">👤</span>
//                                         {t('personB') || 'Person B'}
//                                     </label>
//                                     <input
//                                         id="personB"
//                                         type="date"
//                                         value={personB}
//                                         onChange={(e) => setPersonB(e.target.value)}
//                                         className="date-input"
//                                         max={new Date().toISOString().split('T')[0]}
//                                     />
//                                 </div>
//                             </div>

//                             {comparisonError && (
//                                 <div className="error-message" role="alert">
//                                     <span className="error-icon">⚠️</span>
//                                     {comparisonError}
//                                 </div>
//                             )}

//                             <div className="action-buttons">
//                                 <button 
//                                     onClick={calculateComparison} 
//                                     className="btn btn-primary"
//                                     disabled={!personA || !personB}
//                                 >
//                                     <span className="btn-icon">⚖️</span>
//                                     {t('compareAges') || 'Compare Ages'}
//                                 </button>
//                                 <button onClick={clearAll} className="btn btn-secondary">
//                                     <span className="btn-icon">🗑️</span>
//                                     {t('clear') || 'Clear All'}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Results Section */}
//                 {age && !comparisonMode && (
//                     <div className="results-section">
//                         <h3 className="results-title">{t('yourAge') || 'Your Age'}</h3>
                        
//                         {/* Age Stats Cards */}
//                         <div className="stats-grid">
//                             <div className="stat-card primary-stat">
//                                 <div className="stat-value highlight">{age.years}</div>
//                                 <div className="stat-label">{t('years') || 'Years'}</div>
//                             </div>
//                             <div className="stat-card">
//                                 <div className="stat-value">{age.months}</div>
//                                 <div className="stat-label">{t('months') || 'Months'}</div>
//                             </div>
//                             <div className="stat-card">
//                                 <div className="stat-value">{age.days}</div>
//                                 <div className="stat-label">{t('days') || 'Days'}</div>
//                             </div>
//                             <div className="stat-card">
//                                 <div className="stat-value">{age.totalDays.toLocaleString()}</div>
//                                 <div className="stat-label">{t('totalDays') || 'Total Days'}</div>
//                             </div>
//                         </div>

//                         {/* Birthday Countdown */}
//                         <div className="countdown-section">
//                             <h4 className="countdown-title">{t('birthdayCountdown') || 'Birthday Countdown'}</h4>
//                             <div className="countdown-grid">
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">{age.nextBirthday}</div>
//                                     <div className="countdown-label">{t('daysLeft') || 'Days Left'}</div>
//                                 </div>
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">{Math.floor(age.nextBirthday / 7)}</div>
//                                     <div className="countdown-label">{t('weeksLeft') || 'Weeks Left'}</div>
//                                 </div>
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">{getDayOfWeek(birthDate)}</div>
//                                     <div className="countdown-label">{t('birthDay') || 'Birth Day'}</div>
//                                 </div>
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">
//                                         {new Date().getFullYear() - new Date(birthDate).getFullYear() + 1}
//                                     </div>
//                                     <div className="countdown-label">{t('nextAge') || 'Next Age'}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Comparison Results */}
//                 {comparisonMode && comparisonResult && (
//                     <div className="comparison-results">
//                         <h3 className="results-title">{t('comparisonResult') || 'Comparison Result'}</h3>
                        
//                         {comparisonResult.message ? (
//                             <div className="same-age-card">
//                                 <div className="same-age-icon">🎯</div>
//                                 <div className="same-age-message">{comparisonResult.message}</div>
//                             </div>
//                         ) : (
//                             <div className="comparison-result-card">
//                                 <div className="older-indicator">
//                                     <div className="crown-icon">👑</div>
//                                     <div className="older-text">
//                                         {t('olderIs') || 'Older is'}: 
//                                         <span className="older-name"> {comparisonResult.olderName}</span>
//                                     </div>
//                                 </div>
                                
//                                 <div className="difference-section">
//                                     <h4 className="difference-title">{t('ageDifference') || 'Age Difference'}</h4>
//                                     <div className="difference-grid">
//                                         <div className="difference-card">
//                                             <div className="difference-value highlight">{comparisonResult.difference.years}</div>
//                                             <div className="difference-label">{t('years') || 'Years'}</div>
//                                         </div>
//                                         <div className="difference-card">
//                                             <div className="difference-value">{comparisonResult.difference.months}</div>
//                                             <div className="difference-label">{t('months') || 'Months'}</div>
//                                         </div>
//                                         <div className="difference-card">
//                                             <div className="difference-value">{comparisonResult.difference.days}</div>
//                                             <div className="difference-label">{t('days') || 'Days'}</div>
//                                         </div>
//                                     </div>
//                                     <div className="total-difference">
//                                         <span className="total-label">{t('totalDaysDifference') || 'Total Days Difference'}:</span>
//                                         <span className="total-value">{comparisonResult.difference.totalDays.toLocaleString()}</span>
//                                     </div>
//                                 </div>

//                                 <div className="individual-comparison">
//                                     <div className="person-result">
//                                         <div className="person-header">
//                                             <span className="person-icon">👤</span>
//                                             <h5>{t('personA') || 'Person A'}</h5>
//                                         </div>
//                                         <div className="person-age">
//                                             {comparisonResult.personA.years} {t('years') || 'Years'}
//                                         </div>
//                                         <div className="person-days">
//                                             {comparisonResult.personA.totalDays.toLocaleString()} {t('totalDays') || 'Total Days'}
//                                         </div>
//                                     </div>
                                    
//                                     <div className="person-result">
//                                         <div className="person-header">
//                                             <span className="person-icon">👤</span>
//                                             <h5>{t('personB') || 'Person B'}</h5>
//                                         </div>
//                                         <div className="person-age">
//                                             {comparisonResult.personB.years} {t('years') || 'Years'}
//                                         </div>
//                                         <div className="person-days">
//                                             {comparisonResult.personB.totalDays.toLocaleString()} {t('totalDays') || 'Total Days'}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Fun Facts Section */}
//                 <div className="fun-facts-section">
//                     <h3 className="facts-title">
//                         <span className="facts-icon">💡</span>
//                         {t('funFacts') || 'Fun Facts & Insights'}
//                     </h3>
//                     <div className="facts-grid">
//                         <div className="fact-card">
//                             <div className="fact-icon">📅</div>
//                             <div className="fact-text">
//                                 {age && `${Math.floor(age.totalDays / 30.44).toLocaleString()} ${t('monthsLived') || 'months lived'}`}
//                                 {comparisonResult && !comparisonResult.message && 
//                                     `${Math.floor(comparisonResult.difference.totalDays / 30.44).toLocaleString()} ${t('monthsDifference') || 'months difference'}`
//                                 }
//                             </div>
//                         </div>
//                         <div className="fact-card">
//                             <div className="fact-icon">🌙</div>
//                             <div className="fact-text">
//                                 {age && `${Math.floor(age.totalDays / 7).toLocaleString()} ${t('weekends') || 'weekends experienced'}`}
//                             </div>
//                         </div>
//                         <div className="fact-card">
//                             <div className="fact-icon">🎂</div>
//                             <div className="fact-text">
//                                 {age && `${age.nextBirthday} ${t('daysToBirthday') || 'days until next birthday'}`}
//                             </div>
//                         </div>
//                         <div className="fact-card">
//                             <div className="fact-icon">⏳</div>
//                             <div className="fact-text">
//                                 {age && `${Math.floor(age.totalDays * 24).toLocaleString()} ${t('hoursLived') || 'hours lived'}`}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AgeCalculator;













// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/AgeCalculator.css';

// // Vedic Rashi data
// const RASHI_DATA = {
//     0: { // Aries - Mesha (March 21 - April 19)
//         name: 'Mesha',
//         english: 'Aries',
//         element: 'Fire',
//         symbol: '♈',
//         description: 'Courageous, energetic, and natural leaders who love challenges.',
//         startDate: { month: 3, day: 21 },
//         endDate: { month: 4, day: 19 }
//     },
//     1: { // Taurus - Vrishabha (April 20 - May 20)
//         name: 'Vrishabha',
//         english: 'Taurus',
//         element: 'Earth',
//         symbol: '♉',
//         description: 'Reliable, patient, and practical with strong determination.',
//         startDate: { month: 4, day: 20 },
//         endDate: { month: 5, day: 20 }
//     },
//     2: { // Gemini - Mithuna (May 21 - June 20)
//         name: 'Mithuna',
//         english: 'Gemini',
//         element: 'Air',
//         symbol: '♊',
//         description: 'Adaptable, curious, and excellent communicators who love variety.',
//         startDate: { month: 5, day: 21 },
//         endDate: { month: 6, day: 20 }
//     },
//     3: { // Cancer - Karka (June 21 - July 22)
//         name: 'Karka',
//         english: 'Cancer',
//         element: 'Water',
//         symbol: '♋',
//         description: 'Intuitive, emotional, and deeply connected to family and home.',
//         startDate: { month: 6, day: 21 },
//         endDate: { month: 7, day: 22 }
//     },
//     4: { // Leo - Simha (July 23 - Aug 22)
//         name: 'Simha',
//         english: 'Leo',
//         element: 'Fire',
//         symbol: '♌',
//         description: 'Charismatic, creative, and natural-born leaders with generous hearts.',
//         startDate: { month: 7, day: 23 },
//         endDate: { month: 8, day: 22 }
//     },
//     5: { // Virgo - Kanya (Aug 23 - Sept 22)
//         name: 'Kanya',
//         english: 'Virgo',
//         element: 'Earth',
//         symbol: '♍',
//         description: 'Analytical, practical, and detail-oriented with a helpful nature.',
//         startDate: { month: 8, day: 23 },
//         endDate: { month: 9, day: 22 }
//     },
//     6: { // Libra - Tula (Sept 23 - Oct 22)
//         name: 'Tula',
//         english: 'Libra',
//         element: 'Air',
//         symbol: '♎',
//         description: 'Diplomatic, fair-minded, and lovers of beauty and harmony.',
//         startDate: { month: 9, day: 23 },
//         endDate: { month: 10, day: 22 }
//     },
//     7: { // Scorpio - Vrishchika (Oct 23 - Nov 21)
//         name: 'Vrishchika',
//         english: 'Scorpio',
//         element: 'Water',
//         symbol: '♏',
//         description: 'Passionate, resourceful, and determined with strong intuition.',
//         startDate: { month: 10, day: 23 },
//         endDate: { month: 11, day: 21 }
//     },
//     8: { // Sagittarius - Dhanu (Nov 22 - Dec 21)
//         name: 'Dhanu',
//         english: 'Sagittarius',
//         element: 'Fire',
//         symbol: '♐',
//         description: 'Optimistic, adventurous, and philosophical truth-seekers.',
//         startDate: { month: 11, day: 22 },
//         endDate: { month: 12, day: 21 }
//     },
//     9: { // Capricorn - Makara (Dec 22 - Jan 19)
//         name: 'Makara',
//         english: 'Capricorn',
//         element: 'Earth',
//         symbol: '♑',
//         description: 'Disciplined, responsible, and patient with long-term vision.',
//         startDate: { month: 12, day: 22 },
//         endDate: { month: 1, day: 19 }
//     },
//     10: { // Aquarius - Kumbha (Jan 20 - Feb 18)
//         name: 'Kumbha',
//         english: 'Aquarius',
//         element: 'Air',
//         symbol: '♒',
//         description: 'Innovative, independent, and humanitarian thinkers.',
//         startDate: { month: 1, day: 20 },
//         endDate: { month: 2, day: 18 }
//     },
//     11: { // Pisces - Meena (Feb 19 - March 20)
//         name: 'Meena',
//         english: 'Pisces',
//         element: 'Water',
//         symbol: '♓',
//         description: 'Compassionate, artistic, and deeply intuitive dreamers.',
//         startDate: { month: 2, day: 19 },
//         endDate: { month: 3, day: 20 }
//     }
// };

// // Element colors mapping
// const ELEMENT_COLORS = {
//     Fire: '#dc2626',
//     Earth: '#16a34a',
//     Air: '#0284c7',
//     Water: '#7c3aed'
// };

// const AgeCalculator = () => {
//     const { t } = useTranslation('ageCalculator');
//     const { theme } = useTheme();
//     const [birthDate, setBirthDate] = useState('');
//     const [age, setAge] = useState(null);
//     const [rashiInfo, setRashiInfo] = useState(null);
    
//     const [comparisonMode, setComparisonMode] = useState(false);
//     const [personA, setPersonA] = useState('');
//     const [personB, setPersonB] = useState('');
//     const [comparisonResult, setComparisonResult] = useState(null);
//     const [comparisonError, setComparisonError] = useState('');

//     // Calculate Vedic Rashi based on birth date
//     const calculateRashi = (dateString) => {
//         if (!dateString) return null;
        
//         const birthDate = new Date(dateString);
//         const month = birthDate.getMonth() + 1; // JavaScript months are 0-indexed
//         const day = birthDate.getDate();
        
//         // Special case for Capricorn (spans December to January)
//         if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
//             return RASHI_DATA[9]; // Makara (Capricorn)
//         }
        
//         // Find matching Rashi
//         for (const key in RASHI_DATA) {
//             const rashi = RASHI_DATA[key];
//             if (key === '9') continue; // Skip Capricorn as handled above
            
//             const startMonth = rashi.startDate.month;
//             const startDay = rashi.startDate.day;
//             const endMonth = rashi.endDate.month;
//             const endDay = rashi.endDate.day;
            
//             if (
//                 (month === startMonth && day >= startDay) ||
//                 (month === endMonth && day <= endDay) ||
//                 (month > startMonth && month < endMonth)
//             ) {
//                 return rashi;
//             }
//         }
        
//         return null;
//     };

//     const calculateAgeFromDate = (dateString) => {
//         if (!dateString) return null;

//         const birth = new Date(dateString);
//         const today = new Date();
        
//         let years = today.getFullYear() - birth.getFullYear();
//         let months = today.getMonth() - birth.getMonth();
//         let days = today.getDate() - birth.getDate();

//         if (days < 0) {
//             months--;
//             const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
//             days += prevMonth.getDate();
//         }

//         if (months < 0) {
//             years--;
//             months += 12;
//         }

//         // Calculate total days
//         const diffTime = Math.abs(today - birth);
//         const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//         // Calculate next birthday
//         const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
//         if (nextBirthday < today) {
//             nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
//         }
//         const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

//         return {
//             years,
//             months,
//             days,
//             totalDays,
//             nextBirthday: daysUntilBirthday,
//             birthDate: dateString
//         };
//     };

//     const calculateAge = () => {
//         if (!birthDate) {
//             alert(t('selectDate') || 'Please select your birth date');
//             return;
//         }

//         const calculatedAge = calculateAgeFromDate(birthDate);
//         const rashi = calculateRashi(birthDate);
        
//         setAge(calculatedAge);
//         setRashiInfo(rashi);
//     };

//     const calculateComparison = () => {
//         setComparisonError('');
//         setComparisonResult(null);

//         if (!personA || !personB) {
//             setComparisonError(t('bothDatesRequired') || 'Please select both dates for comparison');
//             return;
//         }

//         const ageA = calculateAgeFromDate(personA);
//         const ageB = calculateAgeFromDate(personB);
//         const rashiA = calculateRashi(personA);
//         const rashiB = calculateRashi(personB);

//         if (!ageA || !ageB) {
//             setComparisonError(t('invalidDates') || 'Invalid dates provided');
//             return;
//         }

//         const birthDateA = new Date(personA);
//         const birthDateB = new Date(personB);
//         const isAOlder = birthDateA < birthDateB;
//         const isSameDate = birthDateA.getTime() === birthDateB.getTime();

//         if (isSameDate) {
//             setComparisonResult({
//                 message: t('sameAge') || 'Both are the same age',
//                 personA: { ...ageA, rashi: rashiA },
//                 personB: { ...ageB, rashi: rashiB },
//                 difference: { years: 0, months: 0, days: 0, totalDays: 0 }
//             });
//             return;
//         }

//         // Calculate difference
//         let diffYears = Math.abs(ageA.years - ageB.years);
//         let diffMonths = Math.abs(ageA.months - ageB.months);
//         let diffDays = Math.abs(ageA.days - ageB.days);
//         const totalDiffDays = Math.abs(ageA.totalDays - ageB.totalDays);

//         if (diffDays < 0) {
//             diffMonths--;
//             const prevMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
//             diffDays += prevMonth.getDate();
//         }

//         if (diffMonths < 0) {
//             diffYears--;
//             diffMonths += 12;
//         }

//         setComparisonResult({
//             olderPerson: isAOlder ? 'A' : 'B',
//             olderName: isAOlder ? (t('personA') || 'Person A') : (t('personB') || 'Person B'),
//             personA: { ...ageA, rashi: rashiA },
//             personB: { ...ageB, rashi: rashiB },
//             difference: {
//                 years: diffYears,
//                 months: diffMonths,
//                 days: diffDays,
//                 totalDays: totalDiffDays
//             }
//         });
//     };

//     const clearAll = () => {
//         setBirthDate('');
//         setAge(null);
//         setRashiInfo(null);
//         setPersonA('');
//         setPersonB('');
//         setComparisonResult(null);
//         setComparisonError('');
//     };

//     const toggleComparisonMode = () => {
//         const newMode = !comparisonMode;
//         setComparisonMode(newMode);
//         if (!newMode) {
//             setPersonA('');
//             setPersonB('');
//             setComparisonResult(null);
//             setComparisonError('');
//         }
//     };

//     const getDayOfWeek = (dateString) => {
//         if (!dateString) return '';
//         return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
//     };

//     return (
//         <div className={`age-calculator ${theme}`}>
//             {/* Header Section */}
//             <header className="calculator-header">
//                 <h1 className="header-title">{t('title') || 'Age Calculator'}</h1>
//                 <p className="header-subtitle">
//                     {t('subtitle') || 'Calculate your exact age in years, months, and days'}
//                 </p>
//             </header>

//             <main className="calculator-container">
//                 {/* Mode Toggle */}
//                 <div className="mode-toggle-section">
//                     <button 
//                         onClick={toggleComparisonMode}
//                         className={`mode-toggle-btn ${comparisonMode ? 'active' : ''}`}
//                         aria-label={comparisonMode ? 'Switch to single age mode' : 'Switch to comparison mode'}
//                     >
//                         <span className="mode-icon">
//                             {comparisonMode ? '👤' : '👥'}
//                         </span>
//                         <span className="mode-text">
//                             {comparisonMode ? 
//                                 (t('singleMode') || 'Single Age') : 
//                                 (t('comparisonMode') || 'Age Comparison')
//                             }
//                         </span>
//                     </button>
//                 </div>

//                 {/* Calculator Card */}
//                 <div className="calculator-card">
//                     {!comparisonMode ? (
//                         <>
//                             <div className="input-group">
//                                 <label htmlFor="birthDate" className="input-label">
//                                     {t('birthDate') || 'Your Birth Date'}
//                                 </label>
//                                 <input
//                                     id="birthDate"
//                                     type="date"
//                                     value={birthDate}
//                                     onChange={(e) => setBirthDate(e.target.value)}
//                                     className="date-input"
//                                     max={new Date().toISOString().split('T')[0]}
//                                     aria-required="true"
//                                 />
//                             </div>
                            
//                             <div className="action-buttons">
//                                 <button 
//                                     onClick={calculateAge} 
//                                     className="btn btn-primary"
//                                     disabled={!birthDate}
//                                 >
//                                     <span className="btn-icon">🧮</span>
//                                     {t('calculateAge') || 'Calculate Age'}
//                                 </button>
//                                 <button onClick={clearAll} className="btn btn-secondary">
//                                     <span className="btn-icon">🗑️</span>
//                                     {t('clear') || 'Clear All'}
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <div className="comparison-inputs">
//                             <h3 className="comparison-title">{t('ageComparison') || 'Compare Ages'}</h3>
                            
//                             <div className="input-grid">
//                                 <div className="input-card">
//                                     <label htmlFor="personA" className="input-label">
//                                         <span className="person-label">👤</span>
//                                         {t('personA') || 'Person A'}
//                                     </label>
//                                     <input
//                                         id="personA"
//                                         type="date"
//                                         value={personA}
//                                         onChange={(e) => setPersonA(e.target.value)}
//                                         className="date-input"
//                                         max={new Date().toISOString().split('T')[0]}
//                                     />
//                                 </div>
                                
//                                 <div className="vs-divider">vs</div>
                                
//                                 <div className="input-card">
//                                     <label htmlFor="personB" className="input-label">
//                                         <span className="person-label">👤</span>
//                                         {t('personB') || 'Person B'}
//                                     </label>
//                                     <input
//                                         id="personB"
//                                         type="date"
//                                         value={personB}
//                                         onChange={(e) => setPersonB(e.target.value)}
//                                         className="date-input"
//                                         max={new Date().toISOString().split('T')[0]}
//                                     />
//                                 </div>
//                             </div>

//                             {comparisonError && (
//                                 <div className="error-message" role="alert">
//                                     <span className="error-icon">⚠️</span>
//                                     {comparisonError}
//                                 </div>
//                             )}

//                             <div className="action-buttons">
//                                 <button 
//                                     onClick={calculateComparison} 
//                                     className="btn btn-primary"
//                                     disabled={!personA || !personB}
//                                 >
//                                     <span className="btn-icon">⚖️</span>
//                                     {t('compareAges') || 'Compare Ages'}
//                                 </button>
//                                 <button onClick={clearAll} className="btn btn-secondary">
//                                     <span className="btn-icon">🗑️</span>
//                                     {t('clear') || 'Clear All'}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Results Section */}
//                 {age && !comparisonMode && (
//                     <div className="results-section">
//                         <h3 className="results-title">{t('yourAge') || 'Your Age'}</h3>
                        
//                         {/* Age Stats Cards */}
//                         <div className="stats-grid">
//                             <div className="stat-card primary-stat">
//                                 <div className="stat-value highlight">{age.years}</div>
//                                 <div className="stat-label">{t('years') || 'Years'}</div>
//                             </div>
//                             <div className="stat-card">
//                                 <div className="stat-value">{age.months}</div>
//                                 <div className="stat-label">{t('months') || 'Months'}</div>
//                             </div>
//                             <div className="stat-card">
//                                 <div className="stat-value">{age.days}</div>
//                                 <div className="stat-label">{t('days') || 'Days'}</div>
//                             </div>
//                             <div className="stat-card">
//                                 <div className="stat-value">{age.totalDays.toLocaleString()}</div>
//                                 <div className="stat-label">{t('totalDays') || 'Total Days'}</div>
//                             </div>
//                         </div>

//                         {/* Birthday Countdown */}
//                         <div className="countdown-section">
//                             <h4 className="countdown-title">{t('birthdayCountdown') || 'Birthday Countdown'}</h4>
//                             <div className="countdown-grid">
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">{age.nextBirthday}</div>
//                                     <div className="countdown-label">{t('daysLeft') || 'Days Left'}</div>
//                                 </div>
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">{Math.floor(age.nextBirthday / 7)}</div>
//                                     <div className="countdown-label">{t('weeksLeft') || 'Weeks Left'}</div>
//                                 </div>
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">{getDayOfWeek(birthDate)}</div>
//                                     <div className="countdown-label">{t('birthDay') || 'Birth Day'}</div>
//                                 </div>
//                                 <div className="countdown-item">
//                                     <div className="countdown-value">
//                                         {new Date().getFullYear() - new Date(birthDate).getFullYear() + 1}
//                                     </div>
//                                     <div className="countdown-label">{t('nextAge') || 'Next Age'}</div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Vedic Rashi Info */}
//                         {rashiInfo && (
//                             <div className="rashi-section">
//                                 <h4 className="rashi-title">
//                                     <span className="rashi-icon">☪️</span>
//                                     {t('vedicRashi') || 'Vedic Rashi (Moon Sign)'}
//                                 </h4>
//                                 <div className="rashi-card">
//                                     <div className="rashi-header">
//                                         <div className="rashi-symbol-large">{rashiInfo.symbol}</div>
//                                         <div className="rashi-name-container">
//                                             <h5 className="rashi-name">{rashiInfo.name}</h5>
//                                             <div className="rashi-english">{rashiInfo.english}</div>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="rashi-details">
//                                         <div className="rashi-element" 
//                                              style={{ '--element-color': ELEMENT_COLORS[rashiInfo.element] }}>
//                                             <span className="element-dot"></span>
//                                             <span className="element-text">{rashiInfo.element} Element</span>
//                                         </div>
//                                         <div className="rashi-description">
//                                             {rashiInfo.description}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Comparison Results */}
//                 {comparisonMode && comparisonResult && (
//                     <div className="comparison-results">
//                         <h3 className="results-title">{t('comparisonResult') || 'Comparison Result'}</h3>
                        
//                         {comparisonResult.message ? (
//                             <div className="same-age-card">
//                                 <div className="same-age-icon">🎯</div>
//                                 <div className="same-age-message">{comparisonResult.message}</div>
//                             </div>
//                         ) : (
//                             <div className="comparison-result-card">
//                                 <div className="older-indicator">
//                                     <div className="crown-icon">👑</div>
//                                     <div className="older-text">
//                                         {t('olderIs') || 'Older is'}: 
//                                         <span className="older-name"> {comparisonResult.olderName}</span>
//                                     </div>
//                                 </div>
                                
//                                 <div className="difference-section">
//                                     <h4 className="difference-title">{t('ageDifference') || 'Age Difference'}</h4>
//                                     <div className="difference-grid">
//                                         <div className="difference-card">
//                                             <div className="difference-value highlight">{comparisonResult.difference.years}</div>
//                                             <div className="difference-label">{t('years') || 'Years'}</div>
//                                         </div>
//                                         <div className="difference-card">
//                                             <div className="difference-value">{comparisonResult.difference.months}</div>
//                                             <div className="difference-label">{t('months') || 'Months'}</div>
//                                         </div>
//                                         <div className="difference-card">
//                                             <div className="difference-value">{comparisonResult.difference.days}</div>
//                                             <div className="difference-label">{t('days') || 'Days'}</div>
//                                         </div>
//                                     </div>
//                                     <div className="total-difference">
//                                         <span className="total-label">{t('totalDaysDifference') || 'Total Days Difference'}:</span>
//                                         <span className="total-value">{comparisonResult.difference.totalDays.toLocaleString()}</span>
//                                     </div>
//                                 </div>

//                                 <div className="individual-comparison">
//                                     <div className="person-result">
//                                         <div className="person-header">
//                                             <span className="person-icon">👤</span>
//                                             <h5>{t('personA') || 'Person A'}</h5>
//                                         </div>
//                                         <div className="person-age">
//                                             {comparisonResult.personA.years} {t('years') || 'Years'}
//                                         </div>
//                                         <div className="person-days">
//                                             {comparisonResult.personA.totalDays.toLocaleString()} {t('totalDays') || 'Total Days'}
//                                         </div>
//                                         {comparisonResult.personA.rashi && (
//                                             <div className="person-rashi">
//                                                 <div className="rashi-mini">
//                                                     <span className="rashi-symbol">{comparisonResult.personA.rashi.symbol}</span>
//                                                     <span className="rashi-mini-name">{comparisonResult.personA.rashi.name}</span>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
                                    
//                                     <div className="person-result">
//                                         <div className="person-header">
//                                             <span className="person-icon">👤</span>
//                                             <h5>{t('personB') || 'Person B'}</h5>
//                                         </div>
//                                         <div className="person-age">
//                                             {comparisonResult.personB.years} {t('years') || 'Years'}
//                                         </div>
//                                         <div className="person-days">
//                                             {comparisonResult.personB.totalDays.toLocaleString()} {t('totalDays') || 'Total Days'}
//                                         </div>
//                                         {comparisonResult.personB.rashi && (
//                                             <div className="person-rashi">
//                                                 <div className="rashi-mini">
//                                                     <span className="rashi-symbol">{comparisonResult.personB.rashi.symbol}</span>
//                                                     <span className="rashi-mini-name">{comparisonResult.personB.rashi.name}</span>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* Fun Facts Section */}
//                 <div className="fun-facts-section">
//                     <h3 className="facts-title">
//                         <span className="facts-icon">💡</span>
//                         {t('funFacts') || 'Fun Facts & Insights'}
//                     </h3>
//                     <div className="facts-grid">
//                         <div className="fact-card">
//                             <div className="fact-icon">📅</div>
//                             <div className="fact-text">
//                                 {age && `${Math.floor(age.totalDays / 30.44).toLocaleString()} ${t('monthsLived') || 'months lived'}`}
//                                 {comparisonResult && !comparisonResult.message && 
//                                     `${Math.floor(comparisonResult.difference.totalDays / 30.44).toLocaleString()} ${t('monthsDifference') || 'months difference'}`
//                                 }
//                             </div>
//                         </div>
//                         <div className="fact-card">
//                             <div className="fact-icon">🌙</div>
//                             <div className="fact-text">
//                                 {age && `${Math.floor(age.totalDays / 7).toLocaleString()} ${t('weekends') || 'weekends experienced'}`}
//                             </div>
//                         </div>
//                         <div className="fact-card">
//                             <div className="fact-icon">🎂</div>
//                             <div className="fact-text">
//                                 {age && `${age.nextBirthday} ${t('daysToBirthday') || 'days until next birthday'}`}
//                             </div>
//                         </div>
//                         <div className="fact-card">
//                             <div className="fact-icon">✨</div>
//                             <div className="fact-text">
//                                 {rashiInfo && `${rashiInfo.element} ${t('elementInfluence') || 'element influences your personality traits'}`}
//                                 {comparisonResult && comparisonResult.personA.rashi && 
//                                     `${t('rashiCompatibility') || 'Compare Rashi compatibility'}`
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AgeCalculator;















import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/AgeCalculator.css';

// Vedic Rashi data (unchanged)
const RASHI_DATA = {
    0: { // Aries - Mesha (March 21 - April 19)
        name: 'Mesha',
        english: 'Aries',
        element: 'Fire',
        symbol: '♈',
        description: 'Courageous, energetic, and natural leaders who love challenges.',
        startDate: { month: 3, day: 21 },
        endDate: { month: 4, day: 19 }
    },
    1: { // Taurus - Vrishabha (April 20 - May 20)
        name: 'Vrishabha',
        english: 'Taurus',
        element: 'Earth',
        symbol: '♉',
        description: 'Reliable, patient, and practical with strong determination.',
        startDate: { month: 4, day: 20 },
        endDate: { month: 5, day: 20 }
    },
    2: { // Gemini - Mithuna (May 21 - June 20)
        name: 'Mithuna',
        english: 'Gemini',
        element: 'Air',
        symbol: '♊',
        description: 'Adaptable, curious, and excellent communicators who love variety.',
        startDate: { month: 5, day: 21 },
        endDate: { month: 6, day: 20 }
    },
    3: { // Cancer - Karka (June 21 - July 22)
        name: 'Karka',
        english: 'Cancer',
        element: 'Water',
        symbol: '♋',
        description: 'Intuitive, emotional, and deeply connected to family and home.',
        startDate: { month: 6, day: 21 },
        endDate: { month: 7, day: 22 }
    },
    4: { // Leo - Simha (July 23 - Aug 22)
        name: 'Simha',
        english: 'Leo',
        element: 'Fire',
        symbol: '♌',
        description: 'Charismatic, creative, and natural-born leaders with generous hearts.',
        startDate: { month: 7, day: 23 },
        endDate: { month: 8, day: 22 }
    },
    5: { // Virgo - Kanya (Aug 23 - Sept 22)
        name: 'Kanya',
        english: 'Virgo',
        element: 'Earth',
        symbol: '♍',
        description: 'Analytical, practical, and detail-oriented with a helpful nature.',
        startDate: { month: 8, day: 23 },
        endDate: { month: 9, day: 22 }
    },
    6: { // Libra - Tula (Sept 23 - Oct 22)
        name: 'Tula',
        english: 'Libra',
        element: 'Air',
        symbol: '♎',
        description: 'Diplomatic, fair-minded, and lovers of beauty and harmony.',
        startDate: { month: 9, day: 23 },
        endDate: { month: 10, day: 22 }
    },
    7: { // Scorpio - Vrishchika (Oct 23 - Nov 21)
        name: 'Vrishchika',
        english: 'Scorpio',
        element: 'Water',
        symbol: '♏',
        description: 'Passionate, resourceful, and determined with strong intuition.',
        startDate: { month: 10, day: 23 },
        endDate: { month: 11, day: 21 }
    },
    8: { // Sagittarius - Dhanu (Nov 22 - Dec 21)
        name: 'Dhanu',
        english: 'Sagittarius',
        element: 'Fire',
        symbol: '♐',
        description: 'Optimistic, adventurous, and philosophical truth-seekers.',
        startDate: { month: 11, day: 22 },
        endDate: { month: 12, day: 21 }
    },
    9: { // Capricorn - Makara (Dec 22 - Jan 19)
        name: 'Makara',
        english: 'Capricorn',
        element: 'Earth',
        symbol: '♑',
        description: 'Disciplined, responsible, and patient with long-term vision.',
        startDate: { month: 12, day: 22 },
        endDate: { month: 1, day: 19 }
    },
    10: { // Aquarius - Kumbha (Jan 20 - Feb 18)
        name: 'Kumbha',
        english: 'Aquarius',
        element: 'Air',
        symbol: '♒',
        description: 'Innovative, independent, and humanitarian thinkers.',
        startDate: { month: 1, day: 20 },
        endDate: { month: 2, day: 18 }
    },
    11: { // Pisces - Meena (Feb 19 - March 20)
        name: 'Meena',
        english: 'Pisces',
        element: 'Water',
        symbol: '♓',
        description: 'Compassionate, artistic, and deeply intuitive dreamers.',
        startDate: { month: 2, day: 19 },
        endDate: { month: 3, day: 20 }
    }
};

const ELEMENT_COLORS = {
    Fire: '#dc2626',
    Earth: '#16a34a',
    Air: '#0284c7',
    Water: '#7c3aed'
};

const AgeCalculator = () => {
    const { t } = useTranslation('ageCalculator');
    const { theme } = useTheme();
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState(null);
    const [rashiInfo, setRashiInfo] = useState(null);
    
    const [comparisonMode, setComparisonMode] = useState(false);
    const [personA, setPersonA] = useState('');
    const [personB, setPersonB] = useState('');
    const [comparisonResult, setComparisonResult] = useState(null);
    const [comparisonError, setComparisonError] = useState('');

    // Calculate Vedic Rashi
    const calculateRashi = (dateString) => {
        if (!dateString) return null;
        
        const birthDate = new Date(dateString);
        const month = birthDate.getMonth() + 1;
        const day = birthDate.getDate();
        
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
            return RASHI_DATA[9];
        }
        
        for (const key in RASHI_DATA) {
            if (key === '9') continue;
            const rashi = RASHI_DATA[key];
            const { month: startMonth, day: startDay } = rashi.startDate;
            const { month: endMonth, day: endDay } = rashi.endDate;
            
            if (
                (month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay) ||
                (month > startMonth && month < endMonth)
            ) {
                return rashi;
            }
        }
        
        return null;
    };

    const calculateAgeFromDate = (dateString) => {
        if (!dateString) return null;

        const birth = new Date(dateString);
        const today = new Date();
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const diffTime = Math.abs(today - birth);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        return {
            years,
            months,
            days,
            totalDays,
            nextBirthday: daysUntilBirthday,
            birthDate: dateString
        };
    };

    const calculateAge = () => {
        if (!birthDate) {
            alert(t('selectDate') || 'Please select your birth date');
            return;
        }

        const calculatedAge = calculateAgeFromDate(birthDate);
        const rashi = calculateRashi(birthDate);
        
        setAge(calculatedAge);
        setRashiInfo(rashi);
    };

    const calculateComparison = () => {
        setComparisonError('');
        setComparisonResult(null);

        if (!personA || !personB) {
            setComparisonError(t('bothDatesRequired') || 'Please select both dates for comparison');
            return;
        }

        const ageA = calculateAgeFromDate(personA);
        const ageB = calculateAgeFromDate(personB);
        const rashiA = calculateRashi(personA);
        const rashiB = calculateRashi(personB);

        if (!ageA || !ageB) {
            setComparisonError(t('invalidDates') || 'Invalid dates provided');
            return;
        }

        const birthDateA = new Date(personA);
        const birthDateB = new Date(personB);
        const isAOlder = birthDateA < birthDateB;
        const isSameDate = birthDateA.getTime() === birthDateB.getTime();

        if (isSameDate) {
            setComparisonResult({
                message: t('sameAge') || 'Both are the same age',
                personA: { ...ageA, rashi: rashiA },
                personB: { ...ageB, rashi: rashiB },
                difference: { years: 0, months: 0, days: 0, totalDays: 0 }
            });
            return;
        }

        let diffYears = Math.abs(ageA.years - ageB.years);
        let diffMonths = Math.abs(ageA.months - ageB.months);
        let diffDays = Math.abs(ageA.days - ageB.days);
        const totalDiffDays = Math.abs(ageA.totalDays - ageB.totalDays);

        if (diffDays < 0) {
            diffMonths--;
            const prevMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
            diffDays += prevMonth.getDate();
        }

        if (diffMonths < 0) {
            diffYears--;
            diffMonths += 12;
        }

        setComparisonResult({
            olderPerson: isAOlder ? 'A' : 'B',
            olderName: isAOlder ? (t('personA') || 'Person A') : (t('personB') || 'Person B'),
            personA: { ...ageA, rashi: rashiA },
            personB: { ...ageB, rashi: rashiB },
            difference: {
                years: diffYears,
                months: diffMonths,
                days: diffDays,
                totalDays: totalDiffDays
            }
        });
    };

    const clearAll = () => {
        setBirthDate('');
        setAge(null);
        setRashiInfo(null);
        setPersonA('');
        setPersonB('');
        setComparisonResult(null);
        setComparisonError('');
    };

    const toggleComparisonMode = () => {
        const newMode = !comparisonMode;
        setComparisonMode(newMode);
        if (!newMode) {
            setPersonA('');
            setPersonB('');
            setComparisonResult(null);
            setComparisonError('');
        }
    };

    const getDayOfWeek = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <div className={`age-calculator ${theme}`}>
            {/* Header */}
            <header className="calculator-header">
                <h1 className="header-title">{t('title') || 'Age Calculator'}</h1>
                <p className="header-subtitle">
                    {t('subtitle') || 'Calculate your exact age in years, months, and days'}
                </p>
            </header>

            <main className="calculator-main">
                {/* Mode Toggle */}
                <div className="mode-section">
                    <div className="mode-container">
                        <button 
                            onClick={toggleComparisonMode}
                            className={`mode-toggle ${comparisonMode ? 'active' : ''}`}
                            aria-label={comparisonMode ? 'Switch to single age mode' : 'Switch to comparison mode'}
                        >
                            <span className="mode-icon">
                                {comparisonMode ? '👤' : '👥'}
                            </span>
                            <span className="mode-label">
                                {comparisonMode ? 
                                    (t('singleMode') || 'Single Age') : 
                                    (t('comparisonMode') || 'Age Comparison')
                                }
                            </span>
                        </button>
                    </div>
                </div>

                {/* Main Calculator Section */}
                <div className="calculator-section">
                    <div className="input-card">
                        {!comparisonMode ? (
                            <>
                                <div className="input-header">
                                    <h3 className="input-title">{t('ageCalculator') || 'Age Calculator'}</h3>
                                    <p className="input-description">
                                        {t('enterBirthDate') || 'Enter your birth date to calculate your age'}
                                    </p>
                                </div>
                                
                                <div className="input-group">
                                    <label htmlFor="birthDate" className="input-label">
                                        {t('birthDate') || 'Birth Date'}
                                    </label>
                                    <input
                                        id="birthDate"
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className="date-input"
                                        max={new Date().toISOString().split('T')[0]}
                                        aria-required="true"
                                    />
                                </div>
                                
                                <div className="button-group">
                                    <button 
                                        onClick={calculateAge} 
                                        className="btn btn-primary"
                                        disabled={!birthDate}
                                    >
                                        <span className="btn-icon">🧮</span>
                                        <span className="btn-text">{t('calculateAge') || 'Calculate Age'}</span>
                                    </button>
                                    <button onClick={clearAll} className="btn btn-secondary">
                                        <span className="btn-icon">🗑️</span>
                                        <span className="btn-text">{t('clear') || 'Clear All'}</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="input-header">
                                    <h3 className="input-title">{t('ageComparison') || 'Age Comparison'}</h3>
                                    <p className="input-description">
                                        {t('compareAgesDesc') || 'Compare ages between two people'}
                                    </p>
                                </div>
                                
                                <div className="comparison-inputs">
                                    <div className="person-input-group">
                                        <label htmlFor="personA" className="input-label">
                                            <span className="person-icon">👤</span>
                                            {t('personA') || 'Person A'}
                                        </label>
                                        <input
                                            id="personA"
                                            type="date"
                                            value={personA}
                                            onChange={(e) => setPersonA(e.target.value)}
                                            className="date-input"
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    
                                    <div className="vs-separator">
                                        <span className="vs-text">vs</span>
                                    </div>
                                    
                                    <div className="person-input-group">
                                        <label htmlFor="personB" className="input-label">
                                            <span className="person-icon">👤</span>
                                            {t('personB') || 'Person B'}
                                        </label>
                                        <input
                                            id="personB"
                                            type="date"
                                            value={personB}
                                            onChange={(e) => setPersonB(e.target.value)}
                                            className="date-input"
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>

                                {comparisonError && (
                                    <div className="error-message" role="alert">
                                        <span className="error-icon">⚠️</span>
                                        <span className="error-text">{comparisonError}</span>
                                    </div>
                                )}

                                <div className="button-group">
                                    <button 
                                        onClick={calculateComparison} 
                                        className="btn btn-primary"
                                        disabled={!personA || !personB}
                                    >
                                        <span className="btn-icon">⚖️</span>
                                        <span className="btn-text">{t('compareAges') || 'Compare Ages'}</span>
                                    </button>
                                    <button onClick={clearAll} className="btn btn-secondary">
                                        <span className="btn-icon">🗑️</span>
                                        <span className="btn-text">{t('clear') || 'Clear All'}</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Results Grid */}
                    {(age || comparisonResult) && (
                        <div className="results-section">
                            {/* Single Age Results */}
                            {age && !comparisonMode && (
                                <>
                                    <div className="results-header">
                                        <h3 className="results-title">{t('yourAge') || 'Your Age'}</h3>
                                        <p className="results-subtitle">
                                            {t('ageBreakdown') || 'Detailed age breakdown'}
                                        </p>
                                    </div>
                                    
                                    <div className="age-stats-grid">
                                        <div className="age-stat-card primary-stat">
                                            <div className="stat-value highlight">{age.years}</div>
                                            <div className="stat-label">{t('years') || 'Years'}</div>
                                        </div>
                                        <div className="age-stat-card">
                                            <div className="stat-value">{age.months}</div>
                                            <div className="stat-label">{t('months') || 'Months'}</div>
                                        </div>
                                        <div className="age-stat-card">
                                            <div className="stat-value">{age.days}</div>
                                            <div className="stat-label">{t('days') || 'Days'}</div>
                                        </div>
                                        <div className="age-stat-card">
                                            <div className="stat-value">{age.totalDays.toLocaleString()}</div>
                                            <div className="stat-label">{t('totalDays') || 'Total Days'}</div>
                                        </div>
                                    </div>

                                    {/* Birthday Countdown */}
                                    <div className="countdown-card">
                                        <div className="countdown-header">
                                            <h4 className="countdown-title">
                                                <span className="countdown-icon">🎂</span>
                                                {t('birthdayCountdown') || 'Birthday Countdown'}
                                            </h4>
                                            <p className="countdown-subtitle">
                                                {t('nextBirthdayInfo') || 'Days until your next birthday'}
                                            </p>
                                        </div>
                                        
                                        <div className="countdown-grid">
                                            <div className="countdown-block">
                                                <div className="countdown-value">{age.nextBirthday}</div>
                                                <div className="countdown-label">{t('days') || 'Days'}</div>
                                            </div>
                                            <div className="countdown-block">
                                                <div className="countdown-value">{Math.floor(age.nextBirthday / 7)}</div>
                                                <div className="countdown-label">{t('weeks') || 'Weeks'}</div>
                                            </div>
                                            <div className="countdown-block">
                                                <div className="countdown-value">{getDayOfWeek(birthDate)}</div>
                                                <div className="countdown-label">{t('birthDay') || 'Birth Day'}</div>
                                            </div>
                                            <div className="countdown-block">
                                                <div className="countdown-value">
                                                    {new Date().getFullYear() - new Date(birthDate).getFullYear() + 1}
                                                </div>
                                                <div className="countdown-label">{t('nextAge') || 'Next Age'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vedic Rashi */}
                                    {rashiInfo && (
                                        <div className="rashi-card">
                                            <div className="rashi-header">
                                                <h4 className="rashi-title">
                                                    <span className="rashi-icon">☪️</span>
                                                    {t('vedicRashi') || 'Vedic Rashi (Moon Sign)'}
                                                </h4>
                                                <p className="rashi-subtitle">
                                                    {t('rashiDescription') || 'Based on your birth date'}
                                                </p>
                                            </div>
                                            
                                            <div className="rashi-content">
                                                <div className="rashi-main">
                                                    <div className="rashi-symbol-display">
                                                        <span className="rashi-symbol-large">{rashiInfo.symbol}</span>
                                                    </div>
                                                    <div className="rashi-details">
                                                        <h5 className="rashi-name">{rashiInfo.name}</h5>
                                                        <div className="rashi-english">{rashiInfo.english}</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="rashi-info">
                                                    <div className="rashi-element" 
                                                         style={{ '--element-color': ELEMENT_COLORS[rashiInfo.element] }}>
                                                        <span className="element-dot"></span>
                                                        <span className="element-text">{rashiInfo.element} Element</span>
                                                    </div>
                                                    <div className="rashi-description">
                                                        {rashiInfo.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Comparison Results */}
                            {comparisonMode && comparisonResult && (
                                <div className="comparison-results">
                                    <div className="results-header">
                                        <h3 className="results-title">{t('comparisonResult') || 'Comparison Result'}</h3>
                                        <p className="results-subtitle">
                                            {t('ageDifference') || 'Detailed age difference analysis'}
                                        </p>
                                    </div>
                                    
                                    {comparisonResult.message ? (
                                        <div className="same-age-card">
                                            <div className="same-age-icon">🎯</div>
                                            <div className="same-age-message">{comparisonResult.message}</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="older-card">
                                                <div className="older-content">
                                                    <div className="crown-icon">👑</div>
                                                    <div className="older-info">
                                                        <div className="older-label">{t('olderIs') || 'Older is'}</div>
                                                        <div className="older-name">{comparisonResult.olderName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="difference-card">
                                                <div className="difference-header">
                                                    <h4 className="difference-title">{t('ageDifference') || 'Age Difference'}</h4>
                                                </div>
                                                <div className="difference-grid">
                                                    <div className="difference-block">
                                                        <div className="difference-value highlight">{comparisonResult.difference.years}</div>
                                                        <div className="difference-label">{t('years') || 'Years'}</div>
                                                    </div>
                                                    <div className="difference-block">
                                                        <div className="difference-value">{comparisonResult.difference.months}</div>
                                                        <div className="difference-label">{t('months') || 'Months'}</div>
                                                    </div>
                                                    <div className="difference-block">
                                                        <div className="difference-value">{comparisonResult.difference.days}</div>
                                                        <div className="difference-label">{t('days') || 'Days'}</div>
                                                    </div>
                                                </div>
                                                <div className="total-difference">
                                                    <span className="total-label">{t('totalDaysDifference') || 'Total Days Difference'}:</span>
                                                    <span className="total-value">{comparisonResult.difference.totalDays.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="individual-comparison">
                                                <div className="person-card">
                                                    <div className="person-header">
                                                        <span className="person-icon">👤</span>
                                                        <h5 className="person-name">{t('personA') || 'Person A'}</h5>
                                                    </div>
                                                    <div className="person-details">
                                                        <div className="person-age">{comparisonResult.personA.years} {t('years') || 'Years'}</div>
                                                        <div className="person-days">{comparisonResult.personA.totalDays.toLocaleString()} {t('totalDays') || 'Days'}</div>
                                                        {comparisonResult.personA.rashi && (
                                                            <div className="person-rashi">
                                                                <span className="rashi-symbol-small">{comparisonResult.personA.rashi.symbol}</span>
                                                                <span className="rashi-name-small">{comparisonResult.personA.rashi.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="person-card">
                                                    <div className="person-header">
                                                        <span className="person-icon">👤</span>
                                                        <h5 className="person-name">{t('personB') || 'Person B'}</h5>
                                                    </div>
                                                    <div className="person-details">
                                                        <div className="person-age">{comparisonResult.personB.years} {t('years') || 'Years'}</div>
                                                        <div className="person-days">{comparisonResult.personB.totalDays.toLocaleString()} {t('totalDays') || 'Days'}</div>
                                                        {comparisonResult.personB.rashi && (
                                                            <div className="person-rashi">
                                                                <span className="rashi-symbol-small">{comparisonResult.personB.rashi.symbol}</span>
                                                                <span className="rashi-name-small">{comparisonResult.personB.rashi.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Fun Facts Section */}
                    <div className="fun-facts-section">
                        <div className="fun-facts-card">
                            <div className="facts-header">
                                <h4 className="facts-title">
                                    <span className="facts-icon">💡</span>
                                    {t('funFacts') || 'Fun Facts & Insights'}
                                </h4>
                                <p className="facts-subtitle">
                                    {t('interestingStats') || 'Interesting statistics about age and time'}
                                </p>
                            </div>
                            
                            <div className="facts-grid">
                                <div className="fact-item">
                                    <div className="fact-icon-small">📅</div>
                                    <div className="fact-content">
                                        <div className="fact-title">{t('monthsLived') || 'Months Lived'}</div>
                                        <div className="fact-value">
                                            {age ? Math.floor(age.totalDays / 30.44).toLocaleString() : '0'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="fact-item">
                                    <div className="fact-icon-small">🌙</div>
                                    <div className="fact-content">
                                        <div className="fact-title">{t('weekendsExperienced') || 'Weekends'}</div>
                                        <div className="fact-value">
                                            {age ? Math.floor(age.totalDays / 7).toLocaleString() : '0'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="fact-item">
                                    <div className="fact-icon-small">🎂</div>
                                    <div className="fact-content">
                                        <div className="fact-title">{t('nextBirthday') || 'Next Birthday'}</div>
                                        <div className="fact-value">
                                            {age ? `${age.nextBirthday} days` : '0 days'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="fact-item">
                                    <div className="fact-icon-small">⏳</div>
                                    <div className="fact-content">
                                        <div className="fact-title">{t('hoursLived') || 'Hours Lived'}</div>
                                        <div className="fact-value">
                                            {age ? Math.floor(age.totalDays * 24).toLocaleString() : '0'}
                                        </div>
                                    </div>
                                </div>
                                
                                {rashiInfo && (
                                    <div className="fact-item">
                                        <div className="fact-icon-small">✨</div>
                                        <div className="fact-content">
                                            <div className="fact-title">{t('yourElement') || 'Your Element'}</div>
                                            <div className="fact-value">{rashiInfo.element}</div>
                                        </div>
                                    </div>
                                )}
                                
                                {comparisonResult && !comparisonResult.message && (
                                    <div className="fact-item">
                                        <div className="fact-icon-small">⚖️</div>
                                        <div className="fact-content">
                                            <div className="fact-title">{t('ageDifference') || 'Age Difference'}</div>
                                            <div className="fact-value">
                                                {comparisonResult.difference.years} {t('years') || 'years'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AgeCalculator;