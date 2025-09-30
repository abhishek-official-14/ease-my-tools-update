//@ts-nocheck
import React, { useState, useRef } from "react";
import "../../styles/tools/imageresizer.css";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next"; // new i18n hook

const ImageResizer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("imageResizer"); // namespace for translations
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [format, setFormat] = useState("png");
  const [originalRatio, setOriginalRatio] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setOriginalRatio(img.width / img.height);
          setImage(img);
          setPreviewUrl(reader.result);
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({ target: { files: [file] } });
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    if (keepRatio && originalRatio) {
      setHeight(Math.round(newWidth / originalRatio));
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    if (keepRatio && originalRatio) {
      setWidth(Math.round(newHeight * originalRatio));
    }
  };

  const handleResize = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);

    let mimeType = "image/png";
    if (format === "jpg") mimeType = "image/jpeg";
    if (format === "webp") mimeType = "image/webp";

    const link = document.createElement("a");
    link.download = `resized.${format}`;
    link.href = canvas.toDataURL(mimeType, 0.9);
    link.click();
  };

  return (
    <div className={`image-resizer-container ${theme}`}>
      <h2 className="title">{t("title", "✨ Image Resizer")}</h2>

      {/* Upload Section */}
      <div
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="preview" className="preview-img" />
        ) : (
          <p>
            {t("dragDrop", "📂 Drag & Drop image here or ")}
            <span>{t("browse", "Browse")}</span>
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
      </div>

      {/* Controls */}
      {image && (
        <div className="controls">
          <div className="input-group">
            <label>{t("width", "Width")}</label>
            <input type="number" value={width} onChange={handleWidthChange} />
          </div>
          <div className="input-group">
            <label>{t("height", "Height")}</label>
            <input type="number" value={height} onChange={handleHeightChange} />
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={() => setKeepRatio(!keepRatio)}
              />
              {t("keepRatio", "Keep Aspect Ratio 🔒")}
            </label>

            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WEBP</option>
            </select>
          </div>

          <button className="resize-btn" onClick={handleResize}>
            {t("download", "🚀 Download Resized Image")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
