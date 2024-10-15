import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.1, 
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <motion.nav 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <ul className="flex space-x-8 justify-center text-lg font-semibold">
            <motion.li whileHover="hover" variants={linkVariants}>
              <Link to="/" className="px-4 py-2 rounded-full bg-opacity-20 bg-white hover:bg-opacity-30 transition duration-300 ease-in-out">
                Home
              </Link>
            </motion.li>
            <motion.li whileHover="hover" variants={linkVariants}>
              <Link to="/add-movie" className="px-4 py-2 rounded-full bg-opacity-20 bg-white hover:bg-opacity-30 transition duration-300 ease-in-out">
                Add Movie
              </Link>
            </motion.li>
          </ul>
        </motion.nav>
        <main className="flex-grow container mx-auto px-6 py-12">
          <motion.div 
            className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 backdrop-filter backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/add-movie" element={<AddMovie />} />
            </Routes>
          </motion.div>
        </main>
        <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white text-center p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-lg font-semibold">
              © 2024 Movie Review App. All rights reserved.
            </p>
            <p className="text-sm mt-2 text-indigo-200">
              Designed with passion for movie enthusiasts
            </p>
          </motion.div>
        </footer>
      </div>
    </Router>
  );
}

export default App;