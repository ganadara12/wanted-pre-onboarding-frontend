import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../components/Auth/Signup';
import Signin from '../components/Auth/Signin';
import TodoList from '../components/Todo/TodoList';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/todo" element={<TodoList />} />
      <Route path="/" element={<Signin />} />
    </Routes>
  );
}

export default AppRoutes;
