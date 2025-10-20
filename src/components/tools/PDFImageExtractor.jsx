// import React, { useState, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/PDFImageExtractor.css';

// const PDFImageExtractor = () => {
//   const { t } = useTranslation('pdfImageExtractor');
//   const { theme } = useTheme();
  
//   const [file, setFile] = useState(null);
//   const [originalFile, setOriginalFile] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [extractedImages, setExtractedImages] = useState([]);
//   const [pdfInfo, setPdfInfo] = useState(null);
//   const [settings, setSettings] = useState({
//     format: 'original',
//     quality: 'high',
//     extractAll: true,
//     includeThumbnails: false,
//     maxSize: 2048
//   });

//   const fileInputRef = useRef();

//   // Supported output formats
//   const formatOptions = [
//     { value: 'original', label: t('originalFormat'), description: t('originalDescription') },
//     { value: 'png', label: 'PNG', description: t('pngDescription') },
//     { value: 'jpg', label: 'JPG', description: t('jpgDescription') },
//     { value: 'webp', label: 'WebP', description: t('webpDescription') }
//   ];

//   // Quality options
//   const qualityOptions = [
//     { value: 'high', label: t('highQuality'), description: t('highDescription') },
//     { value: 'medium', label: t('mediumQuality'), description: t('mediumDescription') },
//     { value: 'low', label: t('lowQuality'), description: t('lowDescription') }
//   ];

//   // Handle PDF upload
//   const handleFileUpload = useCallback((uploadedFile) => {
//     if (!uploadedFile) return;
    
//     if (uploadedFile.size > 50 * 1024 * 1024) {
//       alert(t('fileTooLarge'));
//       return;
//     }
    
//     if (uploadedFile.type !== 'application/pdf') {
//       alert(t('invalidFile'));
//       return;
//     }

//     setFile(uploadedFile);
//     setOriginalFile(uploadedFile);
//     setExtractedImages([]);
//     setPdfInfo(null);

//     // Read PDF metadata
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       // In a real implementation, you would parse PDF metadata here
//       const fileSize = (uploadedFile.size / 1024 / 1024).toFixed(2);
//       setPdfInfo({
//         name: uploadedFile.name,
//         size: fileSize,
//         pages: 'Scanning...', // Would be determined during processing
//         images: 'Unknown'
//       });
//     };
//     reader.readAsArrayBuffer(uploadedFile);
//   }, [t]);

//   // Handle drag and drop
//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     const uploadedFile = e.dataTransfer.files[0];
//     handleFileUpload(uploadedFile);
//   }, [handleFileUpload]);

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//   }, []);

//   // Extract images from PDF
//   const extractImages = async () => {
//     if (!file) {
//       alert(t('uploadFirst'));
//       return;
//     }

//     setProcessing(true);
//     setExtractedImages([]);

//     try {
//       // Simulate API call to backend for PDF processing
//       // In real implementation, this would connect to your backend
//       const formData = new FormData();
//       formData.append('pdf', file);
//       formData.append('format', settings.format);
//       formData.append('quality', settings.quality);
//       formData.append('extractAll', settings.extractAll);
//       formData.append('includeThumbnails', settings.includeThumbnails);
//       formData.append('maxSize', settings.maxSize);

//       // Simulate processing delay
//       await new Promise(resolve => setTimeout(resolve, 3000));

//       // Mock extracted images data
//       const mockImages = [
//         {
//           id: 1,
//           name: 'diagram-1.png',
//           originalName: 'Figure 1',
//           page: 3,
//           format: 'png',
//           size: '245 KB',
//           dimensions: '1200x800',
//           url: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Diagram+1', // Mock image
//           thumbnail: 'https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Diagram+1'
//         },
//         {
//           id: 2,
//           name: 'chart-2.png',
//           originalName: 'Chart A',
//           page: 5,
//           format: 'png',
//           size: '180 KB',
//           dimensions: '800x600',
//           url: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Chart+2',
//           thumbnail: 'https://via.placeholder.com/150x100/10B981/FFFFFF?text=Chart+2'
//         },
//         {
//           id: 3,
//           name: 'screenshot-3.png',
//           originalName: 'Screenshot',
//           page: 8,
//           format: 'png',
//           size: '320 KB',
//           dimensions: '1600x900',
//           url: 'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Screenshot+3',
//           thumbnail: 'https://via.placeholder.com/150x100/F59E0B/FFFFFF?text=Screenshot+3'
//         },
//         {
//           id: 4,
//           name: 'graph-4.png',
//           originalName: 'Graph B',
//           page: 12,
//           format: 'png',
//           size: '195 KB',
//           dimensions: '1000x700',
//           url: 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Graph+4',
//           thumbnail: 'https://via.placeholder.com/150x100/EF4444/FFFFFF?text=Graph+4'
//         }
//       ];

//       setExtractedImages(mockImages);
//       setPdfInfo(prev => ({
//         ...prev,
//         pages: '15', // Mock page count
//         images: mockImages.length.toString()
//       }));

//     } catch (error) {
//       console.error('PDF extraction error:', error);
//       alert(t('extractionError'));
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Download single image
//   const downloadImage = (image) => {
//     const link = document.createElement('a');
//     link.download = image.name;
//     link.href = image.url;
//     link.click();
//   };

//   // Download all images as zip
//   const downloadAllImages = () => {
//     if (extractedImages.length === 0) return;
    
//     // In real implementation, this would download a zip file
//     alert(t('zipDownloadMessage'));
//     extractedImages.forEach(image => downloadImage(image));
//   };

//   // Download selected images
//   const downloadSelectedImages = (selectedIds) => {
//     if (selectedIds.length === 0) return;
    
//     const selectedImages = extractedImages.filter(img => selectedIds.includes(img.id));
//     selectedImages.forEach(image => downloadImage(image));
//   };

//   // Clear all
//   const clearAll = () => {
//     setFile(null);
//     setOriginalFile(null);
//     setExtractedImages([]);
//     setPdfInfo(null);
//     setSettings({
//       format: 'original',
//       quality: 'high',
//       extractAll: true,
//       includeThumbnails: false,
//       maxSize: 2048
//     });
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Select/Deselect all images
//   const [selectedImages, setSelectedImages] = useState(new Set());

//   const toggleImageSelection = (imageId) => {
//     const newSelected = new Set(selectedImages);
//     if (newSelected.has(imageId)) {
//       newSelected.delete(imageId);
//     } else {
//       newSelected.add(imageId);
//     }
//     setSelectedImages(newSelected);
//   };

//   const selectAllImages = () => {
//     if (selectedImages.size === extractedImages.length) {
//       setSelectedImages(new Set());
//     } else {
//       setSelectedImages(new Set(extractedImages.map(img => img.id)));
//     }
//   };

//   return (
//     <div className={`pdf-image-extractor ${theme}`}>
//       <div className="tool-header">
//         <h1>{t('title')}</h1>
//         <p>{t('subtitle')}</p>
//       </div>

//       <div className="extractor-container">
//         {/* Upload Section */}
//         <div className="upload-section">
//           <div 
//             className="upload-area"
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             {!file ? (
//               <div className="upload-content">
//                 <div className="upload-icon">📄</div>
//                 <h3>{t('uploadArea')}</h3>
//                 <p>{t('dragDrop')}</p>
//                 <small>{t('supportedFormats')}</small>
//                 <small>{t('maxSize')}</small>
//               </div>
//             ) : (
//               <div className="file-preview">
//                 <div className="file-icon">📄</div>
//                 <div className="file-info">
//                   <strong>{file.name}</strong>
//                   <div className="file-details">
//                     <span>📏 {(file.size / 1024 / 1024).toFixed(2)} MB</span>
//                     {pdfInfo && (
//                       <>
//                         <span>📑 {pdfInfo.pages} {t('pages')}</span>
//                         <span>🖼️ {pdfInfo.images} {t('images')}</span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf,application/pdf"
//               onChange={(e) => handleFileUpload(e.target.files[0])}
//               style={{ display: 'none' }}
//             />
//           </div>
//         </div>

//         {/* Settings Section */}
//         {file && (
//           <div className="settings-section">
//             <h3>{t('extractionSettings')}</h3>
            
//             <div className="settings-grid">
//               {/* Format Selection */}
//               <div className="setting-group">
//                 <label>{t('outputFormat')}</label>
//                 <div className="format-options">
//                   {formatOptions.map(format => (
//                     <div
//                       key={format.value}
//                       className={`format-option ${settings.format === format.value ? 'active' : ''}`}
//                       onClick={() => setSettings(prev => ({ ...prev, format: format.value }))}
//                     >
//                       <div className="format-header">
//                         <span className="format-label">{format.label}</span>
//                       </div>
//                       <p className="format-description">{format.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quality Settings */}
//               <div className="setting-group">
//                 <label>{t('imageQuality')}</label>
//                 <div className="quality-options">
//                   {qualityOptions.map(quality => (
//                     <div
//                       key={quality.value}
//                       className={`quality-option ${settings.quality === quality.value ? 'active' : ''}`}
//                       onClick={() => setSettings(prev => ({ ...prev, quality: quality.value }))}
//                     >
//                       <span className="quality-label">{quality.label}</span>
//                       <span className="quality-description">{quality.description}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Extraction Options */}
//               <div className="setting-group">
//                 <label>{t('extractionOptions')}</label>
//                 <div className="checkbox-options">
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       checked={settings.extractAll}
//                       onChange={(e) => setSettings(prev => ({ ...prev, extractAll: e.target.checked }))}
//                     />
//                     <span className="checkmark"></span>
//                     {t('extractAllImages')}
//                   </label>
                  
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       checked={settings.includeThumbnails}
//                       onChange={(e) => setSettings(prev => ({ ...prev, includeThumbnails: e.target.checked }))}
//                     />
//                     <span className="checkmark"></span>
//                     {t('includeThumbnails')}
//                   </label>
//                 </div>
//               </div>

//               {/* Advanced Settings */}
//               <div className="setting-group">
//                 <label>{t('advancedSettings')}</label>
//                 <div className="advanced-options">
//                   <div className="option-row">
//                     <label>
//                       {t('maxDimension')}: {settings.maxSize}px
//                     </label>
//                     <input
//                       type="range"
//                       min="512"
//                       max="4096"
//                       step="128"
//                       value={settings.maxSize}
//                       onChange={(e) => setSettings(prev => ({ ...prev, maxSize: parseInt(e.target.value) }))}
//                       className="slider"
//                     />
//                     <span className="size-value">{settings.maxSize}px</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Extract Button */}
//             <div className="extract-section">
//               <button 
//                 onClick={extractImages}
//                 className={`extract-btn ${processing ? 'processing' : ''}`}
//                 disabled={processing}
//               >
//                 {processing ? (
//                   <>
//                     <span className="spinner"></span>
//                     {t('extracting')}
//                   </>
//                 ) : (
//                   `🔍 ${t('extractImages')}`
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Results Section */}
//         {extractedImages.length > 0 && (
//           <div className="results-section">
//             <div className="results-header">
//               <div className="results-info">
//                 <h3>{t('extractedImages')} ({extractedImages.length})</h3>
//                 <p className="results-description">{t('resultsDescription')}</p>
//               </div>
//               <div className="results-actions">
//                 <div className="selection-info">
//                   {selectedImages.size > 0 && (
//                     <span>{selectedImages.size} {t('selected')}</span>
//                   )}
//                 </div>
//                 <div className="action-buttons">
//                   {selectedImages.size > 0 && (
//                     <button 
//                       onClick={() => downloadSelectedImages(Array.from(selectedImages))}
//                       className="action-btn primary"
//                     >
//                       ⬇️ {t('downloadSelected')} ({selectedImages.size})
//                     </button>
//                   )}
//                   <button onClick={downloadAllImages} className="action-btn secondary">
//                     📦 {t('downloadAll')}
//                   </button>
//                   <button onClick={selectAllImages} className="action-btn outline">
//                     {selectedImages.size === extractedImages.length ? t('deselectAll') : t('selectAll')}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="images-grid">
//               {extractedImages.map((image) => (
//                 <div 
//                   key={image.id} 
//                   className={`image-card ${selectedImages.has(image.id) ? 'selected' : ''}`}
//                   onClick={() => toggleImageSelection(image.id)}
//                 >
//                   <div className="image-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={selectedImages.has(image.id)}
//                       onChange={() => toggleImageSelection(image.id)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                   </div>
//                   <div className="image-preview">
//                     <img src={image.thumbnail} alt={image.originalName} />
//                     <div className="image-overlay">
//                       <button 
//                         className="preview-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           window.open(image.url, '_blank');
//                         }}
//                       >
//                         🔍 {t('preview')}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="image-info">
//                     <div className="image-meta">
//                       <span className="image-name">{image.originalName}</span>
//                       <span className="image-format">{image.format.toUpperCase()}</span>
//                     </div>
//                     <div className="image-details">
//                       <span className="image-page">📄 {t('page')} {image.page}</span>
//                       <span className="image-size">💾 {image.size}</span>
//                       <span className="image-dimensions">📐 {image.dimensions}</span>
//                     </div>
//                     <button 
//                       className="download-single-btn"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         downloadImage(image);
//                       }}
//                     >
//                       ⬇️ {t('download')}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary Section */}
//             <div className="summary-section">
//               <div className="summary-card">
//                 <h4>📊 {t('extractionSummary')}</h4>
//                 <div className="summary-stats">
//                   <div className="stat">
//                     <span className="stat-value">{extractedImages.length}</span>
//                     <span className="stat-label">{t('totalImages')}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">
//                       {extractedImages.reduce((acc, img) => {
//                         const size = parseFloat(img.size);
//                         return acc + (isNaN(size) ? 0 : size);
//                       }, 0).toFixed(0)} KB
//                     </span>
//                     <span className="stat-label">{t('totalSize')}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">
//                       {Math.max(...extractedImages.map(img => {
//                         const [width] = img.dimensions.split('x').map(Number);
//                         return isNaN(width) ? 0 : width;
//                       }))}px
//                     </span>
//                     <span className="stat-label">{t('largestImage')}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">
//                       {new Set(extractedImages.map(img => img.page)).size}
//                     </span>
//                     <span className="stat-label">{t('pagesWithImages')}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tips Section */}
//         <div className="tips-section">
//           <h3>💡 {t('tips')}</h3>
//           <div className="tips-list">
//             <div className="tip-item">
//               <span className="tip-icon">🎯</span>
//               <div>
//                 <strong>{t('tip1Title')}</strong>
//                 <p>{t('tip1Description')}</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">📐</span>
//               <div>
//                 <strong>{t('tip2Title')}</strong>
//                 <p>{t('tip2Description')}</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">⚡</span>
//               <div>
//                 <strong>{t('tip3Title')}</strong>
//                 <p>{t('tip3Description')}</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">🔍</span>
//               <div>
//                 <strong>{t('tip4Title')}</strong>
//                 <p>{t('tip4Description')}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Status Section */}
//         <div className="status-section">
//           <div className="status-indicator">
//             <div className={`status-dot ${processing ? 'processing' : extractedImages.length > 0 ? 'success' : 'ready'}`}></div>
//             <span>
//               {processing ? t('processingStatus') : 
//                extractedImages.length > 0 ? t('successStatus') : t('readyStatus')}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFImageExtractor;




// import React, { useState, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/PDFImageExtractor.css';

// const PDFImageExtractor = () => {
//   const { t } = useTranslation('pdfImageExtractor');
//   const { theme } = useTheme();
  
//   const [file, setFile] = useState(null);
//   const [originalFile, setOriginalFile] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [extractedImages, setExtractedImages] = useState([]);
//   const [pdfInfo, setPdfInfo] = useState(null);
//   const [settings, setSettings] = useState({
//     format: 'original',
//     quality: 'high',
//     extractAll: true,
//     includeThumbnails: false,
//     maxSize: 2048
//   });

//   const fileInputRef = useRef();

//   const formatOptions = [
//     { value: 'original', label: t('originalFormat'), description: t('originalDescription') },
//     { value: 'png', label: 'PNG', description: t('pngDescription') },
//     { value: 'jpg', label: 'JPG', description: t('jpgDescription') },
//     { value: 'webp', label: 'WebP', description: t('webpDescription') }
//   ];

//   const qualityOptions = [
//     { value: 'high', label: t('highQuality'), description: t('highDescription') },
//     { value: 'medium', label: t('mediumQuality'), description: t('mediumDescription') },
//     { value: 'low', label: t('lowQuality'), description: t('lowDescription') }
//   ];

//   // Upload and preview
//   const handleFileUpload = useCallback((uploadedFile) => {
//     if (!uploadedFile) return;
//     if (uploadedFile.size > 50 * 1024 * 1024) { alert(t('fileTooLarge')); return; }
//     if (uploadedFile.type !== 'application/pdf') { alert(t('invalidFile')); return; }

//     setFile(uploadedFile);
//     setOriginalFile(uploadedFile);
//     setExtractedImages([]);
//     setPdfInfo(null);

//     const reader = new FileReader();
//     reader.onload = () => {
//       const fileSize = (uploadedFile.size / 1024 / 1024).toFixed(2);
//       setPdfInfo({ name: uploadedFile.name, size: fileSize, pages: 'Scanning...', images: 'Unknown' });
//     };
//     reader.readAsArrayBuffer(uploadedFile);
//   }, [t]);

//   const handleDrop = useCallback((e) => { e.preventDefault(); handleFileUpload(e.dataTransfer.files[0]); }, [handleFileUpload]);
//   const handleDragOver = useCallback((e) => { e.preventDefault(); }, []);

//   // Extract images (backend integrated)
//   const extractImages = async () => {
//     if (!file) { alert(t('uploadFirst')); return; }
//     setProcessing(true);
//     setExtractedImages([]);

//     try {
//       const formData = new FormData();
//       formData.append('pdf', file);
//       formData.append('format', settings.format);
//       formData.append('quality', settings.quality);
//       formData.append('extractAll', settings.extractAll);
//       formData.append('includeThumbnails', settings.includeThumbnails);
//       formData.append('maxSize', settings.maxSize);

//       const res = await fetch('http://localhost:8000/extract-pdf-images', {
//         method: 'POST',
//         body: formData
//       });

//       const data = await res.json();
//       if (data.success) {
//         setExtractedImages(data.images);
//         setPdfInfo(prev => ({ ...prev, pages: data.total_pages, images: data.total_images }));
//       } else {
//         alert('Error: ' + data.error);
//       }

//     } catch (err) {
//       console.error(err);
//       alert(t('extractionError'));
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Download single image
//   const downloadImage = (image) => {
//     const link = document.createElement('a');
//     link.download = image.name;
//     link.href = image.url;
//     link.click();
//   };

//   // Download all or selected
//   const downloadAllImages = () => extractedImages.forEach(img => downloadImage(img));
//   const downloadSelectedImages = (selectedIds) => {
//     extractedImages.filter(img => selectedIds.includes(img.id)).forEach(img => downloadImage(img));
//   };

//   // Clear
//   const clearAll = () => {
//     setFile(null); setOriginalFile(null); setExtractedImages([]); setPdfInfo(null);
//     setSettings({ format: 'original', quality: 'high', extractAll: true, includeThumbnails: false, maxSize: 2048 });
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   // Image selection
//   const [selectedImages, setSelectedImages] = useState(new Set());
//   const toggleImageSelection = (id) => {
//     const newSet = new Set(selectedImages);
//     newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//     setSelectedImages(newSet);
//   };
//   const selectAllImages = () => {
//     setSelectedImages(selectedImages.size === extractedImages.length ? new Set() : new Set(extractedImages.map(img => img.id)));
//   };

//   return (
//     <div className={`pdf-image-extractor ${theme}`}>
//       <div className="tool-header">
//         <h1>{t('title')}</h1>
//         <p>{t('subtitle')}</p>
//       </div>

//       {/* Upload Section */}
//       <div className="extractor-container">
//         <div className="upload-section">
//           <div className="upload-area" onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => fileInputRef.current?.click()}>
//             {!file ? (
//               <div className="upload-content">
//                 <div className="upload-icon">📄</div>
//                 <h3>{t('uploadArea')}</h3>
//                 <p>{t('dragDrop')}</p>
//                 <small>{t('supportedFormats')}</small>
//                 <small>{t('maxSize')}</small>
//               </div>
//             ) : (
//               <div className="file-preview">
//                 <div className="file-icon">📄</div>
//                 <div className="file-info">
//                   <strong>{file.name}</strong>
//                   <div className="file-details">
//                     <span>📏 {(file.size / 1024 / 1024).toFixed(2)} MB</span>
//                     {pdfInfo && (
//                       <>
//                         <span>📑 {pdfInfo.pages} {t('pages')}</span>
//                         <span>🖼️ {pdfInfo.images} {t('images')}</span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={(e) => handleFileUpload(e.target.files[0])} style={{ display: 'none' }} />
//           </div>
//         </div>

//         {/* Settings & Extract Button */}
//         {file && (
//           <div className="settings-section">
//             <h3>{t('extractionSettings')}</h3>
//             <div className="settings-grid">
//               <div className="setting-group">
//                 <label>{t('outputFormat')}</label>
//                 <div className="format-options">
//                   {formatOptions.map(f => (
//                     <div key={f.value} className={`format-option ${settings.format === f.value ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, format: f.value }))}>
//                       <div className="format-header"><span className="format-label">{f.label}</span></div>
//                       <p className="format-description">{f.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="setting-group">
//                 <label>{t('imageQuality')}</label>
//                 <div className="quality-options">
//                   {qualityOptions.map(q => (
//                     <div key={q.value} className={`quality-option ${settings.quality === q.value ? 'active' : ''}`} onClick={() => setSettings(prev => ({ ...prev, quality: q.value }))}>
//                       <span className="quality-label">{q.label}</span>
//                       <span className="quality-description">{q.description}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="extract-section">
//               <button onClick={extractImages} className={`extract-btn ${processing ? 'processing' : ''}`} disabled={processing}>
//                 {processing ? <><span className="spinner"></span>{t('extracting')}</> : `🔍 ${t('extractImages')}`}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Results Section */}
//         {extractedImages.length > 0 && (
//           <div className="results-section">
//             <div className="results-header">
//               <h3>{t('extractedImages')} ({extractedImages.length})</h3>
//               <button onClick={() => downloadSelectedImages(Array.from(selectedImages))} disabled={selectedImages.size === 0}>⬇️ {t('downloadSelected')}</button>
//               <button onClick={downloadAllImages}>📦 {t('downloadAll')}</button>
//               <button onClick={selectAllImages}>{selectedImages.size === extractedImages.length ? t('deselectAll') : t('selectAll')}</button>
//             </div>

//             <div className="images-grid">
//               {extractedImages.map(img => (
//                 <div key={img.id} className={`image-card ${selectedImages.has(img.id) ? 'selected' : ''}`} onClick={() => toggleImageSelection(img.id)}>
//                   <input type="checkbox" checked={selectedImages.has(img.id)} onChange={() => toggleImageSelection(img.id)} onClick={e => e.stopPropagation()} />
//                   <img src={img.url} alt={img.name} />
//                   <div className="image-info">
//                     <span>{img.name}</span>
//                     <span>📄 {t('page')} {img.page}</span>
//                     <span>💾 {img.size}</span>
//                     <span>📐 {img.dimensions}</span>
//                     <button onClick={e => { e.stopPropagation(); downloadImage(img); }}>⬇️ {t('download')}</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFImageExtractor;














// import React, { useState, useRef, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '../../contexts/ThemeContext';
// import '../../styles/tools/PDFImageExtractor.css';

// const PDFImageExtractor = () => {
//   const { t } = useTranslation('pdfImageExtractor');
//   const { theme } = useTheme();
  
//   const [file, setFile] = useState(null);
//   const [originalFile, setOriginalFile] = useState(null);
//   const [processing, setProcessing] = useState(false);
//   const [extractedImages, setExtractedImages] = useState([]);
//   const [pdfInfo, setPdfInfo] = useState(null);
//   const [settings, setSettings] = useState({
//     format: 'original',
//     quality: 'high',
//     extractAll: true,
//     includeThumbnails: false,
//     maxSize: 2048
//   });

//   const fileInputRef = useRef();

//   // API base URL
//   const API_BASE_URL = 'http://localhost:8000';

//   // Supported output formats
//   const formatOptions = [
//     { value: 'original', label: t('originalFormat'), description: t('originalDescription') },
//     { value: 'png', label: 'PNG', description: t('pngDescription') },
//     { value: 'jpg', label: 'JPG', description: t('jpgDescription') },
//     { value: 'webp', label: 'WebP', description: t('webpDescription') }
//   ];

//   // Quality options - updated to match API
//   const qualityOptions = [
//     { value: 'high', label: t('highQuality'), description: t('highDescription') },
//     { value: 'medium', label: t('mediumQuality'), description: t('mediumDescription') },
//     { value: 'low', label: t('lowQuality'), description: t('lowDescription') }
//   ];

//   // Handle PDF upload
//   const handleFileUpload = useCallback((uploadedFile) => {
//     if (!uploadedFile) return;
    
//     if (uploadedFile.size > 50 * 1024 * 1024) {
//       alert(t('fileTooLarge'));
//       return;
//     }
    
//     if (uploadedFile.type !== 'application/pdf') {
//       alert(t('invalidFile'));
//       return;
//     }

//     setFile(uploadedFile);
//     setOriginalFile(uploadedFile);
//     setExtractedImages([]);
//     setPdfInfo(null);

//     // Set initial PDF info
//     const fileSize = (uploadedFile.size / 1024 / 1024).toFixed(2);
//     setPdfInfo({
//       name: uploadedFile.name,
//       size: fileSize,
//       pages: 'Unknown',
//       images: 'Unknown'
//     });
//   }, [t]);

//   // Handle drag and drop
//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     const uploadedFile = e.dataTransfer.files[0];
//     handleFileUpload(uploadedFile);
//   }, [handleFileUpload]);

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//   }, []);

//   // Extract images from PDF using the Flask API
//   const extractImages = async () => {
//     if (!file) {
//       alert(t('uploadFirst'));
//       return;
//     }

//     setProcessing(true);
//     setExtractedImages([]);

//     try {
//       const formData = new FormData();
//       formData.append('pdf', file);
//       formData.append('format', settings.format);
//       formData.append('quality', settings.quality);
//       formData.append('extractAll', settings.extractAll.toString());
//       formData.append('includeThumbnails', settings.includeThumbnails.toString());
//       formData.append('maxSize', settings.maxSize.toString());

//       const response = await fetch(`${API_BASE_URL}/extract-pdf-images`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || t('extractionError'));
//       }

//       const data = await response.json();

//       if (!data.success) {
//         throw new Error(data.error || t('extractionError'));
//       }

//       // Process the API response
//       const processedImages = data.images.map((img, index) => ({
//         id: img.id || index + 1,
//         name: img.name,
//         originalName: `Image from page ${img.page}`,
//         page: img.page,
//         format: img.format,
//         size: img.size,
//         dimensions: img.dimensions,
//         url: img.url,
//         thumbnail: img.thumbnail || img.url // Fallback to main image if no thumbnail
//       }));

//       setExtractedImages(processedImages);
//       setPdfInfo(prev => ({
//         ...prev,
//         pages: data.total_pages?.toString() || 'Unknown',
//         images: data.images?.length.toString() || '0'
//       }));

//     } catch (error) {
//       console.error('PDF extraction error:', error);
//       alert(error.message || t('extractionError'));
//     } finally {
//       setProcessing(false);
//     }
//   };

//   // Download single image
//   const downloadImage = async (image) => {
//     try {
//       const response = await fetch(image.url);
//       if (!response.ok) throw new Error('Download failed');
      
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = image.name;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Download error:', error);
//       alert(t('downloadError'));
//     }
//   };

//   // Download all images
//   const downloadAllImages = async () => {
//     if (extractedImages.length === 0) return;
    
//     // Download each image individually
//     for (const image of extractedImages) {
//       await downloadImage(image);
//       // Small delay to avoid overwhelming the browser
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
//   };

//   // Download selected images
//   const downloadSelectedImages = async (selectedIds) => {
//     if (selectedIds.length === 0) return;
    
//     const selectedImages = extractedImages.filter(img => selectedIds.includes(img.id));
//     for (const image of selectedImages) {
//       await downloadImage(image);
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }
//   };

//   // Clear all
//   const clearAll = () => {
//     setFile(null);
//     setOriginalFile(null);
//     setExtractedImages([]);
//     setPdfInfo(null);
//     setSettings({
//       format: 'original',
//       quality: 'high',
//       extractAll: true,
//       includeThumbnails: false,
//       maxSize: 2048
//     });
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Select/Deselect all images
//   const [selectedImages, setSelectedImages] = useState(new Set());

//   const toggleImageSelection = (imageId) => {
//     const newSelected = new Set(selectedImages);
//     if (newSelected.has(imageId)) {
//       newSelected.delete(imageId);
//     } else {
//       newSelected.add(imageId);
//     }
//     setSelectedImages(newSelected);
//   };

//   const selectAllImages = () => {
//     if (selectedImages.size === extractedImages.length) {
//       setSelectedImages(new Set());
//     } else {
//       setSelectedImages(new Set(extractedImages.map(img => img.id)));
//     }
//   };

//   // Preview image in new tab
//   const previewImage = (image) => {
//     window.open(image.url, '_blank');
//   };

//   return (
//     <div className={`pdf-image-extractor ${theme}`}>
//       <div className="tool-header">
//         <h1>{t('title')}</h1>
//         <p>{t('subtitle')}</p>
//       </div>

//       <div className="extractor-container">
//         {/* Upload Section */}
//         <div className="upload-section">
//           <div 
//             className="upload-area"
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             {!file ? (
//               <div className="upload-content">
//                 <div className="upload-icon">📄</div>
//                 <h3>{t('uploadArea')}</h3>
//                 <p>{t('dragDrop')}</p>
//                 <small>{t('supportedFormats')}</small>
//                 <small>{t('maxSize')}</small>
//               </div>
//             ) : (
//               <div className="file-preview">
//                 <div className="file-icon">📄</div>
//                 <div className="file-info">
//                   <strong>{file.name}</strong>
//                   <div className="file-details">
//                     <span>📏 {(file.size / 1024 / 1024).toFixed(2)} MB</span>
//                     {pdfInfo && (
//                       <>
//                         <span>📑 {pdfInfo.pages} {t('pages')}</span>
//                         <span>🖼️ {pdfInfo.images} {t('images')}</span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf,application/pdf"
//               onChange={(e) => handleFileUpload(e.target.files[0])}
//               style={{ display: 'none' }}
//             />
//           </div>
//         </div>

//         {/* Settings Section */}
//         {file && (
//           <div className="settings-section">
//             <h3>{t('extractionSettings')}</h3>
            
//             <div className="settings-grid">
//               {/* Format Selection */}
//               <div className="setting-group">
//                 <label>{t('outputFormat')}</label>
//                 <div className="format-options">
//                   {formatOptions.map(format => (
//                     <div
//                       key={format.value}
//                       className={`format-option ${settings.format === format.value ? 'active' : ''}`}
//                       onClick={() => setSettings(prev => ({ ...prev, format: format.value }))}
//                     >
//                       <div className="format-header">
//                         <span className="format-label">{format.label}</span>
//                       </div>
//                       <p className="format-description">{format.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quality Settings */}
//               <div className="setting-group">
//                 <label>{t('imageQuality')}</label>
//                 <div className="quality-options">
//                   {qualityOptions.map(quality => (
//                     <div
//                       key={quality.value}
//                       className={`quality-option ${settings.quality === quality.value ? 'active' : ''}`}
//                       onClick={() => setSettings(prev => ({ ...prev, quality: quality.value }))}
//                     >
//                       <span className="quality-label">{quality.label}</span>
//                       <span className="quality-description">{quality.description}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Extraction Options */}
//               <div className="setting-group">
//                 <label>{t('extractionOptions')}</label>
//                 <div className="checkbox-options">
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       checked={settings.extractAll}
//                       onChange={(e) => setSettings(prev => ({ ...prev, extractAll: e.target.checked }))}
//                     />
//                     <span className="checkmark"></span>
//                     {t('extractAllImages')}
//                   </label>
                  
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       checked={settings.includeThumbnails}
//                       onChange={(e) => setSettings(prev => ({ ...prev, includeThumbnails: e.target.checked }))}
//                     />
//                     <span className="checkmark"></span>
//                     {t('includeThumbnails')}
//                   </label>
//                 </div>
//               </div>

//               {/* Advanced Settings */}
//               <div className="setting-group">
//                 <label>{t('advancedSettings')}</label>
//                 <div className="advanced-options">
//                   <div className="option-row">
//                     <label>
//                       {t('maxDimension')}: {settings.maxSize}px
//                     </label>
//                     <input
//                       type="range"
//                       min="512"
//                       max="4096"
//                       step="128"
//                       value={settings.maxSize}
//                       onChange={(e) => setSettings(prev => ({ ...prev, maxSize: parseInt(e.target.value) }))}
//                       className="slider"
//                     />
//                     <span className="size-value">{settings.maxSize}px</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Extract Button */}
//             <div className="extract-section">
//               <button 
//                 onClick={extractImages}
//                 className={`extract-btn ${processing ? 'processing' : ''}`}
//                 disabled={processing}
//               >
//                 {processing ? (
//                   <>
//                     <span className="spinner"></span>
//                     {t('extracting')}
//                   </>
//                 ) : (
//                   `🔍 ${t('extractImages')}`
//                 )}
//               </button>
              
//               {processing && (
//                 <div className="processing-info">
//                   <small>{t('aiProcessing')}</small>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Results Section */}
//         {extractedImages.length > 0 && (
//           <div className="results-section">
//             <div className="results-header">
//               <div className="results-info">
//                 <h3>{t('extractedImages')} ({extractedImages.length})</h3>
//                 <p className="results-description">{t('resultsDescription')}</p>
//               </div>
//               <div className="results-actions">
//                 <div className="selection-info">
//                   {selectedImages.size > 0 && (
//                     <span>{selectedImages.size} {t('selected')}</span>
//                   )}
//                 </div>
//                 <div className="action-buttons">
//                   {selectedImages.size > 0 && (
//                     <button 
//                       onClick={() => downloadSelectedImages(Array.from(selectedImages))}
//                       className="action-btn primary"
//                     >
//                       ⬇️ {t('downloadSelected')} ({selectedImages.size})
//                     </button>
//                   )}
//                   <button onClick={downloadAllImages} className="action-btn secondary">
//                     📦 {t('downloadAll')}
//                   </button>
//                   <button onClick={selectAllImages} className="action-btn outline">
//                     {selectedImages.size === extractedImages.length ? t('deselectAll') : t('selectAll')}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="images-grid">
//               {extractedImages.map((image) => (
//                 <div 
//                   key={image.id} 
//                   className={`image-card ${selectedImages.has(image.id) ? 'selected' : ''}`}
//                   onClick={() => toggleImageSelection(image.id)}
//                 >
//                   <div className="image-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={selectedImages.has(image.id)}
//                       onChange={() => toggleImageSelection(image.id)}
//                       onClick={(e) => e.stopPropagation()}
//                     />
//                   </div>
//                   <div className="image-preview">
//                     <img 
//                       src={image.thumbnail} 
//                       alt={image.originalName}
//                       onError={(e) => {
//                         // Fallback to main image if thumbnail fails to load
//                         e.target.src = image.url;
//                       }}
//                     />
//                     <div className="image-overlay">
//                       <button 
//                         className="preview-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           previewImage(image);
//                         }}
//                       >
//                         🔍 {t('preview')}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="image-info">
//                     <div className="image-meta">
//                       <span className="image-name">{image.originalName}</span>
//                       <span className="image-format">{image.format.toUpperCase()}</span>
//                     </div>
//                     <div className="image-details">
//                       <span className="image-page">📄 {t('page')} {image.page}</span>
//                       <span className="image-size">💾 {image.size}</span>
//                       <span className="image-dimensions">📐 {image.dimensions}</span>
//                     </div>
//                     <button 
//                       className="download-single-btn"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         downloadImage(image);
//                       }}
//                     >
//                       ⬇️ {t('download')}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary Section */}
//             <div className="summary-section">
//               <div className="summary-card">
//                 <h4>📊 {t('extractionSummary')}</h4>
//                 <div className="summary-stats">
//                   <div className="stat">
//                     <span className="stat-value">{extractedImages.length}</span>
//                     <span className="stat-label">{t('totalImages')}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">
//                       {extractedImages.reduce((acc, img) => {
//                         const sizeMatch = img.size.match(/(\d+)/);
//                         const size = sizeMatch ? parseInt(sizeMatch[1]) : 0;
//                         return acc + size;
//                       }, 0)} KB
//                     </span>
//                     <span className="stat-label">{t('totalSize')}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">
//                       {Math.max(...extractedImages.map(img => {
//                         const [width] = img.dimensions.split('x').map(Number);
//                         return isNaN(width) ? 0 : width;
//                       }))}px
//                     </span>
//                     <span className="stat-label">{t('largestImage')}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-value">
//                       {new Set(extractedImages.map(img => img.page)).size}
//                     </span>
//                     <span className="stat-label">{t('pagesWithImages')}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tips Section */}
//         <div className="tips-section">
//           <h3>💡 {t('tips')}</h3>
//           <div className="tips-list">
//             <div className="tip-item">
//               <span className="tip-icon">🤖</span>
//               <div>
//                 <strong>{t('tipAITitle')}</strong>
//                 <p>{t('tipAIDescription')}</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">🎯</span>
//               <div>
//                 <strong>{t('tip1Title')}</strong>
//                 <p>{t('tip1Description')}</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">📐</span>
//               <div>
//                 <strong>{t('tip2Title')}</strong>
//                 <p>{t('tip2Description')}</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">⚡</span>
//               <div>
//                 <strong>{t('tip3Title')}</strong>
//                 <p>{t('tip3Description')}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Status Section */}
//         <div className="status-section">
//           <div className="status-indicator">
//             <div className={`status-dot ${processing ? 'processing' : extractedImages.length > 0 ? 'success' : 'ready'}`}></div>
//             <span>
//               {processing ? t('processingStatus') : 
//                extractedImages.length > 0 ? t('successStatus') : t('readyStatus')}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFImageExtractor;

























import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/tools/PDFImageExtractor.css';

const PDFImageExtractor = () => {
  const { t } = useTranslation('pdfImageExtractor');
  const { theme } = useTheme();
  
  const [file, setFile] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [extractedImages, setExtractedImages] = useState([]);
  const [pdfInfo, setPdfInfo] = useState(null);
  const [settings, setSettings] = useState({
    format: 'original',
    quality: 'high',
    extractAll: true,
    includeThumbnails: false,
    maxSize: 2048
  });

  const fileInputRef = useRef(null);

  // API base URL - match your Flask server
  const API_BASE_URL = 'http://localhost:8000';

  // Supported output formats - updated to match API
  const formatOptions = [
    { value: 'original', label: t('originalFormat'), description: t('originalDescription') },
    { value: 'jpg', label: 'JPG', description: t('jpgDescription') },
    { value: 'jpeg', label: 'JPEG', description: t('jpgDescription') },
    { value: 'png', label: 'PNG', description: t('pngDescription') }
  ];

  // Quality options - updated to match API exactly
  const qualityOptions = [
    { value: 'high', label: t('highQuality'), description: t('highDescription') },
    { value: 'medium', label: t('mediumQuality'), description: t('mediumDescription') },
    { value: 'low', label: t('lowQuality'), description: t('lowDescription') },
    { value: 'adaptive', label: t('adaptiveQuality'), description: t('adaptiveDescription') }
  ];

  // Handle PDF upload
  const handleFileUpload = useCallback((uploadedFile) => {
    if (!uploadedFile) return;
    
    if (uploadedFile.size > 100 * 1024 * 1024) { // Increased to 100MB to match API capabilities
      alert(t('fileTooLarge'));
      return;
    }
    
    if (uploadedFile.type !== 'application/pdf') {
      alert(t('invalidFile'));
      return;
    }

    setFile(uploadedFile);
    setOriginalFile(uploadedFile);
    setExtractedImages([]);
    setPdfInfo(null);

    // Set initial PDF info
    const fileSize = (uploadedFile.size / 1024 / 1024).toFixed(2);
    setPdfInfo({
      name: uploadedFile.name,
      size: fileSize,
      pages: 'Unknown',
      images: 'Unknown'
    });
  }, [t]);

  // Handle drag and drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    handleFileUpload(uploadedFile);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Extract images from PDF using the Flask API
  const extractImages = async () => {
    if (!file) {
      alert(t('uploadFirst'));
      return;
    }

    setProcessing(true);
    setExtractedImages([]);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('format', settings.format);
      formData.append('quality', settings.quality);
      formData.append('extractAll', settings.extractAll.toString());
      formData.append('includeThumbnails', settings.includeThumbnails.toString());
      formData.append('maxSize', settings.maxSize.toString());

      console.log('Sending extraction request with settings:', {
        format: settings.format,
        quality: settings.quality,
        extractAll: settings.extractAll,
        includeThumbnails: settings.includeThumbnails,
        maxSize: settings.maxSize
      });

      const response = await fetch(`${API_BASE_URL}/extract-pdf-images`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || t('extractionError'));
      }

      console.log('Extraction successful:', {
        totalImages: data.images?.length,
        totalPages: data.total_pages
      });

      // Process the API response
      const processedImages = data.images.map((img, index) => ({
        id: img.id || index + 1,
        name: img.name,
        originalName: `Page ${img.page} - Image ${index + 1}`,
        page: img.page,
        format: img.format,
        size: img.size,
        dimensions: img.dimensions,
        url: `${API_BASE_URL}${img.url}`, // Ensure full URL
        thumbnail: img.thumbnail ? `${API_BASE_URL}${img.thumbnail}` : null,
        originalSize: img.original_size || 0
      }));

      setExtractedImages(processedImages);
      setPdfInfo(prev => ({
        ...prev,
        pages: data.total_pages?.toString() || 'Unknown',
        images: data.images?.length.toString() || '0'
      }));

    } catch (error) {
      console.error('PDF extraction error:', error);
      alert(error.message || t('extractionError'));
    } finally {
      setProcessing(false);
    }
  };

  // Download single image
  const downloadImage = async (image) => {
    try {
      const response = await fetch(image.url);
      if (!response.ok) throw new Error(`Download failed: ${response.status}`);
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert(t('downloadError'));
    }
  };

  // Download all images
  const downloadAllImages = async () => {
    if (extractedImages.length === 0) return;
    
    setProcessing(true);
    try {
      for (const image of extractedImages) {
        await downloadImage(image);
        // Small delay to avoid overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } finally {
      setProcessing(false);
    }
  };

  // Download selected images
  const downloadSelectedImages = async (selectedIds) => {
    if (selectedIds.length === 0) return;
    
    setProcessing(true);
    try {
      const selectedImages = extractedImages.filter(img => selectedIds.includes(img.id));
      for (const image of selectedImages) {
        await downloadImage(image);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } finally {
      setProcessing(false);
    }
  };

  // Clear all
  const clearAll = () => {
    setFile(null);
    setOriginalFile(null);
    setExtractedImages([]);
    setPdfInfo(null);
    setSelectedImages(new Set());
    setSettings({
      format: 'original',
      quality: 'high',
      extractAll: true,
      includeThumbnails: false,
      maxSize: 2048
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Select/Deselect all images
  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleImageSelection = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const selectAllImages = () => {
    if (selectedImages.size === extractedImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(extractedImages.map(img => img.id)));
    }
  };

  // Preview image in new tab
  const previewImage = (image) => {
    window.open(image.url, '_blank');
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    const totalSize = extractedImages.reduce((acc, img) => acc + (img.originalSize || 0), 0);
    const largestWidth = Math.max(...extractedImages.map(img => {
      const [width] = img.dimensions.split('x').map(Number);
      return isNaN(width) ? 0 : width;
    }));
    const pagesWithImages = new Set(extractedImages.map(img => img.page)).size;

    return {
      totalSize: `${Math.round(totalSize / 1024)} KB`,
      largestImage: `${largestWidth}px`,
      pagesWithImages
    };
  };

  const summary = calculateSummary();

  return (
    <div className={`pdf-image-extractor ${theme}`}>
      <div className="tool-header">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </div>

      <div className="extractor-container">
        {/* Upload Section */}
        <div className="upload-section">
          <div 
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {!file ? (
              <div className="upload-content">
                <div className="upload-icon">📄</div>
                <h3>{t('uploadArea')}</h3>
                <p>{t('dragDrop')}</p>
                <small>{t('supportedFormats')}</small>
                <small>{t('maxSize')}</small>
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <strong>{file.name}</strong>
                  <div className="file-details">
                    <span>📏 {(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    {pdfInfo && (
                      <>
                        <span>📑 {pdfInfo.pages} {t('pages')}</span>
                        <span>🖼️ {pdfInfo.images} {t('images')}</span>
                      </>
                    )}
                  </div>
                </div>
                <button 
                  className="clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}
                >
                  ✕
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Settings Section */}
        {file && (
          <div className="settings-section">
            <h3>{t('extractionSettings')}</h3>
            
            <div className="settings-grid">
              {/* Format Selection */}
              <div className="setting-group">
                <label>{t('outputFormat')}</label>
                <div className="format-options">
                  {formatOptions.map(format => (
                    <div
                      key={format.value}
                      className={`format-option ${settings.format === format.value ? 'active' : ''}`}
                      onClick={() => setSettings(prev => ({ ...prev, format: format.value }))}
                    >
                      <div className="format-header">
                        <span className="format-label">{format.label}</span>
                      </div>
                      <p className="format-description">{format.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Settings */}
              <div className="setting-group">
                <label>{t('imageQuality')}</label>
                <div className="quality-options">
                  {qualityOptions.map(quality => (
                    <div
                      key={quality.value}
                      className={`quality-option ${settings.quality === quality.value ? 'active' : ''}`}
                      onClick={() => setSettings(prev => ({ ...prev, quality: quality.value }))}
                    >
                      <span className="quality-label">{quality.label}</span>
                      <span className="quality-description">{quality.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extraction Options */}
              <div className="setting-group">
                <label>{t('extractionOptions')}</label>
                <div className="checkbox-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.extractAll}
                      onChange={(e) => setSettings(prev => ({ ...prev, extractAll: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    {t('extractAllImages')}
                    <small className="option-hint">{t('extractAllHint')}</small>
                  </label>
                  
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={settings.includeThumbnails}
                      onChange={(e) => setSettings(prev => ({ ...prev, includeThumbnails: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    {t('includeThumbnails')}
                    <small className="option-hint">{t('thumbnailsHint')}</small>
                  </label>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="setting-group">
                <label>{t('advancedSettings')}</label>
                <div className="advanced-options">
                  <div className="option-row">
                    <label htmlFor="maxSizeSlider">
                      {t('maxDimension')}: <strong>{settings.maxSize}px</strong>
                    </label>
                    <input
                      id="maxSizeSlider"
                      type="range"
                      min="256"
                      max="4096"
                      step="128"
                      value={settings.maxSize}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxSize: parseInt(e.target.value) }))}
                      className="slider"
                    />
                    <div className="size-labels">
                      <span>256px</span>
                      <span>2048px</span>
                      <span>4096px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extract Button */}
            <div className="extract-section">
              <button 
                onClick={extractImages}
                className={`extract-btn ${processing ? 'processing' : ''}`}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="spinner"></span>
                    {t('extracting')}...
                  </>
                ) : (
                  <>
                    <span className="extract-icon">🔍</span>
                    {t('extractImages')}
                  </>
                )}
              </button>
              
              {processing && (
                <div className="processing-info">
                  <small>{t('aiProcessing')} 🤖</small>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {extractedImages.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <div className="results-info">
                <h3>{t('extractedImages')} ({extractedImages.length})</h3>
                <p className="results-description">{t('resultsDescription')}</p>
              </div>
              <div className="results-actions">
                <div className="selection-info">
                  {selectedImages.size > 0 && (
                    <span className="selected-count">{selectedImages.size} {t('selected')}</span>
                  )}
                </div>
                <div className="action-buttons">
                  {selectedImages.size > 0 && (
                    <button 
                      onClick={() => downloadSelectedImages(Array.from(selectedImages))}
                      className="action-btn primary"
                      disabled={processing}
                    >
                      ⬇️ {t('downloadSelected')} ({selectedImages.size})
                    </button>
                  )}
                  <button 
                    onClick={downloadAllImages} 
                    className="action-btn secondary"
                    disabled={processing}
                  >
                    📦 {t('downloadAll')}
                  </button>
                  <button onClick={selectAllImages} className="action-btn outline">
                    {selectedImages.size === extractedImages.length ? t('deselectAll') : t('selectAll')}
                  </button>
                  <button onClick={clearAll} className="action-btn danger">
                    🗑️ {t('clearAll')}
                  </button>
                </div>
              </div>
            </div>

            <div className="images-grid">
              {extractedImages.map((image) => (
                <div 
                  key={image.id} 
                  className={`image-card ${selectedImages.has(image.id) ? 'selected' : ''}`}
                  onClick={() => toggleImageSelection(image.id)}
                >
                  <div className="image-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedImages.has(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="image-preview">
                    <img 
                      src={image.thumbnail || image.url} 
                      alt={image.originalName}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to a placeholder if both thumbnail and main image fail
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIFByZXZpZXc8L3RleHQ+PC9zdmc+';
                      }}
                    />
                    <div className="image-overlay">
                      <button 
                        className="preview-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          previewImage(image);
                        }}
                      >
                        🔍 {t('preview')}
                      </button>
                      <button 
                        className="download-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(image);
                        }}
                      >
                        ⬇️
                      </button>
                    </div>
                    <div className="image-badge">
                      {image.format.toUpperCase()}
                    </div>
                  </div>
                  <div className="image-info">
                    <div className="image-meta">
                      <span className="image-name">{image.originalName}</span>
                    </div>
                    <div className="image-details">
                      <span className="image-page">📄 {t('page')} {image.page}</span>
                      <span className="image-size">💾 {image.size}</span>
                      <span className="image-dimensions">📐 {image.dimensions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="summary-section">
              <div className="summary-card">
                <h4>📊 {t('extractionSummary')}</h4>
                <div className="summary-stats">
                  <div className="stat">
                    <span className="stat-value">{extractedImages.length}</span>
                    <span className="stat-label">{t('totalImages')}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{summary.totalSize}</span>
                    <span className="stat-label">{t('totalSize')}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{summary.largestImage}</span>
                    <span className="stat-label">{t('largestImage')}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{summary.pagesWithImages}</span>
                    <span className="stat-label">{t('pagesWithImages')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {!extractedImages.length && (
          <div className="tips-section">
            <h3>💡 {t('tips')}</h3>
            <div className="tips-list">
              <div className="tip-item">
                <span className="tip-icon">🤖</span>
                <div>
                  <strong>{t('tipAITitle')}</strong>
                  <p>{t('tipAIDescription')}</p>
                </div>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🎯</span>
                <div>
                  <strong>{t('tipQualityTitle')}</strong>
                  <p>{t('tipQualityDescription')}</p>
                </div>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📐</span>
                <div>
                  <strong>{t('tipSizeTitle')}</strong>
                  <p>{t('tipSizeDescription')}</p>
                </div>
              </div>
              <div className="tip-item">
                <span className="tip-icon">⚡</span>
                <div>
                  <strong>{t('tipPerformanceTitle')}</strong>
                  <p>{t('tipPerformanceDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Section */}
        <div className="status-section">
          <div className="status-indicator">
            <div className={`status-dot ${processing ? 'processing' : extractedImages.length > 0 ? 'success' : 'ready'}`}></div>
            <span>
              {processing ? t('processingStatus') : 
               extractedImages.length > 0 ? t('successStatus') : t('readyStatus')}
            </span>
          </div>
          {extractedImages.length > 0 && (
            <div className="api-status">
              <small>✅ {t('connectedToAPI')}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFImageExtractor;