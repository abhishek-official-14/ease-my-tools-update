import "../styles/Footer.css";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        <div className="footer-column">
          <h4>PRODUCT</h4>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#tools">Tools</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="footer-column">
          <h4>RESOURCES</h4>
          <a href="#desktop">EaseMyTools Desktop</a>
          <a href="#mobile">EaseMyTools Mobile</a>
          <a href="#api">API</a>
          <a href="#docs">Documentation</a>
        </div>

        <div className="footer-column">
          <h4>SOLUTIONS</h4>
          <a href="#business">Business</a>
          <a href="#education">Education</a>
        </div>

        <div className="footer-column">
          <h4>LEGAL</h4>
          <a href="#security">Security</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
          <a href="#cookies">Cookies</a>
        </div>

        <div className="footer-column">
          <h4>COMPANY</h4>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <a href="#blog">Blog</a>
          <a href="#press">Press</a>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-lang">
          <select>
            <option>English</option>
            <option>हिंदी</option>
          </select>
        </div>

        <div className="footer-social">
          <a href="#twitter">✖</a>
          <a href="#facebook">📘</a>
          <a href="#linkedin">💼</a>
          <a href="#instagram">📸</a>
          <a href="#tiktok">🎵</a>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} EaseMyTools — All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
