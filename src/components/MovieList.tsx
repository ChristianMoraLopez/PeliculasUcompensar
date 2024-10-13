import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  poster: string;
}

interface MovieListProps {
  searchTerm: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Simular la carga de películas desde una API
    const fetchMovies = async () => {
      // En una aplicación real, aquí harías una llamada a la API
      const mockMovies: Movie[] = [
        { id: 1, title: "Inception", releaseDate: "2010-07-16", rating: 8.8, poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
        { id: 2, title: "The Shawshank Redemption", releaseDate: "1994-09-23", rating: 9.3, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
        { id: 3, title: "The Godfather", releaseDate: "1972-03-24", rating: 9.2, poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
      ];
      setMovies(mockMovies);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Últimas Películas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMovies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {movie.releaseDate}
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
    </div>
  );
};

export default MovieList;