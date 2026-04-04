// import { useState } from "react";
// import axios from "axios";
// import "../../styles/tools/ImageCompressor.css";

// export default function ImageCompressor() {
//   const [file, setFile] = useState(null);
//   const [targetKB, setTargetKB] = useState(100);
//   const [loading, setLoading] = useState(false);
//   const [downloadUrl, setDownloadUrl] = useState(null);

//   const handleCompress = async () => {
//     if (!file) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("target_kb", targetKB);
//     formData.append("format", "jpeg");

//     try {
//       setLoading(true);
//       setDownloadUrl(null);

//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/compress",
//         formData,
//         { responseType: "blob" }
//       );

//       const url = URL.createObjectURL(res.data);
//       setDownloadUrl(url);
//     } catch (err) {
//       console.error(err);
//       alert("Compression failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="compressor-container">
//       <h2>Image Compressor</h2>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <input
//         type="number"
//         value={targetKB}
//         onChange={(e) => setTargetKB(e.target.value)}
//         placeholder="Target Size (KB)"
//       />

//       <button onClick={handleCompress} disabled={loading}>
//         {loading ? "Compressing..." : "Compress Image"}
//       </button>

//       {downloadUrl && (
//         <a href={downloadUrl} download>
//           <button className="download-btn">Download Image</button>
//         </a>
//       )}
//     </div>
//   );
// }





import { useState } from "react";
import axios from "axios";
import "../../styles/tools/ImageCompressor.css";

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [targetKB, setTargetKB] = useState(100);
  const [format, setFormat] = useState(""); // auto
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setDownloadUrl(null);
  };

  const handleCompress = async () => {
    if (!file) return alert("Select an image");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_kb", targetKB);
    formData.append("format", format); // empty = auto

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/compress",
        formData,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(res.data);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      alert("Compression failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compressor-container">
      <h2>Image Compressor</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <img src={preview} alt="preview" className="preview-img" />
      )}

      <label>Target Size (KB)</label>
      <input
        type="number"
        value={targetKB}
        onChange={(e) => setTargetKB(e.target.value)}
      />

      <label>Output Format</label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="">Auto (Same as input)</option>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
      </select>

      <button onClick={handleCompress} disabled={loading}>
        {loading ? "Compressing..." : "Compress Image"}
      </button>

      {downloadUrl && (
        <a href={downloadUrl} download>
          <button className="download-btn">Download Compressed Image</button>
        </a>
      )}
    </div>
  );
}
