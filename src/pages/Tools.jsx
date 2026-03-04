import "../styles/global.css";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

function Tools() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="section alt">
          <div className="container">
            <header className="section-header">
              <h2>Your $100 Startup tools</h2>
              <p>
                These are the core frameworks and checklists that help you move
                from idea to income with as little friction as possible.
              </p>
            </header>

            <div className="cards-grid">
              <article className="card">
                <h3>Instant Consulting Business</h3>
                <p>
                  Turn skills you already have into a simple, focused consulting
                  offer.
                </p>
              </article>
              <article className="card">
                <h3>The One‑Page Business Plan</h3>
                <p>
                  Capture your offer, audience, and revenue model on a single
                  page.
                </p>
              </article>
              <article className="card">
                <h3>The One‑Page Promotion Plan</h3>
                <p>
                  Clarify how you’ll actually reach customers without
                  overcomplicating it.
                </p>
              </article>
              <article className="card">
                <h3>Become Your Own Publisher</h3>
                <p>
                  Create and sell simple information products around what you
                  know.
                </p>
              </article>
              <article className="card">
                <h3>Seven Steps to Market Testing</h3>
                <p>
                  Validate demand before you invest serious time, money, or
                  energy.
                </p>
              </article>
              <article className="card">
                <h3>The 39‑Step Launch Checklist</h3>
                <p>
                  Everything to confirm before, during, and after your next
                  launch.
                </p>
              </article>
            </div>

            <div className="cta-row" id="signup">
              <div>
                <h3>Get the full library</h3>
                <p>Sign up once, get instant access to all six tools.</p>
              </div>
              <form
                className="signup-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "This is a demo tools page – connect this to your email service.",
                  );
                }}
              >
                <input type="email" placeholder="you@example.com" required />
                <button type="submit" className="btn btn-primary">
                  Get the Free Library
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Tools;
