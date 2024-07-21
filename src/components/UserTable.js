import React, { useState } from 'react';
import UserRow from './UserRow';

function UserTable({ users, onRowClick }) {
  const [sortConfig, setSortConfig] = useState(null);

  // Функция для сортировки
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  // Обработчик клика по заголовку колонки для сортировки
  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table style={{ width: '100%', maxWidth: '1200px' }}>
      <thead>
        <tr>
          <th onClick={() => requestSort('name')}>ФИО</th>
          <th onClick={() => requestSort('age')}>Возраст</th>
          <th onClick={() => requestSort('gender')}>Пол</th>
          <th>Телефон</th>
          <th onClick={() => requestSort('address.city')}>Адрес</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map(user => (
          <UserRow key={user.id} user={user} onClick={() => onRowClick(user)} />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;