import "../styles/global.css";
import logo from "../assets/4E270FD6-30E8-4EE3-AE2B-B89C2AEA0665.png";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

function Home() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="hero" id="top">
          <div className="container hero-inner">
            <div className="hero-grid">
              <div className="hero-logo-block">
                <img id="logo-image" src={logo} alt="logo of the brand" />
              </div>
              <div className="hero-copy">
                <p className="eyebrow">
                  Eat better. Feel lighter. Think clever
                </p>
                <h1>THE HEALTH EATING MANUAL.</h1>
                <p className="lead">
                  Stop guessing what’s healthy. Start seeing real results with a
                  practical non-confusing guide
                </p>
                <div className="hero-actions">
                  <a href="#signup" className="btn btn-primary">
                    Start Your Healthy Reset Today
                  </a>
                  <p className="small-note">
                    Simple, affordable habits you can start this week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="why">
          <div className="container two-column">
            <div>
              <h2>you want to eat healthy… but real life gets in the way.</h2>
            </div>
            <div className="stack">
              <div>
                <h3>You’re tired of:</h3>
                <p>
                  <li>Starting diets and quitting after 2 weeks</li>
                  <li>
                    Feeling bloated and low-energy Confusing nutrition advice
                  </li>
                  <li> Eating “healthy” but seeing no results</li>
                  <li>onfusing nutrition advice online</li>
                </p>
              </div>
              <div>
                <h3>Instead, imagine:</h3>
                <p>
                  <li>Waking up with steady energy</li>
                  <li>Feeling confident in your clothes</li>
                  <li>
                    Knowing exactly what to eat at the market or restaurant
                  </li>
                  <li>Losing weight without starving yourself</li>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="path">
          <div className="container">
            <h2>
              Your path from frustrated eater to confident, healthy living
            </h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Understand What Your Body Actually Needs</h3>
                <p>
                  Learn how food affects your hormones, energy, cravings, and
                  weight in simple language.
                </p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Build Your Personal Eating Framework</h3>
                <p>
                  Discover how to structure meals that keep you full, satisfied,
                  and in control.
                </p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Create a Lifestyle You Can Sustain</h3>
                <p>
                  No extreme restrictions. No starving. Just repeatable habits
                  that compound over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt" id="why">
          <div className="container two-column">
            <div>
              <h2>what you'll gain from this book.</h2>
            </div>
            <div className="stack">
              <div>
                <p>
                  <li>clear weight-loss principles that actually make sense</li>
                  <li>
                    A simple grocery strategy (no expensive “superfoods”
                    required)
                  </li>
                  <li> How to control cravings without willpower battles</li>
                  <li>A step-by-step healthy eating reset plan</li>
                  <li>Confidence in your food choices</li>
                  <li>More energy within weeks</li>
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
