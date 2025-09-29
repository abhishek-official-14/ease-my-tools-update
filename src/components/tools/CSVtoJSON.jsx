import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/CSVtoJSON.css';

const CSVtoJSON = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [csvInput, setCsvInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [delimiter, setDelimiter] = useState(',');
    const [hasHeaders, setHasHeaders] = useState(true);

    const convertCSVtoJSON = () => {
        if (!csvInput.trim()) {
            alert(t('csvToJson', 'enterCSV') || 'Please enter CSV data');
            return;
        }

        try {
            const lines = csvInput.trim().split('\n');
            const result = [];
            
            let headers = [];
            if (hasHeaders) {
                headers = lines[0].split(delimiter).map(header => header.trim());
            } else {
                // Generate headers like col1, col2, col3...
                headers = lines[0].split(delimiter).map((_, index) => `col${index + 1}`);
            }

            const startLine = hasHeaders ? 1 : 0;
            
            for (let i = startLine; i < lines.length; i++) {
                const currentLine = lines[i].trim();
                if (!currentLine) continue;

                const values = currentLine.split(delimiter);
                const obj = {};
                
                headers.forEach((header, index) => {
                    let value = values[index] ? values[index].trim() : '';
                    
                    // Try to parse numbers and booleans
                    if (!isNaN(value) && value !== '') {
                        value = Number(value);
                    } else if (value.toLowerCase() === 'true') {
                        value = true;
                    } else if (value.toLowerCase() === 'false') {
                        value = false;
                    } else if (value === 'null') {
                        value = null;
                    }
                    
                    obj[header] = value;
                });
                
                result.push(obj);
            }

            setJsonOutput(JSON.stringify(result, null, 2));
        } catch (error) {
            alert(t('csvToJson', 'conversionError') || 'Error converting CSV to JSON: ' + error.message);
        }
    };

    const convertJSONtoCSV = () => {
        if (!jsonOutput.trim()) {
            alert(t('csvToJson', 'enterJSON') || 'Please enter JSON data');
            return;
        }

        try {
            const data = JSON.parse(jsonOutput);
            if (!Array.isArray(data)) {
                alert(t('csvToJson', 'arrayRequired') || 'JSON must be an array of objects');
                return;
            }

            if (data.length === 0) {
                setCsvInput('');
                return;
            }

            const headers = Object.keys(data[0]);
            let csv = '';

            if (hasHeaders) {
                csv += headers.join(delimiter) + '\n';
            }

            data.forEach(row => {
                const values = headers.map(header => {
                    let value = row[header];
                    if (value === null || value === undefined) {
                        value = '';
                    } else if (typeof value === 'object') {
                        value = JSON.stringify(value);
                    } else {
                        value = String(value);
                    }
                    
                    // Handle values containing delimiter or newlines
                    if (value.includes(delimiter) || value.includes('\n') || value.includes('"')) {
                        value = `"${value.replace(/"/g, '""')}"`;
                    }
                    
                    return value;
                });
                
                csv += values.join(delimiter) + '\n';
            });

            setCsvInput(csv.trim());
        } catch (error) {
            alert(t('csvToJson', 'invalidJSON') || 'Invalid JSON: ' + error.message);
        }
    };

    const clearAll = () => {
        setCsvInput('');
        setJsonOutput('');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(t('csvToJson', 'copied') || 'Copied to clipboard!');
    };

    const downloadFile = (content, filename, contentType) => {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const downloadCSV = () => {
        if (!csvInput) return;
        downloadFile(csvInput, 'data.csv', 'text/csv');
    };

    const downloadJSON = () => {
        if (!jsonOutput) return;
        downloadFile(jsonOutput, 'data.json', 'application/json');
    };

    return (
        <div className={`csv-json-converter ${theme}`}>
            <div className="converter-header">
                <h1>{t('csvToJson', 'title') || 'CSV to JSON Converter'}</h1>
                <p>{t('csvToJson', 'subtitle') || 'Convert between CSV and JSON formats'}</p>
            </div>

            <div className="converter-container">
                <div className="settings-panel">
                    <div className="setting">
                        <label>{t('csvToJson', 'delimiter') || 'Delimiter'}</label>
                        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
                            <option value=",">, {t('csvToJson', 'comma') || 'Comma'}</option>
                            <option value=";">; {t('csvToJson', 'semicolon') || 'Semicolon'}</option>
                            <option value="\t">\t {t('csvToJson', 'tab') || 'Tab'}</option>
                            <option value="|">| {t('csvToJson', 'pipe') || 'Pipe'}</option>
                        </select>
                    </div>
                    <div className="setting">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasHeaders}
                                onChange={(e) => setHasHeaders(e.target.checked)}
                            />
                            {t('csvToJson', 'firstRowHeaders') || 'First row contains headers'}
                        </label>
                    </div>
                </div>

                <div className="input-output-section">
                    <div className="input-section">
                        <label>{t('csvToJson', 'csvInput') || 'CSV Input'}</label>
                        <textarea
                            value={csvInput}
                            onChange={(e) => setCsvInput(e.target.value)}
                            placeholder={t('csvToJson', 'csvPlaceholder') || 'Paste your CSV data here...'}
                            className="text-input"
                            rows="8"
                        />
                        <div className="input-actions">
                            <button onClick={downloadCSV} className="download-btn" disabled={!csvInput}>
                                {t('csvToJson', 'downloadCSV') || 'Download CSV'}
                            </button>
                            <button onClick={() => copyToClipboard(csvInput)} className="copy-btn" disabled={!csvInput}>
                                {t('csvToJson', 'copyCSV') || 'Copy CSV'}
                            </button>
                        </div>
                    </div>

                    <div className="conversion-buttons">
                        <button onClick={convertCSVtoJSON} className="convert-btn">
                            {t('csvToJson', 'csvToJson') || 'CSV → JSON'}
                        </button>
                        <button onClick={convertJSONtoCSV} className="convert-btn">
                            {t('csvToJson', 'jsonToCsv') || 'JSON → CSV'}
                        </button>
                    </div>

                    <div className="output-section">
                        <label>{t('csvToJson', 'jsonOutput') || 'JSON Output'}</label>
                        <textarea
                            value={jsonOutput}
                            onChange={(e) => setJsonOutput(e.target.value)}
                            placeholder={t('csvToJson', 'jsonPlaceholder') || 'JSON output will appear here...'}
                            className="text-output"
                            rows="8"
                        />
                        <div className="output-actions">
                            <button onClick={downloadJSON} className="download-btn" disabled={!jsonOutput}>
                                {t('csvToJson', 'downloadJSON') || 'Download JSON'}
                            </button>
                            <button onClick={() => copyToClipboard(jsonOutput)} className="copy-btn" disabled={!jsonOutput}>
                                {t('csvToJson', 'copyJSON') || 'Copy JSON'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={clearAll} className="clear-btn">
                        {t('csvToJson', 'clearAll') || 'Clear All'}
                    </button>
                </div>

                <div className="info-section">
                    <h4>{t('csvToJson', 'about') || 'About CSV and JSON'}</h4>
                    <p><strong>CSV</strong> {t('csvToJson', 'csvInfo') || '(Comma-Separated Values) is a simple file format used to store tabular data.'}</p>
                    <p><strong>JSON</strong> {t('csvToJson', 'jsonInfo') || '(JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write.'}</p>
                    
                    <h5>{t('csvToJson', 'commonUses') || 'Common Uses:'}</h5>
                    <ul>
                        <li>{t('csvToJson', 'use1') || 'Data migration between systems'}</li>
                        <li>{t('csvToJson', 'use2') || 'Exporting data from databases'}</li>
                        <li>{t('csvToJson', 'use3') || 'API data formatting'}</li>
                        <li>{t('csvToJson', 'use4') || 'Spreadsheet data processing'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CSVtoJSON;