// useMoviesAndReviews.ts
import { useEffect, useState } from 'react';
import { supabase } from '@hooks/useClient';

interface Movie {
  id: number;
  title: string;
  review: string;
  rating: number;
  release: string;
  poster: string;
  trailer: string;
  reviews_others: number | null;
  created_at: string;
}

interface Review {
  id: number;
  another_reviews: string;
  created_at: string;
  movie_belongs: number | null;
}

export type MovieInput = Omit<Movie, 'id' | 'reviews_others' | 'created_at'>;

export const useMoviesAndReviews = (searchTerm: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies();
    fetchReviews();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      if (data) {
        setMovies(data);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews_by_others')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setReviews(data);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (newMovie: MovieInput) => {
    try {
      setLoading(true);
      setError(null);

      const movieToInsert = {
        ...newMovie,
        rating: Number(newMovie.rating),
        reviews_others: null
      };

      const { data, error } = await supabase
        .from('reviews')
        .insert([movieToInsert])
        .select();

      if (error) throw error;

      if (data) {
        await fetchMovies();
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred adding movie");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (movieId: number, content: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data: reviewData, error: reviewError } = await supabase
        .from('reviews_by_others')
        .insert([{ another_reviews: content, movie_belongs: movieId }])
        .select();

      if (reviewError) throw reviewError;

      if (reviewData && reviewData.length > 0) {
        await fetchReviews();
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred adding review");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReviewsForMovie = (movieId: number) => {
    return reviews.filter(review => review.movie_belongs === movieId);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { 
    movies: filteredMovies, 
    reviews,
    loading, 
    error, 
    addMovie, 
    addReview,
    getReviewsForMovie
  };
};