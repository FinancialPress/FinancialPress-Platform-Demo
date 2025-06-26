
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  onNavigate: (screen: number, symbol?: string) => void;
  isDarkMode: boolean;
}

const SearchForm = ({ onNavigate, isDarkMode }: SearchFormProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const searchClasses = isDarkMode
    ? 'pl-10 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400'
    : 'pl-10 pr-12 bg-gray-50 border-gray-300 text-black placeholder-gray-500';

  const searchIconClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      const symbol = searchValue.trim().toUpperCase();
      navigate(`/stockchartdata?symbol=${symbol}`);
      setIsSearching(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden sm:block">
      <Search
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchIconClasses} w-4 h-4 sm:w-5 sm:h-5`}
      />
      <Input
        placeholder="Search $XRP, $FPT, Tesla..."
        className={`w-48 sm:w-64 lg:w-80 text-sm ${searchClasses}`}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        aria-label="Search stocks and cryptocurrencies"
      />
      <Button
        type="submit"
        size="icon"
        className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 bg-fpYellow hover:bg-fpYellowDark text-black border-fpYellow ${
          isSearching || !searchValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isSearching || !searchValue.trim()}
        aria-label="Execute search"
      >
        <Search className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </form>
  );
};

export default SearchForm;
