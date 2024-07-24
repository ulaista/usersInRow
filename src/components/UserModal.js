import React from 'react';

function UserModal({ user, onClose }) {
  const handleClickOutside = (event) => {
    if (event.target.className === 'modal') {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{user.firstName} {user.lastName}</h2>
        <p>Возраст: {user.age}</p>
        <p>Адрес: {user.address.city}, {user.address.street}</p>
        <p>Рост: {user.height} см</p>
        <p>Вес: {user.weight} кг</p>
        <p>Телефон: {user.phone}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}

export default UserModal;