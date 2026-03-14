import { useState } from "react";
import "../styles/global.css";
import "../styles/Tools.css";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

/* ─── unit helpers ─────────────────────────── */
const kgToLbs = (kg) => +(kg * 2.20462).toFixed(1);
const lbsToKg = (lbs) => +(lbs / 2.20462).toFixed(2);
const cmToInch = (cm) => +(cm / 2.54).toFixed(1);
const inchToCm = (inch) => +(inch * 2.54).toFixed(1);
const ftInToCm = (ft, inch) =>
  inchToCm(parseFloat(ft || 0) * 12 + parseFloat(inch || 0));

/* ─── Unit Toggle ───────────────────────────── */
function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${unit === "metric" ? "active" : ""}`}
        onClick={() => onChange("metric")}
      >
        🌍 Metric (kg / cm)
      </button>
      <button
        className={`unit-btn ${unit === "imperial" ? "active" : ""}`}
        onClick={() => onChange("imperial")}
      >
        🇺🇸 Imperial (lbs / ft)
      </button>
    </div>
  );
}

/* ─── Height input ──────────────────────────── */
function HeightInput({ unit, cm, setCm, ft, setFt, inch, setInch }) {
  if (unit === "metric") {
    return (
      <div className="tool-field">
        <label>Height (cm)</label>
        <input
          type="number"
          placeholder="e.g. 170"
          value={cm}
          onChange={(e) => setCm(e.target.value)}
        />
      </div>
    );
  }
  return (
    <>
      <div className="tool-field">
        <label>Height (ft)</label>
        <input
          type="number"
          placeholder="5"
          value={ft}
          onChange={(e) => setFt(e.target.value)}
        />
      </div>
      <div className="tool-field">
        <label>Height (in)</label>
        <input
          type="number"
          placeholder="7"
          value={inch}
          onChange={(e) => setInch(e.target.value)}
        />
      </div>
    </>
  );
}

/* ─── Weight input ──────────────────────────── */
function WeightInput({ unit, kg, setKg, lbs, setLbs }) {
  if (unit === "metric") {
    return (
      <div className="tool-field">
        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="e.g. 70"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
        />
      </div>
    );
  }
  return (
    <div className="tool-field">
      <label>Weight (lbs)</label>
      <input
        type="number"
        placeholder="e.g. 154"
        value={lbs}
        onChange={(e) => setLbs(e.target.value)}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 1 — BMI Calculator
══════════════════════════════════════════════ */
function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [cm, setCm] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };

  const getCategory = (bmi) => {
    if (bmi < 18.5)
      return {
        label: "Underweight",
        color: "#3b82f6",
        tip: "Consider increasing your caloric intake with nutrient-dense foods.",
      };
    if (bmi < 25)
      return {
        label: "Normal weight",
        color: "#22c55e",
        tip: "Great! Maintain your current habits with balanced nutrition and exercise.",
      };
    if (bmi < 30)
      return {
        label: "Overweight",
        color: "#f97316",
        tip: "A modest calorie deficit and regular activity can help.",
      };
    return {
      label: "Obese",
      color: "#ef4444",
      tip: "Consult a healthcare provider for a personalised plan.",
    };
  };

  const calculate = () => {
    const weightKg =
      unit === "metric" ? parseFloat(kg) : lbsToKg(parseFloat(lbs));
    const heightM =
      unit === "metric" ? parseFloat(cm) / 100 : ftInToCm(ft, inch) / 100;
    if (!weightKg || !heightM) return;
    setResult(+(weightKg / (heightM * heightM)).toFixed(1));
  };

  const cat = result ? getCategory(result) : null;
  const barPct = result
    ? Math.min(Math.max(((result - 10) / 30) * 100, 2), 98)
    : 0;

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">⚖️</span>
        <div>
          <h3 className="tool-title">BMI Calculator</h3>
          <p className="tool-desc">
            Body Mass Index — a quick snapshot of your weight-to-height ratio.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="tool-inputs">
        <WeightInput
          unit={unit}
          kg={kg}
          setKg={setKg}
          lbs={lbs}
          setLbs={setLbs}
        />
        <HeightInput
          unit={unit}
          cm={cm}
          setCm={setCm}
          ft={ft}
          setFt={setFt}
          inch={inch}
          setInch={setInch}
        />
      </div>
      <button className="tool-btn" onClick={calculate}>
        Calculate BMI
      </button>
      {result && cat && (
        <div className="tool-result">
          <div className="result-big">
            <span className="result-number" style={{ color: cat.color }}>
              {result}
            </span>
            <span className="result-unit">BMI</span>
          </div>
          <div className="bmi-bar-wrap">
            <div className="bmi-bar-track">
              <div
                className="bmi-bar-fill"
                style={{ left: `${barPct}%`, background: cat.color }}
              />
            </div>
            <div className="bmi-zones">
              <span style={{ color: "#3b82f6" }}>Underweight</span>
              <span style={{ color: "#22c55e" }}>Normal</span>
              <span style={{ color: "#f97316" }}>Overweight</span>
              <span style={{ color: "#ef4444" }}>Obese</span>
            </div>
          </div>
          <div
            className="result-badge"
            style={{
              background: cat.color + "18",
              borderColor: cat.color + "40",
              color: cat.color,
            }}
          >
            {cat.label}
          </div>
          <p className="result-tip">💡 {cat.tip}</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 2 — TDEE / Maintenance Calories
══════════════════════════════════════════════ */
function TDEECalculator() {
  const [unit, setUnit] = useState("metric");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [cm, setCm] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };

  const levels = [
    { value: "1.2", label: "Sedentary", sub: "Desk job, little exercise" },
    { value: "1.375", label: "Lightly active", sub: "1–3 days/week" },
    { value: "1.55", label: "Moderately active", sub: "3–5 days/week" },
    { value: "1.725", label: "Very active", sub: "6–7 days/week" },
    { value: "1.9", label: "Extra active", sub: "Physical job + training" },
  ];

  const calculate = () => {
    const a = parseFloat(age);
    const w = unit === "metric" ? parseFloat(kg) : lbsToKg(parseFloat(lbs));
    const h = unit === "metric" ? parseFloat(cm) : ftInToCm(ft, inch);
    const act = parseFloat(activity);
    if (!a || !w || !h) return;
    const bmr =
      sex === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * act);
    setResult({
      tdee,
      loss: tdee - 500,
      gain: tdee + 300,
      bmr: Math.round(bmr),
    });
  };

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">🔥</span>
        <div>
          <h3 className="tool-title">Maintenance Calories (TDEE)</h3>
          <p className="tool-desc">
            Total Daily Energy Expenditure — calories you burn daily.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="tool-inputs">
        <div className="tool-field">
          <label>Age</label>
          <input
            type="number"
            placeholder="e.g. 28"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="tool-field">
          <label>Sex</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <WeightInput
          unit={unit}
          kg={kg}
          setKg={setKg}
          lbs={lbs}
          setLbs={setLbs}
        />
        <HeightInput
          unit={unit}
          cm={cm}
          setCm={setCm}
          ft={ft}
          setFt={setFt}
          inch={inch}
          setInch={setInch}
        />
      </div>
      <div className="tool-field full-width">
        <label>Activity Level</label>
        <div className="activity-options">
          {levels.map((l) => (
            <button
              key={l.value}
              className={`activity-btn ${activity === l.value ? "active" : ""}`}
              onClick={() => setActivity(l.value)}
            >
              <span className="act-label">{l.label}</span>
              <span className="act-sub">{l.sub}</span>
            </button>
          ))}
        </div>
      </div>
      <button className="tool-btn" onClick={calculate}>
        Calculate TDEE
      </button>
      {result && (
        <div className="tool-result">
          <div className="tdee-grid">
            <div className="tdee-cell">
              <span className="result-number" style={{ color: "#111827" }}>
                {result.tdee.toLocaleString()}
              </span>
              <span className="result-label">Maintenance kcal/day</span>
              <span className="result-sub">
                BMR: {result.bmr.toLocaleString()} kcal
              </span>
            </div>
            <div className="tdee-cell">
              <span className="result-number" style={{ color: "#ef4444" }}>
                {result.loss.toLocaleString()}
              </span>
              <span className="result-label">Weight Loss</span>
              <span className="result-sub">−500 kcal deficit</span>
            </div>
            <div className="tdee-cell">
              <span className="result-number" style={{ color: "#22c55e" }}>
                {result.gain.toLocaleString()}
              </span>
              <span className="result-label">Weight Gain</span>
              <span className="result-sub">+300 kcal surplus</span>
            </div>
          </div>
          <p className="result-tip">
            💡 Based on Mifflin–St Jeor. Adjust based on real-world results over
            2–3 weeks.
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 3 — Macro Calculator
══════════════════════════════════════════════ */
function MacroCalculator() {
  const [unit, setUnit] = useState("metric");
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };

  const goals = [
    { value: "lose", label: "🔻 Lose Fat", protein: 0.4, carbs: 0.3, fat: 0.3 },
    {
      value: "maintain",
      label: "⚖️ Maintain",
      protein: 0.3,
      carbs: 0.4,
      fat: 0.3,
    },
    {
      value: "gain",
      label: "💪 Build Muscle",
      protein: 0.35,
      carbs: 0.45,
      fat: 0.2,
    },
  ];

  const calculate = () => {
    const kcal = parseFloat(calories);
    if (!kcal) return;
    const g = goals.find((x) => x.value === goal);
    const w = unit === "metric" ? parseFloat(kg) : lbsToKg(parseFloat(lbs));
    const proteinG = Math.round((kcal * g.protein) / 4);
    setResult({
      protein: proteinG,
      carbs: Math.round((kcal * g.carbs) / 4),
      fat: Math.round((kcal * g.fat) / 9),
      pct: {
        protein: Math.round(g.protein * 100),
        carbs: Math.round(g.carbs * 100),
        fat: Math.round(g.fat * 100),
      },
      perKg: w ? +(proteinG / w).toFixed(1) : null,
    });
  };

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">🥗</span>
        <div>
          <h3 className="tool-title">Macro Calculator</h3>
          <p className="tool-desc">
            Break your daily calories into protein, carbs, and fat targets.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="unit-toggle" style={{ marginTop: 0 }}>
        {goals.map((g) => (
          <button
            key={g.value}
            className={`unit-btn ${goal === g.value ? "active" : ""}`}
            onClick={() => {
              setGoal(g.value);
              setResult(null);
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="tool-inputs">
        <div className="tool-field full-width">
          <label>Daily Calories (kcal)</label>
          <input
            type="number"
            placeholder="e.g. 2200 — use TDEE tool above"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
        <WeightInput
          unit={unit}
          kg={kg}
          setKg={setKg}
          lbs={lbs}
          setLbs={setLbs}
        />
        <div className="tool-field">
          <label>Optional — for protein per kg/lb output</label>
          <div className="field-note">Adds reference ratio to results</div>
        </div>
      </div>
      <button className="tool-btn" onClick={calculate}>
        Calculate Macros
      </button>
      {result && (
        <div className="tool-result">
          <div className="macro-grid">
            <div className="macro-cell" style={{ borderColor: "#ef4444" }}>
              <span className="macro-number" style={{ color: "#ef4444" }}>
                {result.protein}g
              </span>
              <span className="macro-label">Protein</span>
              <span className="macro-pct">
                {result.pct.protein}%
                {result.perKg
                  ? ` · ${result.perKg}g/${unit === "metric" ? "kg" : "lb"}`
                  : ""}
              </span>
              <div className="macro-bar" style={{ background: "#ef444430" }}>
                <div
                  className="macro-bar-inner"
                  style={{
                    width: `${result.pct.protein}%`,
                    background: "#ef4444",
                  }}
                />
              </div>
            </div>
            <div className="macro-cell" style={{ borderColor: "#f59e0b" }}>
              <span className="macro-number" style={{ color: "#f59e0b" }}>
                {result.carbs}g
              </span>
              <span className="macro-label">Carbs</span>
              <span className="macro-pct">{result.pct.carbs}%</span>
              <div className="macro-bar" style={{ background: "#f59e0b30" }}>
                <div
                  className="macro-bar-inner"
                  style={{
                    width: `${result.pct.carbs}%`,
                    background: "#f59e0b",
                  }}
                />
              </div>
            </div>
            <div className="macro-cell" style={{ borderColor: "#8b5cf6" }}>
              <span className="macro-number" style={{ color: "#8b5cf6" }}>
                {result.fat}g
              </span>
              <span className="macro-label">Fat</span>
              <span className="macro-pct">{result.pct.fat}%</span>
              <div className="macro-bar" style={{ background: "#8b5cf630" }}>
                <div
                  className="macro-bar-inner"
                  style={{ width: `${result.pct.fat}%`, background: "#8b5cf6" }}
                />
              </div>
            </div>
          </div>
          <p className="result-tip">
            💡 Protein: 4 kcal/g · Carbs: 4 kcal/g · Fat: 9 kcal/g
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 4 — Ideal Body Weight
══════════════════════════════════════════════ */
function IdealWeightCalculator() {
  const [unit, setUnit] = useState("metric");
  const [cm, setCm] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [sex, setSex] = useState("male");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };

  const fmt = (kg, u) =>
    u === "metric" ? `${+kg.toFixed(1)} kg` : `${kgToLbs(kg)} lbs`;

  const calculate = () => {
    const h = unit === "metric" ? parseFloat(cm) : ftInToCm(ft, inch);
    if (!h || h < 100) return;
    const over5ft = h / 2.54 - 60;
    const devine = sex === "male" ? 50 + 2.3 * over5ft : 45.5 + 2.3 * over5ft;
    const miller =
      sex === "male" ? 56.2 + 1.41 * over5ft : 53.1 + 1.36 * over5ft;
    const robinson = sex === "male" ? 52 + 1.9 * over5ft : 49 + 1.7 * over5ft;
    const avg = (devine + miller + robinson) / 3;
    setResult({
      devine: fmt(devine, unit),
      miller: fmt(miller, unit),
      robinson: fmt(robinson, unit),
      low: fmt(avg - 5, unit),
      high: fmt(avg + 5, unit),
    });
  };

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">🎯</span>
        <div>
          <h3 className="tool-title">Ideal Body Weight</h3>
          <p className="tool-desc">
            Estimate a healthy target weight using three medical formulas.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="tool-inputs">
        <HeightInput
          unit={unit}
          cm={cm}
          setCm={setCm}
          ft={ft}
          setFt={setFt}
          inch={inch}
          setInch={setInch}
        />
        <div className="tool-field">
          <label>Sex</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <button className="tool-btn" onClick={calculate}>
        Calculate Ideal Weight
      </button>
      {result && (
        <div className="tool-result">
          <div className="ibw-range">
            <span className="ibw-label">Healthy Weight Range</span>
            <span className="ibw-numbers">
              {result.low} – {result.high}
            </span>
          </div>
          <div className="ibw-formulas">
            <div className="ibw-row">
              <span>Devine formula</span>
              <strong>{result.devine}</strong>
            </div>
            <div className="ibw-row">
              <span>Miller formula</span>
              <strong>{result.miller}</strong>
            </div>
            <div className="ibw-row">
              <span>Robinson formula</span>
              <strong>{result.robinson}</strong>
            </div>
          </div>
          <p className="result-tip">
            💡 These are reference points, not strict targets. Muscle mass and
            body composition also matter.
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 5 — Daily Water Intake
══════════════════════════════════════════════ */
function WaterCalculator() {
  const [unit, setUnit] = useState("metric");
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("temperate");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };

  const calculate = () => {
    const w = unit === "metric" ? parseFloat(kg) : lbsToKg(parseFloat(lbs));
    if (!w) return;
    let base = w * 35;
    if (activity === "moderate") base *= 1.15;
    if (activity === "intense") base *= 1.3;
    if (climate === "hot") base *= 1.15;
    if (climate === "cold") base *= 0.95;
    const ml = Math.round(base);
    setResult({
      litres: +(ml / 1000).toFixed(1),
      ml,
      flOz: Math.round(ml * 0.033814),
      cups: Math.round(ml / 237),
      glasses: Math.round(ml / 250),
    });
  };

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">💧</span>
        <div>
          <h3 className="tool-title">Daily Water Intake</h3>
          <p className="tool-desc">
            Find out how much water your body needs every day.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="tool-inputs">
        <WeightInput
          unit={unit}
          kg={kg}
          setKg={setKg}
          lbs={lbs}
          setLbs={setLbs}
        />
        <div className="tool-field">
          <label>Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="light">Light (desk job)</option>
            <option value="moderate">Moderate (3–5 days/week)</option>
            <option value="intense">Intense (daily training)</option>
          </select>
        </div>
        <div className="tool-field full-width">
          <label>Climate</label>
          <select value={climate} onChange={(e) => setClimate(e.target.value)}>
            <option value="cold">Cold / Cool</option>
            <option value="temperate">Temperate</option>
            <option value="hot">Hot / Humid</option>
          </select>
        </div>
      </div>
      <button className="tool-btn" onClick={calculate}>
        Calculate Water Needs
      </button>
      {result && (
        <div className="tool-result">
          <div className="water-display">
            <div className="water-bottle">
              <div
                className="water-fill"
                style={{
                  height: `${Math.min((result.litres / 5) * 100, 100)}%`,
                }}
              />
              <span className="water-litres">{result.litres}L</span>
            </div>
            <div className="water-stats">
              {unit === "metric" ? (
                <>
                  <div className="water-stat">
                    <span className="water-num">{result.litres}</span>
                    <span className="water-label">Litres / day</span>
                  </div>
                  <div className="water-stat">
                    <span className="water-num">
                      {result.ml.toLocaleString()}
                    </span>
                    <span className="water-label">ml / day</span>
                  </div>
                  <div className="water-stat">
                    <span className="water-num">{result.glasses}</span>
                    <span className="water-label">250ml glasses</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="water-stat">
                    <span className="water-num">{result.flOz}</span>
                    <span className="water-label">fl oz / day</span>
                  </div>
                  <div className="water-stat">
                    <span className="water-num">{result.cups}</span>
                    <span className="water-label">cups / day</span>
                  </div>
                  <div className="water-stat">
                    <span className="water-num">{result.glasses}</span>
                    <span className="water-label">8oz glasses</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="result-tip">
            💡 Sip steadily throughout the day. Don't wait until thirsty —
            that's already mild dehydration.
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 6 — Calorie Burn Estimator
══════════════════════════════════════════════ */
function CalorieBurnCalculator() {
  const [unit, setUnit] = useState("metric");
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("walking");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };

  const activities = [
    { value: "walking", label: "🚶 Walking (moderate)", met: 3.5 },
    { value: "running", label: "🏃 Running (moderate)", met: 8.0 },
    { value: "cycling", label: "🚴 Cycling (moderate)", met: 7.5 },
    { value: "swimming", label: "🏊 Swimming", met: 6.0 },
    { value: "weightlifting", label: "🏋️ Weight Lifting", met: 5.0 },
    { value: "yoga", label: "🧘 Yoga", met: 2.5 },
    { value: "hiit", label: "⚡ HIIT", met: 10.0 },
    { value: "dancing", label: "💃 Dancing", met: 4.5 },
  ];

  const calculate = () => {
    const w = unit === "metric" ? parseFloat(kg) : lbsToKg(parseFloat(lbs));
    const d = parseFloat(duration);
    if (!w || !d) return;
    const act = activities.find((a) => a.value === activity);
    setResult({
      kcal: Math.round(act.met * w * (d / 60)),
      met: act.met,
      label: act.label,
    });
  };

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">⚡</span>
        <div>
          <h3 className="tool-title">Calorie Burn Estimator</h3>
          <p className="tool-desc">
            Estimate calories burned during exercise using MET values.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="tool-inputs">
        <WeightInput
          unit={unit}
          kg={kg}
          setKg={setKg}
          lbs={lbs}
          setLbs={setLbs}
        />
        <div className="tool-field">
          <label>Duration (minutes)</label>
          <input
            type="number"
            placeholder="e.g. 45"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="tool-field full-width">
          <label>Activity</label>
          <div className="activity-grid">
            {activities.map((a) => (
              <button
                key={a.value}
                className={`activity-card-btn ${activity === a.value ? "active" : ""}`}
                onClick={() => setActivity(a.value)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button className="tool-btn" onClick={calculate}>
        Estimate Calories Burned
      </button>
      {result && (
        <div className="tool-result">
          <div className="burn-display">
            <span className="burn-number">{result.kcal}</span>
            <span className="burn-unit">kcal burned</span>
          </div>
          <p className="result-tip">
            💡 MET = {result.met} for {result.label}. Actual burn varies with
            fitness level and intensity.
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOOL 7 — Body Fat % (Navy Method)
══════════════════════════════════════════════ */
function BodyFatCalculator() {
  const [unit, setUnit] = useState("metric");
  const [sex, setSex] = useState("male");
  const [kg, setKg] = useState("");
  const [lbs, setLbs] = useState("");
  const [cm, setCm] = useState("");
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState(null);

  const reset = (u) => {
    setUnit(u);
    setResult(null);
  };
  const toUnit = (v) =>
    unit === "metric" ? parseFloat(v) : parseFloat(v) * 2.54;
  const ml = unit === "metric" ? "cm" : "in";
  const ph =
    unit === "metric"
      ? { waist: "e.g. 85", neck: "e.g. 38", hip: "e.g. 95" }
      : { waist: "e.g. 33", neck: "e.g. 15", hip: "e.g. 37" };

  const getCategory = (bf, s) => {
    if (s === "male") {
      if (bf < 6) return { label: "Essential Fat", color: "#3b82f6" };
      if (bf < 14) return { label: "Athletic", color: "#22c55e" };
      if (bf < 18) return { label: "Fitness", color: "#4ade80" };
      if (bf < 25) return { label: "Average", color: "#fbbf24" };
      return { label: "Obese", color: "#ef4444" };
    } else {
      if (bf < 14) return { label: "Essential Fat", color: "#3b82f6" };
      if (bf < 21) return { label: "Athletic", color: "#22c55e" };
      if (bf < 25) return { label: "Fitness", color: "#4ade80" };
      if (bf < 32) return { label: "Average", color: "#fbbf24" };
      return { label: "Obese", color: "#ef4444" };
    }
  };

  const calculate = () => {
    const h = unit === "metric" ? parseFloat(cm) : ftInToCm(ft, inch);
    const w_cm = toUnit(waist),
      n_cm = toUnit(neck),
      h_cm = sex === "female" ? toUnit(hip) : null;
    if (!h || !w_cm || !n_cm) return;
    if (sex === "female" && !h_cm) return;
    let bf;
    if (sex === "male") {
      bf =
        495 /
          (1.0324 -
            0.19077 * Math.log10(w_cm - n_cm) +
            0.15456 * Math.log10(h)) -
        450;
    } else {
      bf =
        495 /
          (1.29579 -
            0.35004 * Math.log10(w_cm + h_cm - n_cm) +
            0.221 * Math.log10(h)) -
        450;
    }
    const wKg = unit === "metric" ? parseFloat(kg) : lbsToKg(parseFloat(lbs));
    const fatKg = wKg ? +((wKg * bf) / 100).toFixed(1) : null;
    const leanKg = fatKg ? +(wKg - fatKg).toFixed(1) : null;
    setResult({ bf: +bf.toFixed(1), fatKg, leanKg, wKg });
  };

  const cat = result ? getCategory(result.bf, sex) : null;
  const fmtW = (kg) => (unit === "metric" ? `${kg} kg` : `${kgToLbs(kg)} lbs`);

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">📏</span>
        <div>
          <h3 className="tool-title">Body Fat % Estimator</h3>
          <p className="tool-desc">
            US Navy tape-measure method — no body fat scale needed.
          </p>
        </div>
      </div>
      <UnitToggle unit={unit} onChange={reset} />
      <div className="tool-inputs">
        <div className="tool-field">
          <label>Sex</label>
          <select
            value={sex}
            onChange={(e) => {
              setSex(e.target.value);
              setResult(null);
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <HeightInput
          unit={unit}
          cm={cm}
          setCm={setCm}
          ft={ft}
          setFt={setFt}
          inch={inch}
          setInch={setInch}
        />
        <div className="tool-field">
          <label>Waist ({ml}) — at navel</label>
          <input
            type="number"
            placeholder={ph.waist}
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />
        </div>
        <div className="tool-field">
          <label>Neck ({ml})</label>
          <input
            type="number"
            placeholder={ph.neck}
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
          />
        </div>
        {sex === "female" && (
          <div className="tool-field full-width">
            <label>Hips ({ml}) — widest point</label>
            <input
              type="number"
              placeholder={ph.hip}
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
          </div>
        )}
        <div className="tool-field full-width">
          <label>Weight (optional — adds fat/lean breakdown)</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
            }}
          >
            <WeightInput
              unit={unit}
              kg={kg}
              setKg={setKg}
              lbs={lbs}
              setLbs={setLbs}
            />
          </div>
        </div>
      </div>
      <button className="tool-btn" onClick={calculate}>
        Estimate Body Fat %
      </button>
      {result && cat && (
        <div className="tool-result">
          <div className="result-big">
            <span className="result-number" style={{ color: cat.color }}>
              {result.bf}%
            </span>
            <span className="result-unit">Body Fat</span>
          </div>
          <div
            className="result-badge"
            style={{
              background: cat.color + "18",
              borderColor: cat.color + "40",
              color: cat.color,
            }}
          >
            {cat.label}
          </div>
          {result.fatKg && (
            <div className="ibw-formulas" style={{ marginTop: "0.75rem" }}>
              <div className="ibw-row">
                <span>Fat Mass</span>
                <strong>{fmtW(result.fatKg)}</strong>
              </div>
              <div className="ibw-row">
                <span>Lean Mass</span>
                <strong>{fmtW(result.leanKg)}</strong>
              </div>
            </div>
          )}
          <p className="result-tip">
            💡 Measure in the morning, relaxed, for most consistency.
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
function Tools() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Tools" },
    { id: "body", label: "Body Metrics" },
    { id: "food", label: "Nutrition" },
    { id: "fitness", label: "Fitness" },
  ];

  const toolMeta = [
    { id: "bmi", tab: "body", component: <BMICalculator /> },
    { id: "tdee", tab: "body", component: <TDEECalculator /> },
    { id: "macro", tab: "food", component: <MacroCalculator /> },
    { id: "ibw", tab: "body", component: <IdealWeightCalculator /> },
    { id: "water", tab: "food", component: <WaterCalculator /> },
    { id: "burn", tab: "fitness", component: <CalorieBurnCalculator /> },
    { id: "bodyfat", tab: "body", component: <BodyFatCalculator /> },
  ];

  const visible = toolMeta.filter(
    (t) => activeTab === "all" || t.tab === activeTab,
  );

  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="tools-hero">
          <div className="container">
            <p className="eyebrow">Free calculators</p>
            <h1>Nutrition &amp; Fitness Tools</h1>
            <p className="lead">
              Seven science-backed calculators — every one supports metric and
              imperial. No switching apps.
            </p>
          </div>
        </section>

        <div className="tools-tabs-bar">
          <div className="container">
            <div className="tools-tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={`tools-tab ${activeTab === t.id ? "active" : ""}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="section alt">
          <div className="container">
            <div className="tools-grid">
              {visible.map((t) => (
                <div key={t.id} className="tools-grid-item">
                  {t.component}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Tools;
