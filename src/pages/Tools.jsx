import { useState } from "react";
import "../styles/global.css";
import "../styles/Tools.css";
import Navbar from "../components/nav.jsx";
import Footer from "../components/footer.jsx";

/* ─────────────────────────────────────────────
   TOOL: BMI Calculator
───────────────────────────────────────────── */
function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState(null);

  const getBMICategory = (bmi) => {
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
    let bmi;
    if (unit === "metric") {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100;
      if (!w || !h) return;
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weightLbs);
      const ft = parseFloat(heightFt) || 0;
      const ins = parseFloat(heightIn) || 0;
      const totalIn = ft * 12 + ins;
      if (!w || !totalIn) return;
      bmi = (703 * w) / (totalIn * totalIn);
    }
    setResult(Math.round(bmi * 10) / 10);
  };

  const category = result ? getBMICategory(result) : null;
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

      <div className="unit-toggle">
        <button
          className={`unit-btn ${unit === "metric" ? "active" : ""}`}
          onClick={() => {
            setUnit("metric");
            setResult(null);
          }}
        >
          Metric (kg/cm)
        </button>
        <button
          className={`unit-btn ${unit === "imperial" ? "active" : ""}`}
          onClick={() => {
            setUnit("imperial");
            setResult(null);
          }}
        >
          Imperial (lbs/ft)
        </button>
      </div>

      {unit === "metric" ? (
        <div className="tool-inputs">
          <div className="tool-field">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="tool-field">
            <label>Height (cm)</label>
            <input
              type="number"
              placeholder="e.g. 170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="tool-inputs">
          <div className="tool-field">
            <label>Weight (lbs)</label>
            <input
              type="number"
              placeholder="e.g. 154"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
            />
          </div>
          <div className="tool-field-row">
            <div className="tool-field">
              <label>Height (ft)</label>
              <input
                type="number"
                placeholder="5"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
              />
            </div>
            <div className="tool-field">
              <label>Height (in)</label>
              <input
                type="number"
                placeholder="7"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <button className="tool-btn" onClick={calculate}>
        Calculate BMI
      </button>

      {result && category && (
        <div className="tool-result">
          <div className="result-big">
            <span className="result-number" style={{ color: category.color }}>
              {result}
            </span>
            <span className="result-unit">BMI</span>
          </div>
          <div className="bmi-bar-wrap">
            <div className="bmi-bar-track">
              <div
                className="bmi-bar-fill"
                style={{ left: `${barPct}%`, background: category.color }}
              />
              <div className="bmi-zones">
                <span style={{ color: "#3b82f6" }}>Underweight</span>
                <span style={{ color: "#22c55e" }}>Normal</span>
                <span style={{ color: "#f97316" }}>Overweight</span>
                <span style={{ color: "#ef4444" }}>Obese</span>
              </div>
            </div>
          </div>
          <div
            className="result-badge"
            style={{
              background: category.color + "18",
              borderColor: category.color + "40",
              color: category.color,
            }}
          >
            {category.label}
          </div>
          <p className="result-tip">💡 {category.tip}</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOOL: Maintenance Calories (TDEE)
───────────────────────────────────────────── */
function TDEECalculator() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [result, setResult] = useState(null);

  const activityLevels = [
    { value: "1.2", label: "Sedentary", sub: "Desk job, little exercise" },
    { value: "1.375", label: "Lightly active", sub: "1–3 days/week" },
    { value: "1.55", label: "Moderately active", sub: "3–5 days/week" },
    { value: "1.725", label: "Very active", sub: "6–7 days/week" },
    { value: "1.9", label: "Extra active", sub: "Physical job + training" },
  ];

  const calculate = () => {
    const a = parseFloat(age),
      w = parseFloat(weight),
      h = parseFloat(height),
      act = parseFloat(activity);
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
          <h3 className="tool-title">Maintenance Calories</h3>
          <p className="tool-desc">
            Your Total Daily Energy Expenditure (TDEE) — how many calories you
            burn daily.
          </p>
        </div>
      </div>

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
        <div className="tool-field">
          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="tool-field">
          <label>Height (cm)</label>
          <input
            type="number"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <div className="tool-field full-width">
        <label>Activity Level</label>
        <div className="activity-options">
          {activityLevels.map((lvl) => (
            <button
              key={lvl.value}
              className={`activity-btn ${activity === lvl.value ? "active" : ""}`}
              onClick={() => setActivity(lvl.value)}
            >
              <span className="act-label">{lvl.label}</span>
              <span className="act-sub">{lvl.sub}</span>
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
            <div className="tdee-cell main">
              <span className="result-number" style={{ color: "#111827" }}>
                {result.tdee.toLocaleString()}
              </span>
              <span className="result-label">Maintenance kcal/day</span>
              <span className="result-sub">
                BMR: {result.bmr.toLocaleString()} kcal
              </span>
            </div>
            <div className="tdee-cell loss">
              <span className="result-number" style={{ color: "#ef4444" }}>
                {result.loss.toLocaleString()}
              </span>
              <span className="result-label">Weight Loss</span>
              <span className="result-sub">−500 kcal deficit</span>
            </div>
            <div className="tdee-cell gain">
              <span className="result-number" style={{ color: "#22c55e" }}>
                {result.gain.toLocaleString()}
              </span>
              <span className="result-label">Weight Gain</span>
              <span className="result-sub">+300 kcal surplus</span>
            </div>
          </div>
          <p className="result-tip">
            💡 These are estimates using the Mifflin–St Jeor equation. Adjust
            based on real-world results over 2–3 weeks.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOOL: Macro Calculator
───────────────────────────────────────────── */
function MacroCalculator() {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState(null);

  const goals = [
    { value: "lose", label: "Lose Fat", protein: 0.4, carbs: 0.3, fat: 0.3 },
    {
      value: "maintain",
      label: "Maintain",
      protein: 0.3,
      carbs: 0.4,
      fat: 0.3,
    },
    {
      value: "gain",
      label: "Build Muscle",
      protein: 0.35,
      carbs: 0.45,
      fat: 0.2,
    },
  ];

  const calculate = () => {
    const kcal = parseFloat(calories);
    if (!kcal) return;
    const g = goals.find((g) => g.value === goal);
    setResult({
      protein: Math.round((kcal * g.protein) / 4),
      carbs: Math.round((kcal * g.carbs) / 4),
      fat: Math.round((kcal * g.fat) / 9),
      pct: {
        protein: Math.round(g.protein * 100),
        carbs: Math.round(g.carbs * 100),
        fat: Math.round(g.fat * 100),
      },
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

      <div className="unit-toggle">
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
          <label>Daily Calories (kcal) — use TDEE tool above</label>
          <input
            type="number"
            placeholder="e.g. 2200"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
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
              <span className="macro-pct">{result.pct.protein}%</span>
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

/* ─────────────────────────────────────────────
   TOOL: Ideal Body Weight
───────────────────────────────────────────── */
function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("male");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (!h || h < 100) return;
    const inchesOver5ft = h / 2.54 - 60;
    // Devine formula
    const devine =
      sex === "male" ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;
    // Miller formula
    const miller =
      sex === "male"
        ? 56.2 + 1.41 * inchesOver5ft
        : 53.1 + 1.36 * inchesOver5ft;
    // Robinson formula
    const robinson =
      sex === "male" ? 52 + 1.9 * inchesOver5ft : 49 + 1.7 * inchesOver5ft;
    const avg = (devine + miller + robinson) / 3;
    setResult({
      devine: Math.round(devine * 10) / 10,
      miller: Math.round(miller * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      avg: Math.round(avg * 10) / 10,
      range: [Math.round((avg - 5) * 10) / 10, Math.round((avg + 5) * 10) / 10],
    });
  };

  return (
    <div className="tool-card">
      <div className="tool-icon-row">
        <span className="tool-emoji">🎯</span>
        <div>
          <h3 className="tool-title">Ideal Body Weight</h3>
          <p className="tool-desc">
            Estimate a healthy target weight range based on height using three
            medical formulas.
          </p>
        </div>
      </div>

      <div className="tool-inputs">
        <div className="tool-field">
          <label>Height (cm)</label>
          <input
            type="number"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
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
              {result.range[0]} – {result.range[1]}{" "}
              <span className="ibw-unit">kg</span>
            </span>
          </div>
          <div className="ibw-formulas">
            <div className="ibw-row">
              <span>Devine</span>
              <strong>{result.devine} kg</strong>
            </div>
            <div className="ibw-row">
              <span>Miller</span>
              <strong>{result.miller} kg</strong>
            </div>
            <div className="ibw-row">
              <span>Robinson</span>
              <strong>{result.robinson} kg</strong>
            </div>
          </div>
          <p className="result-tip">
            💡 These are reference points, not strict targets. Muscle mass, bone
            density, and body composition all matter.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOOL: Daily Water Intake
───────────────────────────────────────────── */
function WaterCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("temperate");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return;
    // Base: 35 ml/kg
    let base = w * 35;
    if (activity === "light") base *= 1.0;
    if (activity === "moderate") base *= 1.15;
    if (activity === "intense") base *= 1.3;
    if (climate === "hot") base *= 1.15;
    if (climate === "cold") base *= 0.95;
    const litres = Math.round((base / 1000) * 10) / 10;
    const glasses = Math.round(litres / 0.25);
    setResult({ litres, glasses, ml: Math.round(base) });
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

      <div className="tool-inputs">
        <div className="tool-field">
          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="tool-field">
          <label>Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="light">Light (desk job, little exercise)</option>
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
              <div className="water-stat">
                <span className="water-num">{result.litres}</span>
                <span className="water-label">Litres / day</span>
              </div>
              <div className="water-stat">
                <span className="water-num">{result.ml.toLocaleString()}</span>
                <span className="water-label">ml / day</span>
              </div>
              <div className="water-stat">
                <span className="water-num">{result.glasses}</span>
                <span className="water-label">250ml glasses</span>
              </div>
            </div>
          </div>
          <p className="result-tip">
            💡 Sip steadily throughout the day. Don't wait until you're thirsty
            — by then you're already mildly dehydrated.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOOL: Calorie Burn Estimator
───────────────────────────────────────────── */
function CalorieBurnCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("walking");
  const [result, setResult] = useState(null);

  // MET values
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
    const w = parseFloat(weight);
    const d = parseFloat(duration);
    if (!w || !d) return;
    const act = activities.find((a) => a.value === activity);
    // Calories = MET × weight (kg) × duration (hrs)
    const kcal = Math.round(act.met * w * (d / 60));
    setResult({ kcal, activity: act.label, met: act.met });
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

      <div className="tool-inputs">
        <div className="tool-field">
          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
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
            💡 MET (Metabolic Equivalent of Task) = {result.met}. This is an
            estimate — actual burn varies with fitness level and intensity.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
function Tools() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Tools" },
    { id: "body", label: "Body" },
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
  ];

  const visible = toolMeta.filter(
    (t) => activeTab === "all" || t.tab === activeTab,
  );

  return (
    <div className="page">
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="tools-hero">
          <div className="container">
            <p className="eyebrow">Free calculators</p>
            <h1>Nutrition &amp; Fitness Tools</h1>
            <p className="lead">
              Six science-backed calculators to track your body stats, dial in
              your calories, and plan your nutrition — all in one place.
            </p>
          </div>
        </section>

        {/* ── TABS ── */}
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

        {/* ── TOOLS GRID ── */}
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
