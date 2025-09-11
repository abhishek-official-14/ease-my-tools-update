import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ToolsPage from "./components/ToolsPage";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";
import Footer from "./components/Footer";

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
          <Footer></Footer>
        </Router>
    
    </>
  );
}

export default App;
