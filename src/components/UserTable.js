import React, { useState } from 'react';
import UserRow from './UserRow';

function UserTable({ users, onRowClick }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [columnWidths, setColumnWidths] = useState({
    firstName: 200,
    age: 100,
    gender: 100,
    phone: 150,
    address: 200,
  });

  const getNestedValue = (obj, key) => {
    return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key && sortConfig.direction) {
      sortableUsers.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
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
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
      key = null;
    }
    setSortConfig({ key, direction });
  };

  const getSortDirectionClass = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return 'sort-asc';
      } else if (sortConfig.direction === 'descending') {
        return 'sort-desc';
      }
    }
    return '';
  };

  const handleMouseDown = (e, column) => {
    const startX = e.clientX;
    const startWidth = columnWidths[column];
    const handleMouseMove = (e) => {
      const newWidth = Math.max(startWidth + e.clientX - startX, 50);
      setColumnWidths((prev) => ({
        ...prev,
        [column]: newWidth,
      }));
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <table style={{ width: '100%', maxWidth: '1200px' }}>
      <thead>
        <tr>
          <th style={{ width: columnWidths.firstName }}>
            <div className="resizable-header">
              <div onClick={() => requestSort('firstName')} className={`header-content ${getSortDirectionClass('firstName')}`}>
                ФИО
              </div>
              <span className="resize-handle" onMouseDown={(e) => handleMouseDown(e, 'firstName')} />
            </div>
          </th>
          <th style={{ width: columnWidths.age }}>
            <div className="resizable-header">
              <div onClick={() => requestSort('age')} className={`header-content ${getSortDirectionClass('age')}`}>
                Возраст
              </div>
              <span className="resize-handle" onMouseDown={(e) => handleMouseDown(e, 'age')} />
            </div>
          </th>
          <th style={{ width: columnWidths.gender }}>
            <div className="resizable-header">
              <div onClick={() => requestSort('gender')} className={`header-content ${getSortDirectionClass('gender')}`}>
                Пол
              </div>
              <span className="resize-handle" onMouseDown={(e) => handleMouseDown(e, 'gender')} />
            </div>
          </th>
          <th style={{ width: columnWidths.phone }}>
            Телефон
          </th>
          <th style={{ width: columnWidths.address }}>
            <div className="resizable-header">
              <div onClick={() => requestSort('address.city')} className={`header-content ${getSortDirectionClass('address.city')}`}>
                Адрес
              </div>
              <span className="resize-handle" onMouseDown={(e) => handleMouseDown(e, 'address')} />
            </div>
          </th>
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