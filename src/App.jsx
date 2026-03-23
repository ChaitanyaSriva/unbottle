import { useState } from "react";
import "./App.css";

export default function App() {
  const WHATSAPP_NUMBER = "918383050602";

  const [selectedPlan, setSelectedPlan] = useState({
    mins: 10,
    price: 10,
  });

  const [userType, setUserType] = useState("normal");
  const [callerIndex] = useState(1); // you can later make this dynamic

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
    const message = encodeURIComponent(
      "Hi, I want to book a VentOut session. I came from your website."
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
          “Sometimes you don’t need solutions — you just need someone who listens without interrupting.”
        </p>

        <p className="note">
          Not therapy. Not counseling. Full Privacy. Just a place to be heard.
        </p>

        <button className="cta" onClick={startWhatsApp}>
          Start on WhatsApp
        </button>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <h2>Pricing</h2>

        <div className="cards">
          <div className="card" onClick={() => handlePlanSelect(10, 10)}>
            <h3>10 Minutes</h3>
            <p>€10</p>
          </div>

          <div className="card" onClick={() => handlePlanSelect(20, 15)}>
            <h3>20 Minutes</h3>
            <p>€15</p>
          </div>

          <div className="card" onClick={() => handlePlanSelect(30, 25)}>
            <h3>20+ Minutes</h3>
            <p>€25</p>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="summary">
        <h2>Selected Plan</h2>

        <p>
          Duration: <strong>{selectedPlan.mins} min</strong>
        </p>

        <p>
          Price: <strong>€{selectedPlan.price}</strong>
        </p>

        <p>
          Bonus Time: <strong>{extra} min</strong>
        </p>

        <p className="small">{note}</p>

        <button className="cta" onClick={startWhatsApp}>
          Continue on WhatsApp
        </button>
      </section>

      {/* OFFER INFO */}
      <section className="offers">
        <h2>Special Notes</h2>
        <ul>
          <li>🎓 Students from abroad get +5 minutes extra</li>
          <li>🔥 First 3 callers get +3 minutes extra</li>
          <li>⏳ Sessions confirmed via WhatsApp</li>
        </ul>
      </section>
    </div>
  );
}