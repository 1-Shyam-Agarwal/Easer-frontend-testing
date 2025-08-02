import React, { useEffect, useState } from 'react';

const FeatureRelease = () => {
    const calculateTimeLeft = () => {
    const targetDate = new Date('2025-08-31T00:00:00+05:30');
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const FlipUnit = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-blue-500 rounded-sm shadow-md flex items-center justify-center text-2xl font-semibold text-gray-800">
        {value}
      </div>
      <span className="mt-2 text-sm text-gray-600 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="min-h-[100%] flex flex-col items-center justify-center bg-white relative px-4">

      <div className="text-center max-w-3xl py-12">
        <h1 className="text-2xl md:text-2xl  text-gray-800 mb-8">
          Feature Launching on <span className="text-blue-700 font-semibold">31 August 2025</span>
        </h1>

        {/* <h2 className="mt-3 text-lg md:text-xl text-gray-700 font-normal">
          Celebrate <span className='text-[#1A237E]  font-semibold'>krishna Janmashtami</span> with a powerful new version of Easer.
        </h2> */}

        {/* Flip Timer */}
        <div className="mt-8 flex justify-center gap-4 sm:gap-6 sm:flex-nowrap">
          <FlipUnit label="Days" value={timeLeft.days} />
          <FlipUnit label="Hours" value={timeLeft.hours} />
          <FlipUnit label="Minutes" value={timeLeft.minutes} />
          <FlipUnit label="Seconds" value={timeLeft.seconds} />
        </div>

        <div className="mt-8 text-md  font-normal text-gray-500">
          This feature enables you to place orders remotely and get notified when your printouts are ready – only on Easer.
        </div>

        <div className="mt-10 text-center">
  <button className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-semibold rounded-full shadow-md transition duration-300 ease-in-out">
     Coming Soon — Happy Radhashtami!
  </button>
</div>

      </div>
    </div>
  );
};

export default FeatureRelease;
