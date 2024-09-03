import React from 'react';

const Header = ({ toggleNightMode, nightMode }) => (
  <header className="p-4 bg-gray-200 shadow-md flex justify-between items-center">
    <h1 className="text-xl font-bold">Todo List</h1>
    <button
      onClick={toggleNightMode}
      className="p-2 border rounded hover:bg-gray-300 transition"
    >
      {nightMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
    </button>
  </header>
);

export default Header;
