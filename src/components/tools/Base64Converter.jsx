//@ts-nocheck
import React, { useState, useRef } from "react";
import "../../styles/tools/Base64Converter.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const Base64Converter = () => {
    console.log("Base64Converter was rendered");
    
    const { theme } = useTheme();
    const { t } = useTranslation("base64");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState("encode");
    const fileInputRef = useRef(null);

    const handleEncode = () => {
        if (mode === "encode") {
            setOutput(btoa(unescape(encodeURIComponent(input))));
        } else {
            try {
                setOutput(decodeURIComponent(escape(atob(input))));
            } catch (error) {
                setOutput("❌ Invalid Base64 string");
            }
        }
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (mode === "encode") {
                const base64 = e.target.result.split(',')[1];
                setOutput(base64);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file);
    };

    const downloadFile = () => {
        if (!output) return;

        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = mode === "encode" ? "encoded.txt" : "decoded.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
    };

    return (
        <div className={`base64-container ${theme}`}>
            <h2 className="title">{t("title")}</h2>

            <div className="mode-selector">
                <button
                    className={mode === "encode" ? "active" : ""}
                    onClick={() => setMode("encode")}
                >
                    {t("encode")}
                </button>
                <button
                    className={mode === "decode" ? "active" : ""}
                    onClick={() => setMode("decode")}
                >
                    {t("decode")}
                </button>
            </div>

            <div className="input-section">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("inputPlaceholder")}
                    className="text-area"
                    rows={6}
                />
            </div>

            <div
                className="file-drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <p>{t("dragDrop")}</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    hidden
                />
            </div>

            <button className="action-btn convert-btn" onClick={handleEncode}>
                {mode === "encode" ? t("encode") : t("decode")}
            </button>

            {output && (
                <div className="output-section">
                    <textarea
                        value={output}
                        readOnly
                        placeholder={t("outputPlaceholder")}
                        className="text-area output"
                        rows={6}
                    />
                    <div className="output-actions">
                        <button className="action-btn" onClick={copyToClipboard}>
                            {t("copy")}
                        </button>
                        <button className="action-btn" onClick={downloadFile}>
                            {t("downloadText")}
                        </button>
                        <button className="action-btn clear-btn" onClick={clearAll}>
                            {t("clear")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Base64Converter;