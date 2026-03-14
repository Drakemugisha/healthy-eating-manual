import { useEffect, useRef, useState } from "react";
import "../styles/global.css";
import "../styles/Home.css";
// import logo from "../assets/4E18AC29-0D3C-49D2-A919-15327DE4EFA5.png";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

/* ── Scroll-reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("revealed"),
        ),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Animated counter ── */
function Counter({ to, suffix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setVal(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Floating food SVG ── */
function FloatingFood() {
  return (
    <div className="floating-food" aria-hidden="true">
      <span className="ff ff1">🥑</span>
      <span className="ff ff2">🍎</span>
      <span className="ff ff3">🥦</span>
      <span className="ff ff4">🍋</span>
      <span className="ff ff5">🫐</span>
      <span className="ff ff6">🥕</span>
      <span className="ff ff7">🍓</span>
      <span className="ff ff8">🌽</span>
    </div>
  );
}

/* ── Plate SVG illustration ── */
function PlateIllustration() {
  return (
    <svg
      className="plate-svg"
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodOpacity="0.12" />
        </filter>
      </defs>
      {/* Plate */}
      <ellipse cx="160" cy="280" rx="110" ry="14" fill="rgba(0,0,0,0.08)" />
      <circle cx="160" cy="155" r="130" fill="#fff" filter="url(#shadow)" />
      <circle cx="160" cy="155" r="118" fill="#fafafa" />
      {/* Veggie half */}
      <path
        d="M160 155 L160 38 A117 117 0 0 1 277 155 Z"
        fill="#4ade80"
        opacity="0.85"
        className="plate-seg plate-seg1"
      />
      <path
        d="M160 155 L160 38 A117 117 0 0 0 43 155 Z"
        fill="#22c55e"
        opacity="0.85"
        className="plate-seg plate-seg2"
      />
      {/* Protein */}
      <path
        d="M160 155 L277 155 A117 117 0 0 1 160 272 Z"
        fill="#f97316"
        opacity="0.85"
        className="plate-seg plate-seg3"
      />
      {/* Carbs */}
      <path
        d="M160 155 L160 272 A117 117 0 0 1 43 155 Z"
        fill="#fbbf24"
        opacity="0.85"
        className="plate-seg plate-seg4"
      />
      {/* Center */}
      <circle cx="160" cy="155" r="38" fill="white" />
      <text x="160" y="148" textAnchor="middle" fontSize="22">
        🍽️
      </text>
      <text
        x="160"
        y="168"
        textAnchor="middle"
        fontSize="9"
        fill="#9ca3af"
        fontFamily="system-ui"
      >
        My Plate
      </text>
      {/* Labels */}
      <text
        x="160"
        y="88"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui"
      >
        Vegetables 50%
      </text>
      <text
        x="237"
        y="205"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui"
      >
        Protein 25%
      </text>
      <text
        x="83"
        y="225"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui"
      >
        Carbs 25%
      </text>
    </svg>
  );
}

/* ── Energy chart illustration ── */
function EnergyChart() {
  const bars = [
    { label: "Mon", h: 45, color: "#f97316" },
    { label: "Tue", h: 60, color: "#fbbf24" },
    { label: "Wed", h: 80, color: "#22c55e" },
    { label: "Thu", h: 75, color: "#22c55e" },
    { label: "Fri", h: 88, color: "#22c55e" },
    { label: "Sat", h: 92, color: "#22c55e" },
    { label: "Sun", h: 95, color: "#4ade80" },
  ];
  return (
    <div className="energy-chart" aria-hidden="true">
      <div className="chart-label">Energy Levels Over Time</div>
      <div className="chart-bars">
        {bars.map((b, i) => (
          <div key={b.label} className="chart-bar-wrap">
            <div
              className="chart-bar"
              style={{
                height: `${b.h}%`,
                background: b.color,
                animationDelay: `${i * 0.1}s`,
              }}
            />
            <span className="chart-bar-label">{b.label}</span>
          </div>
        ))}
      </div>
      <div className="chart-arrow">→ After starting The Manual</div>
    </div>
  );
}

/* ── Habit loop illustration ── */
function HabitLoop() {
  const steps = [
    { icon: "🧠", label: "Clarity", sub: "Know what to eat" },
    { icon: "🔁", label: "System", sub: "Repeat it simply" },
    { icon: "💪", label: "Habit", sub: "Becomes automatic" },
    { icon: "✨", label: "Result", sub: "Lasting change" },
  ];
  return (
    <div className="habit-loop">
      {steps.map((s, i) => (
        <div
          key={s.label}
          className="habit-step reveal"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div className="habit-icon">{s.icon}</div>
          <div className="habit-text">
            <strong>{s.label}</strong>
            <span>{s.sub}</span>
          </div>
          {i < steps.length - 1 && <div className="habit-arrow">→</div>}
        </div>
      ))}
    </div>
  );
}

/* ── Squiggle divider ── */
function Squiggle({ color = "#e5e7eb" }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      xmlns="http://www.w3.org/2000/svg"
      className="squiggle-divider"
      preserveAspectRatio="none"
    >
      <path
        d="M0 20 Q150 0 300 20 Q450 40 600 20 Q750 0 900 20 Q1050 40 1200 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

/* ── Food stats pill row ── */
function StatPills() {
  return (
    <div className="stat-pills">
      <div className="stat-pill reveal">
        <span className="stat-num green">
          <Counter to={80} suffix="%" />
        </span>
        <span className="stat-label">Less willpower needed with a system</span>
      </div>
      <div className="stat-pill reveal" style={{ transitionDelay: "0.1s" }}>
        <span className="stat-num orange">
          <Counter to={2} suffix="wks" />
        </span>
        <span className="stat-label">Average time to notice energy shifts</span>
      </div>
      <div className="stat-pill reveal" style={{ transitionDelay: "0.2s" }}>
        <span className="stat-num gold">
          <Counter to={95} suffix="%" />
        </span>
        <span className="stat-label">
          Of readers call it "beginner-friendly"
        </span>
      </div>
    </div>
  );
}

/* ── Main component ── */
function Home() {
  useReveal();

  return (
    <div className="page">
      <Navbar />
      <main>
        {/* ══ HERO ══ */}
        <section className="hero home-hero" id="top">
          <FloatingFood />
          <div className="container hero-inner">
            <div className="hero-grid">
              <div className="hero-logo-block reveal">
                {/* <img
                  id="logo-image"
                  src={logo}
                  alt="Healthy Eating Manual logo"
                  className="hero-logo-img"
                /> */}
                <PlateIllustration />
              </div>
              <div className="hero-copy">
                <p className="eyebrow hero-eyebrow reveal">
                  Backed by behavioral science. Built for real life.
                </p>
                <h1
                  className="hero-h1 reveal"
                  style={{ transitionDelay: "0.1s" }}
                >
                  THE HEALTHY
                  <br />
                  <span className="h1-accent">EATING</span>
                  <br />
                  MANUAL
                </h1>
                <h2
                  className="hero-subtitle reveal"
                  style={{ transitionDelay: "0.2s" }}
                >
                  Eat Better. Feel Stronger. Stay Consistent.
                </h2>
                <p className="lead reveal" style={{ transitionDelay: "0.3s" }}>
                  Stop starting over every Monday. Build eating habits that
                  actually stick — without extreme dieting or expensive foods.
                </p>
                <div
                  className="hero-actions reveal"
                  style={{ transitionDelay: "0.4s" }}
                >
                  <a
                    href="https://healthyeatingmanual.site/healthy_eating_manual.html"
                    className="btn btn-primary btn-hero"
                  >
                    <span>Start Your Healthy Reset Today</span>
                    <span className="btn-arrow">→</span>
                  </a>
                  <p className="small-note">
                    Instant access · Practical · Beginner-friendly
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Squiggle />
        </section>

        {/* ══ STATS ══ */}
        <section className="section stats-section">
          <div className="container">
            <StatPills />
          </div>
        </section>

        {/* ══ PROBLEM ══ */}
        <section className="section" id="problem">
          <div className="container two-column">
            <div className="reveal">
              <div className="section-tag">The Problem</div>
              <h2 className="section-h2">
                You don't have a<br />
                <em>motivation</em> problem.
              </h2>
              <h2 className="section-h2">
                You have a<br />
                <em>clarity</em> problem.
              </h2>
            </div>
            <div className="stack">
              <div className="reveal" style={{ transitionDelay: "0.1s" }}>
                <p>
                  You already <em>want</em> to eat better.
                </p>
                <p>But instead, you:</p>
                <ul className="feature-list styled-list">
                  <li>
                    <span className="list-icon">❌</span> Try a new diet… then
                    quit.
                  </li>
                  <li>
                    <span className="list-icon">❌</span> Eat "healthy" but see
                    no change.
                  </li>
                  <li>
                    <span className="list-icon">❌</span> Feel tired even when
                    you're trying.
                  </li>
                  <li>
                    <span className="list-icon">❌</span> Get overwhelmed by
                    conflicting advice online.
                  </li>
                </ul>
              </div>
              <div
                className="problem-callout reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <span className="callout-icon">💡</span>
                <p>
                  <strong>Healthy eating feels complicated.</strong>
                </p>
                <p>It shouldn't be.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SHIFT ══ */}
        <section className="section alt imagine-section" id="shift">
          <div className="container two-column">
            <div className="reveal">
              <div className="section-tag">The Solution</div>
              <h2 className="section-h2">
                What if healthy eating was <em>simple</em>?
              </h2>
              <EnergyChart />
            </div>
            <div className="stack">
              <div className="reveal" style={{ transitionDelay: "0.1s" }}>
                <h3>Imagine:</h3>
                <ul className="feature-list styled-list">
                  <li>
                    <span className="list-icon">✅</span> Waking up with stable
                    energy.
                  </li>
                  <li>
                    <span className="list-icon">✅</span> Feeling lighter after
                    meals.
                  </li>
                  <li>
                    <span className="list-icon">✅</span> Knowing exactly what
                    to buy at the market.
                  </li>
                  <li>
                    <span className="list-icon">✅</span> Losing weight without
                    starving yourself.
                  </li>
                  <li>
                    <span className="list-icon">✅</span> Feeling in control
                    around food.
                  </li>
                </ul>
              </div>
              <div
                className="shift-callout reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <strong>That's what this manual gives you:</strong>
                <p>A repeatable framework you can use for life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HABIT LOOP ══ */}
        <section className="section habit-section" id="authority">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-tag">The Method</div>
              <h2>Built on Proven Behavioral Science</h2>
              <p>This is not another trendy diet.</p>
            </div>
            <HabitLoop />
            <div className="cards-grid" style={{ marginTop: "2.5rem" }}>
              <div className="card animated-card reveal">
                <div className="card-icon">🧠</div>
                <h3>Habit Formation Psychology</h3>
                <p>
                  Build automatic behaviors that require less willpower over
                  time.
                </p>
              </div>
              <div
                className="card animated-card reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                <div className="card-icon">⚙️</div>
                <h3>Sustainable Behavior Design</h3>
                <p>Create systems that work with your life, not against it.</p>
              </div>
              <div
                className="card animated-card reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="card-icon">📈</div>
                <h3>Long-Term Lifestyle Change</h3>
                <p>Focus on strategies that compound over months and years.</p>
              </div>
            </div>
            <div className="science-note reveal">
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

        {/* ══ WHAT YOU GET ══ */}
        <section className="section alt" id="contents">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-tag">What's Inside</div>
              <h2>Inside The Healthy Eating Manual, You'll Discover:</h2>
            </div>
            <div className="steps">
              {[
                {
                  icon: "🍽️",
                  title: "The 3-Part Meal Structure That Prevents Cravings",
                  desc: "So you stop snacking every two hours.",
                },
                {
                  icon: "⚡",
                  title: "The Energy Formula",
                  desc: "How to combine common foods for steady daily energy.",
                },
                {
                  icon: "🧘",
                  title: "The Hunger Control Method",
                  desc: "Reduce overeating without relying on willpower.",
                },
                {
                  icon: "📉",
                  title: "The Simple Weight-Loss Framework",
                  desc: "No calorie obsession. No extreme restrictions.",
                },
                {
                  icon: "🔁",
                  title: "The Consistency System",
                  desc: 'How to stay on track even after "bad days."',
                },
                {
                  icon: "✅",
                  title: "Clear Action Steps",
                  desc: "Each chapter ends with practical application. No theory without action.",
                },
              ].map((s, i) => (
                <div
                  className="step animated-step reveal"
                  key={s.title}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="step-emoji">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY IT WORKS ══ */}
        <section className="section why-works-section" id="why-works">
          <div className="container two-column">
            <div className="reveal">
              <div className="section-tag">Why It Works</div>
              <h2 className="section-h2">Why This Approach Works</h2>
            </div>
            <div className="stack">
              <div
                className="contrast-block reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                <div className="contrast-row bad">
                  <span className="contrast-icon">❌</span>
                  <div>
                    <strong>Diets rely on intensity</strong>
                    <span>Exhausting, unsustainable, you restart again.</span>
                  </div>
                </div>
                <div className="contrast-row good">
                  <span className="contrast-icon">✅</span>
                  <div>
                    <strong>This system relies on structure</strong>
                    <span>Consistent, automatic, compounds over time.</span>
                  </div>
                </div>
              </div>
              <div className="reveal" style={{ transitionDelay: "0.2s" }}>
                <h3>When people switch from discipline to systems:</h3>
                <ul className="feature-list styled-list">
                  <li>
                    <span className="list-icon">✅</span> They stop restarting.
                  </li>
                  <li>
                    <span className="list-icon">✅</span> They reduce decision
                    fatigue.
                  </li>
                  <li>
                    <span className="list-icon">✅</span> They build momentum.
                  </li>
                </ul>
                <p className="bold-callout">
                  <strong>Consistency beats intensity. Every time.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHO IT'S FOR ══ */}
        <section className="section alt" id="who">
          <div className="container two-column">
            <div className="reveal">
              <div className="section-tag">Is This For You?</div>
              <h2 className="section-h2">This Book Is For You If:</h2>
            </div>
            <div className="stack">
              <ul
                className="feature-list styled-list reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                <li>
                  <span className="list-icon">✅</span> You're tired of
                  restarting diets.
                </li>
                <li>
                  <span className="list-icon">✅</span> You want practical
                  nutrition guidance.
                </li>
                <li>
                  <span className="list-icon">✅</span> You prefer affordable,
                  everyday foods.
                </li>
                <li>
                  <span className="list-icon">✅</span> You want sustainable
                  results — not 30-day transformations.
                </li>
                <li>
                  <span className="list-icon">✅</span> You value long-term
                  health over quick fixes.
                </li>
              </ul>
              <div
                className="for-you-note reveal"
                style={{ transitionDelay: "0.2s" }}
              >
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

        {/* ══ FAQ ══ */}
        <section className="section faq-section" id="faq">
          <div className="container">
            <div className="section-header reveal">
              <div className="section-tag">FAQ</div>
              <h2>Common Questions</h2>
            </div>
            <div className="faq-list">
              {[
                {
                  q: '"Do I need expensive foods?"',
                  a: "No. The framework works with everyday groceries.",
                },
                {
                  q: '"Will I need to starve?"',
                  a: "No. You'll learn how to eat in a way that reduces hunger naturally.",
                },
                {
                  q: '"How fast will I see results?"',
                  a: "Many readers notice improved energy and reduced bloating within 1–2 weeks when applying the system consistently.",
                },
                {
                  q: '"Is this medical advice?"',
                  a: "No. It's practical nutritional education designed for everyday people.",
                },
              ].map((f, i) => (
                <div
                  className="faq-item animated-faq reveal"
                  key={f.q}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="faq-q-icon">?</div>
                  <div>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ URGENCY ══ */}
        <section className="section urgency-section" id="urgency">
          <div className="container">
            <div className="urgency-inner">
              <div className="reveal">
                <div className="section-tag light">The Stakes</div>
                <h2 className="urgency-h2">
                  Your habits are either building your future health…
                  <br />
                  or slowly eroding it.
                </h2>
              </div>
              <div className="urgency-two-col">
                <div className="urgency-col bad reveal">
                  <h3>Every day you delay:</h3>
                  <ul className="feature-list styled-list dark">
                    <li>
                      <span className="list-icon">📉</span> Energy declines.
                    </li>
                    <li>
                      <span className="list-icon">📉</span> Weight increases.
                    </li>
                    <li>
                      <span className="list-icon">📉</span> Consistency gets
                      harder.
                    </li>
                  </ul>
                </div>
                <div className="urgency-divider">VS</div>
                <div
                  className="urgency-col good reveal"
                  style={{ transitionDelay: "0.15s" }}
                >
                  <h3>Or…</h3>
                  <p>
                    <strong>You can start building a system today.</strong>
                  </p>
                  <a
                    href="https://healthyeatingmanual.site/healthy_eating_manual.html"
                    className="btn btn-primary btn-urgency"
                  >
                    Start Now →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ COST OF INACTION ══ */}
        <section className="section" id="cost">
          <div className="container two-column">
            <div className="reveal">
              <div className="section-tag">Cost of Waiting</div>
              <h2 className="section-h2">The Cost of Inaction</h2>
            </div>
            <div className="stack">
              <div className="reveal" style={{ transitionDelay: "0.1s" }}>
                <p>If nothing changes:</p>
                <ul className="feature-list styled-list">
                  <li>
                    <span className="list-icon">😔</span> You'll still feel
                    tired next month.
                  </li>
                  <li>
                    <span className="list-icon">😔</span> You'll still restart
                    another diet.
                  </li>
                  <li>
                    <span className="list-icon">😔</span> You'll still be
                    confused about what works.
                  </li>
                </ul>
              </div>
              <div
                className="control-callout reveal"
                style={{ transitionDelay: "0.2s" }}
              >
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

        {/* ══ FINAL CTA ══ */}
        <section className="section final-cta" id="signup">
          <div className="container">
            <div className="final-cta-inner">
              <div className="reveal">
                <h2>The Healthy Eating Manual</h2>
                <p>A practical guide to:</p>
                <ul className="feature-list" style={{ color: "#e5e7eb" }}>
                  <li>🌿 Better energy</li>
                  <li>⚖️ Sustainable weight control</li>
                  <li>🧠 Clearer thinking</li>
                  <li>💚 Long-term health</li>
                </ul>
              </div>
              <div
                className="final-cta-right reveal"
                style={{ transitionDelay: "0.15s" }}
              >
                <a
                  href="https://healthyeatingmanual.site/healthy_eating_manual.html"
                  className="btn btn-primary btn-final"
                >
                  Get Instant Access Now
                </a>
                <p
                  className="small-note"
                  style={{ marginTop: "1rem", color: "#9ca3af" }}
                >
                  One decision. Compounding benefits.
                </p>
                <div className="trust-badges">
                  <span>📱 Works on any device</span>
                  <span>🔒 Instant access</span>
                  <span>⭐ Beginner-friendly</span>
                </div>
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
