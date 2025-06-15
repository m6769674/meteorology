import React, { useEffect, useState } from 'react';

function Settings({ onToggleTheme, currentTheme }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center text-white">
      <div className="bg-black bg-opacity-70 p-10 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">تنظیمات</h2>
        <button
          onClick={onToggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200"
        >
          تغییر تم به {currentTheme === 'light' ? 'شب' : 'روز'}
        </button>
      </div>
    </div>
  );
}

export default Settings;