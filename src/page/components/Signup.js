import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValidEmail = email.includes('@');
  const isValidPassword = password.length >= 8;

  const handleSignup = async (event) => {
    event.preventDefault();
  
    if (isValidEmail && isValidPassword) {
      try {
        await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signup', { email, password });
        navigate('/signin');
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          data-testid="email-input"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          data-testid="signup-button"
          disabled={!isValidEmail || !isValidPassword}
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
