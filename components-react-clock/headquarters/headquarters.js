import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';

// Logic based on
// https://dev.to/gnsp/making-a-neon-clock-using-react-hooks-mei

function getNowInTimezones(timezones) {
  return timezones.map(tmz => new Date(new Date().toLocaleString('en-US', { timeZone: tmz })));
}

function useClocks(timezones) {
  const [timer, setTimer] = useState(null);
  const [times, setTimes] = useState(getNowInTimezones(timezones));

  // this effect will run when our app renders for the first time
  useEffect(() => {
    function initTimer() {
      const now = Date.now();
      const nextSec = (Math.floor(now / 1000) + 1) * 1000;
      const timeLeft = nextSec - now;

      // Register an interval beginning next second
      window.setTimeout(() => {
        // on each second update the state time
        const interval = window.setInterval(() => setTimes(getNowInTimezones(timezones)), 1000);

        // now our timer / interval is set
        setTimer(interval);
      }, timeLeft);
    }

    // When this effect runs, initialize the timer / interval
    if (!timer) initTimer();

    // This returned function will clear the interval when our app unmounts
    return (() => (timer && window.clearInterval(timer) && setTimer(null)));
  }, [timer]); // This hook will run only when the value of timer is set or unset

  return times;
}


function Headquarters() {
  const [timeLondon, timeAthens] = useClocks(['Europe/London', 'Europe/Athens']);

  return (
    <div className="wrapper">
     
              <Clock value={timeLondon} />
        
              <Clock value={timeAthens} />
       
    </div>
  );
}

export default Headquarters;
