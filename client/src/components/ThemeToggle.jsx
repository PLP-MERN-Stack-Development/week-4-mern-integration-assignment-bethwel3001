import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-gray-300 dark:border-gray-600 hover:scale-110 transition duration-300 ease-in-out"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon className="text-gray-800" size={20} />
      ) : (
        <Sun className="text-yellow-400" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
