
// import "../styles/Navbar.css";
// import { useTheme } from "../contexts/ThemeContext";

// const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className={`navbar ${theme}`}>
//       {/* Logo */}
//       <div className="navbar-logo">EaseMyTools</div>

//       {/* Center Menu */}
//       <nav className="navbar-menu">
//         <div className="dropdown">
//           <button className="dropbtn">PDF▾</button>
//           <div className="dropdown-content">
//             <a href="#merge">Merge PDF</a>
//             <a href="#split">Split PDF</a>
//             <a href="#compress">Compress PDF</a>
//           </div>
//         </div>

//         <div className="dropdown">
//           <button className="dropbtn">Image▾</button>
//           <div className="dropdown-content">
//             <a href="#removebg">Remove BG</a>
//             <a href="#resize">Resize</a>
//             <a href="#convert">Convert</a>
//           </div>
//         </div>

//         <div className="dropdown">
//           <button className="dropbtn">Video▾</button>
//           <div className="dropdown-content">
//             <a href="#compress">Compress Video</a>
//             <a href="#mute">Mute Video</a>
//             <a href="#convert">Convert Video</a>
//           </div>
//         </div>

//         <div className="dropdown">
//           <button className="dropbtn">File▾</button>
//           <div className="dropdown-content">
//             <a href="#excel">Split Excel</a>
//             <a href="#word">Word to PDF</a>
//             <a href="#ppt">PPT to PDF</a>
//           </div>
//         </div>
//       </nav>

//       {/* Right side */}
//       <div className="navbar-actions">
//         {/* <input type="text" placeholder="Search..." className="search-input" /> */}
//         <button className="signin-btn">Sign In</button>
//         <button onClick={toggleTheme} className="theme-toggle">
//           {theme === "light" ? "🌙 Dark" : "☀️ Light"}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import "../styles/Navbar.css";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`navbar ${theme}`}>
      {/* Logo */}
      <div className="navbar-logo">EaseMyTools</div>

      {/* Center Menu */}
      <nav className="navbar-menu">
        <div className="dropdown">
          <button className="dropbtn">PDF ▾</button>
          <div className="dropdown-card">
            <div className="grid-menu">
              <a href="#merge">
                <span>📑</span>
                <p>Merge PDF</p>
              </a>
              <a href="#split">
                <span>✂️</span>
                <p>Split PDF</p>
              </a>
              <a href="#compress">
                <span>📉</span>
                <p>Compress PDF</p>
              </a>
            </div>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Image ▾</button>
          <div className="dropdown-card">
            <div className="grid-menu">
              <a href="#removebg">
                <span>🖼️</span>
                <p>Remove BG</p>
              </a>
              <a href="#resize">
                <span>📏</span>
                <p>Resize</p>
              </a>
              <a href="#convert">
                <span>🔄</span>
                <p>Convert</p>
              </a>
            </div>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Video ▾</button>
          <div className="dropdown-card">
            <div className="grid-menu">
              <a href="#compress">
                <span>🎥</span>
                <p>Compress</p>
              </a>
              <a href="#mute">
                <span>🔇</span>
                <p>Mute</p>
              </a>
              <a href="#convert">
                <span>🔄</span>
                <p>Convert</p>
              </a>
            </div>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">File ▾</button>
          <div className="dropdown-card">
            <div className="grid-menu">
              <a href="#excel">
                <span>📊</span>
                <p>Split Excel</p>
              </a>
              <a href="#word">
                <span>📝</span>
                <p>Word → PDF</p>
              </a>
              <a href="#ppt">
                <span>📽️</span>
                <p>PPT → PDF</p>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Right side */}
      <div className="navbar-actions">
        <button className="signin-btn">Sign In</button>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
