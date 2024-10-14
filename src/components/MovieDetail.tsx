import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Calendar, PlayCircle, Pause } from 'lucide-react';
import { supabase } from '@hooks/useClient';
import Button from '@components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';

interface MovieDetails {
  id: number;
  title: string;
  review: string;
  trailer: string;
  releaseDate: string;
  rating: number;
  poster: string;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setMovie(data);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
        <Card className="bg-red-50 border-red-500 shadow-lg">
          <CardContent className="text-red-700 text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Error</h2>
            <p className="text-xl">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
        <Card className="bg-yellow-50 border-yellow-500 shadow-lg">
          <CardContent className="text-yellow-700 text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Movie Not Found</h2>
            <p className="text-xl">We couldn't find the movie you're looking for.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleTrailer = () => {
    setIsPlaying(!isPlaying);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <Card className="overflow-hidden shadow-2xl">
        <div className="md:flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative">
            <img 
              className="w-full h-full object-cover" 
              src={movie.poster} 
              alt={movie.title} 
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <Button
                onClick={toggleTrailer}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? <Pause className="mr-3 h-6 w-6" /> : <PlayCircle className="mr-3 h-6 w-6" />}
                {isPlaying ? 'Pause Trailer' : 'Watch Trailer'}
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white">
            <CardHeader className="bg-gray-50 border-b border-gray-200 p-8">
              <CardTitle className="text-5xl font-bold text-gray-800 mb-6">{movie.title}</CardTitle>
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-yellow-100 px-4 py-2 rounded-full">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  <span className="text-2xl font-semibold text-gray-800">{movie.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center bg-blue-100 px-4 py-2 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                  <span className="text-lg text-gray-800">{movie.releaseDate}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <h2 className="text-3xl font-semibold mb-6 text-gray-700">Review</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{movie.review}</p>
            </CardContent>
          </div>
        </div>
        {isPlaying && (
          <div className="w-full bg-black p-8">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={getYoutubeEmbedUrl(movie.trailer)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MovieDetail;