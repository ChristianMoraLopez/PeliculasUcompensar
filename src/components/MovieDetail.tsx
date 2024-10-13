import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Star, Clock, Users } from 'lucide-react';

interface MovieDetails {
  id: number;
  title: string;
  releaseDate: string;
  rating: number;
  poster: string;
  synopsis: string;
  duration: string;
  cast: string[];
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    // Simular la carga de detalles de la película desde una API
    const fetchMovieDetails = async () => {
      // En una aplicación real, aquí harías una llamada a la API con el ID
      const mockMovie: MovieDetails = {
        id: 1,
        title: "Inception",
        releaseDate: "2010-07-16",
        rating: 8.8,
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        synopsis: "Un ladrón con la rara habilidad de 'extracción' de robar secretos del subconsciente de las personas durante el estado de sueño se le ofrece una oportunidad de redención.",
        duration: "2h 28min",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
      };
      setMovie(mockMovie);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={movie.poster} alt={movie.title} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{movie.releaseDate}</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{movie.title}</h1>
            <div className="mt-2 flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">{movie.rating}</span>
            </div>
            <p className="mt-2 text-gray-500">{movie.synopsis}</p>
            <div className="mt-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="h-5 w-5 mr-2" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{movie.cast.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;