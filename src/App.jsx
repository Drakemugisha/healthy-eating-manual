import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Tools from "./pages/Tools.jsx";
import Faq from "./pages/Faq.jsx";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <header className="site-header">
          <div className="container header-inner">
            <div className="logo-group">
              <span className="logo-mark">$</span>
              <span className="logo-text">
                <span className="logo-100">the manual</span>
              </span>
            </div>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/tools">Tools</Link>
              <Link to="/faq">FAQ</Link>
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
