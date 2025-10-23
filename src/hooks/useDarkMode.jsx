import { useEffect } from 'react';

export const DarkModeProvider = ({ children }) => {
  // Force light theme on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    try {
      localStorage.removeItem('darkMode');
    } catch {}
  }, []);
  return children;
};

export const useDarkMode = () => ({ isDarkMode: false, toggleDarkMode: () => {} });