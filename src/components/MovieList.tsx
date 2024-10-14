import * as React from 'react'; // Cambiado aquí
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';
import { useMovies } from '@hooks/useMovies'; // Asegúrate de que la ruta sea correcta

const MovieList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, loading, error } = useMovies(searchTerm); // Usa el hook con searchTerm

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Últimas Películas</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {loading ? (
        <div>Cargando películas...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : movies.length === 0 ? (
        <div>No se encontraron películas.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {movie.release}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {movie.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
