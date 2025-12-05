import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        const result = eval(input).toString();
        setHistory([...history, `${input} = ${result}`]);
        setInput(result);
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  // Keyboard input support
  useEffect(() => {
    const handleKeyPress = (e) => {
      const allowedKeys = "0123456789+-*/.=EnterBackspace";
      if (!allowedKeys.includes(e.key)) return;

      if (e.key === "Enter") handleClick("=");
      else if (e.key === "Backspace") handleClick("⌫");
      else handleClick(e.key);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const buttons = [
    "C", "⌫", "/", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0", ".", 
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h2>✨ React Calculator</h2>
        <input type="text" value={input} readOnly className="display" />
        <div className="buttons">
          {buttons.map((b) => (
            <button key={b} onClick={() => handleClick(b)}>{b}</button>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="history">
          <h3>🧾 History</h3>
          <ul>
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
