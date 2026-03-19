import { useState } from "react";
import "../styles/NewsletterSignup.css";

const API_URL =
  "https://lkhfwcs0mh.execute-api.eu-north-1.amazonaws.com/production/healthy";

export default function NewsletterSignup({ apiUrl = API_URL }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.already_subscribed ? "duplicate" : "success");
        setMessage(data.message);
        if (!data.already_subscribed) {
          setEmail("");
          setName("");
        }
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <div className="nl-root">
        <p className="nl-label">Free Newsletter</p>
        <h2 className="nl-heading">
          Eat <em>Better,</em>
          <br />
          Feel Better
        </h2>
        <p className="nl-subtext">
          Weekly tips on nutrition, meal ideas, and healthy habits — straight
          from the Healthy Eating Manual. No spam, ever.
        </p>

        {status !== "success" ? (
          <form className="nl-form" onSubmit={handleSubmit} noValidate>
            <input
              className="nl-input"
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              className="nl-input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <button
              className="nl-btn"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <span className="nl-spinner" />
                  Subscribing…
                </>
              ) : (
                "Subscribe →"
              )}
            </button>

            {(status === "error" || status === "duplicate") && (
              <div className={`nl-feedback nl-feedback-${status}`}>
                {status === "duplicate" ? "📬 " : "⚠️ "}
                {message}
              </div>
            )}
          </form>
        ) : (
          <div className="nl-feedback nl-feedback-success">🌿 {message}</div>
        )}

        <p className="nl-privacy">
          🔒 We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </>
  );
}
