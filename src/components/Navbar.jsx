import "../styles/Navbar.css";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const menus = t("navbar", "menus");

  return (
    <header className={`navbar ${theme}`}>
      {/* Logo */}
      <div className="navbar-logo">{t("navbar", "logo")}</div>

      {/* Center Menu */}
      <nav className="navbar-menu">
        {menus.map((menu) => (
          <div className="dropdown" key={menu.key}>
            <button className="dropbtn">{menu.title} ▾</button>
            <div className="dropdown-card">
              <div className="grid-menu">
                {menu.items.map((item) => (
                  <a href={`#${item.id}`} key={item.id}>
                    <span>{item.icon}</span>
                    <p>{item.label}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>

      {/* Right side */}
      <div className="navbar-actions">
        <button className="signin-btn">{t("navbar", "actions").signin}</button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light"
            ? t("navbar", "actions").dark
            : t("navbar", "actions").light}
        </button>
      </div>
    </header>
  );
};

export default Navbar;