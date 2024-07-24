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
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data.users))
      .catch(error => setError(error.message));
  }, []);

  const handleSearch = (key, value) => {
    fetch(`https://dummyjson.com/users/filter?key=${key}&value=${value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFilteredUsers(data.users);
        setError(null);
      })
      .catch(error => setError(error.message));
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    document.body.classList.remove('modal-open');
  };

  return (
    <div className="App">
      <h1>Таблица пользователей</h1>
      <SearchInput onSearch={handleSearch} />
      {error && <p className="error">Ошибка: {error}</p>}
      <UserTable users={filteredUsers.length ? filteredUsers : users} onRowClick={handleRowClick} />
      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;