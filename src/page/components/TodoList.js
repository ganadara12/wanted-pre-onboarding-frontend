import React from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin', { replace: true });
  };

  return (
    <div>
      <h2>Todo List</h2>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default TodoList;
