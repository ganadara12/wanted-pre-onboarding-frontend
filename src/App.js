import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './page/components/Signin';
import Signup from './page/components/Signup';
import TodoList from './page/components/TodoList';

export const TokenContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <TokenContext.Provider value={{ token, setToken }}>
        <div className="App">
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/todo" element={token ? <TodoList /> : <Signin />} />
            <Route path="/" element={<Signin />} />
          </Routes>
        </div>
      </TokenContext.Provider>
    </Router>
  );
}

export default App;
