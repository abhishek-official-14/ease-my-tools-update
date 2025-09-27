// // import { useState } from "react";
// // import { useTheme } from "../../contexts/ThemeContext";
// // import "../../styles/tools/unitconverter.css";
// // export default function UnitConverter() {
// //   // Temperature
// //   const [celsius, setCelsius] = useState("");
// //   const [fahrenheit, setFahrenheit] = useState("");

// //   const handleCelsiusChange = (e) => {
// //     const value = e.target.value;
// //     setCelsius(value);
// //     setFahrenheit(value === "" ? "" : ((parseFloat(value) * 9) / 5 + 32).toFixed(2));
// //   };

// //   const handleFahrenheitChange = (e) => {
// //     const value = e.target.value;
// //     setFahrenheit(value);
// //     setCelsius(value === "" ? "" : (((parseFloat(value) - 32) * 5) / 9).toFixed(2));
// //   };

// //   // Weight
// //   const [kg, setKg] = useState("");
// //   const [lb, setLb] = useState("");

// //   const handleKgChange = (e) => {
// //     const value = e.target.value;
// //     setKg(value);
// //     setLb(value === "" ? "" : (parseFloat(value) * 2.20462).toFixed(2));
// //   };

// //   const handleLbChange = (e) => {
// //     const value = e.target.value;
// //     setLb(value);
// //     setKg(value === "" ? "" : (parseFloat(value) / 2.20462).toFixed(2));
// //   };

// //   // Length
// //   const [meter, setMeter] = useState("");
// //   const [km, setKm] = useState("");

// //   const handleMeterChange = (e) => {
// //     const value = e.target.value;
// //     setMeter(value);
// //     setKm(value === "" ? "" : (parseFloat(value) / 1000).toFixed(3));
// //   };

// //   const handleKmChange = (e) => {
// //     const value = e.target.value;
// //     setKm(value);
// //     setMeter(value === "" ? "" : (parseFloat(value) * 1000).toFixed(0));
// //   };

// //   // Currency
// //   const [inr, setInr] = useState("");
// //   const [usd, setUsd] = useState("");
// //   const rate = 83; // 1 USD ≈ 83 INR

// //   const handleInrChange = (e) => {
// //     const value = e.target.value;
// //     setInr(value);
// //     setUsd(value === "" ? "" : (parseFloat(value) / rate).toFixed(2));
// //   };

// //   const handleUsdChange = (e) => {
// //     const value = e.target.value;
// //     setUsd(value);
// //     setInr(value === "" ? "" : (parseFloat(value) * rate).toFixed(2));
// //   };

// //   // Data
// //   const [mb, setMb] = useState("");
// //   const [gb, setGb] = useState("");

// //   const handleMbChange = (e) => {
// //     const value = e.target.value;
// //     setMb(value);
// //     setGb(value === "" ? "" : (parseFloat(value) / 1024).toFixed(3));
// //   };

// //   const handleGbChange = (e) => {
// //     const value = e.target.value;
// //     setGb(value);
// //     setMb(value === "" ? "" : (parseFloat(value) * 1024).toFixed(0));
// //   };

// //   return (
// //     <div className="unit-converter">
// //       <h2>Unit Converter</h2>

// //       {/* Temperature */}
// //       <div className="converter-section">
// //         <h3>🌡️ Temperature</h3>
// //         <div className="converter-row">
// //           <input type="number" value={celsius} onChange={handleCelsiusChange} placeholder="Celsius" />
// //           <span>=</span>
// //           <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} placeholder="Fahrenheit" />
// //         </div>
// //       </div>

// //       {/* Weight */}
// //       <div className="converter-section">
// //         <h3>⚖️ Weight</h3>
// //         <div className="converter-row">
// //           <input type="number" value={kg} onChange={handleKgChange} placeholder="Kilograms" />
// //           <span>=</span>
// //           <input type="number" value={lb} onChange={handleLbChange} placeholder="Pounds" />
// //         </div>
// //       </div>

// //       {/* Length */}
// //       <div className="converter-section">
// //         <h3>📏 Length</h3>
// //         <div className="converter-row">
// //           <input type="number" value={meter} onChange={handleMeterChange} placeholder="Meters" />
// //           <span>=</span>
// //           <input type="number" value={km} onChange={handleKmChange} placeholder="Kilometers" />
// //         </div>
// //       </div>

// //       {/* Currency */}
// //       <div className="converter-section">
// //         <h3>💰 Currency</h3>
// //         <div className="converter-row">
// //           <input type="number" value={inr} onChange={handleInrChange} placeholder="INR ₹" />
// //           <span>=</span>
// //           <input type="number" value={usd} onChange={handleUsdChange} placeholder="USD $" />
// //         </div>
// //       </div>

// //       {/* Data */}
// //       <div className="converter-section">
// //         <h3>💾 Data</h3>
// //         <div className="converter-row">
// //           <input type="number" value={mb} onChange={handleMbChange} placeholder="MB" />
// //           <span>=</span>
// //           <input type="number" value={gb} onChange={handleGbChange} placeholder="GB" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }







// import { useState, useEffect } from "react";
// import { useTheme } from "../../contexts/ThemeContext";
// import "../../styles/tools/unitconverter.css";

// export default function UnitConverter() {
//   const { theme } = useTheme(); // Get theme from context

//   // Temperature
//   const [celsius, setCelsius] = useState("");
//   const [fahrenheit, setFahrenheit] = useState("");

//   const handleCelsiusChange = (e) => {
//     const value = e.target.value;
//     setCelsius(value);
//     setFahrenheit(
//       value === "" ? "" : ((parseFloat(value) * 9) / 5 + 32).toFixed(2)
//     );
//   };

//   const handleFahrenheitChange = (e) => {
//     const value = e.target.value;
//     setFahrenheit(value);
//     setCelsius(
//       value === "" ? "" : (((parseFloat(value) - 32) * 5) / 9).toFixed(2)
//     );
//   };

//   // Weight
//   const [kg, setKg] = useState("");
//   const [lb, setLb] = useState("");

//   const handleKgChange = (e) => {
//     const value = e.target.value;
//     setKg(value);
//     setLb(value === "" ? "" : (parseFloat(value) * 2.20462).toFixed(2));
//   };

//   const handleLbChange = (e) => {
//     const value = e.target.value;
//     setLb(value);
//     setKg(value === "" ? "" : (parseFloat(value) / 2.20462).toFixed(2));
//   };

//   // Length
//   const [meter, setMeter] = useState("");
//   const [km, setKm] = useState("");

//   const handleMeterChange = (e) => {
//     const value = e.target.value;
//     setMeter(value);
//     setKm(value === "" ? "" : (parseFloat(value) / 1000).toFixed(3));
//   };

//   const handleKmChange = (e) => {
//     const value = e.target.value;
//     setKm(value);
//     setMeter(value === "" ? "" : (parseFloat(value) * 1000).toFixed(0));
//   };

//   // Currency
//   const [inr, setInr] = useState("");
//   const [usd, setUsd] = useState("");
//   const rate = 83; // 1 USD ≈ 83 INR

//   const handleInrChange = (e) => {
//     const value = e.target.value;
//     setInr(value);
//     setUsd(value === "" ? "" : (parseFloat(value) / rate).toFixed(2));
//   };

//   const handleUsdChange = (e) => {
//     const value = e.target.value;
//     setUsd(value);
//     setInr(value === "" ? "" : (parseFloat(value) * rate).toFixed(2));
//   };

//   // Data
//   const [mb, setMb] = useState("");
//   const [gb, setGb] = useState("");

//   const handleMbChange = (e) => {
//     const value = e.target.value;
//     setMb(value);
//     setGb(value === "" ? "" : (parseFloat(value) / 1024).toFixed(3));
//   };

//   const handleGbChange = (e) => {
//     const value = e.target.value;
//     setGb(value);
//     setMb(value === "" ? "" : (parseFloat(value) * 1024).toFixed(0));
//   };

//   // Update body class for theme
//   useEffect(() => {
//     document.body.classList.remove("light", "dark");
//     document.body.classList.add(theme);
//   }, [theme]);

//   return (
//     <div className={`unit-converter ${theme}`}>
//       <h2>Unit Converter</h2>

//       {/* Temperature */}
//       <div className="converter-section">
//         <h3>🌡️ Temperature</h3>
//         <div className="converter-row">
//           <input
//             type="number"
//             value={celsius}
//             onChange={handleCelsiusChange}
//             placeholder="Celsius"
//           />
//           <span>=</span>
//           <input
//             type="number"
//             value={fahrenheit}
//             onChange={handleFahrenheitChange}
//             placeholder="Fahrenheit"
//           />
//         </div>
//       </div>

//       {/* Weight */}
//       <div className="converter-section">
//         <h3>⚖️ Weight</h3>
//         <div className="converter-row">
//           <input
//             type="number"
//             value={kg}
//             onChange={handleKgChange}
//             placeholder="Kilograms"
//           />
//           <span>=</span>
//           <input
//             type="number"
//             value={lb}
//             onChange={handleLbChange}
//             placeholder="Pounds"
//           />
//         </div>
//       </div>

//       {/* Length */}
//       <div className="converter-section">
//         <h3>📏 Length</h3>
//         <div className="converter-row">
//           <input
//             type="number"
//             value={meter}
//             onChange={handleMeterChange}
//             placeholder="Meters"
//           />
//           <span>=</span>
//           <input
//             type="number"
//             value={km}
//             onChange={handleKmChange}
//             placeholder="Kilometers"
//           />
//         </div>
//       </div>

//       {/* Currency */}
//       <div className="converter-section">
//         <h3>💰 Currency</h3>
//         <div className="converter-row">
//           <input
//             type="number"
//             value={inr}
//             onChange={handleInrChange}
//             placeholder="INR ₹"
//           />
//           <span>=</span>
//           <input
//             type="number"
//             value={usd}
//             onChange={handleUsdChange}
//             placeholder="USD $"
//           />
//         </div>
//       </div>

//       {/* Data */}
//       <div className="converter-section">
//         <h3>💾 Data</h3>
//         <div className="converter-row">
//           <input
//             type="number"
//             value={mb}
//             onChange={handleMbChange}
//             placeholder="MB"
//           />
//           <span>=</span>
//           <input
//             type="number"
//             value={gb}
//             onChange={handleGbChange}
//             placeholder="GB"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/unitconverter.css';




const UnitConverter = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [category, setCategory] = useState('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('kilometer');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [isConverting, setIsConverting] = useState(false);

    // Unit conversion formulas
    const conversionFormulas = {
        length: {
            meter: 1,
            kilometer: 0.001,
            centimeter: 100,
            millimeter: 1000,
            mile: 0.000621371,
            yard: 1.09361,
            foot: 3.28084,
            inch: 39.3701
        },
        weight: {
            kilogram: 1,
            gram: 1000,
            milligram: 1000000,
            pound: 2.20462,
            ounce: 35.274
        },
        temperature: {
            celsius: (val, toUnit) => {
                if (toUnit === 'fahrenheit') return (val * 9/5) + 32;
                if (toUnit === 'kelvin') return val + 273.15;
                return val;
            },
            fahrenheit: (val, toUnit) => {
                if (toUnit === 'celsius') return (val - 32) * 5/9;
                if (toUnit === 'kelvin') return (val - 32) * 5/9 + 273.15;
                return val;
            },
            kelvin: (val, toUnit) => {
                if (toUnit === 'celsius') return val - 273.15;
                if (toUnit === 'fahrenheit') return (val - 273.15) * 9/5 + 32;
                return val;
            }
        },
        area: {
            squareMeter: 1,
            squareKilometer: 0.000001,
            squareMile: 3.861e-7,
            squareYard: 1.19599,
            squareFoot: 10.7639,
            acre: 0.000247105,
            hectare: 0.0001
        },
        volume: {
            liter: 1,
            milliliter: 1000,
            gallon: 0.264172,
            quart: 1.05669,
            pint: 2.11338,
            cubicMeter: 0.001,
            cubicFoot: 0.0353147
        },
        speed: {
            meterPerSecond: 1,
            kilometerPerHour: 3.6,
            milePerHour: 2.23694,
            knot: 1.94384
        }
    };

    // Get categories for the current language
    const getCategories = () => {
        const categories = {};
        const categoryKeys = ['length', 'weight', 'temperature', 'area', 'volume', 'speed'];
        
        categoryKeys.forEach(key => {
            categories[key] = t('unitConverter', `categories.${key}`) || 
                            (key.charAt(0).toUpperCase() + key.slice(1));
        });
        
        return categories;
    };

    // Get units for the current category and language
    const getUnits = () => {
        const unitKeys = Object.keys(conversionFormulas[category] || {});
        return unitKeys.map(key => ({
            value: key,
            label: t('unitConverter', `units.${category}.${key}`) || 
                  (key.charAt(0).toUpperCase() + key.slice(1))
        }));
    };

    // Get label for a specific unit
    const getUnitLabel = (unitKey) => {
        return t('unitConverter', `units.${category}.${unitKey}`) || unitKey;
    };

    const convertUnits = () => {
        if (!inputValue || isNaN(parseFloat(inputValue))) {
            setResult('');
            return;
        }

        setIsConverting(true);
        const value = parseFloat(inputValue);

        try {
            // Special handling for temperature
            if (category === 'temperature') {
                const convertedValue = conversionFormulas.temperature[fromUnit](value, toUnit);
                setResult(convertedValue.toFixed(6));
            } else {
                // Standard conversion for other categories
                const fromFactor = conversionFormulas[category][fromUnit];
                const toFactor = conversionFormulas[category][toUnit];
                
                if (fromFactor && toFactor) {
                    const baseValue = value / fromFactor;
                    const convertedValue = baseValue * toFactor;
                    setResult(convertedValue.toFixed(6));
                } else {
                    setResult('Error');
                }
            }
        } catch (error) {
            console.error('Conversion error:', error);
            setResult('Error');
        }

        setIsConverting(false);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        const units = Object.keys(conversionFormulas[newCategory] || {});
        setFromUnit(units[0] || '');
        setToUnit(units[1] || units[0] || '');
        setInputValue('');
        setResult('');
    };

    useEffect(() => {
        if (inputValue && inputValue.trim() !== '') {
            const timeoutId = setTimeout(convertUnits, 500);
            return () => clearTimeout(timeoutId);
        } else {
            setResult('');
        }
    }, [inputValue, fromUnit, toUnit, category]);

    const categories = getCategories();
    const units = getUnits();

    return (
        <div className={`unit-converter ${theme}`}>
            <div className="converter-header">
                <h1>{t('unitConverter', 'title') || 'Unit Converter'}</h1>
                <p>{t('unitConverter', 'subtitle') || 'Convert between different units instantly'}</p>
            </div>

            <div className="converter-container">
                {/* Category Selection */}
                <div className="category-selector">
                    {Object.entries(categories).map(([key, label]) => (
                        <button
                            key={key}
                            className={`category-btn ${category === key ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Conversion Interface */}
                <div className="conversion-interface">
                    <div className="input-section">
                        <label>{t('unitConverter', 'from') || 'From'}</label>
                        <div className="input-group">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t('unitConverter', 'enterValue') || 'Enter value'}
                                className="value-input"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="unit-select"
                                disabled={!units.length}
                            >
                                {units.map(unit => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button 
                        className="swap-btn" 
                        onClick={swapUnits} 
                        title={t('unitConverter', 'swap') || 'Swap'}
                        disabled={!units.length}
                    >
                        ⇄
                    </button>

                    <div className="output-section">
                        <label>{t('unitConverter', 'to') || 'To'}</label>
                        <div className="input-group">
                            <input
                                type="text"
                                value={result || ''}
                                readOnly
                                className="result-input"
                                placeholder={t('unitConverter', 'result') || 'Result'}
                            />
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="unit-select"
                                disabled={!units.length}
                            >
                                {units.map(unit => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Result Display */}
                {result && result !== 'Error' && (
                    <div className="result-display">
                        <h3>{t('unitConverter', 'result') || 'Result'}:</h3>
                        <p>
                            {inputValue} {getUnitLabel(fromUnit)} = 
                            <strong> {result} {getUnitLabel(toUnit)}</strong>
                        </p>
                    </div>
                )}

                {result === 'Error' && (
                    <div className="error-display">
                        <p>⚠️ {t('unitConverter', 'convert') || 'Conversion error. Please check your input.'}</p>
                    </div>
                )}

                {isConverting && (
                    <div className="loading-display">
                        <p>⏳ {t('unitConverter', 'converting') || 'Converting...'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UnitConverter;