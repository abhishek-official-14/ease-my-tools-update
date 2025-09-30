import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next"; // <-- updated

const Header = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("header"); // <-- namespace for Header component

  const words = t("words", { returnObjects: true }); // array of {text, color}
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className={`hero-container ${theme}`}>
      <h1 className="hero-title">
        {t("titleStart")}{" "}
        <span
          key={index}
          className="highlight"
          style={{ backgroundColor: words[index].color }}
        >
          {words[index].text}
        </span>{" "}
        {t("titleEnd")}
      </h1>
      <p className="hero-subtitle">{t("subtitle")}</p>
    </div>
  );
};

export default Header;
