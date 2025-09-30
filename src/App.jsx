import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ToolsPage from "./components/ToolsPage";
import { useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";
import Footer from "./components/Footer";
import ImageResizer from "./components/tools/ImageResizer";
import UnitConverter from "./components/tools/UnitConverter";
import CaseConverter from "./components/tools/CaseConverter";
import WordCounter from "./components/tools/WordCounter";
import JSONFormatter from "./components/tools/JSONFormatter";
import ColorPicker from "./components/tools/ColorPicker";
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

import MarkdownPreviewer from "./components/tools/MarkdownPreviewer";
import TextDiffChecker from "./components/tools/TextDiffChecker";
import QRCodeTool from "./components/tools/QRCodeTool";
import CurrencyConverter from "./components/tools/CurrencyConverter";
import Base64Converter from "./components/tools/Base64Converter";
import { useTranslation } from "react-i18next";

function App() {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  useEffect(
    ()=>{
      console.log("App.jsx was rendered");
      
      if(!localStorage.getItem("language"))
        localStorage.setItem("language","en")
      i18n.changeLanguage(localStorage.getItem("language"))
    },[]
  )

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

      <PercentageCalculator></PercentageCalculator>

      <MarkdownPreviewer></MarkdownPreviewer>
      <TextDiffChecker></TextDiffChecker>
      <QRCodeTool></QRCodeTool>
      <CurrencyConverter></CurrencyConverter>
      <Base64Converter></Base64Converter>


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
