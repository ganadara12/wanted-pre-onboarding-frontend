import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './page/components/Signin';
import Signup from './page/components/Signup';
import TodoList from './page/components/TodoList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/signin" element={!token ? <Signin /> : <Navigate to="/todo" />} />
                  <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/todo" />} />
                  <Route path="/todo" element={token ? <TodoList /> : <Navigate to="/signin" />} />
                  <Route path="/" element={<Navigate to="/signin" />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
