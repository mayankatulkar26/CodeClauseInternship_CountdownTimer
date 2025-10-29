import { useState, useEffect, useRef } from "react";
import "./Timer.css"
export default function Timer() {
  
  const [time, setTime] = useState(0);
  const [targetDate,setTargetDate]= useState(null);
  const [minutes, setMinutes] = useState("");
  const [event,setEvent] = useState("");
   const [eventName, setEventName] = useState(""); // 🆕 Event name

  const handleID = useRef(null);
  const alertSound = new Audio("/alert.mp3");

  const getval = (val) => {
    return val < 10 ? `0${val}` : val;
  };

  const displayTimer = (timeinSec) => {
    const days = Math.floor(timeinSec / (60 * 60 * 24));
    const hr = Math.floor((timeinSec / (60 * 60)) % 24);
    const mn = Math.floor((timeinSec % 3600) / 60);
    const sec = Math.floor(timeinSec % 60);

    return ` ${getval(days)} days: ${getval(hr)} hours: ${getval(mn)} min: ${getval(sec)} sec`;
  };

const handleStart = () => {
  console.log("Timer started");

  // Clear any previous running interval
  if (handleID.current) {
    clearInterval(handleID.current);
  }

  handleID.current = setInterval(() => {
    if (targetDate) {
      // Countdown to selected date
      const diff = Math.floor((targetDate - Date.now()) / 1000);
      if (diff <= 0) {
        clearInterval(handleID.current);
        alertSound.load();
        alertSound.play();
        setTime(0);
      } else {
        setTime(diff);
      }
    } else {
      // Countdown from manually set time
      setTime((value) => {
        if (value <= 0) {
          clearInterval(handleID.current);
          alertSound.play();
          return 0;
        } else {
          return value - 1;
        }
      });
    }
  }, 1000);
};

  const handleStop = () => {
    clearInterval(handleID.current);
    handleID.current = null;
  };

  const handleReset = () => {
    handleStop();
    setTargetDate(null);
    setTime(0);
  };


  const handleDateChange = (e) => {
    const val = e.target.value;
    const target = new Date(val).getTime();
    setTargetDate(target);
    setTime(target - Date.now());
    const diff = Math.floor((target - Date.now()) / 1000);
    setTime(diff > 0 ? diff : 0);

    handleStop();
  };

  const setmin5 = () => {
    handleReset();
    setTargetDate(null);
    setTime(5 * 60);
    handleStart();
  };

  const setmin10 = () => {
    handleReset();
    setTargetDate(null);
    setTime(10 * 60);
    handleStart();
  };

  const setmin30 = () => {
    handleReset();
    setTargetDate(null);
    setTime(30 * 60);
    handleStart();
  };
  const sethr1 = () => {
    handleReset();
    setTime( 1 * 3600);
    handleStart();
  };
  const setday1 = () => {
    handleReset();
    const time = 24 * 3600;
    setTime(time);
    handleStart();
  };

  useEffect(() => {
    return ()=> handleStop();
  }, []);

  return (
    <div className="timer-container">
               <label htmlFor="event">Event Name: </label>
      <input
        type="text"
        id="event"
        placeholder="Enter event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <h2>{eventName ? `🗓️ Event: ${eventName}` : "No event set"}</h2>
      <hr /> 

      <label htmlFor="time">Select Day and Time  :</label>
      <input
        type="datetime-local"
        value={minutes}
        onChange={handleDateChange}
        id="time"
      />
<br /><br />
      <h1>Time :- {displayTimer(time)}</h1>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <hr />
        <h3>Set Time By default</h3>
      <div style={{ display: "flex" }}>
        <button  onClick={setmin5}>
          5 min
        </button>
        <button  onClick={setmin10}>
          10 min
        </button>
        <button  onClick={setmin30}>
          30 min
        </button>
        <button  onClick={sethr1}>
          1 Hour
        </button>
        <button  onClick={setday1}>
          1 Day
        </button>
      </div>
    </div>
  );
}
