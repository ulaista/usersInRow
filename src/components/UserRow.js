import React from 'react';

function UserRow({ user, onClick }) {
  return (
    <tr onClick={onClick}>
      <td>{user.firstName} {user.lastName}</td>
      <td>{user.age}</td>
      <td>{user.gender}</td>
      <td>{user.phone}</td>
      <td>{user.address.city}, {user.address.street}</td>
    </tr>
  );
}

export default UserRow;