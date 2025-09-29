import React, { useEffect, useState } from "react";
import "../../styles/tools/CurrencyConverter.css";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch currency symbols once
    useEffect(() => {
        fetch("https://api.exchangerate.host/symbols")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.symbols) {
                    setCurrencies(Object.keys(data.symbols));
                }
            })
            .catch((err) => console.error("Error fetching symbols:", err));
    }, [amount]);

    // Convert when user clicks button
    const convert = () => {
        if (!amount || amount <= 0) return;
        setLoading(true);
        fetch(
            `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
        )
            .then((res) => res.json())
            .then((data) => {
                setResult(data.result);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Conversion error:", err);
                setLoading(false);
            });
    };

    return (
        <div className="currency-container">
            <h2>Currency Exchange Rate Tool</h2>

            <div className="currency-inputs">
                <input
                    type="number"
                    min="0"
                    value={amount}
                    // @ts-ignore
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {currencies.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>

                <span className="arrow">→</span>

                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {currencies.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>

                <button onClick={convert}>Convert</button>
            </div>

            {loading && <p className="status">Converting...</p>}

            {result !== null && !loading && (
                <p className="result">
                    {amount} {fromCurrency} ={" "}
                    <strong>
                        {result.toFixed(2)} {toCurrency}
                    </strong>
                </p>
            )}
        </div>
    );
};

export default CurrencyConverter;
