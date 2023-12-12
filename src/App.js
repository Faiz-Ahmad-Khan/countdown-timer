import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Countdown.css';

const Countdown = () => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progressWidth, setProgressWidth] = useState(100);

  useEffect(() => {
    let interval;

    if (isActive && minutes >= 0) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
          } else {
            setMinutes((prev) => Math.max(0, prev - 1));
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }

        setProgressWidth((prev) => (prev - (1 / (minutes * 60 + seconds)) * 100).toFixed(2));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const notify = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      onClose: () => {
        setMinutes('');
        setProgressWidth(100);
      },
    });
  };

  const handlePlay = () => {
    if (minutes < 0) {
      notify('Please enter a valid value.');
      return;
    }

    if (minutes === '') {
      notify('Input field must not be empty.');
      return;
    }

    if (!isActive && minutes > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes('');
    setProgressWidth(100);
    setSeconds(0);
  };

  const handleMinutesChange = (e) => {
    const inputMinutes = parseInt(e.target.value, 10);
    setMinutes(isNaN(inputMinutes) ? '' : inputMinutes);
    setProgressWidth(100);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="countdown-container">
      <ToastContainer />
      <div className="input-container">
        <div>Enter Minutes</div>
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={isActive}
        />
        <div className="progress-bar" style={{ width: `${progressWidth}%` }} />
      </div>
      <div className="controls-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoy8xAlLL_7_YWPQdslsMstgZGkyxVKBtX-g&usqp=CAU"
          alt="Play Icon"
          onClick={handlePlay}
        />
        <div className="countdown-timer">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </div>
  );
};

export default Countdown;
