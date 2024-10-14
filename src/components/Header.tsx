import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Search } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-neutral-900 text-neutral-100 shadow-lg p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold flex items-center mb-4 sm:mb-0 hover:text-orange-400 transition duration-300">
          <Film className="mr-2 w-8 h-8" />
          CineReseñas
        </Link>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 py-3 px-4 rounded-full bg-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
          />
          <Search className="absolute right-3 top-3 text-neutral-400 hover:text-orange-400 transition duration-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;