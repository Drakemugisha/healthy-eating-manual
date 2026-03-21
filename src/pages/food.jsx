import { useState, useRef, useCallback, useEffect } from "react";
import Seo from "../components/Seo.jsx";

// ─── API Configuration ────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_API_KEYS; // ← Replace with your USDA FoodData Central API key
const API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";
const REQUEST_COOLDOWN_MS = 1200;

// ─── Nutrient Thresholds (per 100g) ──────────────────────────────────────────
const THRESHOLDS = {
  protein: { key: "Protein", unit: "g", min: 10, label: "Protein" },
  carbs: {
    key: "Carbohydrate, by difference",
    unit: "g",
    min: 20,
    label: "Carbs",
  },
  fiber: { key: "Fiber, total dietary", unit: "g", min: 5, label: "Fiber" },
  vitaminC: {
    key: "Vitamin C, total ascorbic acid",
    unit: "mg",
    min: 12,
    label: "Vit C",
  },
  vitaminA: { key: "Vitamin A, RAE", unit: "µg", min: 180, label: "Vit A" },
  vitaminD: { key: "Vitamin D (D2 + D3)", unit: "µg", min: 4, label: "Vit D" },
  vitaminB12: { key: "Vitamin B-12", unit: "µg", min: 0.5, label: "Vit B12" },
  calcium: { key: "Calcium, Ca", unit: "mg", min: 200, label: "Calcium" },
  iron: { key: "Iron, Fe", unit: "mg", min: 3, label: "Iron" },
  potassium: { key: "Potassium, K", unit: "mg", min: 600, label: "Potassium" },
  magnesium: { key: "Magnesium, Mg", unit: "mg", min: 100, label: "Magnesium" },
};

// ─── Filters ──────────────────────────────────────────────────────────────────
// emptyQuery: what to search for when the input is blank and this filter is clicked.
// queryPrefix: prepended to a user's query when the filter is active.
const FILTERS = [
  {
    id: "all",
    label: "Common Foods",
    icon: "🍽️",
    keys: [],
    queryPrefix: "",
    // When input is empty, load a broad mix of everyday staple foods
    emptyQuery: "food",
  },
  {
    id: "protein",
    label: "High Protein",
    icon: "💪",
    keys: ["protein"],
    queryPrefix: "high protein",
    emptyQuery: "high protein foods",
  },
  {
    id: "carbs",
    label: "High Carbs",
    icon: "🌾",
    keys: ["carbs", "fiber"],
    queryPrefix: "high carbohydrate",
    emptyQuery: "high carbohydrate foods",
  },
  {
    id: "vitamins",
    label: "High Vitamins",
    icon: "🍊",
    keys: ["vitaminC", "vitaminA", "vitaminD", "vitaminB12"],
    queryPrefix: "high vitamin",
    emptyQuery: "high vitamin foods",
  },
  {
    id: "minerals",
    label: "High Minerals",
    icon: "⚗️",
    keys: ["calcium", "iron", "potassium", "magnesium"],
    queryPrefix: "mineral rich",
    emptyQuery: "mineral rich foods",
  },
];

// ─── Preparation words stripped when normalising food names ──────────────────
const PREP_WORDS = new Set([
  "cooked",
  "raw",
  "fried",
  "boiled",
  "grilled",
  "baked",
  "roasted",
  "steamed",
  "dried",
  "canned",
  "frozen",
  "fresh",
  "smoked",
  "broiled",
  "microwaved",
  "braised",
  "stewed",
  "poached",
  "salted",
  "unsalted",
  "sweetened",
  "unsweetened",
  "enriched",
  "unenriched",
  "fat-free",
  "low-fat",
  "nonfat",
  "whole",
  "reduced",
  "light",
  "blend",
  "mix",
  "prepared",
  "unprepared",
  "instant",
  "skinless",
  "boneless",
  "lean",
  "extra",
  "added",
  "without",
  "with",
  "and",
  "or",
  "in",
  "of",
  "ns",
  "nos",
]);

// ─── baseName: collapse USDA verbose descriptions to a short base label ───────
// "Chicken, broilers or fryers, breast, meat only, cooked, roasted" → "chicken breast"
function baseName(description) {
  if (!description) return "";
  let name = description
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim();
  const parts = name.split(",").map((p) => p.trim());
  const meaningful = parts.filter(
    (p) => p.length > 1 && !PREP_WORDS.has(p) && !/^\d/.test(p),
  );
  return meaningful.slice(0, 2).join(" ");
}

// ─── deduplicateFoods: one entry per base food, picking highest nutrient score ─
function deduplicateFoods(foods) {
  const groups = new Map();
  for (const food of foods) {
    const key = baseName(food.description) || food.description.toLowerCase();
    if (!key) continue;
    const existing = groups.get(key);
    if (!existing || nutrientScore(food) > nutrientScore(existing)) {
      groups.set(key, food);
    }
  }
  return Array.from(groups.values());
}

// ─── Nutrient helpers ─────────────────────────────────────────────────────────
function getNutrientValue(foodNutrients = [], nutrientName) {
  const match = foodNutrients.find(
    (n) => n.nutrientName?.toLowerCase() === nutrientName.toLowerCase(),
  );
  return match?.value ?? null;
}

function isHighInNutrient(foodNutrients, nutrientKey) {
  const cfg = THRESHOLDS[nutrientKey];
  if (!cfg) return false;
  const val = getNutrientValue(foodNutrients, cfg.key);
  return val !== null && val >= cfg.min;
}

function nutrientScore(food) {
  return Object.keys(THRESHOLDS).reduce(
    (n, key) => n + (isHighInNutrient(food.foodNutrients, key) ? 1 : 0),
    0,
  );
}

function passesFilter(food, filterId) {
  if (filterId === "all") return true;
  const filter = FILTERS.find((f) => f.id === filterId);
  if (!filter || !filter.keys.length) return true;
  return filter.keys.some((key) => isHighInNutrient(food.foodNutrients, key));
}

// ─────────────────────────────────────────────────────────────────────────────
// NutrientBadge
// ─────────────────────────────────────────────────────────────────────────────
function NutrientBadge({ label, value, unit, high }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        padding: "3px 9px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 600,
        background: high ? "rgba(92,122,90,0.13)" : "rgba(0,0,0,0.05)",
        color: high ? "#3a6e38" : "#999",
        border: high
          ? "1px solid rgba(92,122,90,0.28)"
          : "1px solid transparent",
      }}
    >
      {high && <span style={{ color: "#5C7A5A", fontSize: "9px" }}>▲</span>}
      {label}: {value !== null ? `${Number(value).toFixed(1)}${unit}` : "—"}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FoodCard
// ─────────────────────────────────────────────────────────────────────────────
function FoodCard({ food, index }) {
  const [expanded, setExpanded] = useState(false);
  const score = nutrientScore(food);

  const allKeys = [
    "protein",
    "carbs",
    "fiber",
    "vitaminC",
    "vitaminA",
    "vitaminD",
    "vitaminB12",
    "calcium",
    "iron",
    "potassium",
    "magnesium",
  ];
  const visible = expanded ? allKeys : allKeys.slice(0, 5);

  const display = (() => {
    const bn = baseName(food.description);
    return bn ? bn.charAt(0).toUpperCase() + bn.slice(1) : food.description;
  })();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "22px 24px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "13px",
        animation: "slideUp 0.4s ease both",
        animationDelay: `${Math.min(index * 30, 450)}ms`,
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "10px",
              color: "#ccc",
              marginBottom: "4px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {food.dataType || "Food"}
          </div>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.3,
              fontFamily: "'Georgia', serif",
            }}
          >
            {display}
          </h3>
        </div>
        {/* Density score */}
        <div
          title={`Meets ${score} of 11 nutrient thresholds`}
          style={{
            flexShrink: 0,
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background:
              score >= 5 ? "#5C7A5A" : score >= 3 ? "#C8963C" : "#ebebeb",
            color: score >= 3 ? "white" : "#aaa",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "17px",
            cursor: "help",
          }}
        >
          {score}
          <span style={{ fontSize: "8px", opacity: 0.8, fontWeight: 500 }}>
            / 11
          </span>
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {visible.map((key) => {
          const cfg = THRESHOLDS[key];
          const val = getNutrientValue(food.foodNutrients, cfg.key);
          return (
            <NutrientBadge
              key={key}
              label={cfg.label}
              value={val}
              unit={cfg.unit}
              high={isHighInNutrient(food.foodNutrients, key)}
            />
          );
        })}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontSize: "12px",
          color: "#5C7A5A",
          fontWeight: 600,
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontFamily: "inherit",
        }}
      >
        {expanded ? "▲ Show fewer" : "▼ Show all nutrients"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
export default function FoodNutrientExplorer() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  const [cooldown, setCooldown] = useState(false);
  const [lastLabel, setLastLabel] = useState(""); // human-readable description of what was fetched

  const lastRequestTime = useRef(0);
  const retryRef = useRef(null);

  // ── Core fetch ─────────────────────────────────────────────────────────────
  // apiQuery  : the exact string sent to the USDA API
  // filterId  : used to post-filter results client-side
  // label     : human label shown in the count bar ("common foods", "chicken", etc.)
  const doFetch = useCallback(async (apiQuery, filterId, label) => {
    setLoading(true);
    setError(null);
    setFoods([]);
    setLastLabel(label);
    lastRequestTime.current = Date.now();

    try {
      const params = new URLSearchParams({
        api_key: API_KEY,
        query: apiQuery,
        pageSize: 80,
        dataType: "SR Legacy,Foundation",
      });

      const res = await fetch(`${API_URL}?${params}`);

      if (res.status === 429 || res.status === 400) {
        throw new Error(
          "Too many requests — please wait a moment and try again.",
        );
      }
      if (!res.ok)
        throw new Error(`API error ${res.status}: ${res.statusText}`);

      const data = await res.json();
      const raw = data.foods || [];
      const deduped = deduplicateFoods(raw);
      setFoods(deduped);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Rate-limited wrapper ───────────────────────────────────────────────────
  const scheduleFetch = useCallback(
    (apiQuery, filterId, label) => {
      const elapsed = Date.now() - lastRequestTime.current;
      if (elapsed < REQUEST_COOLDOWN_MS) {
        const wait = REQUEST_COOLDOWN_MS - elapsed;
        setCooldown(true);
        clearTimeout(retryRef.current);
        retryRef.current = setTimeout(() => {
          setCooldown(false);
          doFetch(apiQuery, filterId, label);
        }, wait);
        return;
      }
      doFetch(apiQuery, filterId, label);
    },
    [doFetch],
  );

  // ── Build query string and kick off fetch ─────────────────────────────────
  // Called both from the Search button and from filter-button clicks.
  // When input is empty, falls back to the filter's emptyQuery.
  const runSearch = useCallback(
    (overrideFilterId) => {
      const filterId = overrideFilterId ?? activeFilter;
      const filterDef = FILTERS.find((f) => f.id === filterId) || FILTERS[0];
      const trimmed = query.trim();

      let apiQuery, label;

      if (trimmed) {
        // User typed something: prepend the nutrient hint if a filter is active
        apiQuery = filterDef.queryPrefix
          ? `${filterDef.queryPrefix} ${trimmed}`
          : trimmed;
        label = trimmed;
      } else {
        // Input is empty: use the filter's own standalone query
        apiQuery = filterDef.emptyQuery;
        label = filterDef.label.toLowerCase();
      }

      scheduleFetch(apiQuery, filterId, label);
    },
    [query, activeFilter, scheduleFetch],
  );

  // ── On mount: auto-load common foods so the page isn't blank ──────────────
  useEffect(() => {
    doFetch("food", "all", "common foods");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Filter button handler ──────────────────────────────────────────────────
  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    runSearch(filterId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  // ── Client-side sort + post-filter ────────────────────────────────────────
  const filteredFoods = foods
    .filter((f) => passesFilter(f, activeFilter))
    .sort((a, b) => {
      if (sortBy === "score") return nutrientScore(b) - nutrientScore(a);
      if (sortBy === "protein") {
        const av =
          getNutrientValue(a.foodNutrients, THRESHOLDS.protein.key) ?? 0;
        const bv =
          getNutrientValue(b.foodNutrients, THRESHOLDS.protein.key) ?? 0;
        return bv - av;
      }
      return baseName(a.description).localeCompare(baseName(b.description));
    });

  const isDisabled = loading || cooldown;

  // ── Styles ─────────────────────────────────────────────────────────────────
  const S = {
    root: {
      minHeight: "100vh",
      background: "#F7F3EC",
      fontFamily: "'DM Sans','Segoe UI',sans-serif",
      color: "#1a1a1a",
    },
    hdr: {
      background: "#5C7A5A",
      color: "white",
      padding: "48px 24px 44px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    h1: {
      fontFamily: "'Georgia','Times New Roman',serif",
      fontSize: "clamp(28px,5vw,46px)",
      fontWeight: 900,
      marginBottom: "8px",
      lineHeight: 1.1,
    },
    sub: {
      fontSize: "14px",
      opacity: 0.7,
      fontWeight: 300,
      maxWidth: "470px",
      margin: "0 auto 30px",
      lineHeight: 1.65,
    },
    sRow: { display: "flex", gap: "10px", maxWidth: "540px", margin: "0 auto" },
    inp: {
      flex: 1,
      padding: "13px 18px",
      borderRadius: "13px",
      border: "2px solid rgba(255,255,255,0.2)",
      background: "rgba(255,255,255,0.12)",
      color: "white",
      fontSize: "15px",
      outline: "none",
      fontFamily: "inherit",
      transition: "border-color 0.2s",
    },
    btn: (d) => ({
      padding: "13px 24px",
      borderRadius: "13px",
      border: "none",
      background: d ? "#9a7530" : "#C8963C",
      color: "white",
      fontSize: "15px",
      fontWeight: 700,
      cursor: d ? "not-allowed" : "pointer",
      fontFamily: "inherit",
      whiteSpace: "nowrap",
      transition: "background 0.2s",
    }),
    body: { maxWidth: "1100px", margin: "0 auto", padding: "30px 16px 72px" },
    fRow: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "18px",
      alignItems: "center",
    },
    fBtn: (a) => ({
      padding: "9px 18px",
      borderRadius: "100px",
      border: a ? "none" : "1.5px solid #ddd",
      background: a ? "#5C7A5A" : "white",
      color: a ? "white" : "#555",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.2s",
      boxShadow: a ? "0 2px 10px rgba(92,122,90,0.28)" : "none",
    }),
    sort: {
      marginLeft: "auto",
      padding: "9px 13px",
      borderRadius: "10px",
      border: "1.5px solid #ddd",
      background: "white",
      fontSize: "13px",
      fontFamily: "inherit",
      color: "#555",
      cursor: "pointer",
      outline: "none",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(285px,1fr))",
      gap: "16px",
    },
    mid: { textAlign: "center", padding: "64px 24px", color: "#bbb" },
    cbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "18px",
      fontSize: "13px",
      color: "#888",
      flexWrap: "wrap",
      gap: "8px",
    },
  };

  return (
    <div style={S.root}>
      <Seo
        title="Food Nutrient Explorer | The Healthy Eating Manual"
        description="Search USDA FoodData foods and explore nutrient-rich options by protein, carbs, vitamins, and minerals."
      />
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin    { to   { transform:rotate(360deg); } }
        @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:0.45; } }
        input::placeholder { color:rgba(255,255,255,0.42); }
        input:focus        { border-color:rgba(255,255,255,0.65) !important; }
      `}</style>

      {/* ── Header ── */}
      <header style={S.hdr}>
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -50,
            left: -50,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            opacity: 0.5,
            marginBottom: "10px",
          }}
        >
          USDA FoodData Central
        </p>
        <h1 style={S.h1}>
          Food Nutrient
          <br />
          <em
            style={{ fontStyle: "italic", fontWeight: 300, color: "#F0C97A" }}
          >
            Explorer
          </em>
        </h1>
        <p style={S.sub}>
          Search any food to see its nutrients, or click a filter to browse by
          nutritional category. Only base foods shown — no duplicates.
        </p>

        <div style={S.sRow}>
          <input
            type="text"
            placeholder='e.g. "chicken", "spinach", "lentils" — or leave blank'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={S.inp}
          />
          <button
            onClick={() => runSearch()}
            disabled={isDisabled}
            style={S.btn(isDisabled)}
          >
            {cooldown ? "⏳" : loading ? "…" : "Search"}
          </button>
        </div>

        {cooldown && (
          <p
            style={{
              fontSize: "12px",
              marginTop: "12px",
              opacity: 0.6,
              animation: "pulse 1s ease-in-out infinite",
            }}
          >
            Cooling down before next request…
          </p>
        )}
      </header>

      {/* ── Body ── */}
      <main style={S.body}>
        {/* Filter tabs */}
        <div style={S.fRow}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              style={S.fBtn(activeFilter === f.id)}
              onClick={() => handleFilterClick(f.id)}
              title={
                f.id === "all"
                  ? "Browse common everyday foods"
                  : `Browse foods high in ${f.label.replace("High ", "").toLowerCase()}`
              }
            >
              <span>{f.icon}</span> {f.label}
            </button>
          ))}
          {foods.length > 0 && (
            <select
              style={S.sort}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Sort: Nutrient Density</option>
              <option value="protein">Sort: Highest Protein</option>
              <option value="name">Sort: A → Z</option>
            </select>
          )}
        </div>

        {/* Count bar */}
        {!loading && foods.length > 0 && (
          <div style={S.cbar}>
            <span>
              <strong>{filteredFoods.length}</strong> unique food
              {filteredFoods.length !== 1 ? "s" : ""}
              {lastLabel && (
                <span style={{ color: "#bbb" }}> — {lastLabel}</span>
              )}
            </span>
            <span
              style={{
                fontSize: "11px",
                background: "#E8F0E8",
                color: "#5C7A5A",
                padding: "4px 12px",
                borderRadius: "100px",
                fontWeight: 600,
              }}
            >
              ▲ above threshold &nbsp;|&nbsp; — not detected
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={S.mid}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "3px solid #e0e0e0",
                borderTopColor: "#5C7A5A",
                borderRadius: "50%",
                animation: "spin 0.75s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <p style={{ fontSize: "15px" }}>Fetching nutritional data…</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div
            style={{
              background: "#FFF0ED",
              border: "1px solid #FACDC4",
              borderRadius: "16px",
              padding: "22px 28px",
              color: "#b5391a",
              marginBottom: "24px",
            }}
          >
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}

        {/* No API results */}
        {!loading && !error && foods.length === 0 && (
          <div style={S.mid}>
            <div style={{ fontSize: "44px", marginBottom: "14px" }}>🥗</div>
            <p>No foods found. Try a different search term.</p>
          </div>
        )}

        {/* Post-filter empty */}
        {!loading && foods.length > 0 && filteredFoods.length === 0 && (
          <div style={S.mid}>
            <div style={{ fontSize: "44px", marginBottom: "14px" }}>🔍</div>
            <p style={{ marginBottom: "16px" }}>
              None of these foods meet the{" "}
              <strong>
                {FILTERS.find((f) => f.id === activeFilter)?.label}
              </strong>{" "}
              threshold.
            </p>
            <button
              onClick={() => handleFilterClick("all")}
              style={{
                padding: "10px 24px",
                borderRadius: "100px",
                border: "none",
                background: "#5C7A5A",
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Show Common Foods
            </button>
          </div>
        )}

        {/* Results grid */}
        {!loading && filteredFoods.length > 0 && (
          <div style={S.grid}>
            {filteredFoods.map((food, i) => (
              <FoodCard key={food.fdcId} food={food} index={i} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
