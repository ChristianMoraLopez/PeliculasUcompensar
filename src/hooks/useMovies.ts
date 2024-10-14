// useMovies.ts
import { useEffect, useState } from 'react';
import { supabase } from '@hooks/useClient'; // Cambia según tu estructura

interface Movie {
  id: number;
  title: string;
  review: string;
  trailer: string;
  release: string;
  rating: number;
  poster: string;
}

export const useMovies = (searchTerm: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('reviews') // Cambia según la tabla que necesites
          .select('*');

        if (error) {
          setError(error.message);
          return; // Salir si hay un error
        }

        // Asegúrate de que data no sea null
        if (data) {
          // Comprobamos si data es un arreglo
          if (Array.isArray(data)) {
            setMovies(data as Movie[]);
          } else {
            setError("Data is not an array");
          }
        } else {
          // Manejo si data es null
          setError("No movies found");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filtrado de películas basado en el término de búsqueda
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMovie = async (newMovie: Movie) => {
    try {
      // Validación de campos requeridos
      if (!newMovie.title || !newMovie.review || !newMovie.trailer || !newMovie.release || newMovie.rating === null || !newMovie.poster) {
        throw new Error("All fields are required");
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([newMovie]);

      if (error) {
        console.error('Error adding movie:', error.message);
        throw error;
      }

      // Actualiza la lista de películas después de agregar
      if (data) {
        setMovies((prevMovies) => [...prevMovies, ...(data as Movie[])]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return { movies: filteredMovies, loading, error, addMovie };
};
