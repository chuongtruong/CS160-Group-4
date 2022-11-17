import React, { useState, useRef, useEffect } from "react";

function Confirm() {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  }

  function startTimer(e) {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  }

  function clearTimer(e) {
    setTimer("00:00:15");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 15);
    return deadline;
  }

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // function onClickReset() {
  //   clearTimer(getDeadTime());
  // }

  function handleClick() {
    alert("---");
  }

  return (
    <div className="Confirm">
      <h1>Thank you for your order! Please pay at the cashier</h1>
      <h1>Your waiting time</h1>
      <h2 text-align center>
        {timer}
      </h2>
      {/* <button handClick={handleClick}>Go back to home</button> */}
    </div>
  );
}

export default Confirm;