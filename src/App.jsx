import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const WHATSAPP_NUMBER = "31626032316";

  const plans = [
    { id: 1, mins: 10, price: 5, label: "Quick Vent", vibe: "Light reset" },
    { id: 2, mins: 20, price: 9, label: "Standard Session", vibe: "Talk it out" },
    { id: 3, mins: 30, price: 12, label: "Deep Session", vibe: "Go deeper" },
  ];

  const [screen, setScreen] = useState("home");
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [userType, setUserType] = useState("normal");
  const [mood, setMood] = useState(null);

  const getBonus = () => {
    let extra = 0;
    let notes = [];

    if (userType === "student_abroad") {
      extra += 5;
      notes.push("Student abroad bonus");
    }

    if (mood === "overwhelmed") {
      extra += 2;
      notes.push("We’ll take extra care of you");
    }

    return { extra, notes };
  };

  const startWhatsApp = () => {
    const { extra, notes } = getBonus();

    const message = encodeURIComponent(
      `Hi, I want to book a VentOut session.\n\n` +
        `Plan: ${selectedPlan.label} (${selectedPlan.mins} min)\n` +
        `Price: €${selectedPlan.price}\n` +
        `Mood: ${mood || "Not specified"}\n` +
        `Bonus: ${extra} min\n` +
        `${notes.join(", ")}\n\n`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const { extra, notes } = getBonus();

  const ScreenWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col justify-center items-center px-4 text-center"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <AnimatePresence mode="wait">
        {screen === "home" && (
          <ScreenWrapper key="home">
            <h1 className="text-5xl font-bold mb-4">VentOut</h1>
            <p className="text-gray-400 max-w-md mb-6">
              Not advice. Not fixing. Just someone who truly listens.
            </p>

            <div className="space-y-3 w-full max-w-sm">
              <button
                onClick={() => setScreen("mood")}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold"
              >
                Start Session
              </button>

              <button
                onClick={() => setScreen("about")}
                className="w-full py-3 rounded-xl border border-gray-600"
              >
                How it works
              </button>
            </div>
          </ScreenWrapper>
        )}

        {screen === "mood" && (
          <ScreenWrapper key="mood">
            <h2 className="text-2xl mb-6">How are you feeling?</h2>

            <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
              {["stressed", "overwhelmed", "lonely", "just need to talk"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMood(m);
                    setScreen("plans");
                  }}
                  className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition"
                >
                  {m}
                </button>
              ))}
            </div>
          </ScreenWrapper>
        )}

        {screen === "plans" && (
          <ScreenWrapper key="plans">
            <h2 className="text-2xl mb-6">Choose your space</h2>

            <div className="space-y-4 w-full max-w-md">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-5 rounded-xl cursor-pointer transition border ${
                    selectedPlan.id === plan.id
                      ? "border-white bg-gray-800"
                      : "border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{plan.label}</h3>
                      <p className="text-sm text-gray-400">{plan.vibe}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">€{plan.price}</p>
                      <p className="text-xs text-gray-400">{plan.mins} min</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen("details")}
              className="mt-6 px-6 py-3 bg-white text-black rounded-xl"
            >
              Continue
            </button>
          </ScreenWrapper>
        )}

        {screen === "details" && (
          <ScreenWrapper key="details">
            <h2 className="text-2xl mb-4">Almost there</h2>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">Are you a student abroad?</p>
              <div className="flex gap-3 justify-center">
                {["normal", "student_abroad"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setUserType(type)}
                    className={`px-4 py-2 rounded-xl ${
                      userType === type
                        ? "bg-white text-black"
                        : "border border-gray-600"
                    }`}
                  >
                    {type === "normal" ? "No" : "Yes"}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-5 rounded-xl w-full max-w-sm text-left">
              <p>Plan: {selectedPlan.label}</p>
              <p>Price: €{selectedPlan.price}</p>
              <p>Bonus: {extra} min</p>
              {notes.length > 0 && (
                <p className="text-xs text-gray-400">{notes.join(", ")}</p>
              )}
            </div>

            <button
              onClick={startWhatsApp}
              className="mt-6 px-6 py-3 bg-white text-black rounded-xl w-full max-w-sm"
            >
              Confirm & Open WhatsApp
            </button>
          </ScreenWrapper>
        )}

        {screen === "about" && (
          <ScreenWrapper key="about">
            <h2 className="text-2xl mb-4">How it works</h2>
            <p className="text-gray-400 max-w-md mb-6">
              You choose your mood, pick a session, and talk to someone who listens without judgment.
            </p>

            <button
              onClick={() => setScreen("home")}
              className="px-6 py-3 border border-gray-600 rounded-xl"
            >
              Back
            </button>
          </ScreenWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}
