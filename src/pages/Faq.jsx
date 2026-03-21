import "../styles/global.css";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";
import Seo from "../components/Seo.jsx";

function Faq() {
  return (
    <div className="page">
      <Seo
        title="FAQ | The Healthy Eating Manual"
        description="Read common questions about The Healthy Eating Manual, including diet approach, expected results, and who this guide is for."
      />
      <Navbar />
      <main>
        <section className="section">
          <div className="container two-column">
            <div>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Is this another extreme diet?</h3>
                <p>
                  No. This book teaches sustainable eating habits you can
                  maintain for years, not 30 days.
                </p>
              </div>
              <div className="faq-item">
                <h3>Will I need expensive foods?</h3>
                <p>
                  No. The strategies are built around accessible, everyday
                  foods.
                </p>
              </div>
              <div className="faq-item">
                <h3>How fast will I see results?</h3>
                <p>
                  Many readers report improved energy and reduced bloating
                  within 1–2 weeks when they apply the principles consistently.
                </p>
              </div>
              <div className="faq-item">
                <h3>Is this suitable for beginners?</h3>
                <p>
                  Yes. Everything is explained in simple language with clear
                  examples.
                </p>
              </div>
              <div className="faq-item">
                <h3>Is this medical advice?</h3>
                <p>
                  No. This book provides educational guidance on nutrition
                  habits. Always consult a healthcare professional for medical
                  conditions.
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
