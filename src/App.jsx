import React, { useState, useEffect } from 'react';
import Settings from './Settings'; // اگر فایلش هنوز نساختی می‌تونی بعداً اضافه کنی

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showSettings, setShowSettings] = useState(false);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgImage, setBgImage] = useState('/src/img/default.jpg');

  const apikey = "d79c2d90c0b5f88c74ede94c91e83deb";

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    // تغییر تصویر زمینه بر اساس تم فقط اگر اطلاعات آب‌وهوا نیست
    if (!weatherData) {
      setBgImage('/src/img/default.jpg');
    }
  }, [theme, weatherData]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const GetWeather = async () => {
    if (!city) {
      setError("لطفاً نام شهر را وارد کنید.");
      setWeatherData(null);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=fa`
      );

      if (!response.ok) {
        throw new Error(" شهر پیدا نشد یا مشکلی در دریافت اطلاعات وجود دارد دوبار امتحان کنید و یا به انگلیسی تایپ کنید .");
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);

      const weatherMain = data.weather[0].main.toLowerCase();
      if (weatherMain.includes("rain")) {
        setBgImage('/src/img/بارانی.jfif');
      } else if (weatherMain.includes("clear")) {
        setBgImage('/src/img/صاف.jfif');
      } else if (weatherMain.includes("cloud")) {
        setBgImage('/src/img/ابر.jfif');
      } else {
        setBgImage('/src/img/default.jpg');
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full">
            <span className="text-xs">🤖</span>
          </div>
          <h1 className="text-2xl font-bold">هواشناسی پیشرفت ماهواری</h1>
        </div>
      
        <nav className="flex space-x-6 rtl:space-x-reverse text-lg">
          <a  href="HourlyForecast" className="hover:text-gray-300">ورود</a>
          <a href="#" className="hover:text-gray-300">ثبت نام</a>
          <button onClick={() => setShowSettings(true)} className="hover:text-gray-300">تنظیمات</button>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-grow pt-32 pb-8 w-full sm:max-w-lg px-4">
        <h2 className="text-white text-3xl font-semibold mb-8">اطلاعات آب و هوا</h2>

        <div className="bg-black bg-opacity-80 rounded-2xl p-8 w-full text-center shadow-lg">
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden mb-5">
            <button
              onClick={GetWeather}
              className="bg-green-500 text-white py-3 px-6 text-base font-medium rounded-l-lg hover:bg-green-600"
            >
              {loading ? '...' : 'ثبت'}
            </button>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              placeholder="شهر خود را وارد کنید"
              className="flex-grow bg-transparent border-none py-3 px-4 text-white text-right placeholder-gray-400 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 mb-3">{error}</p>}
          {loading && <p className="text-blue-500 mb-3">در حال دریافت اطلاعات...</p>}

          {weatherData && (
            <div className="flex flex-col items-center text-lg space-y-3">
              <p className="text-green-500">نام شهر: {weatherData.name}</p>
              <p className="text-green-500">توضیحات: {weatherData.weather[0].description}</p>
              <p className="text-green-500">دما: {weatherData.main.temp}°C</p>
              <p className="text-green-500">باد: {weatherData.wind.speed} متر/ثانیه</p>
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-xl">
            <h2 className="text-xl font-bold mb-4">تنظیمات</h2>
            <button
              onClick={toggleTheme}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              تغییر تم به {theme === 'light' ? 'شب' : 'روز'}
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="mt-4 text-sm text-gray-600 underline"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
