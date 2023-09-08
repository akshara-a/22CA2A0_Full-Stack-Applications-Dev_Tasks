import "./styles.css";
import React, { useState } from "react";
import Timer from "./timer";

export default function App() {
  const [timers, setTimers] = useState([]);
  const [counter, setCounter] = useState(1);

  const addTimer = () => {
    setTimers([...timers, counter]);
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <h1>Timer</h1>
      <div class="addTimer">
        <button class="addTimerBtn" onClick={addTimer}>
          Add Timer
        </button>
      </div>
      <div class="container">
        {timers.map((timerId) => (
          <Timer key={timerId} />
        ))}
      </div>
    </div>
  );
}
