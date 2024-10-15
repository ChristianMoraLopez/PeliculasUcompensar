import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, Search } from 'lucide-react';
import { useMoviesAndReviews } from '@hooks/useMovies';
import { motion } from 'framer-motion';

const MovieList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, loading, error } = useMoviesAndReviews(searchTerm);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-8 text-indigo-900"
        >
          Descubre Películas Increíbles
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Buscar películas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 pr-10 text-gray-900 border-0 rounded-full shadow-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>
        {loading ? (
          <div className="text-center text-indigo-700 text-xl">Cargando películas...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-xl">Error: {error}</div>
        ) : movies.length === 0 ? (
          <div className="text-center text-indigo-700 text-xl">No se encontraron películas.</div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  className="block bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-105 transform"
                >
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-indigo-900">{movie.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                        {movie.release}
                      </span>
                      <span className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MovieList;