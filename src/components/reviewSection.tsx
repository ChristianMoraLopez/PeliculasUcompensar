import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Button from '@components/ui/Button';
import { useMoviesAndReviews } from '@hooks/useMovies';

interface ReviewSectionProps {
  movieId: number;
}

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none ${props.className}`}
  />
);

const ReviewSection: React.FC<ReviewSectionProps> = ({ movieId }) => {
  const { loading, error, addReview, getReviewsForMovie } = useMoviesAndReviews('');
  const [newReview, setNewReview] = useState('');

  const movieReviews = getReviewsForMovie(movieId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.trim()) {
      try {
        await addReview(movieId, newReview);
        setNewReview('');
      } catch (err) {
        console.error('Error submitting review:', err);
      }
    }
  };

  return (
    <Card className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">User Reviews</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="mb-8">
          <Textarea
            placeholder="Write your review here..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="mb-4"
            required
          />
          <Button 
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          {movieReviews.length > 0 ? (
            movieReviews.map((review) => (
              <Card key={review.id} className="bg-gray-50 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-gray-700 mb-2">{review.another_reviews}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;