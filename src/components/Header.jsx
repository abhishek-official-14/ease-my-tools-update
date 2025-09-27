
import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const words = t("header", "words"); // array of {text, color}
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={`hero-container ${theme}`}>
      <h1 className="hero-title">
        {t("header", "titleStart")}{" "}
        <span
          key={index}
          className="highlight"
          style={{ backgroundColor: words[index].color }}
        >
          {words[index].text}
        </span>{" "}
        {t("header", "titleEnd")}
      </h1>
      <p className="hero-subtitle">{t("header", "subtitle")}</p>
    </div>
  );
};

export default Header;