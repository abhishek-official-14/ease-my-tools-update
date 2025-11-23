// import "../styles/Footer.css";
// import { useTheme } from "../contexts/ThemeContext";

// const Footer = () => {
//   const { theme } = useTheme();

//   return (
//     <footer className={`footer ${theme}`}>
//       <div className="footer-container">
//         <div className="footer-column">
//           <h4>PRODUCT</h4>
//           <Link to="/home">Home</Link>
//           <Link to="/features">Features</Link>
//           <Link to="/pricing">Pricing</Link>
//           <Link to="/tools">Tools</Link>
//           <Link to="/faq">FAQ</Link>
//         </div>

//         <div className="footer-column">
//           <h4>RESOURCES</h4>
//           <Link to="/desktop">EaseMyTools Desktop</Link>
//           <Link to="/mobile">EaseMyTools Mobile</Link>
//           <Link to="/api">API</Link>
//           <Link to="/docs">Documentation</Link>
//         </div>

//         <div className="footer-column">
//           <h4>SOLUTIONS</h4>
//           <Link to="/business">Business</Link>
//           <Link to="/education">Education</Link>
//         </div>

//         <div className="footer-column">
//           <h4>LEGAL</h4>
//           <Link to="/security">Security</Link>
//           <Link to="/privacy">Privacy Policy</Link>
//           <Link to="/terms">Terms & Conditions</Link>
//           <Link to="/cookies">Cookies</Link>
//         </div>

//         <div className="footer-column">
//           <h4>COMPANY</h4>
//           <Link to="/about">About Us</Link>
//           <Link to="/contact">Contact Us</Link>
//           <Link to="/blog">Blog</Link>
//           <Link to="/press">Press</Link>
//         </div>
//       </div>

//       <hr className="footer-divider" />

//       <div className="footer-bottom">
//         <div className="footer-lang">
//           <select>
//             <option>English</option>
//             <option>हिंदी</option>
//           </select>
//         </div>

//         <div className="footer-social">
//           <Link to="/twitter">✖</Link>
//           <Link to="/facebook">📘</Link>
//           <Link to="/linkedin">💼</Link>
//           <Link to="/instagram">📸</Link>
//           <Link to="/tiktok">🎵</Link>
//         </div>

//         <div className="footer-copy">
//           © {new Date().getFullYear()} EaseMyTools — All Rights Reserved
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import "../styles/Footer.css";
// import { useTheme } from "../contexts/ThemeContext";
// import LanguageSelector from "./LanguageSelector";

// const Footer = () => {
//   const { theme } = useTheme();

//   return (
//     <footer className={`footer ${theme}`}>
//       <div className="footer-container">
//         <div className="footer-column">
//           <h4>PRODUCT</h4>
//           <Link to="/home">Home</Link>
//           <Link to="/features">Features</Link>
//           <Link to="/pricing">Pricing</Link>
//           <Link to="/tools">Tools</Link>
//           <Link to="/faq">FAQ</Link>
//         </div>

//         <div className="footer-column">
//           <h4>RESOURCES</h4>
//           <Link to="/desktop">EaseMyTools Desktop</Link>
//           <Link to="/mobile">EaseMyTools Mobile</Link>
//           <Link to="/api">API</Link>
//           <Link to="/docs">Documentation</Link>
//         </div>

//         <div className="footer-column">
//           <h4>SOLUTIONS</h4>
//           <Link to="/business">Business</Link>
//           <Link to="/education">Education</Link>
//         </div>

//         <div className="footer-column">
//           <h4>LEGAL</h4>
//           <Link to="/security">Security</Link>
//           <Link to="/privacy">Privacy Policy</Link>
//           <Link to="/terms">Terms & Conditions</Link>
//           <Link to="/cookies">Cookies</Link>
//         </div>

//         <div className="footer-column">
//           <h4>COMPANY</h4>
//           <Link to="/about">About Us</Link>
//           <Link to="/contact">Contact Us</Link>
//           <Link to="/blog">Blog</Link>
//           <Link to="/press">Press</Link>
//         </div>
//       </div>

//       <hr className="footer-divider" />

//       <div className="footer-bottom">
//         {/* <div className="footer-lang">
//           <select>
//             <option>English</option>
//             <option>हिंदी</option>
//           </select>
//         </div> */}

//         <LanguageSelector/>

//         <div className="footer-social">
//           <Link to="/twitter">✖</Link>
//           <Link to="/facebook">📘</Link>
//           <Link to="/linkedin">💼</Link>
//           <Link to="/instagram">📸</Link>
//           <Link to="/tiktok">🎵</Link>
//         </div>

//         <div className="footer-copy">
//           © {new Date().getFullYear()} EaseMyTools — All Rights Reserved
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Footer.css";
import { useTheme } from "../contexts/ThemeContext";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-column">
          <h4>PRODUCT</h4>
          <Link to="/">{t('footer.home', 'Home')}</Link>
          <Link to="/features">{t('footer.features', 'Features')}</Link>
          <Link to="/pricing">{t('footer.pricing', 'Pricing')}</Link>
          <Link to="/tools">{t('footer.tools', 'Tools')}</Link>
          <Link to="/faq">{t('footer.faq', 'FAQ')}</Link>
        </div>

        <div className="footer-column">
          <h4>RESOURCES</h4>
          <Link to="/desktop">{t('footer.desktop', 'EaseMyTools Desktop')}</Link>
          <Link to="/mobile">{t('footer.mobile', 'EaseMyTools Mobile')}</Link>
          <Link to="/api">{t('footer.api', 'API')}</Link>
          <Link to="/docs">{t('footer.documentation', 'Documentation')}</Link>
        </div>

        <div className="footer-column">
          <h4>SOLUTIONS</h4>
          <Link to="/business">{t('footer.business', 'Business')}</Link>
          <Link to="/education">{t('footer.education', 'Education')}</Link>
        </div>

        <div className="footer-column">
          <h4>LEGAL</h4>
          <Link to="/security">{t('footer.security', 'Security')}</Link>
          <Link to="/privacy-policy">{t('footer.privacy', 'Privacy Policy')}</Link>
          <Link to="/terms-conditions">{t('footer.terms', 'Terms & Conditions')}</Link>
          <Link to="/cookie-policy">{t('footer.cookies', 'Cookie Policy')}</Link>
        </div>

        <div className="footer-column">
          <h4>COMPANY</h4>
          <Link to="/about">{t('footer.about', 'About Us')}</Link>
          <Link to="/contact">{t('footer.contact', 'Contact Us')}</Link>
          <Link to="/blog">{t('footer.blog', 'Blog')}</Link>
          <Link to="/press">{t('footer.press', 'Press')}</Link>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <LanguageSelector />

        <div className="footer-social">
          <Link to="https://twitter.com/easemytools" target="_blank" rel="noopener noreferrer" title="Twitter">
            ✖
          </Link>
          <Link to="https://facebook.com/easemytools" target="_blank" rel="noopener noreferrer" title="Facebook">
            📘
          </Link>
          <Link to="https://linkedin.com/company/easemytools" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            💼
          </Link>
          <Link to="https://instagram.com/easemytools" target="_blank" rel="noopener noreferrer" title="Instagram">
            📸
          </Link>
          <Link to="https://tiktok.com/@easemytools" target="_blank" rel="noopener noreferrer" title="TikTok">
            🎵
          </Link>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} EaseMyTools — {t('footer.rights', 'All Rights Reserved')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;