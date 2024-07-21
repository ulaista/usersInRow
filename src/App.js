import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import SearchInput from './components/SearchInput';
import UserModal from './components/UserModal';
import './styles.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => setError(error));
  }, []);

  const handleSearch = (query) => {
    fetch(`https://dummyjson.com/users/filter?key=${query}`)
      .then(response => response.json())
      .then(data => setFilteredUsers(data.users))
      .catch(error => setError(error));
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <h1>Таблица пользователей</h1>
      <SearchInput onSearch={handleSearch} />
      {error && <p className="error">Ошибка: {error.message}</p>}
      <UserTable users={filteredUsers.length ? filteredUsers : users} onRowClick={handleRowClick} />
      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;