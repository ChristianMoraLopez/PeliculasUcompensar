import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center mb-4 sm:mb-0">
          <Film className="mr-2" />
          CineReseñas
        </Link>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 py-2 px-4 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;