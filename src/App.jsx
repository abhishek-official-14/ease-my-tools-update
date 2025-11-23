// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import ToolsPage from "./components/ToolsPage";
// import CategoryToolsPage from "./components/CategoryToolsPage";
// import { useTheme } from "./contexts/ThemeContext";
// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import Footer from "./components/Footer";

// // Import all your tools
// import ImageResizer from "./components/tools/ImageResizer";
// import UnitConverter from "./components/tools/UnitConverter";
// import CaseConverter from "./components/tools/CaseConverter";
// import WordCounter from "./components/tools/WordCounter";
// import JSONFormatter from "./components/tools/JSONFormatter";
// import ColorPicker from "./components/tools/ColorPicker";
// import PercentageCalculator from "./components/tools/PercentageCalculator";
// import AgeCalculator from "./components/tools/AgeCalculator";
// import TimeCalculator from "./components/tools/TimeCalculator";
// import CSVtoJSON from "./components/tools/CSVtoJSON";
// import XMLFormatter from "./components/tools/XMLFormatter";
// import URLEncoder from "./components/tools/URLEncoder";
// import TextExtractor from "./components/tools/TextExtractor";
// import LoremIpsumGenerator from "./components/tools/LoremIpsumGenerator";
// import MarkdownPreviewer from "./components/tools/MarkdownPreviewer";
// import TextDiffChecker from "./components/tools/TextDiffChecker";
// import QRCodeTool from "./components/tools/QRCodeTool";
// import CurrencyConverter from "./components/tools/CurrencyConverter";
// import Base64Converter from "./components/tools/Base64Converter";
// import DataUriGenerator from "./components/tools/DataUriGenerator";
// import HashGenerator from "./components/tools/HashGenerator";
// import ImageToSvg from "./components/tools/ImageToSvg";
// import JwtDebugger from "./components/tools/JwtDebugger";
// import NutritionMaster from "./components/tools/NutritionMaster";
// import PasswordGenerator from "./components/tools/PasswordGenerator";
// import RemoveBackground from "./components/tools/RemoveBackground";
// import SslChecker from "./components/tools/SslChecker";
// import SvgConverter from "./components/tools/SvgConverter";
// import FaviconGenerator from "./components/tools/FaviconGenerator";
// import PDFImageExtractor from "./components/tools/PDFImageExtractor";
// import FileRenameTool from "./components/tools/FileRenameTool";
// import FileConverter from "./components/tools/FileConverter";
// // import Mp4ToGif from "./components/tools/Mp4ToGif";

// function App() {
//   const { theme } = useTheme();
//   const { i18n } = useTranslation();

//   useEffect(() => {
//     if (!localStorage.getItem("language")) {
//       localStorage.setItem("language", "en");
//     }
//     i18n.changeLanguage(localStorage.getItem("language"));
//   }, [i18n]);

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (

//     <Router>
//       <div className="App">
//         <Navbar />
//         {/* <Header /> */}
//         <main className="main-content">
//           <Routes>
//             {/* Main Tools Page */}
//             <Route path="/" element={<ToolsPage />} />
//             <Route path="/tools" element={<ToolsPage />} />

//             {/* Single Category Page with parameter */}
//             <Route path="/tools/:categoryId" element={<CategoryToolsPage />} />

//             {/* Individual Tool Routes */}
//             <Route path="/image-resizer" element={<ImageResizer />} />
//             <Route path="/color-picker" element={<ColorPicker />} />
//             <Route path="/unit-converter" element={<UnitConverter />} />
//             <Route path="/case-converter" element={<CaseConverter />} />
//             <Route path="/currency-converter" element={<CurrencyConverter />} />
//             <Route path="/base64-converter" element={<Base64Converter />} />
//             <Route path="/word-counter" element={<WordCounter />} />
//             <Route path="/json-formatter" element={<JSONFormatter />} />
//             <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
//             <Route path="/text-diff-checker" element={<TextDiffChecker />} />
//             <Route path="/percentage-calculator" element={<PercentageCalculator />} />
//             <Route path="/age-calculator" element={<AgeCalculator />} />
//             <Route path="/time-calculator" element={<TimeCalculator />} />
//             <Route path="/csv-to-json" element={<CSVtoJSON />} />
//             <Route path="/xml-formatter" element={<XMLFormatter />} />
//             <Route path="/url-encoder" element={<URLEncoder />} />
//             <Route path="/text-extractor" element={<TextExtractor />} />
//             <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
//             <Route path="/qr-code-tool" element={<QRCodeTool />} />
//             <Route path="/ssl-checker" element={<SslChecker></SslChecker>} />
//             <Route path="/svg-converter" element={<SvgConverter />} />
//             <Route path="/image-to-svg" element={<ImageToSvg />} />
//             <Route path="/nutrition-master" element={<NutritionMaster />} />
//             <Route path="/remove-background" element={<RemoveBackground />} />
//             <Route path="/hash-generator" element={<HashGenerator />} />
//             <Route path="/password-generator" element={<PasswordGenerator />} />
//             <Route path="/jwt-debugger" element={<JwtDebugger />} />
//             <Route path="/data-uri-generator" element={<DataUriGenerator />} />
//             <Route path="/favicon-generator" element={<FaviconGenerator />} />
//             <Route path="/pdfImage-extractor" element={<PDFImageExtractor />} />
//             <Route path="/file-rename-tool" element={<FileRenameTool/>} />
//             <Route path="/file-converter" element={<FileConverter/>} />
//             {/* <Route path="/mp4-to-gif" element={<Mp4ToGif />} /> */}

//             {/* <Route path="/mp4-to-gif" element={<Mp4ToGif />} /> */}

//             {/* 404 Page */}
//             <Route path="*" element={
//               <div className="not-found">
//                 <h1>404 - Page Not Found</h1>
//                 <p>The page you're looking for doesn't exist.</p>
//                 <button
//                   className="back-button"
//                   onClick={() => window.location.href = '/'}
//                   style={{ marginTop: '1rem' }}
//                 >
//                   Go to Home Page
//                 </button>
//               </div>
//             } />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>

//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import ToolsPage from "./components/ToolsPage";
// import CategoryToolsPage from "./components/CategoryToolsPage";
// import HomePage from "./components/HomePage"; // ← Add this import
// import { useTheme } from "./contexts/ThemeContext";
// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import Footer from "./components/Footer";

// // Import all your tools
// import ImageResizer from "./components/tools/ImageResizer";
// import UnitConverter from "./components/tools/UnitConverter";
// import CaseConverter from "./components/tools/CaseConverter";
// import WordCounter from "./components/tools/WordCounter";
// import JSONFormatter from "./components/tools/JSONFormatter";
// import ColorPicker from "./components/tools/ColorPicker";
// import PercentageCalculator from "./components/tools/PercentageCalculator";
// import AgeCalculator from "./components/tools/AgeCalculator";
// import TimeCalculator from "./components/tools/TimeCalculator";
// import CSVtoJSON from "./components/tools/CSVtoJSON";
// import XMLFormatter from "./components/tools/XMLFormatter";
// import URLEncoder from "./components/tools/URLEncoder";
// import TextExtractor from "./components/tools/TextExtractor";
// import LoremIpsumGenerator from "./components/tools/LoremIpsumGenerator";
// import MarkdownPreviewer from "./components/tools/MarkdownPreviewer";
// import TextDiffChecker from "./components/tools/TextDiffChecker";
// import QRCodeTool from "./components/tools/QRCodeTool";
// import CurrencyConverter from "./components/tools/CurrencyConverter";
// import Base64Converter from "./components/tools/Base64Converter";
// import DataUriGenerator from "./components/tools/DataUriGenerator";
// import HashGenerator from "./components/tools/HashGenerator";
// import ImageToSvg from "./components/tools/ImageToSvg";
// import JwtDebugger from "./components/tools/JwtDebugger";
// import NutritionMaster from "./components/tools/NutritionMaster";
// import PasswordGenerator from "./components/tools/PasswordGenerator";
// import RemoveBackground from "./components/tools/RemoveBackground";
// import SslChecker from "./components/tools/SslChecker";
// import SvgConverter from "./components/tools/SvgConverter";
// import FaviconGenerator from "./components/tools/FaviconGenerator";
// import PDFImageExtractor from "./components/tools/PDFImageExtractor";
// import FileRenameTool from "./components/tools/FileRenameTool";
// import FileConverter from "./components/tools/FileConverter";
// // import Mp4ToGif from "./components/tools/Mp4ToGif";

// function App() {
//   const { theme } = useTheme();
//   const { i18n } = useTranslation();

//   useEffect(() => {
//     if (!localStorage.getItem("language")) {
//       localStorage.setItem("language", "en");
//     }
//     i18n.changeLanguage(localStorage.getItem("language"));
//   }, [i18n]);

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         {/* <Header /> */}
//         <main className="main-content">
//           <Routes>
//             {/* NEW: Home Page with enhanced design */}
//             <Route path="/" element={<HomePage />} />

//             {/* Existing Tools Page (keep for /tools route) */}
//             <Route path="/tools" element={<ToolsPage />} />

//             {/* Single Category Page with parameter */}
//             <Route path="/tools/:categoryId" element={<CategoryToolsPage />} />

//             {/* Individual Tool Routes */}
//             <Route path="/image-resizer" element={<ImageResizer />} />
//             <Route path="/color-picker" element={<ColorPicker />} />
//             <Route path="/unit-converter" element={<UnitConverter />} />
//             <Route path="/case-converter" element={<CaseConverter />} />
//             <Route path="/currency-converter" element={<CurrencyConverter />} />
//             <Route path="/base64-converter" element={<Base64Converter />} />
//             <Route path="/word-counter" element={<WordCounter />} />
//             <Route path="/json-formatter" element={<JSONFormatter />} />
//             <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
//             <Route path="/text-diff-checker" element={<TextDiffChecker />} />
//             <Route path="/percentage-calculator" element={<PercentageCalculator />} />
//             <Route path="/age-calculator" element={<AgeCalculator />} />
//             <Route path="/time-calculator" element={<TimeCalculator />} />
//             <Route path="/csv-to-json" element={<CSVtoJSON />} />
//             <Route path="/xml-formatter" element={<XMLFormatter />} />
//             <Route path="/url-encoder" element={<URLEncoder />} />
//             <Route path="/text-extractor" element={<TextExtractor />} />
//             <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
//             <Route path="/qr-code-tool" element={<QRCodeTool />} />
//             <Route path="/ssl-checker" element={<SslChecker></SslChecker>} />
//             <Route path="/svg-converter" element={<SvgConverter />} />
//             <Route path="/image-to-svg" element={<ImageToSvg />} />
//             <Route path="/nutrition-master" element={<NutritionMaster />} />
//             <Route path="/remove-background" element={<RemoveBackground />} />
//             <Route path="/hash-generator" element={<HashGenerator />} />
//             <Route path="/password-generator" element={<PasswordGenerator />} />
//             <Route path="/jwt-debugger" element={<JwtDebugger />} />
//             <Route path="/data-uri-generator" element={<DataUriGenerator />} />
//             <Route path="/favicon-generator" element={<FaviconGenerator />} />
//             <Route path="/pdfImage-extractor" element={<PDFImageExtractor />} />
//             <Route path="/file-rename-tool" element={<FileRenameTool/>} />
//             <Route path="/file-converter" element={<FileConverter/>} />
//             {/* <Route path="/mp4-to-gif" element={<Mp4ToGif />} /> */}

//             {/* 404 Page */}
//             <Route path="*" element={
//               <div className="not-found">
//                 <h1>404 - Page Not Found</h1>
//                 <p>The page you're looking for doesn't exist.</p>
//                 <button
//                   className="back-button"
//                   onClick={() => window.location.href = '/'}
//                   style={{ marginTop: '1rem' }}
//                 >
//                   Go to Home Page
//                 </button>
//               </div>
//             } />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ToolsPage from "./components/ToolsPage";
import CategoryToolsPage from "./components/CategoryToolsPage";
import HomePage from "./components/HomePage"; // ← Add this import
import { useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// Add this import at the top with other imports
import Footer from "./components/Footer";

// Add these imports at the top
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import CookiePolicy from "./components/CookiePolicy";
import About from "./components/About";
import Contact from "./components/Contact";

// Add these imports at the top
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import MobileApp from "./components/MobileApp";
import DesktopApp from "./components/DesktopApp";
import API from "./components/API";
// Add these imports at the top
import Documentation from "./components/Documentation";
import Business from "./components/Business";
import Education from "./components/Education";
import Security from "./components/Security";
import Blog from "./components/Blog";
import Press from "./components/Press";

// Import all your tools
import ImageResizer from "./components/tools/ImageResizer";
import UnitConverter from "./components/tools/UnitConverter";
import CaseConverter from "./components/tools/CaseConverter";
import WordCounter from "./components/tools/WordCounter";
import JSONFormatter from "./components/tools/JSONFormatter";
import ColorPicker from "./components/tools/ColorPicker";
import PercentageCalculator from "./components/tools/PercentageCalculator";
import AgeCalculator from "./components/tools/AgeCalculator";
import TimeCalculator from "./components/tools/TimeCalculator";
import CSVtoJSON from "./components/tools/CSVtoJSON";
import XMLFormatter from "./components/tools/XMLFormatter";
import URLEncoder from "./components/tools/URLEncoder";
import TextExtractor from "./components/tools/TextExtractor";
import LoremIpsumGenerator from "./components/tools/LoremIpsumGenerator";
import MarkdownPreviewer from "./components/tools/MarkdownPreviewer";
import TextDiffChecker from "./components/tools/TextDiffChecker";
import QRCodeTool from "./components/tools/QRCodeTool";
import CurrencyConverter from "./components/tools/CurrencyConverter";
import Base64Converter from "./components/tools/Base64Converter";
import DataUriGenerator from "./components/tools/DataUriGenerator";
import HashGenerator from "./components/tools/HashGenerator";
import ImageToSvg from "./components/tools/ImageToSvg";
import JwtDebugger from "./components/tools/JwtDebugger";
import NutritionMaster from "./components/tools/NutritionMaster";
import PasswordGenerator from "./components/tools/PasswordGenerator";
import RemoveBackground from "./components/tools/RemoveBackground";
import SslChecker from "./components/tools/SslChecker";
import SvgConverter from "./components/tools/SvgConverter";
import FaviconGenerator from "./components/tools/FaviconGenerator";
import PDFImageExtractor from "./components/tools/PDFImageExtractor";
import FileRenameTool from "./components/tools/FileRenameTool";
import FileConverter from "./components/tools/FileConverter";
import RegexGenerator from "./components/tools/RegexGenerator";
import WebsiteCostCalculator from "./components/tools/WebsiteCostCalculator";
// import Mp4ToGif from "./components/tools/Mp4ToGif";

function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    }
    i18n.changeLanguage(localStorage.getItem("language"));
  }, [i18n]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Header /> */}
        <main className="main-content">
          <Routes>
            {/* NEW: Home Page with enhanced design */}
            {/* <Route path="/" element={<ToolsPage />} /> */}
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <ToolsPage /> <HomePage /> 
                </>
              }
            />
            {/* Existing Tools Page (keep for /tools route) */}
            <Route path="/tools" element={<ToolsPage />} />
            {/* Single Category Page with parameter */}
            <Route path="/tools/:categoryId" element={<CategoryToolsPage />} />
            // Add this route in your Routes section (after other routes)
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            // Add these routes in your Routes section
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            // Add these routes in your Routes section
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/mobile" element={<MobileApp />} />
            <Route path="/desktop" element={<DesktopApp />} />
            <Route path="/api" element={<API />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/business" element={<Business />} />
            <Route path="/education" element={<Education />} />
            <Route path="/security" element={<Security />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/press" element={<Press />} />

            {/* Individual Tool Routes */}
            <Route path="/image-resizer" element={<ImageResizer />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/case-converter" element={<CaseConverter />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
            <Route path="/base64-converter" element={<Base64Converter />} />
            <Route path="/word-counter" element={<WordCounter />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/markdown-previewer" element={<MarkdownPreviewer />} />
            <Route path="/text-diff-checker" element={<TextDiffChecker />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />}/>
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/time-calculator" element={<TimeCalculator />} />
            <Route path="/csv-to-json" element={<CSVtoJSON />} />
            <Route path="/xml-formatter" element={<XMLFormatter />} />
            <Route path="/url-encoder" element={<URLEncoder />} />
            <Route path="/text-extractor" element={<TextExtractor />} />
            <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />}/>
            <Route path="/qr-code-tool" element={<QRCodeTool />} />
            <Route path="/ssl-checker" element={<SslChecker></SslChecker>} />
            <Route path="/svg-converter" element={<SvgConverter />} />
            <Route path="/image-to-svg" element={<ImageToSvg />} />
            <Route path="/nutrition-master" element={<NutritionMaster />} />
            <Route path="/remove-background" element={<RemoveBackground />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/jwt-debugger" element={<JwtDebugger />} />
            <Route path="/data-uri-generator" element={<DataUriGenerator />} />
            <Route path="/favicon-generator" element={<FaviconGenerator />} />
            <Route path="/pdfImage-extractor" element={<PDFImageExtractor />} />
            <Route path="/file-rename-tool" element={<FileRenameTool />} />
            <Route path="/file-converter" element={<FileConverter />} />
            <Route path="/regex-generator" element={<RegexGenerator />} />
            <Route path="/website-cost-calculator" element={<WebsiteCostCalculator/>} />
            {/* <Route path="/mp4-to-gif" element={<Mp4ToGif />} /> */}
            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                  <button
                    className="back-button"
                    onClick={() => (window.location.href = "/")}
                    style={{ marginTop: "1rem" }}
                  >
                    Go to Home Page
                  </button>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
