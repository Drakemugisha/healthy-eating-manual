import "../styles/global.css";
import logo from "../assets/4E270FD6-30E8-4EE3-AE2B-B89C2AEA0665.png";

function Home() {
  return (
    <div className="page">
      <main>
        <section className="hero" id="top">
          <div className="container hero-inner">
            <div className="hero-grid">
              <div className="hero-logo-block">
                <img id="logo-image" src={logo} alt="logo of the brand" />
              </div>
              <div className="hero-copy">
                <p className="eyebrow">Food is the best medicine</p>
                <h1>THE HEALTH EATING MANUAL.</h1>
                <p className="lead">
                  A book that shows how to happier, more confident and healthier
                  by just using food
                </p>
                <div className="hero-actions">
                  <a href="#signup" className="btn btn-primary">
                    Get the book today
                  </a>
                  <p className="small-note">
                    simple guidelines on how to eat better
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="why">
          <div className="container two-column">
            <div>
              <h2>You read the book. You got fired up. Then… what?</h2>
            </div>
            <div className="stack">
              <div>
                <h3>You’re stuck on “how.”</h3>
                <p>
                  You don’t need more motivation. You need a concrete first
                  step, then a second, then a third.
                </p>
              </div>
              <div>
                <h3>You want proven tools.</h3>
                <p>
                  Get the exact frameworks behind the book: one‑page plans,
                  launch checklists, and promotion templates.
                </p>
              </div>
              <div>
                <h3>You want to move faster.</h3>
                <p>
                  When you’re ready, a 14‑day guided program walks you from idea
                  to first sale—no theory, just action.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="path">
          <div className="container">
            <h2>Your path from reader to business owner</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Join the community</h3>
                <p>
                  Sign up and unlock the free resource library—six focused
                  guides based on the book’s principles.
                </p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Pick a guide and start</h3>
                <p>
                  Each guide is designed to produce a real outcome in under an
                  hour. Start with the one that matches where you are.
                </p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Go deeper with Your First Sale</h3>
                <p>
                  A 14‑day program that takes you from “I have an idea” to “I
                  made my first sale.”
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
