import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ToolsPage from "./components/ToolsPage";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";
import Footer from "./components/Footer";
import ImageResizer from "./components/tools/ImageResizer";
import UnitConverter from "./components/tools/UnitConverter";
import LanguageSelector from "./components/LanguageSelector";
import CaseConverter from "./components/tools/CaseConverter";
import WordCounter from "./components/tools/WordCounter";
import JSONFormatter from "./components/tools/JSONFormatter";
import ColorPicker from "./components/tools/ColorPicker";
import QRCodeGenerator from "./components/tools/QRCodeGenerator";
import PercentageCalculator from "./components/tools/PercentageCalculator";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Header></Header>
        <Routes>
          <Route path="/" element={<ToolsPage />} />
        </Routes>
      </Router>
      <ImageResizer></ImageResizer>
      <UnitConverter></UnitConverter>
      <CaseConverter></CaseConverter>
      <WordCounter></WordCounter>
      <JSONFormatter></JSONFormatter>
      <ColorPicker></ColorPicker>
      <QRCodeGenerator></QRCodeGenerator>
      <PercentageCalculator></PercentageCalculator>
      <Footer></Footer>
    </>
  );
}

export default App;
