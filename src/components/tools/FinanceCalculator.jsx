import React, { useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/FinanceCalculator.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const FinanceCalculator = () => {
  const [mode, setMode] = useState("fd");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [gstType, setGstType] = useState("add");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  const modeLabels = {
    fd: "Fixed Deposit",
    emi: "EMI Calculator",
    gst: "GST Calculator",
    sip: "SIP Calculator",
    rd: "Recurring Deposit",
    tax: "Income Tax"
  };

  const calculate = () => {
    const P = parseFloat(amount) || 0;
    const R = parseFloat(rate) || 0;
    const T = parseInt(time) || 0;
    
    let res = {};
    let data = [];

    // FD Calculation
    if (mode === "fd") {
      const total = P * Math.pow(1 + R / 100, T);
      const interest = total - P;
      
      for (let i = 1; i <= T; i++) {
        const yearValue = P * Math.pow(1 + R / 100, i);
        data.push({ 
          year: `Year ${i}`, 
          value: Math.round(yearValue),
          principal: P
        });
      }
      
      res["Maturity Value"] = total.toFixed(2);
      res["Total Interest"] = interest.toFixed(2);
      res["Principal Amount"] = P.toFixed(2);
    }

    // EMI Calculation
    if (mode === "emi") {
      const monthlyRate = R / 12 / 100;
      const months = T * 12;
      
      const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                  (Math.pow(1 + monthlyRate, months) - 1);
      
      const totalPayable = emi * months;
      const totalInterest = totalPayable - P;
      
      let balance = P;
      for (let i = 1; i <= T; i++) {
        for (let m = 1; m <= 12; m++) {
          const interestPaid = balance * monthlyRate;
          const principalPaid = emi - interestPaid;
          balance -= principalPaid;
        }
        data.push({ 
          year: `Year ${i}`, 
          value: Math.max(0, balance.toFixed(0))
        });
      }
      
      res["Monthly EMI"] = emi.toFixed(2);
      res["Total Payment"] = totalPayable.toFixed(2);
      res["Total Interest"] = totalInterest.toFixed(2);
      res["Principal"] = P.toFixed(2);
    }

    // GST Calculation
    if (mode === "gst") {
      if (gstType === "add") {
        const gstAmount = P * R / 100;
        const total = P + gstAmount;
        
        res["Original Amount"] = P.toFixed(2);
        res["GST Amount"] = gstAmount.toFixed(2);
        res["Total (with GST)"] = total.toFixed(2);
        res["GST Rate"] = `${R}%`;
      } else {
        const baseAmount = P / (1 + R / 100);
        const gstAmount = P - baseAmount;
        
        res["Total Amount"] = P.toFixed(2);
        res["Base Amount"] = baseAmount.toFixed(2);
        res["GST Amount"] = gstAmount.toFixed(2);
        res["GST Rate"] = `${R}%`;
      }
    }

    // SIP Calculation
    if (mode === "sip") {
      const monthlyRate = R / 12 / 100;
      const months = T * 12;
      
      const futureValue = P * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
        (1 + monthlyRate);
      
      const totalInvested = P * months;
      const wealthGained = futureValue - totalInvested;
      
      for (let i = 1; i <= T; i++) {
        const monthsCount = i * 12;
        const yearValue = P * 
          ((Math.pow(1 + monthlyRate, monthsCount) - 1) / monthlyRate) * 
          (1 + monthlyRate);
        data.push({ 
          year: `Year ${i}`, 
          value: Math.round(yearValue),
          invested: P * monthsCount
        });
      }
      
      res["Future Value"] = futureValue.toFixed(2);
      res["Total Invested"] = totalInvested.toFixed(2);
      res["Wealth Gained"] = wealthGained.toFixed(2);
      res["Monthly SIP"] = P.toFixed(2);
    }

    // RD Calculation
    if (mode === "rd") {
      const quarterlyRate = R / 4 / 100;
      const months = T * 12;
      
      const maturityValue = P * months + 
        P * (months * (months + 1) / 2) * quarterlyRate;
      
      const totalInvested = P * months;
      const interestEarned = maturityValue - totalInvested;
      
      for (let i = 1; i <= T; i++) {
        const monthsCount = i * 12;
        const yearValue = P * monthsCount + 
          P * (monthsCount * (monthsCount + 1) / 2) * quarterlyRate;
        data.push({ 
          year: `Year ${i}`, 
          value: Math.round(yearValue)
        });
      }
      
      res["Maturity Value"] = maturityValue.toFixed(2);
      res["Total Invested"] = totalInvested.toFixed(2);
      res["Interest Earned"] = interestEarned.toFixed(2);
      res["Monthly Deposit"] = P.toFixed(2);
    }

    // Tax Calculation
    if (mode === "tax") {
      let income = P;
      let tax = 0;
      
      // New tax regime (FY 2024-25)
      if (income <= 300000) tax = 0;
      else if (income <= 600000) tax = (income - 300000) * 0.05;
      else if (income <= 900000) tax = 15000 + (income - 600000) * 0.10;
      else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
      else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.20;
      else tax = 150000 + (income - 1500000) * 0.30;
      
      // Apply rebate under section 87A
      if (income <= 700000) {
        tax = Math.max(0, tax - 25000);
      }
      
      res["Annual Income"] = income.toFixed(2);
      res["Tax Liability"] = tax.toFixed(2);
      res["Net Income"] = (income - tax).toFixed(2);
      res["Effective Tax Rate"] = `${((tax / income) * 100).toFixed(2)}%`;
    }

    setChartData(data);
    setResult(res);
  };

  const clearAll = () => {
    setAmount("");
    setRate("");
    setTime("");
    setResult(null);
    setChartData([]);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="finance-calculator">
      <div className="calculator-header">
        <h2>💰 Financial Calculator</h2>
        <p className="subtitle">Calculate your investments, loans, taxes and more</p>
      </div>

      <div className="calculator-container">
        <div className="calculator-controls">
          <div className="mode-tabs">
            {Object.entries(modeLabels).map(([key, label]) => (
              <button
                key={key}
                className={`mode-tab ${mode === key ? "active" : ""}`}
                onClick={() => {
                  setMode(key);
                  setResult(null);
                  setChartData([]);
                }}
              >
                <span className="tab-icon">
                  {key === "fd" && "🏦"}
                  {key === "emi" && "🏠"}
                  {key === "gst" && "🧾"}
                  {key === "sip" && "📈"}
                  {key === "rd" && "💰"}
                  {key === "tax" && "💸"}
                </span>
                {label}
              </button>
            ))}
          </div>

          <div className="input-group">
            <label htmlFor="amount">
              {mode === "tax" ? "Annual Income" : 
               mode === "sip" || mode === "rd" ? "Monthly Amount" : 
               "Amount"}
            </label>
            <div className="input-with-symbol">
              <span className="currency-symbol">₹</span>
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {mode !== "tax" && (
            <div className="input-group">
              <label htmlFor="rate">Interest Rate (%)</label>
              <div className="input-with-symbol">
                <span className="percent-symbol">%</span>
                <input
                  id="rate"
                  type="number"
                  placeholder="Enter rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {(mode !== "gst" && mode !== "tax") && (
            <div className="input-group">
              <label htmlFor="time">Time Period</label>
              <div className="input-with-symbol">
                <input
                  id="time"
                  type="number"
                  placeholder="Enter years"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  min="1"
                  max="50"
                />
                <span className="time-symbol">Years</span>
              </div>
            </div>
          )}

          {mode === "gst" && (
            <div className="input-group">
              <label htmlFor="gstType">GST Type</label>
              <select
                id="gstType"
                className="gst-select"
                value={gstType}
                onChange={(e) => setGstType(e.target.value)}
              >
                <option value="add">Add GST to Price</option>
                <option value="remove">Remove GST from Price</option>
              </select>
            </div>
          )}

          <div className="button-group">
            <button className="calculate-btn" onClick={calculate}>
              Calculate
            </button>
            <button className="clear-btn" onClick={clearAll}>
              Clear All
            </button>
          </div>
        </div>

        <div className="calculator-results">
          {result && (
            <div className="result-card">
              <h3>Calculation Results</h3>
              <div className="result-items">
                {Object.entries(result).map(([key, value]) => (
                  <div key={key} className="result-item">
                    <span className="result-label">{key}:</span>
                    <span className="result-value">
                      {key.includes("Rate") || key.includes("%") 
                        ? value 
                        : `₹${formatCurrency(value)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {chartData.length > 0 && mode !== "gst" && mode !== "tax" && (
            <div className="chart-container">
              <h4>Growth Over Time</h4>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickFormatter={(value) => `₹${formatCurrency(value)}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${formatCurrency(value)}`, "Value"]}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{ 
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceCalculator;