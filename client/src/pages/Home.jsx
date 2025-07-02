import React, { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import Navbar from '../components/Navbar';
import { FiRss } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <>
      <Navbar />
      <main className="px-4 py-6 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <FiRss className="text-2xl mr-2 text-blue-500 dark:text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
              Latest Posts
            </h1>
          </motion.div>

          {loading ? (
            <motion.div 
              variants={itemVariants}
              className="flex justify-center py-12"
            >
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full h-12 w-12 bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants}>
              <PostList posts={posts} />
            </motion.div>
          )}
        </motion.div>
      </main>
    </>
  );
};

export default Home;