import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
          <ul className="flex space-x-8 justify-center text-lg font-semibold">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition duration-300 ease-in-out">
                Home
              </Link>
            </li>
            <li>
              <Link to="/add-movie" className="hover:text-yellow-300 transition duration-300 ease-in-out">
                Add Movie
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-grow container mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/add-movie" element={<AddMovie />} />
            </Routes>
          </div>
        </main>
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center p-6">
          <p className="text-sm">
            © 2024 Movie Review App. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Designed with passion for movie enthusiasts
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;