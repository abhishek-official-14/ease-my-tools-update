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
import AgeCalculator from "./components/tools/AgeCalculator";
import Base64Tool from "./components/tools/Base64Tool";
import TimeCalculator from "./components/tools/TimeCalculator";
import CSVtoJSON from "./components/tools/CSVtoJSON";
import XMLFormatter from "./components/tools/XMLFormatter";
import URLEncoder from "./components/tools/URLEncoder";
import TextExtractor from "./components/tools/TextExtractor";
import LoremIpsumGenerator from "./components/tools/LoremIpsumGenerator";
import ImageResizer2 from "./components/tools/ImageResizer2";

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
      <AgeCalculator></AgeCalculator>
      <Base64Tool></Base64Tool>
      <TimeCalculator></TimeCalculator>
      <CSVtoJSON></CSVtoJSON>
      <XMLFormatter></XMLFormatter>
      <URLEncoder></URLEncoder>
      <TextExtractor></TextExtractor>
      <LoremIpsumGenerator></LoremIpsumGenerator>
      <ImageResizer2></ImageResizer2>
      <Footer></Footer>
    </>
  );
}

export default App;
