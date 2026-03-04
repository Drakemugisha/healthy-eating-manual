import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/4E270FD6-30E8-4EE3-AE2B-B89C2AEA0665.png";
import "../styles/global.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-group">
          <span className="logo-mark">
            <img src={logo} alt="logo of brand" />
          </span>
          <span className="logo-text">
            <span className="logo-100">the manual</span>
          </span>
        </div>
        <nav className="nav nav-desktop">
          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="hamburger-icon">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </span>
        </button>
      </div>
      <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/tools" onClick={closeMenu}>
            Tools
          </Link>
          <Link to="/faq" onClick={closeMenu}>
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
