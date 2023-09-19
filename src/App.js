import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import Todo from './components/Todo/TodoList';

function App() {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      if (window.location.pathname === '/signin' || window.location.pathname === '/signup') {
        window.location.replace('/todo');
      }
    } else {
      if (window.location.pathname === '/todo') {
        window.location.replace('/signin');
      }
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
