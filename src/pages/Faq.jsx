import "../styles/global.css";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

function Faq() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="section">
          <div className="container two-column">
            <div>
              <h2>Frequently asked questions</h2>
              <p>
                A quick overview of how this project works. It mirrors the
                original 100startup.com site but is built as a React demo.
              </p>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Is this the official $100 Startup site?</h3>
                <p>
                  No. This is a front‑end clone built for learning and
                  experimentation. It isn’t affiliated with Chris Guillebeau or
                  the original project.
                </p>
              </div>
              <div className="faq-item">
                <h3>Where are the actual resources?</h3>
                <p>
                  On the original site you can get the full library by signing
                  up. Here you can reuse this layout and plug in your own email
                  service or products.
                </p>
              </div>
              <div className="faq-item">
                <h3>Can I use this layout for my own project?</h3>
                <p>
                  Yes—treat it as a starting point. Swap the copy, colors, and
                  assets for your own brand.
                </p>
              </div>
              <div className="faq-item">
                <h3>Does this demo store any data?</h3>
                <p>
                  No. The email forms simply show an alert message. You can wire
                  them to your own backend or email provider.
                </p>
              </div>
              <div className="faq-item">
                <h3>What stack is this using?</h3>
                <p>
                  Vite, React, React Router, and plain CSS. No TypeScript is
                  required in this version.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Faq;
