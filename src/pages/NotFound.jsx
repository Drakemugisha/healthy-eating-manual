import { Link } from "react-router-dom";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";
import Seo from "../components/Seo.jsx";
import "../styles/global.css";

function NotFound() {
  return (
    <div className="page">
      <Seo
        title="404 - Page Not Found | The Healthy Eating Manual"
        description="The page you are looking for does not exist. Return to The Healthy Eating Manual homepage."
      />
      <Navbar />
      <main>
        <section className="section">
          <div className="container" style={{ textAlign: "center" }}>
            <p className="eyebrow">Error 404</p>
            <h1 style={{ marginBottom: "0.75rem" }}>Page not found</h1>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              The page you requested is unavailable or has moved.
            </p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
