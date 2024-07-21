import React, { useState } from 'react';

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
    console.log(query)
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
}

export default SearchInput;