// import React, { useState, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/FileConverter.css';

// const FileConverter = () => {
//     const { t } = useTranslation('fileConverter');
//     const { theme } = useTheme();
    
//     const [file, setFile] = useState(null);
//     const [originalContent, setOriginalContent] = useState('');
//     const [convertedContent, setConvertedContent] = useState('');
//     const [converting, setConverting] = useState(false);
//     const [fileInfo, setFileInfo] = useState({});
//     const [conversionSettings, setConversionSettings] = useState({
//         targetFormat: 'json',
//         csvDelimiter: ',',
//         jsonFormat: 'pretty',
//         includeHeaders: true,
//         sheetName: 'Sheet1'
//     });
    
//     const fileInputRef = useRef();

//     const SUPPORTED_FORMATS = {
//         'text/csv': 'csv',
//         'application/vnd.ms-excel': 'csv',
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
//         'application/json': 'json',
//         'text/plain': 'csv'
//     };

//     const detectFileFormat = (file) => {
//         const extension = file.name.split('.').pop().toLowerCase();
//         const mimeType = file.type;
        
//         if (SUPPORTED_FORMATS[mimeType]) {
//             return SUPPORTED_FORMATS[mimeType];
//         }
        
//         switch (extension) {
//             case 'csv': return 'csv';
//             case 'xlsx': return 'excel';
//             case 'json': return 'json';
//             case 'xls': return 'excel';
//             default: return null;
//         }
//     };

//     const readFileContent = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (e) => resolve(e.target.result);
//             reader.onerror = reject;
            
//             if (file.type.includes('json') || file.name.endsWith('.json')) {
//                 reader.readAsText(file);
//             } else if (file.type.includes('sheet') || file.name.match(/\.(xlsx|xls)$/)) {
//                 reader.readAsArrayBuffer(file);
//             } else {
//                 reader.readAsText(file);
//             }
//         });
//     };

//     const parseCSV = (text, delimiter = ',') => {
//         const lines = text.trim().split('\n');
//         if (lines.length === 0) return { data: [], headers: [] };
        
//         const headers = lines[0].split(delimiter).map(h => h.trim());
//         const data = lines.slice(1).map(line => {
//             const values = line.split(delimiter).map(v => v.trim());
//             const row = {};
//             headers.forEach((header, index) => {
//                 row[header] = values[index] || '';
//             });
//             return row;
//         }).filter(row => Object.values(row).some(val => val !== ''));
        
//         return { data, headers };
//     };

//     const convertCSVToJSON = (csvText, delimiter = ',') => {
//         const { data } = parseCSV(csvText, delimiter);
//         return conversionSettings.jsonFormat === 'pretty' 
//             ? JSON.stringify(data, null, 2)
//             : JSON.stringify(data);
//     };

//     const convertJSONToCSV = (jsonText) => {
//         let data;
//         try {
//             data = JSON.parse(jsonText);
//         } catch (e) {
//             throw new Error(t('errors.invalidJson'));
//         }

//         if (!Array.isArray(data) || data.length === 0) {
//             throw new Error(t('errors.invalidJson'));
//         }

//         const headers = Object.keys(data[0]);
//         const csvRows = [];
        
//         if (conversionSettings.includeHeaders) {
//             csvRows.push(headers.join(conversionSettings.csvDelimiter));
//         }
        
//         data.forEach(row => {
//             const values = headers.map(header => {
//                 const value = row[header];
//                 return value !== null && value !== undefined ? String(value) : '';
//             });
//             csvRows.push(values.join(conversionSettings.csvDelimiter));
//         });
        
//         return csvRows.join('\n');
//     };

//     const convertToExcel = async (content, originalFormat) => {
//         // For demo purposes, we'll convert to CSV format
//         // In a real implementation, you would use a library like SheetJS
//         let csvContent = '';
        
//         if (originalFormat === 'json') {
//             csvContent = convertJSONToCSV(content);
//         } else if (originalFormat === 'csv') {
//             csvContent = content;
//         }
        
//         // Create a simple CSV to Excel-like conversion
//         // Note: This is a simplified version. For full Excel support, use SheetJS
//         return csvContent;
//     };

//     const convertFromExcel = async (arrayBuffer) => {
//         // For demo purposes, we'll return a placeholder
//         // In a real implementation, you would use SheetJS to read Excel files
//         throw new Error('Excel conversion requires SheetJS library. Using demo mode.');
//     };

//     const performConversion = async () => {
//         if (!file) {
//             alert(t('errors.noFile'));
//             return;
//         }

//         setConverting(true);

//         try {
//             const content = await readFileContent(file);
//             const originalFormat = detectFileFormat(file);
//             let result;

//             switch (originalFormat) {
//                 case 'csv':
//                     if (conversionSettings.targetFormat === 'json') {
//                         result = convertCSVToJSON(content, conversionSettings.csvDelimiter);
//                     } else if (conversionSettings.targetFormat === 'excel') {
//                         result = await convertToExcel(content, 'csv');
//                     }
//                     break;
                    
//                 case 'json':
//                     if (conversionSettings.targetFormat === 'csv') {
//                         result = convertJSONToCSV(content);
//                     } else if (conversionSettings.targetFormat === 'excel') {
//                         result = await convertToExcel(content, 'json');
//                     }
//                     break;
                    
//                 case 'excel':
//                     if (conversionSettings.targetFormat === 'csv') {
//                         result = await convertFromExcel(content);
//                     } else if (conversionSettings.targetFormat === 'json') {
//                         const csv = await convertFromExcel(content);
//                         result = convertCSVToJSON(csv, conversionSettings.csvDelimiter);
//                     }
//                     break;
                    
//                 default:
//                     throw new Error(t('errors.invalidFile'));
//             }

//             setConvertedContent(result);
//             setConverting(false);

//         } catch (error) {
//             console.error('Conversion error:', error);
//             setConverting(false);
//             alert(error.message || t('errors.conversionFailed'));
//         }
//     };

//     const handleFileUpload = useCallback(async (uploadedFile) => {
//         if (!uploadedFile) return;

//         if (uploadedFile.size > 10 * 1024 * 1024) {
//             alert(t('errors.fileTooLarge'));
//             return;
//         }

//         const format = detectFileFormat(uploadedFile);
//         if (!format) {
//             alert(t('errors.invalidFile'));
//             return;
//         }

//         try {
//             const content = await readFileContent(uploadedFile);
//             setFile(uploadedFile);
//             setOriginalContent(content);
//             setConvertedContent('');
            
//             // Set file info
//             const info = {
//                 name: uploadedFile.name,
//                 size: uploadedFile.size,
//                 type: format.toUpperCase(),
//                 originalFormat: format
//             };

//             // Parse content for additional info
//             if (format === 'csv') {
//                 const { data, headers } = parseCSV(content, conversionSettings.csvDelimiter);
//                 info.rows = data.length;
//                 info.columns = headers.length;
//             } else if (format === 'json') {
//                 try {
//                     const jsonData = JSON.parse(content);
//                     if (Array.isArray(jsonData)) {
//                         info.rows = jsonData.length;
//                         info.columns = jsonData[0] ? Object.keys(jsonData[0]).length : 0;
//                     }
//                 } catch (e) {
//                     // Ignore parsing errors for info
//                 }
//             }

//             setFileInfo(info);
            
//             // Set default target format based on original format
//             const defaultTargets = {
//                 csv: 'json',
//                 json: 'csv',
//                 excel: 'csv'
//             };
            
//             setConversionSettings(prev => ({
//                 ...prev,
//                 targetFormat: defaultTargets[format] || 'json'
//             }));

//         } catch (error) {
//             console.error('File reading error:', error);
//             alert(t('errors.conversionFailed'));
//         }
//     }, [t, conversionSettings.csvDelimiter]);

//     const handleDrop = useCallback((e) => {
//         e.preventDefault();
//         const uploadedFile = e.dataTransfer.files[0];
//         handleFileUpload(uploadedFile);
//     }, [handleFileUpload]);

//     const handleDragOver = useCallback((e) => {
//         e.preventDefault();
//     }, []);

//     const downloadFile = () => {
//         if (!convertedContent) return;

//         const blob = new Blob([convertedContent], { 
//             type: getMimeType(conversionSettings.targetFormat) 
//         });
//         const url = URL.createObjectURL(blob);
//         const extension = getFileExtension(conversionSettings.targetFormat);
//         const fileName = `${fileInfo.name.split('.')[0]}_converted.${extension}`;
        
//         const link = document.createElement('a');
//         link.download = fileName;
//         link.href = url;
//         link.click();
//         URL.revokeObjectURL(url);
//     };

//     const getMimeType = (format) => {
//         switch (format) {
//             case 'csv': return 'text/csv';
//             case 'json': return 'application/json';
//             case 'excel': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//             default: return 'text/plain';
//         }
//     };

//     const getFileExtension = (format) => {
//         switch (format) {
//             case 'csv': return 'csv';
//             case 'json': return 'json';
//             case 'excel': return 'xlsx';
//             default: return 'txt';
//         }
//     };

//     const clearAll = () => {
//         setFile(null);
//         setOriginalContent('');
//         setConvertedContent('');
//         setFileInfo({});
//         setConversionSettings({
//             targetFormat: 'json',
//             csvDelimiter: ',',
//             jsonFormat: 'pretty',
//             includeHeaders: true,
//             sheetName: 'Sheet1'
//         });
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const formatOptions = [
//         { value: 'csv', label: 'CSV' },
//         { value: 'json', label: 'JSON' },
//         { value: 'excel', label: 'Excel' }
//     ];

//     const delimiterOptions = [
//         { value: ',', label: t('comma') },
//         { value: ';', label: t('semicolon') },
//         { value: '\t', label: t('tab') }
//     ];

//     return (
//         <div className={`file-converter ${theme}`}>
//             <div className="tool-header">
//                 <h1>{t('title')}</h1>
//                 <p>{t('subtitle')}</p>
//             </div>

//             <div className="converter-container">
//                 <div className="upload-section">
//                     <div 
//                         className="upload-area"
//                         onDrop={handleDrop}
//                         onDragOver={handleDragOver}
//                         onClick={() => fileInputRef.current?.click()}
//                     >
//                         <div className="upload-content">
//                             <div className="upload-icon">📁</div>
//                             <h3>{t('uploadArea')}</h3>
//                             <p>{t('dragDrop')}</p>
//                             <small>{t('supportedFormats')}</small>
//                             <small>{t('maxSize')}</small>
//                         </div>
//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept=".csv,.xlsx,.xls,.json"
//                             onChange={(e) => handleFileUpload(e.target.files[0])}
//                             style={{ display: 'none' }}
//                         />
//                     </div>

//                     {file && (
//                         <div className="file-info-card">
//                             <h4>{t('fileInfo')}</h4>
//                             <div className="info-grid">
//                                 <div className="info-item">
//                                     <label>{t('fileName')}:</label>
//                                     <span>{fileInfo.name}</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <label>{t('fileSize')}:</label>
//                                     <span>{(fileInfo.size / 1024).toFixed(2)} KB</span>
//                                 </div>
//                                 <div className="info-item">
//                                     <label>{t('fileType')}:</label>
//                                     <span>{fileInfo.type}</span>
//                                 </div>
//                                 {fileInfo.rows !== undefined && (
//                                     <div className="info-item">
//                                         <label>{t('rows')}:</label>
//                                         <span>{fileInfo.rows}</span>
//                                     </div>
//                                 )}
//                                 {fileInfo.columns !== undefined && (
//                                     <div className="info-item">
//                                         <label>{t('columns')}:</label>
//                                         <span>{fileInfo.columns}</span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {file && (
//                     <div className="conversion-section">
//                         <div className="format-selection">
//                             <div className="format-group">
//                                 <label>{t('originalFormat')}</label>
//                                 <div className="format-display">
//                                     <span className="format-badge">{fileInfo.type}</span>
//                                 </div>
//                             </div>
                            
//                             <div className="conversion-arrow">→</div>
                            
//                             <div className="format-group">
//                                 <label>{t('targetFormat')}</label>
//                                 <select
//                                     value={conversionSettings.targetFormat}
//                                     onChange={(e) => setConversionSettings(prev => ({
//                                         ...prev,
//                                         targetFormat: e.target.value
//                                     }))}
//                                 >
//                                     {formatOptions
//                                         .filter(opt => opt.value !== fileInfo.originalFormat)
//                                         .map(option => (
//                                             <option key={option.value} value={option.value}>
//                                                 {option.label}
//                                             </option>
//                                         ))
//                                     }
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="settings-section">
//                             <h4>{t('conversionOptions')}</h4>
                            
//                             <div className="settings-grid">
//                                 {(fileInfo.originalFormat === 'csv' || conversionSettings.targetFormat === 'csv') && (
//                                     <div className="setting-group">
//                                         <label>{t('csvDelimiter')}</label>
//                                         <select
//                                             value={conversionSettings.csvDelimiter}
//                                             onChange={(e) => setConversionSettings(prev => ({
//                                                 ...prev,
//                                                 csvDelimiter: e.target.value
//                                             }))}
//                                         >
//                                             {delimiterOptions.map(option => (
//                                                 <option key={option.value} value={option.value}>
//                                                     {option.label}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 )}

//                                 {conversionSettings.targetFormat === 'json' && (
//                                     <div className="setting-group">
//                                         <label>{t('jsonFormat')}</label>
//                                         <select
//                                             value={conversionSettings.jsonFormat}
//                                             onChange={(e) => setConversionSettings(prev => ({
//                                                 ...prev,
//                                                 jsonFormat: e.target.value
//                                             }))}
//                                         >
//                                             <option value="pretty">{t('prettyPrint')}</option>
//                                             <option value="minified">{t('minified')}</option>
//                                         </select>
//                                     </div>
//                                 )}

//                                 {(fileInfo.originalFormat === 'csv' || conversionSettings.targetFormat === 'csv') && (
//                                     <div className="setting-group">
//                                         <label>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={conversionSettings.includeHeaders}
//                                                 onChange={(e) => setConversionSettings(prev => ({
//                                                     ...prev,
//                                                     includeHeaders: e.target.checked
//                                                 }))}
//                                             />
//                                             {t('includeHeaders')}
//                                         </label>
//                                     </div>
//                                 )}

//                                 {conversionSettings.targetFormat === 'excel' && (
//                                     <div className="setting-group">
//                                         <label>{t('sheetName')}</label>
//                                         <input
//                                             type="text"
//                                             value={conversionSettings.sheetName}
//                                             onChange={(e) => setConversionSettings(prev => ({
//                                                 ...prev,
//                                                 sheetName: e.target.value
//                                             }))}
//                                             placeholder="Sheet1"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="action-buttons">
//                             <button 
//                                 onClick={performConversion} 
//                                 className={`primary-btn ${converting ? 'converting' : ''}`}
//                                 disabled={converting}
//                             >
//                                 {converting ? t('converting') : t('convert')}
//                             </button>
//                             <button onClick={clearAll} className="secondary-btn">
//                                 {t('clear')}
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {(originalContent || convertedContent) && (
//                     <div className="preview-section">
//                         <h3>{t('preview')}</h3>
//                         <div className="preview-container">
//                             {originalContent && (
//                                 <div className="preview-item">
//                                     <h4>{t('original')}</h4>
//                                     <div className="preview-content">
//                                         <pre>{originalContent.substring(0, 1000)}</pre>
//                                         {originalContent.length > 1000 && (
//                                             <small>... (showing first 1000 characters)</small>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}
//                             {convertedContent && (
//                                 <div className="preview-item">
//                                     <h4>{t('converted')}</h4>
//                                     <div className="preview-content">
//                                         <pre>{convertedContent.substring(0, 1000)}</pre>
//                                         {convertedContent.length > 1000 && (
//                                             <small>... (showing first 1000 characters)</small>
//                                         )}
//                                     </div>
//                                     <div className="conversion-actions">
//                                         <button onClick={downloadFile} className="download-btn">
//                                             {t('download')}
//                                         </button>
//                                         <div className="success-message">
//                                             ✓ {t('success.conversionComplete')}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 <div className="tips-section">
//                     <h3>💡 {t('tips.title')}</h3>
//                     <div className="tips-list">
//                         <li>{t('tips.csvToJson')}</li>
//                         <li>{t('tips.jsonToCsv')}</li>
//                         <li>{t('tips.excelTips')}</li>
//                         <li>{t('tips.largeFiles')}</li>
//                         <li>{t('tips.validation')}</li>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FileConverter;



import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/FileConverter.css';

const FileConverter = () => {
    const { t } = useTranslation('fileConverter');
    const { theme } = useTheme();
    
    const [file, setFile] = useState(null);
    const [originalContent, setOriginalContent] = useState('');
    const [convertedContent, setConvertedContent] = useState('');
    const [converting, setConverting] = useState(false);
    const [fileInfo, setFileInfo] = useState({});
    const [conversionSettings, setConversionSettings] = useState({
        targetFormat: 'json',
        csvDelimiter: ',',
        jsonFormat: 'pretty',
        includeHeaders: true,
        sheetName: 'Sheet1'
    });
    
    const fileInputRef = useRef();

    const detectFileFormat = (file) => {
        const extension = file.name.split('.').pop().toLowerCase();
        
        switch (extension) {
            case 'csv': return 'csv';
            case 'xlsx': 
            case 'xls': return 'excel';
            case 'json': return 'json';
            default: return null;
        }
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            
            if (file.type.includes('json') || file.name.endsWith('.json')) {
                reader.readAsText(file, 'UTF-8');
            } else {
                reader.readAsText(file, 'UTF-8');
            }
        });
    };

    const parseCSV = (text, delimiter = ',') => {
        const lines = text.trim().split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) return { data: [], headers: [] };
        
        // Handle different line endings and clean up
        const cleanLines = lines.map(line => line.replace(/\r/g, ''));
        
        // Detect headers
        const headers = cleanLines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
        
        // Parse data rows
        const data = cleanLines.slice(1).map((line, index) => {
            // Simple CSV parsing - for production use a proper CSV parser
            const values = line.split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''));
            const row = {};
            headers.forEach((header, colIndex) => {
                row[header] = values[colIndex] || '';
            });
            return row;
        }).filter(row => Object.values(row).some(val => val !== ''));
        
        return { data, headers };
    };

    const convertCSVToJSON = (csvText, delimiter = ',') => {
        try {
            const { data } = parseCSV(csvText, delimiter);
            if (data.length === 0) {
                throw new Error(t('errors.emptyFile'));
            }
            
            return conversionSettings.jsonFormat === 'pretty' 
                ? JSON.stringify(data, null, 2)
                : JSON.stringify(data);
        } catch (error) {
            throw new Error(t('errors.invalidCsv'));
        }
    };

    const convertJSONToCSV = (jsonText) => {
        let data;
        try {
            data = JSON.parse(jsonText);
        } catch (e) {
            throw new Error(t('errors.invalidJson'));
        }

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(t('errors.invalidJson'));
        }

        const headers = Object.keys(data[0]);
        const csvRows = [];
        
        if (conversionSettings.includeHeaders) {
            csvRows.push(headers.map(header => `"${header}"`).join(conversionSettings.csvDelimiter));
        }
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                // Escape quotes and wrap in quotes if contains delimiter or quotes
                const stringValue = value !== null && value !== undefined ? String(value).replace(/"/g, '""') : '';
                return `"${stringValue}"`;
            });
            csvRows.push(values.join(conversionSettings.csvDelimiter));
        });
        
        return csvRows.join('\n');
    };

    const convertToExcel = async (content, originalFormat) => {
        // For demo - convert to CSV format
        // In production, use SheetJS for proper Excel conversion
        if (originalFormat === 'json') {
            return convertJSONToCSV(content);
        }
        return content;
    };

    const convertFromExcel = async (content) => {
        // For demo - treat as CSV
        // In production, use SheetJS to read Excel files
        return content;
    };

    const performConversion = async () => {
        if (!file) {
            alert(t('noFile'));
            return;
        }

        setConverting(true);
        setConvertedContent('');

        try {
            const content = await readFileContent(file);
            const originalFormat = detectFileFormat(file);
            let result;

            switch (originalFormat) {
                case 'csv':
                    if (conversionSettings.targetFormat === 'json') {
                        result = convertCSVToJSON(content, conversionSettings.csvDelimiter);
                    } else if (conversionSettings.targetFormat === 'excel') {
                        result = await convertToExcel(content, 'csv');
                    }
                    break;
                    
                case 'json':
                    if (conversionSettings.targetFormat === 'csv') {
                        result = convertJSONToCSV(content);
                    } else if (conversionSettings.targetFormat === 'excel') {
                        result = await convertToExcel(content, 'json');
                    }
                    break;
                    
                case 'excel':
                    if (conversionSettings.targetFormat === 'csv') {
                        result = await convertFromExcel(content);
                    } else if (conversionSettings.targetFormat === 'json') {
                        const csv = await convertFromExcel(content);
                        result = convertCSVToJSON(csv, conversionSettings.csvDelimiter);
                    }
                    break;
                    
                default:
                    throw new Error(t('errors.invalidFile'));
            }

            setConvertedContent(result);
            setConverting(false);

        } catch (error) {
            console.error('Conversion error:', error);
            setConverting(false);
            alert(error.message || t('errors.conversionFailed'));
        }
    };

    const handleFileUpload = useCallback(async (uploadedFile) => {
        if (!uploadedFile) return;

        if (uploadedFile.size > 10 * 1024 * 1024) {
            alert(t('errors.fileTooLarge'));
            return;
        }

        const format = detectFileFormat(uploadedFile);
        if (!format) {
            alert(t('errors.invalidFile'));
            return;
        }

        try {
            const content = await readFileContent(uploadedFile);
            setFile(uploadedFile);
            setOriginalContent(content);
            setConvertedContent('');
            
            // Set file info
            const info = {
                name: uploadedFile.name,
                size: uploadedFile.size,
                type: format.toUpperCase(),
                originalFormat: format
            };

            // Parse content for additional info
            if (format === 'csv') {
                const { data, headers } = parseCSV(content, conversionSettings.csvDelimiter);
                info.rows = data.length;
                info.columns = headers.length;
            } else if (format === 'json') {
                try {
                    const jsonData = JSON.parse(content);
                    if (Array.isArray(jsonData)) {
                        info.rows = jsonData.length;
                        info.columns = jsonData[0] ? Object.keys(jsonData[0]).length : 0;
                    }
                } catch (e) {
                    console.warn('JSON parsing for info failed:', e);
                }
            }

            setFileInfo(info);
            
            // Set default target format based on original format
            const defaultTargets = {
                csv: 'json',
                json: 'csv',
                excel: 'csv'
            };
            
            setConversionSettings(prev => ({
                ...prev,
                targetFormat: defaultTargets[format] || 'json'
            }));

        } catch (error) {
            console.error('File reading error:', error);
            alert(t('errors.conversionFailed'));
        }
    }, [t, conversionSettings.csvDelimiter]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files[0];
        handleFileUpload(uploadedFile);
    }, [handleFileUpload]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const downloadFile = () => {
        if (!convertedContent) return;

        const blob = new Blob([convertedContent], { 
            type: getMimeType(conversionSettings.targetFormat) 
        });
        const url = URL.createObjectURL(blob);
        const extension = getFileExtension(conversionSettings.targetFormat);
        const fileName = `${fileInfo.name.split('.')[0]}_converted.${extension}`;
        
        const link = document.createElement('a');
        link.download = fileName;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const getMimeType = (format) => {
        switch (format) {
            case 'csv': return 'text/csv';
            case 'json': return 'application/json';
            case 'excel': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            default: return 'text/plain';
        }
    };

    const getFileExtension = (format) => {
        switch (format) {
            case 'csv': return 'csv';
            case 'json': return 'json';
            case 'excel': return 'xlsx';
            default: return 'txt';
        }
    };

    const clearAll = () => {
        setFile(null);
        setOriginalContent('');
        setConvertedContent('');
        setFileInfo({});
        setConversionSettings({
            targetFormat: 'json',
            csvDelimiter: ',',
            jsonFormat: 'pretty',
            includeHeaders: true,
            sheetName: 'Sheet1'
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatOptions = [
        { value: 'csv', label: 'CSV' },
        { value: 'json', label: 'JSON' },
        { value: 'excel', label: 'Excel' }
    ];

    const delimiterOptions = [
        { value: ',', label: t('comma') },
        { value: ';', label: t('semicolon') },
        { value: '\t', label: t('tab') }
    ];

    return (
        <div className={`file-converter ${theme}`}>
            <div className="tool-header">
                <h1>{t('title')}</h1>
                <p>{t('subtitle')}</p>
            </div>

            <div className="converter-container">
                <div className="upload-section">
                    <div 
                        className="upload-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="upload-content">
                            <div className="upload-icon">📁</div>
                            <h3>{t('uploadArea')}</h3>
                            <p>{t('dragDrop')}</p>
                            <small>{t('supportedFormats')}</small>
                            <small>{t('maxSize')}</small>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv,.xlsx,.xls,.json"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {file && (
                        <div className="file-info-card">
                            <h4>{t('fileInfo')}</h4>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>{t('fileName')}:</label>
                                    <span>{fileInfo.name}</span>
                                </div>
                                <div className="info-item">
                                    <label>{t('fileSize')}:</label>
                                    <span>{(fileInfo.size / 1024).toFixed(2)} KB</span>
                                </div>
                                <div className="info-item">
                                    <label>{t('fileType')}:</label>
                                    <span className="format-badge">{fileInfo.type}</span>
                                </div>
                                {fileInfo.rows !== undefined && (
                                    <div className="info-item">
                                        <label>{t('rows')}:</label>
                                        <span>{fileInfo.rows}</span>
                                    </div>
                                )}
                                {fileInfo.columns !== undefined && (
                                    <div className="info-item">
                                        <label>{t('columns')}:</label>
                                        <span>{fileInfo.columns}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {file && (
                    <div className="conversion-section">
                        <div className="format-selection">
                            <div className="format-group">
                                <label>{t('originalFormat')}</label>
                                <div className="format-display">
                                    <span className="format-badge">{fileInfo.type}</span>
                                </div>
                            </div>
                            
                            <div className="conversion-arrow">→</div>
                            
                            <div className="format-group">
                                <label>{t('targetFormat')}</label>
                                <select
                                    value={conversionSettings.targetFormat}
                                    onChange={(e) => setConversionSettings(prev => ({
                                        ...prev,
                                        targetFormat: e.target.value
                                    }))}
                                    className="format-select"
                                >
                                    {formatOptions
                                        .filter(opt => opt.value !== fileInfo.originalFormat)
                                        .map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="settings-section">
                            <h4>{t('conversionOptions')}</h4>
                            
                            <div className="settings-grid">
                                {(fileInfo.originalFormat === 'csv' || conversionSettings.targetFormat === 'csv') && (
                                    <div className="setting-group">
                                        <label>{t('csvDelimiter')}</label>
                                        <select
                                            value={conversionSettings.csvDelimiter}
                                            onChange={(e) => setConversionSettings(prev => ({
                                                ...prev,
                                                csvDelimiter: e.target.value
                                            }))}
                                        >
                                            {delimiterOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {conversionSettings.targetFormat === 'json' && (
                                    <div className="setting-group">
                                        <label>{t('jsonFormat')}</label>
                                        <select
                                            value={conversionSettings.jsonFormat}
                                            onChange={(e) => setConversionSettings(prev => ({
                                                ...prev,
                                                jsonFormat: e.target.value
                                            }))}
                                        >
                                            <option value="pretty">{t('prettyPrint')}</option>
                                            <option value="minified">{t('minified')}</option>
                                        </select>
                                    </div>
                                )}

                                {(fileInfo.originalFormat === 'csv' || conversionSettings.targetFormat === 'csv') && (
                                    <div className="setting-group checkbox-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={conversionSettings.includeHeaders}
                                                onChange={(e) => setConversionSettings(prev => ({
                                                    ...prev,
                                                    includeHeaders: e.target.checked
                                                }))}
                                            />
                                            <span className="checkmark"></span>
                                            {t('includeHeaders')}
                                        </label>
                                    </div>
                                )}

                                {conversionSettings.targetFormat === 'excel' && (
                                    <div className="setting-group">
                                        <label>{t('sheetName')}</label>
                                        <input
                                            type="text"
                                            value={conversionSettings.sheetName}
                                            onChange={(e) => setConversionSettings(prev => ({
                                                ...prev,
                                                sheetName: e.target.value
                                            }))}
                                            placeholder="Sheet1"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button 
                                onClick={performConversion} 
                                className={`primary-btn ${converting ? 'converting' : ''}`}
                                disabled={converting || !file}
                            >
                                {converting ? t('converting') : t('convert')}
                            </button>
                            <button onClick={clearAll} className="secondary-btn">
                                {t('clear')}
                            </button>
                        </div>
                    </div>
                )}

                {(originalContent || convertedContent) && (
                    <div className="preview-section">
                        <h3>{t('preview')}</h3>
                        <div className="preview-container">
                            {originalContent && (
                                <div className="preview-item">
                                    <h4>{t('original')}</h4>
                                    <div className="preview-content">
                                        <pre>{originalContent.substring(0, 500)}</pre>
                                        {originalContent.length > 500 && (
                                            <small>... (showing first 500 characters)</small>
                                        )}
                                    </div>
                                </div>
                            )}
                            {convertedContent && (
                                <div className="preview-item">
                                    <h4>{t('converted')}</h4>
                                    <div className="preview-content">
                                        <pre>{convertedContent.substring(0, 500)}</pre>
                                        {convertedContent.length > 500 && (
                                            <small>... (showing first 500 characters)</small>
                                        )}
                                    </div>
                                    <div className="conversion-actions">
                                        <button onClick={downloadFile} className="download-btn">
                                            {t('download')}
                                        </button>
                                        <div className="success-message">
                                            ✓ {t('success.conversionComplete')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="tips-section">
                    <h3>💡 {t('tips.title')}</h3>
                    <div className="tips-list">
                        <li>{t('tips.csvToJson')}</li>
                        <li>{t('tips.jsonToCsv')}</li>
                        <li>{t('tips.excelTips')}</li>
                        <li>{t('tips.largeFiles')}</li>
                        <li>{t('tips.validation')}</li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileConverter;