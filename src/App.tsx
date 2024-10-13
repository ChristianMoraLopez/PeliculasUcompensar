import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MovieList searchTerm={searchTerm} />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;