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
      <MarkdownPreviewer></MarkdownPreviewer>
      <TextDiffChecker></TextDiffChecker>
      <QRCodeTool></QRCodeTool>
      <CurrencyConverter></CurrencyConverter>
      <Base64Converter></Base64Converter>
      <Footer></Footer>
    </>
  );
}

export default App;
