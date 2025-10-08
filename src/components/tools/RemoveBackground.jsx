// import React, { useState, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/RemoveBackground.css';

// const RemoveBackground = () => {
//     const { t } = useTranslation('removeBg');
//     const { theme } = useTheme();
    
//     const [file, setFile] = useState(null);
//     const [originalImage, setOriginalImage] = useState('');
//     const [processedImage, setProcessedImage] = useState('');
//     const [processing, setProcessing] = useState(false);
//     const [processingSettings, setProcessingSettings] = useState({
//         bg_mode: 'transparent',
//         bg_color: '#ffffff'
//     });
    
//     const fileInputRef = useRef();
//     const originalDimensions = useRef({ width: 0, height: 0 });

//     const API_BASE_URL = 'http://localhost:8000';

//     const removeBackground = async () => {
//         if (!file) {
//             alert(t('noFile'));
//             return;
//         }

//         setProcessing(true);

//         try {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('bg_mode', processingSettings.bg_mode);
            
//             if (processingSettings.bg_mode === 'color' && processingSettings.bg_color) {
//                 formData.append('bg_color', processingSettings.bg_color);
//             }

//             const response = await fetch(`${API_BASE_URL}/remove-bg`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || t('processingError'));
//             }

//             const blob = await response.blob();
//             const imageUrl = URL.createObjectURL(blob);
            
//             setProcessedImage(imageUrl);
//             setProcessing(false);

//         } catch (error) {
//             console.error('Background removal error:', error);
//             setProcessing(false);
//             alert(error.message || t('processingError'));
//         }
//     };

//     const handleFileUpload = useCallback((uploadedFile) => {
//         if (!uploadedFile) return;

//         if (uploadedFile.size > 10 * 1024 * 1024) {
//             alert(t('fileTooLarge'));
//             return;
//         }

//         if (!uploadedFile.type.startsWith('image/')) {
//             alert(t('invalidFile'));
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const imageUrl = e.target.result;
//             setFile(uploadedFile);
//             setOriginalImage(imageUrl);
//             setProcessedImage('');
            
//             const img = new Image();
//             img.onload = () => {
//                 originalDimensions.current = {
//                     width: img.width,
//                     height: img.height
//                 };
//             };
//             img.src = imageUrl;
//         };
//         reader.readAsDataURL(uploadedFile);
//     }, [t]);

//     const handleDrop = useCallback((e) => {
//         e.preventDefault();
//         const uploadedFile = e.dataTransfer.files[0];
//         handleFileUpload(uploadedFile);
//     }, [handleFileUpload]);

//     const handleDragOver = useCallback((e) => {
//         e.preventDefault();
//     }, []);

//     const downloadImage = () => {
//         if (!processedImage) return;

//         const link = document.createElement('a');
//         const fileName = `${t('downloadFileName')}-${Date.now()}.png`;
        
//         link.download = fileName;
//         link.href = processedImage;
//         link.click();
//     };

//     const clearAll = () => {
//         setFile(null);
//         setOriginalImage('');
//         setProcessedImage('');
//         setProcessingSettings({
//             bg_mode: 'transparent',
//             bg_color: '#ffffff'
//         });
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
        
//         if (processedImage) {
//             URL.revokeObjectURL(processedImage);
//         }
//     };

//     const bgColorOptions = [
//         { value: '#ffffff', label: t('white'), color: '#ffffff' },
//         { value: '#000000', label: t('black'), color: '#000000' },
//         { value: '#f3f4f6', label: t('lightGray'), color: '#f3f4f6' },
//         { value: '#1f2937', label: t('darkGray'), color: '#1f2937' },
//         { value: '#3b82f6', label: t('blue'), color: '#3b82f6' },
//         { value: '#10b981', label: t('green'), color: '#10b981' },
//         { value: '#f59e0b', label: t('orange'), color: '#f59e0b' },
//         { value: '#ef4444', label: t('red'), color: '#ef4444' },
//         { value: '#8b5cf6', label: t('purple'), color: '#8b5cf6' },
//     ];

//     return (
//         <div className={`remove-background ${theme}`}>
//             <div className="tool-header">
//                 <h1>{t('title')}</h1>
//                 <p>{t('subtitle')}</p>
//             </div>

//             <div className="remover-container">
//                 <div className="upload-section">
//                     <div 
//                         className="upload-area"
//                         onDrop={handleDrop}
//                         onDragOver={handleDragOver}
//                         onClick={() => fileInputRef.current?.click()}
//                     >
//                         <div className="upload-content">
//                             <div className="upload-icon">🖼️</div>
//                             <h3>{t('uploadArea')}</h3>
//                             <p>{t('dragDrop')}</p>
//                             <small>{t('supportedFormats')}</small>
//                             <small>{t('maxSize')}</small>
//                         </div>
//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => handleFileUpload(e.target.files[0])}
//                             style={{ display: 'none' }}
//                         />
//                     </div>

//                     {file && (
//                         <div className="file-info">
//                             <strong>{file.name}</strong>
//                             <br />
//                             <small>
//                                 {t('fileSize')}: {(file.size / 1024).toFixed(2)} KB
//                                 {originalDimensions.current.width > 0 && (
//                                     <> | {t('dimensions')}: {originalDimensions.current.width} × {originalDimensions.current.height}</>
//                                 )}
//                             </small>
//                         </div>
//                     )}
//                 </div>

//                 {file && (
//                     <div className="settings-section">
//                         <h3>{t('advancedOptions')}</h3>
                        
//                         <div className="settings-grid">
//                             <div className="setting-group">
//                                 <label>{t('backgroundMode')}</label>
//                                 <select
//                                     value={processingSettings.bg_mode}
//                                     onChange={(e) => setProcessingSettings(prev => ({
//                                         ...prev,
//                                         bg_mode: e.target.value
//                                     }))}
//                                 >
//                                     <option value="transparent">{t('transparentMode')}</option>
//                                     <option value="color">{t('colorMode')}</option>
//                                 </select>
//                             </div>

//                             {processingSettings.bg_mode === 'color' && (
//                                 <div className="setting-group full-width">
//                                     <label>{t('selectColor')}</label>
//                                     <div className="color-options">
//                                         {bgColorOptions.map((colorOption) => (
//                                             <button
//                                                 key={colorOption.value}
//                                                 type="button"
//                                                 className={`color-option ${processingSettings.bg_color === colorOption.value ? 'active' : ''}`}
//                                                 style={{ backgroundColor: colorOption.color }}
//                                                 onClick={() => setProcessingSettings(prev => ({
//                                                     ...prev,
//                                                     bg_color: colorOption.value
//                                                 }))}
//                                                 title={colorOption.label}
//                                             />
//                                         ))}
//                                     </div>
//                                     <div className="selected-color">
//                                         {t('selectedColor')}: 
//                                         <span style={{ 
//                                             color: processingSettings.bg_color,
//                                             fontWeight: 'bold',
//                                             marginLeft: '0.5rem'
//                                         }}>
//                                             {bgColorOptions.find(opt => opt.value === processingSettings.bg_color)?.label}
//                                         </span>
//                                     </div>
//                                 </div>
//                             )}

//                             <div className="setting-group full-width">
//                                 <div className="api-info">
//                                     <small>⚡ {t('subtitle')}</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {file && (
//                     <div className="action-buttons">
//                         <button 
//                             onClick={removeBackground} 
//                             className={`primary-btn ${processing ? 'processing' : ''}`}
//                             disabled={processing}
//                         >
//                             {processing ? t('processing') : t('removeBackground')}
//                         </button>
//                         <button onClick={clearAll} className="secondary-btn">
//                             {t('clear')}
//                         </button>
//                     </div>
//                 )}

//                 {(originalImage || processedImage) && (
//                     <div className="preview-section">
//                         <div className="preview-container">
//                             {originalImage && (
//                                 <div className="preview-item">
//                                     <h4>{t('original')}</h4>
//                                     <img 
//                                         src={originalImage} 
//                                         alt="Original" 
//                                         className="preview-image"
//                                     />
//                                 </div>
//                             )}
//                             {processedImage && (
//                                 <div className="preview-item">
//                                     <h4>{t('result')}</h4>
//                                     <div className="result-container">
//                                         <img 
//                                             src={processedImage} 
//                                             alt="Background Removed" 
//                                             className={`preview-image result-image ${
//                                                 processingSettings.bg_mode === 'transparent' ? 'transparent-bg' : ''
//                                             }`}
//                                         />
//                                         <div className="result-actions">
//                                             <button onClick={downloadImage} className="download-btn">
//                                                 {t('download')}
//                                             </button>
//                                         </div>
//                                         {processingSettings.bg_mode === 'transparent' ? (
//                                             <div className="transparency-note">
//                                                 <small>✓ {t('transparency')}</small>
//                                             </div>
//                                         ) : (
//                                             <div className="color-note">
//                                                 <small>
//                                                     ✓ {bgColorOptions.find(opt => opt.value === processingSettings.bg_color)?.label} {t('background')}
//                                                 </small>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 <div className="tips-section">
//                     <h3>💡 {t('tips')}</h3>
//                     <div className="tips-list">
//                         <li>{t('tip1')}</li>
//                         <li>{t('tip2')}</li>
//                         <li>{t('tip3')}</li>
//                         <li>{t('tip4')}</li>
//                         <li>{t('tip5')}</li>
//                     </div>
//                 </div>

//                 <div className="api-status">
//                     <div className="status-indicator">
//                         <div className={`status-dot ${processing ? 'processing' : 'ready'}`}></div>
//                         <small>
//                             {processing ? t('aiProcessing') : t('apiReady')}
//                         </small>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RemoveBackground;



// src/components/tools/RemoveBackground.jsx
// import React, { useState, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/RemoveBackground.css';

// // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// const samplePhotoBackgrounds = [
//   // You can replace these with your own URLs or host them in public/
//   'https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg',
//   'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
//   'https://images.pexels.com/photos/462353/pexels-photo-462353.jpeg'
// ];

// const RemoveBackground = () => {
//   const { t } = useTranslation('removeBg');
//   const { theme } = useTheme();

//   const [file, setFile] = useState(null);
//   const [originalImage, setOriginalImage] = useState('');
//   const [processedImage, setProcessedImage] = useState('');
//   const [processing, setProcessing] = useState(false);
//   const [processingSettings, setProcessingSettings] = useState({
//     bg_mode: 'transparent',
//     bg_color: '#ffffff',
//     bg_url: ''
//   });

//   const fileInputRef = useRef();
//   const originalDimensions = useRef({ width: 0, height: 0 });

//   const handleFileUpload = useCallback((uploadedFile) => {
//     if (!uploadedFile) return;

//     if (uploadedFile.size > 15 * 1024 * 1024) {
//       alert(t('fileTooLarge') || 'File too large (max 15MB)');
//       return;
//     }

//     if (!uploadedFile.type.startsWith('image/')) {
//       alert(t('invalidFile') || 'Invalid file type');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const imageUrl = e.target.result;
//       setFile(uploadedFile);
//       setOriginalImage(imageUrl);
//       setProcessedImage('');
//       const img = new Image();
//       img.onload = () => {
//         originalDimensions.current = { width: img.width, height: img.height };
//       };
//       img.src = imageUrl;
//     };
//     reader.readAsDataURL(uploadedFile);
//   }, [t]);

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     const uploadedFile = e.dataTransfer.files[0];
//     handleFileUpload(uploadedFile);
//   }, [handleFileUpload]);

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//   }, []);

//   const callApi = async () => {
//     if (!file) {
//       alert(t('noFile') || 'Please upload an image first');
//       return;
//     }

//     setProcessing(true);
//     setProcessedImage('');

//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('bg_mode', processingSettings.bg_mode);
//       if (processingSettings.bg_mode === 'color') {
//         formData.append('bg_color', processingSettings.bg_color);
//       }
//       if (processingSettings.bg_mode === 'photo' && processingSettings.bg_url) {
//         formData.append('bg_url', processingSettings.bg_url);
//       }

//       const res = await fetch(`${API_BASE_URL}/remove-bg`, {
//         method: 'POST',
//         body: formData
//       });

//       if (!res.ok) {
//         const json = await res.json().catch(() => ({}));
//         throw new Error(json.error || 'Processing failed');
//       }

//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);
//       setProcessedImage(url);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || t('processingError') || 'Error processing image');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const downloadImage = () => {
//     if (!processedImage) return;
//     const link = document.createElement('a');
//     const fname = `result-${Date.now()}.png`;
//     link.href = processedImage;
//     link.download = fname;
//     link.click();
//   };

//   const clearAll = () => {
//     if (processedImage) {
//       URL.revokeObjectURL(processedImage);
//     }
//     setFile(null);
//     setOriginalImage('');
//     setProcessedImage('');
//     setProcessingSettings({ bg_mode: 'transparent', bg_color: '#ffffff', bg_url: '' });
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const bgColorOptions = [
//     '#ffffff','#000000','#f3f4f6','#1f2937','#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6'
//   ];

//   return (
//     <div className={`remove-background ${theme}`}>
//       <div className="tool-header">
//         <h1>{t('title') || 'Remove Background'}</h1>
//         <p>{t('subtitle') || 'Remove background and replace with color or image'}</p>
//       </div>

//       <div className="remover-container">
//         <div className="upload-section">
//           <div
//             className="upload-area"
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <div className="upload-content">
//               <div className="upload-icon">🖼️</div>
//               <h3>{t('uploadArea') || 'Click or drop image here'}</h3>
//               <p>{t('dragDrop') || 'Drag & drop an image'}</p>
//               <small>{t('supportedFormats') || 'PNG, JPG, JPEG'}</small>
//               <small>{t('maxSize') || 'Max 15MB'}</small>
//             </div>

//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleFileUpload(e.target.files[0])}
//               style={{ display: 'none' }}
//             />
//           </div>

//           {file && (
//             <div className="file-info">
//               <strong>{file.name}</strong>
//               <br />
//               <small>
//                 {t('fileSize') || 'Size'}: {(file.size / 1024).toFixed(2)} KB
//                 {originalDimensions.current.width > 0 && (
//                   <> | {t('dimensions') || 'Dimensions'}: {originalDimensions.current.width} × {originalDimensions.current.height}</>
//                 )}
//               </small>
//             </div>
//           )}
//         </div>

//         {file && (
//           <div className="settings-section">
//             <h3>{t('advancedOptions') || 'Background Options'}</h3>
//             <div className="settings-grid">
//               <div className="setting-group">
//                 <label>{t('backgroundMode') || 'Background Mode'}</label>
//                 <select
//                   value={processingSettings.bg_mode}
//                   onChange={(e) => setProcessingSettings(prev => ({ ...prev, bg_mode: e.target.value }))}
//                 >
//                   <option value="transparent">{t('transparentMode') || 'Transparent'}</option>
//                   <option value="color">{t('colorMode') || 'Color'}</option>
//                   <option value="photo">{t('photoMode') || 'Photo (URL / Sample)'}</option>
//                 </select>
//               </div>

//               {processingSettings.bg_mode === 'color' && (
//                 <div className="setting-group full-width">
//                   <label>{t('selectColor') || 'Select Color'}</label>
//                   <div className="color-options">
//                     {bgColorOptions.map(c => (
//                       <button
//                         key={c}
//                         type="button"
//                         className={`color-option ${processingSettings.bg_color === c ? 'active' : ''}`}
//                         style={{ backgroundColor: c }}
//                         onClick={() => setProcessingSettings(prev => ({ ...prev, bg_color: c }))}
//                         title={c}
//                       />
//                     ))}
//                   </div>
//                   <div className="selected-color">
//                     {t('selectedColor') || 'Selected'}:
//                     <span style={{ marginLeft: '0.5rem', fontWeight: '600' }}>{processingSettings.bg_color}</span>
//                   </div>
//                 </div>
//               )}

//               {processingSettings.bg_mode === 'photo' && (
//                 <div className="setting-group full-width">
//                   <label>{t('photoUrl') || 'Photo background (paste URL)'} </label>
//                   <input
//                     type="text"
//                     placeholder="https://..."
//                     value={processingSettings.bg_url}
//                     onChange={(e) => setProcessingSettings(prev => ({ ...prev, bg_url: e.target.value }))}
//                     style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
//                   />
//                   <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
//                     {samplePhotoBackgrounds.map(url => (
//                       <img
//                         key={url}
//                         src={url}
//                         alt="bg-sample"
//                         style={{ width: 72, height: 48, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', border: processingSettings.bg_url === url ? '3px solid #3b82f6' : '1px solid #ddd' }}
//                         onClick={() => setProcessingSettings(prev => ({ ...prev, bg_url: url }))}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="setting-group full-width">
//                 <div className="api-info">
//                   <small>⚡ {t('subtitle') || 'Processed locally via backend'}</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {file && (
//           <div className="action-buttons">
//             <button
//               onClick={callApi}
//               className={`primary-btn ${processing ? 'processing' : ''}`}
//               disabled={processing}
//             >
//               {processing ? (t('processing') || 'Processing...') : (t('removeBackground') || 'Apply')}
//             </button>
//             <button onClick={clearAll} className="secondary-btn">
//               {t('clear') || 'Clear'}
//             </button>
//           </div>
//         )}

//         {(originalImage || processedImage) && (
//           <div className="preview-section">
//             <div className="preview-container">
//               {originalImage && (
//                 <div className="preview-item">
//                   <h4>{t('original') || 'Original'}</h4>
//                   <img src={originalImage} alt="Original" className="preview-image" />
//                 </div>
//               )}
//               {processedImage && (
//                 <div className="preview-item">
//                   <h4>{t('result') || 'Result'}</h4>
//                   <div className="result-container">
//                     <img
//                       src={processedImage}
//                       alt="Processed"
//                       className={`preview-image result-image ${processingSettings.bg_mode === 'transparent' ? 'transparent-bg' : ''}`}
//                     />
//                     <div className="result-actions">
//                       <button onClick={downloadImage} className="download-btn">{t('download') || 'Download'}</button>
//                     </div>
//                     {processingSettings.bg_mode === 'transparent' ? (
//                       <div className="transparency-note"><small>✓ {t('transparency') || 'Transparent background'}</small></div>
//                     ) : (
//                       <div className="color-note"><small>✓ {processingSettings.bg_mode === 'color' ? processingSettings.bg_color : 'Photo background'}</small></div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         <div className="tips-section">
//           <h3>💡 {t('tips') || 'Tips'}</h3>
//           <div className="tips-list">
//             <li>{t('tip1') || 'Use a clear subject photo for best results.'}</li>
//             <li>{t('tip2') || 'Try different background images or colors.'}</li>
//             <li>{t('tip3') || 'High contrast between subject and background helps.'}</li>
//             <li>{t('tip4') || 'For large photos use smaller dimensions to speed up processing.'}</li>
//             <li>{t('tip5') || 'You can paste a background URL or choose a sample.'}</li>
//           </div>
//         </div>

//         <div className="api-status">
//           <div className="status-indicator">
//             <div className={`status-dot ${processing ? 'processing' : 'ready'}`}></div>
//             <small>{processing ? (t('aiProcessing') || 'Processing') : (t('apiReady') || 'Ready')}</small>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RemoveBackground;











import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/RemoveBackground.css';


const RemoveBackground = () => {
  const API_BASE_URL = 'http://localhost:8000';
  const API = {
    cutout: `${API_BASE_URL}/cutout`,
    background: `${API_BASE_URL}/background`,
    effects: `${API_BASE_URL}/effects`,
    adjust: `${API_BASE_URL}/adjust`,
    design: `${API_BASE_URL}/design`,
  };

  const [file, setFile] = useState(null);
  const [originalImage, setOriginalImage] = useState('');
  const [processedImage, setProcessedImage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [tab, setTab] = useState('cutout');
  // Background states
  const [bgMode, setBgMode] = useState('color');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgPhotoFile, setBgPhotoFile] = useState(null);
  // Effects state
  const [effectType, setEffectType] = useState('blur');
  // Adjust states
  const [adjustSettings, setAdjustSettings] = useState({
    brightness: 1.0, contrast: 1.0, rotate: 0, crop_x: 0, crop_y: 0, crop_w: 0, crop_h: 0,
  });
  // Design states
  const [designText, setDesignText] = useState('');
  const [designX, setDesignX] = useState(10);
  const [designY, setDesignY] = useState(10);
  const [designColor, setDesignColor] = useState('black');
  const [designFontSize, setDesignFontSize] = useState(40);

  const fileInputRef = useRef();

  // Common upload-handler
  const handleFileUpload = useCallback((f) => {
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) return alert('File too large (max 10 MB)');
    if (!f.type.startsWith('image/')) return alert('Invalid file type');
    const reader = new FileReader();
    reader.onload = e => { setOriginalImage(e.target.result); setProcessedImage(''); setFile(f); };
    reader.readAsDataURL(f);
  }, []);

  const sendToApi = async (url, formData) => {
    setProcessing(true);
    try {
      const resp = await fetch(url, { method: 'POST', body: formData });
      if (!resp.ok) throw new Error('API error');
      const blob = await resp.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (e) {
      alert(e.message);
    }
    setProcessing(false);
  };

  // Handlers for each feature
  const runCutout = async () => {
    if (!file) return alert('Upload an image first');
    const formData = new FormData();
    formData.append('file', file);
    await sendToApi(API.cutout, formData);
  };

  const runBackground = async () => {
    if (!file) return alert('Upload an image first');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bg_mode', bgMode);
    if (bgMode === 'color') formData.append('bg_color', bgColor);
    if (bgMode === 'photo' && bgPhotoFile) formData.append('bg_image', bgPhotoFile);
    await sendToApi(API.background, formData);
  };

  const runEffects = async () => {
    if (!processedImage && !originalImage) return alert('No image to process');
    const inputFile = await fetch(processedImage || originalImage).then(r => r.blob());
    const formData = new FormData();
    formData.append('file', new File([inputFile], 'image.png', { type: inputFile.type }));
    formData.append('effect_type', effectType);
    await sendToApi(API.effects, formData);
  };

  const runAdjust = async () => {
    if (!processedImage && !originalImage) return alert('No image to process');
    const inputFile = await fetch(processedImage || originalImage).then(r => r.blob());
    const formData = new FormData();
    formData.append('file', new File([inputFile], 'image.png', { type: inputFile.type }));
    Object.entries(adjustSettings).forEach(([k, v]) => formData.append(k, v));
    await sendToApi(API.adjust, formData);
  };

  const runDesign = async () => {
    if (!processedImage && !originalImage) return alert('No image to process');
    if (!designText) return alert('Enter text to add');
    const inputFile = await fetch(processedImage || originalImage).then(r => r.blob());
    const formData = new FormData();
    formData.append('file', new File([inputFile], 'image.png', { type: inputFile.type }));
    formData.append('text', designText);
    formData.append('text_x', designX);
    formData.append('text_y', designY);
    formData.append('text_color', designColor);
    formData.append('font_size', designFontSize);
    await sendToApi(API.design, formData);
  };

  return (
    <div className="remove-background">
      <div className="toolbar">
        <button onClick={() => setTab('cutout')} disabled={processing}>Cutout</button>
        <button onClick={() => setTab('background')} disabled={processing}>Background</button>
        <button onClick={() => setTab('effects')} disabled={processing}>Effects</button>
        <button onClick={() => setTab('adjust')} disabled={processing}>Adjust</button>
        <button onClick={() => setTab('design')} disabled={processing}>Design</button>
      </div>

      <div>
        <input type="file" onChange={e => handleFileUpload(e.target.files[0])} ref={fileInputRef} />
      </div>

      <div className="image-preview">
        {processedImage ? (
          <img src={processedImage} alt="Processed" />
        ) : originalImage ? (
          <img src={originalImage} alt="Original" />
        ) : <div>Upload an image</div>}
      </div>

      <div className="feature-panel">
        {tab === 'cutout' && (
          <div>
            <button onClick={runCutout} disabled={processing}>Remove Background (Cutout)</button>
          </div>
        )}

        {tab === 'background' && (
          <div>
            <label>
              Background Mode:
              <select value={bgMode} onChange={e => setBgMode(e.target.value)} disabled={processing}>
                <option value="color">Color</option>
                <option value="photo">Photo</option>
              </select>
            </label>
            {bgMode === 'color' && (
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} disabled={processing} />
            )}
            {bgMode === 'photo' && (
              <input type="file" accept="image/*" onChange={e => setBgPhotoFile(e.target.files[0])} disabled={processing} />
            )}
            <button onClick={runBackground} disabled={processing}>Apply Background</button>
          </div>
        )}

        {tab === 'effects' && (
          <div>
            <label>
              Effect:
              <select value={effectType} onChange={e => setEffectType(e.target.value)} disabled={processing}>
                <option value="blur">Blur</option>
                <option value="contour">Contour</option>
                <option value="grayscale">Grayscale</option>
                <option value="sharpen">Sharpen</option>
              </select>
            </label>
            <button onClick={runEffects} disabled={processing}>Apply Effect</button>
          </div>
        )}

        {tab === 'adjust' && (
          <div>
            <label>
              Brightness:
              <input type="number" step="0.1" min="0" max="5"
                value={adjustSettings.brightness}
                onChange={e => setAdjustSettings(s => ({ ...s, brightness: parseFloat(e.target.value) || 1 }))}
                disabled={processing} />
            </label>
            <label>
              Contrast:
              <input type="number" step="0.1" min="0" max="5"
                value={adjustSettings.contrast}
                onChange={e => setAdjustSettings(s => ({ ...s, contrast: parseFloat(e.target.value) || 1 }))}
                disabled={processing} />
            </label>
            <label>
              Rotate (deg):
              <input type="number" step="1"
                value={adjustSettings.rotate}
                onChange={e => setAdjustSettings(s => ({ ...s, rotate: parseInt(e.target.value) || 0 }))}
                disabled={processing} />
            </label>
            <label>
              Crop x:
              <input type="number" step="1"
                value={adjustSettings.crop_x}
                onChange={e => setAdjustSettings(s => ({ ...s, crop_x: parseInt(e.target.value) || 0 }))}
                disabled={processing} />
            </label>
            <label>
              Crop y:
              <input type="number" step="1"
                value={adjustSettings.crop_y}
                onChange={e => setAdjustSettings(s => ({ ...s, crop_y: parseInt(e.target.value) || 0 }))}
                disabled={processing} />
            </label>
            <label>
              Crop width:
              <input type="number" step="1" min="0"
                value={adjustSettings.crop_w}
                onChange={e => setAdjustSettings(s => ({ ...s, crop_w: parseInt(e.target.value) || 0 }))}
                disabled={processing} />
            </label>
            <label>
              Crop height:
              <input type="number" step="1" min="0"
                value={adjustSettings.crop_h}
                onChange={e => setAdjustSettings(s => ({ ...s, crop_h: parseInt(e.target.value) || 0 }))}
                disabled={processing} />
            </label>
            <button onClick={runAdjust} disabled={processing}>Apply Adjust</button>
          </div>
        )}

        {tab === 'design' && (
          <div>
            <label>
              Text:
              <input type="text" value={designText} onChange={e => setDesignText(e.target.value)} disabled={processing} />
            </label>
            <label>
              X:
              <input type="number" value={designX} onChange={e => setDesignX(parseInt(e.target.value) || 0)} disabled={processing} />
            </label>
            <label>
              Y:
              <input type="number" value={designY} onChange={e => setDesignY(parseInt(e.target.value) || 0)} disabled={processing} />
            </label>
            <label>
              Color:
              <input type="color" value={designColor} onChange={e => setDesignColor(e.target.value)} disabled={processing} />
            </label>
            <label>
              Font size:
              <input type="number" min="10" max="100" value={designFontSize} onChange={e => setDesignFontSize(parseInt(e.target.value) || 40)} disabled={processing} />
            </label>
            <button onClick={runDesign} disabled={processing}>Add Text</button>
          </div>
        )}
      </div>

      {processing && <p>Processing...</p>}
    </div>
  );
};

export default RemoveBackground;
