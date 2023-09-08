import React, { useState, useEffect } from "react";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerDetails, setTimerDetails] = useState(null);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    // Create a new timer details object with updated values
    const newTimerDetails = {
      timer: time,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Update the timer details state and reset the timer
    setTimerDetails(newTimerDetails);
    setTime(0);
    setIsRunning(false);

    // Send the timer details to the server for saving
    saveTimerDetails(newTimerDetails);
  };

  const saveTimerDetails = async (details) => {
    try {
      const response = await fetch("/api/save-timer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        console.log("Timer details saved successfully.");
      } else {
        console.error("Failed to save timer details.");
      }
    } catch (error) {
      console.error("Error while saving timer details:", error);
    }
  };

  return (
    <div className="subcontainer">
      <div className="seconds"> {time} Seconds</div>
      <button className="actions" onClick={toggleTimer}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button className="reset" onClick={resetTimer}>
        Reset
      </button>
      {/* Display the timer details when they exist */}
      {timerDetails && (
        <div>
          <p>Timer: {timerDetails.timer} Seconds</p>
          <p>Date: {timerDetails.date}</p>
          <p>Time: {timerDetails.time}</p>
        </div>
      )}
    </div>
  );
}
