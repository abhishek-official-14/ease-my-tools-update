// import { useState } from "react";
// import { useTheme } from "../../contexts/ThemeContext";
// import "../../styles/tools/unitconverter.css";
// export default function UnitConverter() {
//   // Temperature
//   const [celsius, setCelsius] = useState("");
//   const [fahrenheit, setFahrenheit] = useState("");

//   const handleCelsiusChange = (e) => {
//     const value = e.target.value;
//     setCelsius(value);
//     setFahrenheit(value === "" ? "" : ((parseFloat(value) * 9) / 5 + 32).toFixed(2));
//   };

//   const handleFahrenheitChange = (e) => {
//     const value = e.target.value;
//     setFahrenheit(value);
//     setCelsius(value === "" ? "" : (((parseFloat(value) - 32) * 5) / 9).toFixed(2));
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

//   return (
//     <div className="unit-converter">
//       <h2>Unit Converter</h2>

//       {/* Temperature */}
//       <div className="converter-section">
//         <h3>🌡️ Temperature</h3>
//         <div className="converter-row">
//           <input type="number" value={celsius} onChange={handleCelsiusChange} placeholder="Celsius" />
//           <span>=</span>
//           <input type="number" value={fahrenheit} onChange={handleFahrenheitChange} placeholder="Fahrenheit" />
//         </div>
//       </div>

//       {/* Weight */}
//       <div className="converter-section">
//         <h3>⚖️ Weight</h3>
//         <div className="converter-row">
//           <input type="number" value={kg} onChange={handleKgChange} placeholder="Kilograms" />
//           <span>=</span>
//           <input type="number" value={lb} onChange={handleLbChange} placeholder="Pounds" />
//         </div>
//       </div>

//       {/* Length */}
//       <div className="converter-section">
//         <h3>📏 Length</h3>
//         <div className="converter-row">
//           <input type="number" value={meter} onChange={handleMeterChange} placeholder="Meters" />
//           <span>=</span>
//           <input type="number" value={km} onChange={handleKmChange} placeholder="Kilometers" />
//         </div>
//       </div>

//       {/* Currency */}
//       <div className="converter-section">
//         <h3>💰 Currency</h3>
//         <div className="converter-row">
//           <input type="number" value={inr} onChange={handleInrChange} placeholder="INR ₹" />
//           <span>=</span>
//           <input type="number" value={usd} onChange={handleUsdChange} placeholder="USD $" />
//         </div>
//       </div>

//       {/* Data */}
//       <div className="converter-section">
//         <h3>💾 Data</h3>
//         <div className="converter-row">
//           <input type="number" value={mb} onChange={handleMbChange} placeholder="MB" />
//           <span>=</span>
//           <input type="number" value={gb} onChange={handleGbChange} placeholder="GB" />
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "../../styles/tools/unitconverter.css";

export default function UnitConverter() {
  const { theme } = useTheme(); // Get theme from context

  // Temperature
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    setFahrenheit(
      value === "" ? "" : ((parseFloat(value) * 9) / 5 + 32).toFixed(2)
    );
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    setCelsius(
      value === "" ? "" : (((parseFloat(value) - 32) * 5) / 9).toFixed(2)
    );
  };

  // Weight
  const [kg, setKg] = useState("");
  const [lb, setLb] = useState("");

  const handleKgChange = (e) => {
    const value = e.target.value;
    setKg(value);
    setLb(value === "" ? "" : (parseFloat(value) * 2.20462).toFixed(2));
  };

  const handleLbChange = (e) => {
    const value = e.target.value;
    setLb(value);
    setKg(value === "" ? "" : (parseFloat(value) / 2.20462).toFixed(2));
  };

  // Length
  const [meter, setMeter] = useState("");
  const [km, setKm] = useState("");

  const handleMeterChange = (e) => {
    const value = e.target.value;
    setMeter(value);
    setKm(value === "" ? "" : (parseFloat(value) / 1000).toFixed(3));
  };

  const handleKmChange = (e) => {
    const value = e.target.value;
    setKm(value);
    setMeter(value === "" ? "" : (parseFloat(value) * 1000).toFixed(0));
  };

  // Currency
  const [inr, setInr] = useState("");
  const [usd, setUsd] = useState("");
  const rate = 83; // 1 USD ≈ 83 INR

  const handleInrChange = (e) => {
    const value = e.target.value;
    setInr(value);
    setUsd(value === "" ? "" : (parseFloat(value) / rate).toFixed(2));
  };

  const handleUsdChange = (e) => {
    const value = e.target.value;
    setUsd(value);
    setInr(value === "" ? "" : (parseFloat(value) * rate).toFixed(2));
  };

  // Data
  const [mb, setMb] = useState("");
  const [gb, setGb] = useState("");

  const handleMbChange = (e) => {
    const value = e.target.value;
    setMb(value);
    setGb(value === "" ? "" : (parseFloat(value) / 1024).toFixed(3));
  };

  const handleGbChange = (e) => {
    const value = e.target.value;
    setGb(value);
    setMb(value === "" ? "" : (parseFloat(value) * 1024).toFixed(0));
  };

  // Update body class for theme
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className={`unit-converter ${theme}`}>
      <h2>Unit Converter</h2>

      {/* Temperature */}
      <div className="converter-section">
        <h3>🌡️ Temperature</h3>
        <div className="converter-row">
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            placeholder="Celsius"
          />
          <span>=</span>
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            placeholder="Fahrenheit"
          />
        </div>
      </div>

      {/* Weight */}
      <div className="converter-section">
        <h3>⚖️ Weight</h3>
        <div className="converter-row">
          <input
            type="number"
            value={kg}
            onChange={handleKgChange}
            placeholder="Kilograms"
          />
          <span>=</span>
          <input
            type="number"
            value={lb}
            onChange={handleLbChange}
            placeholder="Pounds"
          />
        </div>
      </div>

      {/* Length */}
      <div className="converter-section">
        <h3>📏 Length</h3>
        <div className="converter-row">
          <input
            type="number"
            value={meter}
            onChange={handleMeterChange}
            placeholder="Meters"
          />
          <span>=</span>
          <input
            type="number"
            value={km}
            onChange={handleKmChange}
            placeholder="Kilometers"
          />
        </div>
      </div>

      {/* Currency */}
      <div className="converter-section">
        <h3>💰 Currency</h3>
        <div className="converter-row">
          <input
            type="number"
            value={inr}
            onChange={handleInrChange}
            placeholder="INR ₹"
          />
          <span>=</span>
          <input
            type="number"
            value={usd}
            onChange={handleUsdChange}
            placeholder="USD $"
          />
        </div>
      </div>

      {/* Data */}
      <div className="converter-section">
        <h3>💾 Data</h3>
        <div className="converter-row">
          <input
            type="number"
            value={mb}
            onChange={handleMbChange}
            placeholder="MB"
          />
          <span>=</span>
          <input
            type="number"
            value={gb}
            onChange={handleGbChange}
            placeholder="GB"
          />
        </div>
      </div>
    </div>
  );
}
