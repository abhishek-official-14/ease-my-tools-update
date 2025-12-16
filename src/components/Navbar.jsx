// import React from "react";
// import "../styles/Navbar.css";
// import { useTheme } from "../contexts/ThemeContext";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { t } = useTranslation("navbar");
//   const menus = t("menus", { returnObjects: true }) || [];
//   const navigate = useNavigate();

//   return (
//     <header className={`navbar ${theme}`}>
//       <div className="logo" onClick={()=>{navigate("/")}}>{t("logo")}</div>

//       <nav className="menu">
//         {menus.
// // @ts-ignore
//         map((menu, i) => (
//           <div className="dropdown" key={i}>
//             <button className="trigger">{menu.title} ▾</button>
//             <div className="panel">
//               <div className="grid">
//                 {menu.items.map((item, j) => (
//                   <a href={`#${item.id || ""}`} key={j} className="item">
//                     <span className="label">{item.label}</span>
//                     <span className="icon">{item.icon}</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </nav>

//       <div className="actions">
//         <button className="signin">{t("actions.signin")}</button>
//         <button onClick={toggleTheme} className="toggle">
//           {theme === "light" ? t("actions.dark") : t("actions.light")}
//         </button>
//       </div>
//     </header>

//   );
// };

// export default Navbar;

// import React from "react";
// import "../styles/Navbar.css";
// import { useTheme } from "../contexts/ThemeContext";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { t } = useTranslation("navbar");
//   const menus = t("menus", { returnObjects: true }) || [];
//   const navigate = useNavigate();

//   return (
//     <header className={`navbar ${theme}`}>
//       <div className="logo" onClick={() => navigate("/")}>
//         {t("logo")}
//       </div>

//       <nav className="menu">
//         {menus.map((menu, i) => (
//           <div className="dropdown" key={i}>
//             <button className="trigger">{menu.title} ▾</button>
//             <div className="panel">
//               <div className="grid">
//                 {menu.items.map((item, j) => (
//                   <a href={`#${item.id || ""}`} key={j} className="item">
//                     <span className="label">{item.label}</span>
//                     <span className="icon">{item.icon}</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </nav>

//       <div className="actions">
//         <button className="signin">{t("actions.signin")}</button>
//         <button onClick={toggleTheme} className="toggle">
//           {theme === "light" ? t("actions.dark") : t("actions.light")}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import "../styles/Navbar.css";
// import { useTheme } from "../contexts/ThemeContext";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { t } = useTranslation("navbar");
//   const menus = t("menus", { returnObjects: true }) || [];
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleMobileMenuToggle = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     setIsMobileMenuOpen(false);
//   };

//   const handleDropdownClick = (e) => {
//     // Only for mobile: toggle dropdown panel
//     if (window.innerWidth <= 1023) {
//       e.preventDefault();
//       const dropdown = e.currentTarget.closest('.dropdown');
//       dropdown.classList.toggle('active');
//     }
//   };

//   return (
//     <header className={`navbar ${theme}`}>
//       <div className="navbar-container">
//         <div className="logo" onClick={() => handleNavigate("/")}>
//           {t("logo")}
//         </div>

//         {/* Hamburger Button */}
//         <button
//           className="hamburger-btn"
//           onClick={handleMobileMenuToggle}
//           aria-label="Toggle menu"
//         >
//           <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </button>

//         {/* Menu */}
//         <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
//           {menus.map((menu, i) => (
//             <div className="dropdown" key={i}>
//               <button
//                 className="nav-trigger"
//                 onClick={handleDropdownClick}
//               >
//                 {menu.title} <span className="dropdown-arrow">▾</span>
//               </button>
//               <div className="dropdown-panel">
//                 <div className="dropdown-grid">
//                   {menu.items.map((item, j) => (
//                     <a
//                       href={`#${item.id || ""}`}
//                       key={j}
//                       className="dropdown-item"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleNavigate(`/#${item.id || ""}`);
//                       }}
//                     >
//                       <span className="dropdown-label">{item.label}</span>
//                       <span className="dropdown-icon">{item.icon}</span>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="nav-actions">
//           <button className="signin-btn">{t("actions.signin")}</button>
//           <button onClick={toggleTheme} className="theme-toggle">
//             {theme === "light" ? t("actions.dark") : t("actions.light")}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="mobile-overlay"
//           onClick={handleMobileMenuToggle}
//         />
//       )}
//     </header>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import "../styles/Navbar.css";
// import { useTheme } from "../contexts/ThemeContext";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();
//   const { t } = useTranslation("navbar");
//   const menus = t("menus", { returnObjects: true }) || [];
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const menuRef = useRef(null);
//   const hamburgerRef = useRef(null);

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target) &&
//           hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//         setActiveDropdown(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close menu on resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 1023) {
//         setIsMenuOpen(false);
//         setActiveDropdown(null);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     if (isMenuOpen) {
//       setActiveDropdown(null);
//     }
//   };

//   const toggleDropdown = (index) => {
//     setActiveDropdown(activeDropdown === index ? null : index);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     setIsMenuOpen(false);
//     setActiveDropdown(null);
//   };

//   const handleDropdownItemClick = (itemId) => {
//     handleNavigation(`/#${itemId}`);
//   };

//   return (
//     <header className={`navbar navbar-${theme}`}>
//       <div className="navbar-wrapper">
//         {/* Logo */}
//         <div className="navbar-logo" onClick={() => handleNavigation("/")}>
//           {t("logo")}
//         </div>

//         {/* Hamburger Button */}
//         <button
//           ref={hamburgerRef}
//           className={`navbar-hamburger ${isMenuOpen ? "active" : ""}`}
//           onClick={toggleMenu}
//           aria-label="Toggle navigation menu"
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </button>

//         {/* Navigation Menu */}
//         <nav
//           ref={menuRef}
//           className={`navbar-nav ${isMenuOpen ? "active" : ""}`}
//         >
//           {/* Menu Items with Dropdowns */}
//           {menus.map((menu, index) => (
//             <div
//               className={`nav-item ${activeDropdown === index ? "active" : ""}`}
//               key={index}
//             >
//               <button
//                 className="nav-link"
//                 onClick={() => toggleDropdown(index)}
//                 onMouseEnter={() => {
//                   if (window.innerWidth > 1023) {
//                     setActiveDropdown(index);
//                   }
//                 }}
//               >
//                 {menu.title}
//                 <span className="dropdown-arrow">▾</span>
//               </button>

//               {/* Dropdown Panel */}
//               {activeDropdown === index && (
//                 <div className="dropdown-content">
//                   <div className="dropdown-grid">
//                     {menu.items.map((item, itemIndex) => (
//                       <div
//                         key={itemIndex}
//                         className="dropdown-item"
//                         onClick={() => handleDropdownItemClick(item.id || "")}
//                       >
//                         <div className="item-icon">{item.icon}</div>
//                         <div className="item-label">{item.label}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* Action Buttons in Mobile Menu */}
//           <div className="mobile-actions">
//             <button className="signin-btn" onClick={() => handleNavigation("/login")}>
//               {t("actions.signin")}
//             </button>
//             <button className="theme-btn" onClick={toggleTheme}>
//               {theme === "light" ? t("actions.dark") : t("actions.light")}
//             </button>
//           </div>
//         </nav>

//         {/* Desktop Action Buttons */}
//         <div className="navbar-actions">
//           <button className="signin-btn" onClick={() => handleNavigation("/login")}>
//             {t("actions.signin")}
//           </button>
//           <button className="theme-btn" onClick={toggleTheme}>
//             {theme === "light" ? t("actions.dark") : t("actions.light")}
//           </button>
//         </div>

//         {/* Mobile Menu Overlay */}
//         {isMenuOpen && (
//           <div className="nav-overlay" onClick={toggleMenu} />
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation("navbar");
  const menus = t("menus", { returnObjects: true }) || [];
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownItemClick = (itemId) => {
    navigate(`/#${itemId}`);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <header className={`navbar navbar-${theme}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={handleLogoClick}>
          EaseMyTools
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="navbar-desktop-nav">
          {menus.map((menu, index) => (
            <div
              className="nav-desktop-item"
              key={index}
              onMouseEnter={() =>
                window.innerWidth > 1023 && setActiveDropdown(index)
              }
              onMouseLeave={() =>
                window.innerWidth > 1023 && setActiveDropdown(null)
              }
            >
              <button className="nav-desktop-link">
                {menu.title}
                <span className="desktop-arrow">▾</span>
              </button>

              {/* Desktop Dropdown Panel */}
              {activeDropdown === index && (
                <div className="desktop-dropdown-panel">
                  <div className="desktop-dropdown-grid">
                    {menu.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className="desktop-dropdown-item"
                        onClick={() => handleDropdownItemClick(item.id || "")}
                      >
                        <div className="dropdown-item-icon">{item.icon}</div>
                        <div className="dropdown-item-label">{item.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex">
          {/* Desktop Action Buttons */}
          <div className="navbar-actions">
            <button className="signin-btn" onClick={handleSignIn}>
              Sign In
            </button>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {/* {theme === "light" ? "Dark" : "Light"} */}
              {theme === "light" ? t("actions.dark") : t("actions.light")}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerRef}
            className={`mobile-hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="hamburger-lines">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <>
            <div className="mobile-menu-overlay" onClick={toggleMenu} />
            <nav ref={menuRef} className="mobile-menu">
              <div className="mobile-menu-header">
                <div className="mobile-menu-title">Menu</div>
                <button className="mobile-close-btn" onClick={toggleMenu}>
                  ✕
                </button>
              </div>

              <div className="mobile-menu-content">
                {menus.map((menu, index) => (
                  <div
                    className={`mobile-menu-item ${
                      activeDropdown === index ? "active" : ""
                    }`}
                    key={index}
                  >
                    <button
                      className="mobile-menu-link"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span>{menu.title}</span>
                      <span className="mobile-arrow">
                        {activeDropdown === index ? "▴" : "▾"}
                      </span>
                    </button>

                    {activeDropdown === index && (
                      <div className="mobile-dropdown-panel">
                        <div className="mobile-dropdown-grid">
                          {menu.items.map((item, itemIndex) => (
                            <button
                              key={itemIndex}
                              className="mobile-dropdown-item"
                              onClick={() =>
                                handleDropdownItemClick(item.id || "")
                              }
                            >
                              <div className="mobile-item-icon">
                                {item.icon}
                              </div>
                              <div className="mobile-item-label">
                                {item.label}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
