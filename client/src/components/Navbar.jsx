import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaPenAlt } from 'react-icons/fa';

const Navbar = () => {
  const [showModal, setShowModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const mobileMenuVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileItemVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -20, opacity: 0 }
  };

  return (
    <>
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-col md:flex-row justify-between items-center shadow-sm"
      >
        <div className="w-full md:w-auto flex justify-between items-center">
          <motion.div variants={itemVariants}>
            <Link 
              to="/" 
              className="text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <FaPenAlt className="text-blue-500 dark:text-blue-400" />
              <span>BlogYetu</span>
            </Link>
          </motion.div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <motion.div 
          variants={itemVariants}
          className="hidden md:flex items-center gap-4"
        >
          <button 
            onClick={() => setShowModal('login')} 
            className="text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Login
          </button>
          <button 
            onClick={() => setShowModal('register')} 
            className="text-sm bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Register
          </button>
          <ThemeToggle />
        </motion.div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="md:hidden w-full overflow-hidden"
        >
          <div className="flex flex-col items-center gap-3 py-4">
            <motion.button 
              variants={mobileItemVariants}
              onClick={() => {
                setShowModal('login');
                setMobileMenuOpen(false);
              }} 
              className="w-full max-w-xs text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
            >
              Login
            </motion.button>
            <motion.button 
              variants={mobileItemVariants}
              onClick={() => {
                setShowModal('register');
                setMobileMenuOpen(false);
              }} 
              className="w-full max-w-xs text-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow transition-colors"
            >
              Register
            </motion.button>
            <motion.div variants={mobileItemVariants} className="pt-2">
              <ThemeToggle />
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AuthModal 
            type={showModal} 
            onClose={() => setShowModal(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;