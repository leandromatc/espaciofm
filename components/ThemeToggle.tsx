"use client";

import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>();
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") || "dark");
    }
  });
  return (
    <div className='dark:bg-white dark:text-black flex justify-between  rounded-full'>
      <button
        className={`px-5 py-3 ${
          theme === "light" ? "bg-black text-white" : ""
        }`}
      >
        <Sun />
      </button>
      <button
        className={`px-5 py-3 ${theme === "dark" ? "bg-black text-white" : ""}`}
      >
        <Moon />
      </button>
    </div>
  );
};

export default ThemeToggle;
