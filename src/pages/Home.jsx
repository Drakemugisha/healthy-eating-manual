import "../styles/global.css";
import logo from "../assets/4E18AC29-0D3C-49D2-A919-15327DE4EFA5.png";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

function Home() {
  return (
    <div className="page">
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className="hero" id="top">
          <div className="container hero-inner">
            <div className="hero-grid">
              <div className="hero-logo-block">
                <img id="logo-image" src={logo} alt="logo of the brand" />
              </div>
              <div className="hero-copy">
                <p className="eyebrow">
                  Backed by behavioral science. Built for real life.
                </p>
                <h1>THE HEALTHY EATING MANUAL</h1>
                <h2 className="hero-subtitle">
                  Eat Better. Feel Stronger. Stay Consistent.
                </h2>
                <p className="lead">
                  Stop starting over every Monday. Build eating habits that
                  actually stick — without extreme dieting or expensive foods.
                </p>
                <div className="hero-actions">
                  <a href="#signup" className="btn btn-primary">
                    Start Your Healthy Reset Today
                  </a>
                  <p className="small-note">
                    Instant access • Practical • Beginner-friendly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 – THE REAL PROBLEM */}
        <section className="section" id="problem">
          <div className="container two-column">
            <div>
              <h2>You don't have a motivation problem.</h2>
              <h2>You have a clarity problem.</h2>
            </div>
            <div className="stack">
              <div>
                <p>
                  You already <em>want</em> to eat better.
                </p>
                <p>But instead, you:</p>
                <ul className="feature-list">
                  <li>Try a new diet… then quit.</li>
                  <li>Eat "healthy" but see no change.</li>
                  <li>Feel tired even when you're trying.</li>
                  <li>Get overwhelmed by conflicting advice online.</li>
                </ul>
                <p>
                  <strong>Healthy eating feels complicated.</strong>
                </p>
                <p>It shouldn't be.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 – SHIFT (Autonomy + Empowerment) */}
        <section className="section alt" id="shift">
          <div className="container two-column">
            <div>
              <h2>What if healthy eating was simple?</h2>
            </div>
            <div className="stack">
              <div>
                <h3>Imagine:</h3>
                <ul className="feature-list">
                  <li>Waking up with stable energy.</li>
                  <li>Feeling lighter after meals.</li>
                  <li>Knowing exactly what to buy at the market.</li>
                  <li>Losing weight without starving yourself.</li>
                  <li>Feeling in control around food.</li>
                </ul>
                <p>Not because you forced yourself.</p>
                <p>
                  <strong>But because your system works.</strong>
                </p>
              </div>
              <div>
                <p>
                  <strong>That's what this manual gives you:</strong>
                </p>
                <p>A repeatable framework you can use for life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 – AUTHORITY */}
        <section className="section" id="authority">
          <div className="container">
            <div className="section-header">
              <h2>Built on Proven Behavioral Science</h2>
              <p>This is not another trendy diet.</p>
            </div>
            <div className="cards-grid">
              <div className="card">
                <h3>Habit Formation Psychology</h3>
                <p>
                  Build automatic behaviors that require less willpower over
                  time.
                </p>
              </div>
              <div className="card">
                <h3>Sustainable Behavior Design</h3>
                <p>Create systems that work with your life, not against it.</p>
              </div>
              <div className="card">
                <h3>Long-Term Lifestyle Change</h3>
                <p>Focus on strategies that compound over months and years.</p>
              </div>
            </div>
            <div className="section-header" style={{ marginTop: "2rem" }}>
              <p>
                You won't just learn <em>what</em> to eat.
              </p>
              <p>
                <strong>
                  You'll learn how to make healthy eating automatic.
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 – WHAT YOU GET */}
        <section className="section alt" id="contents">
          <div className="container">
            <h2>Inside The Healthy Eating Manual, You'll Discover:</h2>
            <div className="steps">
              <div className="step">
                <h3>✔️ The 3-Part Meal Structure That Prevents Cravings</h3>
                <p>So you stop snacking every two hours.</p>
              </div>
              <div className="step">
                <h3>✔️ The Energy Formula</h3>
                <p>How to combine common foods for steady daily energy.</p>
              </div>
              <div className="step">
                <h3>✔️ The Hunger Control Method</h3>
                <p>Reduce overeating without relying on willpower.</p>
              </div>
              <div className="step">
                <h3>✔️ The Simple Weight-Loss Framework</h3>
                <p>No calorie obsession. No extreme restrictions.</p>
              </div>
              <div className="step">
                <h3>✔️ The Consistency System</h3>
                <p>How to stay on track even after "bad days."</p>
              </div>
              <div className="step">
                <h3>✔️ Clear Action Steps</h3>
                <p>
                  Each chapter ends with practical application. No theory
                  without action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 – SOCIAL PROOF */}
        <section className="section" id="why-works">
          <div className="container two-column">
            <div>
              <h2>Why This Approach Works</h2>
            </div>
            <div className="stack">
              <div>
                <p>
                  Most diets fail because they rely on{" "}
                  <strong>intensity</strong>.
                </p>
                <p>
                  This system works because it relies on{" "}
                  <strong>structure</strong>.
                </p>
              </div>
              <div>
                <h3>When people switch from discipline to systems:</h3>
                <ul className="feature-list">
                  <li>They stop restarting.</li>
                  <li>They reduce decision fatigue.</li>
                  <li>They build momentum.</li>
                </ul>
                <p>
                  <strong>Consistency beats intensity. Every time.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 – WHO THIS IS FOR */}
        <section className="section alt" id="who">
          <div className="container two-column">
            <div>
              <h2>This Book Is For You If:</h2>
            </div>
            <div className="stack">
              <ul className="feature-list">
                <li>You're tired of restarting diets.</li>
                <li>You want practical nutrition guidance.</li>
                <li>You prefer affordable, everyday foods.</li>
                <li>
                  You want sustainable results — not 30-day transformations.
                </li>
                <li>You value long-term health over quick fixes.</li>
              </ul>
              <div style={{ marginTop: "1.5rem" }}>
                <p>If you're looking for a magic pill — this isn't it.</p>
                <p>
                  <strong>
                    If you're ready to build something that lasts — this is for
                    you.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 – ADDRESS OBJECTIONS */}
        <section className="section" id="faq">
          <div className="container">
            <h2>Common Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>"Do I need expensive foods?"</h3>
                <p>No. The framework works with everyday groceries.</p>
              </div>
              <div className="faq-item">
                <h3>"Will I need to starve?"</h3>
                <p>
                  No. You'll learn how to eat in a way that reduces hunger
                  naturally.
                </p>
              </div>
              <div className="faq-item">
                <h3>"How fast will I see results?"</h3>
                <p>
                  Many readers notice improved energy and reduced bloating
                  within 1–2 weeks when applying the system consistently.
                </p>
              </div>
              <div className="faq-item">
                <h3>"Is this medical advice?"</h3>
                <p>
                  No. It's practical nutritional education designed for everyday
                  people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 – SCARCITY + DECISION MOMENT */}
        <section className="section alt" id="urgency">
          <div className="container">
            <div className="two-column">
              <div>
                <h2>Your habits are either building your future health…</h2>
                <h2>or slowly eroding it.</h2>
              </div>
              <div className="stack">
                <div>
                  <h3>Every day you delay:</h3>
                  <ul className="feature-list">
                    <li>Energy declines.</li>
                    <li>Weight increases.</li>
                    <li>Consistency gets harder.</li>
                  </ul>
                </div>
                <div>
                  <h3>Or…</h3>
                  <p>
                    <strong>You can start building a system today.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COST OF INACTION */}
        <section className="section" id="cost">
          <div className="container two-column">
            <div>
              <h2>The Cost of Inaction</h2>
            </div>
            <div className="stack">
              <div>
                <p>If nothing changes:</p>
                <ul className="feature-list">
                  <li>You'll still feel tired next month.</li>
                  <li>You'll still restart another diet.</li>
                  <li>You'll still be confused about what works.</li>
                </ul>
              </div>
              <div>
                <p>
                  <strong>This isn't just about food.</strong>
                </p>
                <p>
                  <strong>It's about control.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="section final-cta" id="signup">
          <div className="container">
            <div className="final-cta-inner">
              <div>
                <h2>The Healthy Eating Manual</h2>
                <p>A practical guide to:</p>
                <ul className="feature-list" style={{ color: "#e5e7eb" }}>
                  <li>Better energy</li>
                  <li>Sustainable weight control</li>
                  <li>Clearer thinking</li>
                  <li>Long-term health</li>
                </ul>
              </div>
              <div>
                <a href="#" className="btn btn-primary">
                  Get Instant Access Now
                </a>
                <p
                  className="small-note"
                  style={{ marginTop: "1rem", color: "#e5e7eb" }}
                >
                  One decision. Compounding benefits.
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

export default Home;
