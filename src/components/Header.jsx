import React, { useState, useEffect, useContext } from "react";
import "../styles/Header.css";
import { useTheme } from "../contexts/ThemeContext"; // tumhare project me already hai

const Header = () => {
  const { theme } = useTheme();

  const words = [
    { text: "Everything", color: "#7C3AED" }, // purple
    { text: "PDFs", color: "#E11D48" }, // red-pink
    { text: "Videos", color: "#2563EB" }, // blue
    { text: "Images", color: "#059669" }, // green
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className={`hero-container ${theme}`}>
      <h1 className="hero-title">
        Free Tools to Make{" "}
        <span
          key={index}
          className="highlight"
          style={{ backgroundColor: words[index].color }}
        >
          {words[index].text}
        </span>{" "}
        Simple
      </h1>
      <p className="hero-subtitle">
        We offer PDF, video, image and other online tools to make your life easier
      </p>
    </div>
  );
};

export default Header;
