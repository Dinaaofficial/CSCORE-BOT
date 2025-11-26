"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({ runs: 0, balls: 0, wickets: 0, overs: "0.0" });

  const updateScore = async (action) => {
    const res = await fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({ action }),
    });
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetch("/api/score")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const buttons = [
    { label: "1 Run", action: "1" },
    { label: "2 Runs", action: "2" },
    { label: "4", action: "4" },
    { label: "6", action: "6" },
    { label: "No Ball", action: "no-ball" },
    { label: "Wide", action: "wide" },
    { label: "Wicket", action: "wicket" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">🏏 Cricket Score Manager</h1>

      {/* Scoreboard */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>

        <div className="grid grid-cols-2 gap-4 text-lg">
          <div className="p-4 bg-blue-50 rounded-lg">Runs: <b>{data.runs}</b></div>
          <div className="p-4 bg-blue-50 rounded-lg">Wickets: <b>{data.wickets}</b></div>
          <div className="p-4 bg-blue-50 rounded-lg">Overs: <b>{data.overs}</b></div>
          <div className="p-4 bg-blue-50 rounded-lg">
            Run Rate: <b>{(data.runs / (data.balls / 6 || 1)).toFixed(2)}</b>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg mt-6">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => updateScore(btn.action)}
            className="p-4 text-white font-semibold bg-blue-600 rounded-xl hover:bg-blue-700 shadow"
          >
            {btn.label}
          </button>
        ))}

        <button
          onClick={() => updateScore("reset")}
          className="col-span-2 md:col-span-3 p-4 text-white bg-red-600 font-bold rounded-xl hover:bg-red-700"
        >
          Reset Match
        </button>
      </div>
    </div>
  );
}
