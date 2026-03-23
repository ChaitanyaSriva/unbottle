import { useState } from "react";
import "./App.css";

export default function App() {
  const WHATSAPP_NUMBER = "918383050602";

  const [selectedPlan, setSelectedPlan] = useState({
    mins: 10,
    price: 10,
  });

  const [userType, setUserType] = useState("normal");
  const [callerIndex] = useState(1);

  const applyExtras = () => {
    let extra = 0;
    let note = "";

    if (userType === "student_abroad") {
      extra += 5;
      note += " +5 min student bonus";
    }

    if (callerIndex <= 3) {
      extra += 3;
      note += " +3 min early caller bonus";
    }

    return { extra, note };
  };

  const handlePlanSelect = (mins, price) => {
    setSelectedPlan({ mins, price });
  };

  const startWhatsApp = () => {
    const { extra, note } = applyExtras();

    const planLabel =
      selectedPlan.mins === 30 ? "20+ min" : `${selectedPlan.mins} min`;

    const message = encodeURIComponent(
      `Hi, I want to book a VentOut session.\n\n` +
        `Plan: ${planLabel}\n` +
        `Price: €${selectedPlan.price}\n` +
        `Bonus: ${extra} min ${note}\n\n` +
        `I came from your website.`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const { extra, note } = applyExtras();

  return (
    <div className="container">
      {/* HERO */}
      <section className="hero">
        <h1>VentOut</h1>

        <p className="tagline">
          A quiet space where you as a TU Delft student can say what’s on your mind.
        </p>

        <p className="quote">
          “Sometimes you don’t need solutions — you just need someone who listens.”
        </p>

        <button className="cta" onClick={startWhatsApp}>
          Start on WhatsApp
        </button>
      </section>

      {/* USER TYPE */}
      <section className="user-type">
        <h3>Are you a student abroad?</h3>
        <div className="toggle">
          <button
            className={userType === "normal" ? "active" : ""}
            onClick={() => setUserType("normal")}
          >
            No
          </button>
          <button
            className={userType === "student_abroad" ? "active" : ""}
            onClick={() => setUserType("student_abroad")}
          >
            Yes (+5 min)
          </button>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <h2>Choose Your Session</h2>

        <div className="cards">
          <div
            className={`card ${selectedPlan.mins === 10 ? "active" : ""}`}
            onClick={() => handlePlanSelect(10, 10)}
          >
            <h3>10 Minutes</h3>
            <p>€10</p>
          </div>

          <div
            className={`card ${selectedPlan.mins === 20 ? "active" : ""}`}
            onClick={() => handlePlanSelect(20, 15)}
          >
            <h3>20 Minutes</h3>
            <p>€15</p>
          </div>

          <div
            className={`card ${selectedPlan.mins === 30 ? "active" : ""}`}
            onClick={() => handlePlanSelect(30, 25)}
          >
            <h3>20+ Minutes</h3>
            <p>€25</p>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="summary">
        <h2>Summary</h2>

        <div className="summary-box">
          <p>
            Duration:{" "}
            <strong>
              {selectedPlan.mins === 30 ? "20+" : selectedPlan.mins} min
            </strong>
          </p>

          <p>
            Price: <strong>€{selectedPlan.price}</strong>
          </p>

          <p>
            Bonus: <strong>{extra} min</strong>
          </p>

          {note && <p className="small">{note}</p>}
        </div>

        <button className="cta big" onClick={startWhatsApp}>
          Continue on WhatsApp →
        </button>
      </section>

      {/* FOOTER */}
      <section className="footer">
        <p>Not therapy. Fully confidential. Just listening.</p>
      </section>
    </div>
  );
}