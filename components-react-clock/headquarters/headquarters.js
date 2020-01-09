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
      <div className="container-fluid my-3">
        <div>
          <h1 className="font-weight-bolder underscore">Headquarters</h1>
        </div>
      </div>
      <div className="wrapper headquarters py-6">
        <div className="container-fluid">
          <div className="row my-6 align-items-center justify-content-center">
            <div className="col-9 col-md-5 col-lg-3 py-3 my-2 mx-6 bg-primary clock-box">
              <div className="d-flex align-items-center justify-content-center my-2">
                <div className="px-3"> <i className="ai-logo-artlimes" /></div><h4 className="font-weight-bolder">London <br /> UK</h4>
              </div>
              <Clock value={timeLondon} />
            </div>
            <div className="col-9 col-md-5 col-lg-3 py-3 my-2 mx-6 bg-primary clock-box">
              <div className="d-flex align-items-center justify-content-center my-2">
                <div className="px-3"> <i className="ai-logo-artlimes" /></div><h4 className="font-weight-bolder">Athens <br /> Greece</h4>
              </div>
              <Clock value={timeAthens} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Headquarters;
