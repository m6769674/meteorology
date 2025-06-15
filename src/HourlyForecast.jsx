// src/components/HourlyForecast.jsx
import React from 'react';

function HourlyForecast({ hourly }) {
  return (
    <div className="flex overflow-x-auto bg-white bg-opacity-80 dark:bg-gray-800 rounded-xl p-4 gap-4 shadow-md mt-4">
      {hourly.slice(0, 8).map((hour, index) => (
        <div key={index} className="flex flex-col items-center text-sm min-w-[70px]">
          <p className="text-gray-700 dark:text-white">{new Date(hour.dt * 1000).getHours()}:00</p>
          <img
            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt="icon"
            className="w-10 h-10"
          />
          <p className="text-gray-800 dark:text-green-300">{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
