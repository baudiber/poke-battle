import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="rounded-xl my-4 bg-slate-200 flex items-center justify-center shadow-sm">
        <button className="px-2"><FaSearch id="search-icon"></FaSearch></button>
        <input value={query} onChange={handleChange} className="bg-transparent rounded-r-xl w-96 p-2" type="text" placeholder="Search by name..."/>
    </div>
  ); 

};

export default SearchBar;
