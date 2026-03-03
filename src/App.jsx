import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import Faq from "./pages/Faq.jsx";
import "./styles/global.css";
import logo from "./assets/4E270FD6-30E8-4EE3-AE2B-B89C2AEA0665.png";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <BrowserRouter>
      <div className="page">
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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>the healthy eating manual 2026</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
