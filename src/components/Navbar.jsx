import React from "react";
import "../styles/Navbar.css";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("navbar");
  const menus = t("menus", { returnObjects: true }) || [];

  return (
    <header className={`navbar ${theme}`}>
      <div className="logo">{t("logo")}</div>

      <nav className="menu">
        {menus.
// @ts-ignore
        map((menu, i) => (
          <div className="dropdown" key={i}>
            <button className="trigger">{menu.title} ▾</button>
            <div className="panel">
              <div className="grid">
                {menu.items.map((item, j) => (
                  <a href={`#${item.id || ""}`} key={j} className="item">
                    <span className="label">{item.label}</span>
                    <span className="icon">{item.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>

      <div className="actions">
        <button className="signin">{t("actions.signin")}</button>
        <button onClick={toggleTheme} className="toggle">
          {theme === "light" ? t("actions.dark") : t("actions.light")}
        </button>
      </div>
    </header>

  );
};

export default Navbar;
