import React, { useState } from 'react';

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const [column, setColumn] = useState('firstName');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(column, query);
    }
  };

  return (
    <div className="search-input">
      <select value={column} onChange={(e) => setColumn(e.target.value)}>
        <option value="firstName">ФИО</option>
        <option value="age">Возраст</option>
        <option value="gender">Пол</option>
        <option value="phone">Телефон</option>
        <option value="address.city">Адрес (город)</option>
        <option value="address.street">Адрес (улица)</option>
      </select>
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