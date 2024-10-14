import React, { useState } from 'react';
import { useMovies } from '@hooks/useMovies';
import { PlusCircle, Star, Calendar, Link, Film, FileText } from 'lucide-react';

interface MovieInput {
    id: number;
    title: string;
    review: string;
    trailer: string;
    release: string;
    rating: number;
    poster: string;
}

const AddMovie: React.FC = () => {
    const { addMovie } = useMovies('');
    const [movie, setMovie] = useState<MovieInput>({
        id: 0,
        title: '',
        review: '',
        trailer: '',
        release: '',
        rating: 0,
        poster: ''
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'rating') {
            const ratingValue = parseFloat(value);
            setMovie(prev => ({
                ...prev,
                [name]: ratingValue > 5 ? 5 : ratingValue
            }));
        } else {
            setMovie(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await addMovie(movie);
            setSuccess(true);
            setMovie({
                id: 0,
                title: '',
                review: '',
                trailer: '',
                release: '',
                rating: 0,
                poster: ''
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error al agregar la película.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-102 hover:shadow-3xl">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8">
                    <h1 className="text-4xl font-extrabold text-white flex items-center">
                        <Film className="mr-3" size={36} />
                        Agregar Nueva Película
                    </h1>
                </div>
                <div className="p-8">
                    {success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg animate-pulse">
                            <p className="font-bold text-lg">¡Éxito!</p>
                            <p>La película se ha añadido correctamente.</p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                            <p className="font-bold text-lg">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group">
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Título</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={movie.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 group-hover:border-indigo-300"
                                    placeholder="Ingrese el título de la película"
                                />
                                <PlusCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={20} />
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="review" className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Reseña</label>
                            <div className="relative">
                                <textarea
                                    id="review"
                                    name="review"
                                    value={movie.review}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 group-hover:border-indigo-300"
                                    rows={4}
                                    placeholder="Escriba una breve reseña de la película"
                                />
                                <FileText className="absolute left-4 top-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={20} />
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="trailer" className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">URL del Trailer</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    id="trailer"
                                    name="trailer"
                                    value={movie.trailer}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 group-hover:border-indigo-300"
                                    placeholder="https://example.com/trailer"
                                />
                                <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={20} />
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="release" className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Fecha de Estreno</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    id="release"
                                    name="release"
                                    value={movie.release}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 group-hover:border-indigo-300"
                                />
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={20} />
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">Calificación (máx. 5)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    value={movie.rating}
                                    onChange={handleChange}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 group-hover:border-indigo-300"
                                    placeholder="0.0 - 5.0"
                                />
                                <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={20} />
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="poster" className="block text-lg font-medium text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors duration-200">URL del Póster</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    id="poster"
                                    name="poster"
                                    value={movie.poster}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 group-hover:border-indigo-300"
                                    placeholder="https://example.com/poster.jpg"
                                />
                                <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" size={20} />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <PlusCircle className="mr-2" size={24} />
                            )}
                            {loading ? 'Añadiendo...' : 'Agregar Película'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;