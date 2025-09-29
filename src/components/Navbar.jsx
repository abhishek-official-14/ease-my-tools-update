import React, { useState } from "react";
import "../styles/Navbar.css";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("navbar");
  const menus = t("menus", { returnObjects: true }) || [];


  return (
    <header className={`navbar ${theme}`}>
      {/* Logo */}
      <div className="navbar-logo">{t("logo")}</div>
      {/* Center Menu */}
      <nav className="navbar-menu">
        {Array.isArray(menus) &&
          menus.map((menu, i) => (
            <div className="dropdown" key={i}>
              <button className="dropbtn">
                {menu.title} ▾
              </button>
              <div className="dropdown-card">
                <div className="grid-menu">
                  {menu.items.map((item, j) => (
                    <a href={`#${item.id || ""}`} key={j} className="menu-item">
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </nav>

      {/* Right side */}
      <div className="navbar-actions">
        <button className="signin-btn">{t("actions.signin")}</button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? t("actions.dark") : t("actions.light")}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
