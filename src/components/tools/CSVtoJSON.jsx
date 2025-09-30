import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/CSVtoJSON.css';

const CSVtoJSON = () => {
    const { t } = useTranslation('csvToJson');
    const { theme } = useTheme();
    const [csvInput, setCsvInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [delimiter, setDelimiter] = useState(',');
    const [hasHeaders, setHasHeaders] = useState(true);

    const convertCSVtoJSON = () => {
        if (!csvInput.trim()) {
            alert(t('enterCSV') || 'Please enter CSV data');
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
            alert(t('conversionError') || 'Error converting CSV to JSON: ' + error.message);
        }
    };

    const convertJSONtoCSV = () => {
        if (!jsonOutput.trim()) {
            alert(t('enterJSON') || 'Please enter JSON data');
            return;
        }

        try {
            const data = JSON.parse(jsonOutput);
            if (!Array.isArray(data)) {
                alert(t('arrayRequired') || 'JSON must be an array of objects');
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
            alert(t('invalidJSON') || 'Invalid JSON: ' + error.message);
        }
    };

    const clearAll = () => {
        setCsvInput('');
        setJsonOutput('');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(t('copied') || 'Copied to clipboard!');
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
                <h1>{t('title') || 'CSV to JSON Converter'}</h1>
                <p>{t('subtitle') || 'Convert between CSV and JSON formats'}</p>
            </div>

            <div className="converter-container">
                <div className="settings-panel">
                    <div className="setting">
                        <label>{t('delimiter') || 'Delimiter'}</label>
                        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
                            <option value=",">, {t('comma') || 'Comma'}</option>
                            <option value=";">; {t('semicolon') || 'Semicolon'}</option>
                            <option value="\t">\t {t('tab') || 'Tab'}</option>
                            <option value="|">| {t('pipe') || 'Pipe'}</option>
                        </select>
                    </div>
                    <div className="setting">
                        <label>
                            <input
                                type="checkbox"
                                checked={hasHeaders}
                                onChange={(e) => setHasHeaders(e.target.checked)}
                            />
                            {t('firstRowHeaders') || 'First row contains headers'}
                        </label>
                    </div>
                </div>

                <div className="input-output-section">
                    <div className="input-section">
                        <label>{t('csvInput') || 'CSV Input'}</label>
                        <textarea
                            value={csvInput}
                            onChange={(e) => setCsvInput(e.target.value)}
                            placeholder={t('csvPlaceholder') || 'Paste your CSV data here...'}
                            className="text-input"
                            rows="8"
                        />
                        <div className="input-actions">
                            <button onClick={downloadCSV} className="download-btn" disabled={!csvInput}>
                                {t('downloadCSV') || 'Download CSV'}
                            </button>
                            <button onClick={() => copyToClipboard(csvInput)} className="copy-btn" disabled={!csvInput}>
                                {t('copyCSV') || 'Copy CSV'}
                            </button>
                        </div>
                    </div>

                    <div className="conversion-buttons">
                        <button onClick={convertCSVtoJSON} className="convert-btn">
                            {t('csvToJson') || 'CSV → JSON'}
                        </button>
                        <button onClick={convertJSONtoCSV} className="convert-btn">
                            {t('jsonToCsv') || 'JSON → CSV'}
                        </button>
                    </div>

                    <div className="output-section">
                        <label>{t('jsonOutput') || 'JSON Output'}</label>
                        <textarea
                            value={jsonOutput}
                            onChange={(e) => setJsonOutput(e.target.value)}
                            placeholder={t('jsonPlaceholder') || 'JSON output will appear here...'}
                            className="text-output"
                            rows="8"
                        />
                        <div className="output-actions">
                            <button onClick={downloadJSON} className="download-btn" disabled={!jsonOutput}>
                                {t('downloadJSON') || 'Download JSON'}
                            </button>
                            <button onClick={() => copyToClipboard(jsonOutput)} className="copy-btn" disabled={!jsonOutput}>
                                {t('copyJSON') || 'Copy JSON'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={clearAll} className="clear-btn">
                        {t('clearAll') || 'Clear All'}
                    </button>
                </div>

                <div className="info-section">
                    <h4>{t('about') || 'About CSV and JSON'}</h4>
                    <p><strong>CSV</strong> {t('csvInfo') || '(Comma-Separated Values) is a simple file format used to store tabular data.'}</p>
                    <p><strong>JSON</strong> {t('jsonInfo') || '(JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write.'}</p>
                    
                    <h5>{t('commonUses') || 'Common Uses:'}</h5>
                    <ul>
                        <li>{t('use1') || 'Data migration between systems'}</li>
                        <li>{t('use2') || 'Exporting data from databases'}</li>
                        <li>{t('use3') || 'API data formatting'}</li>
                        <li>{t('use4') || 'Spreadsheet data processing'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CSVtoJSON;