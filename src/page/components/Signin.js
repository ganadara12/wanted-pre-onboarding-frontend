import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValidEmail = email.includes('@');
  const isValidPassword = password.length >= 8;

  const handleSignin = async (event) => {
    event.preventDefault();
  
    if (isValidEmail && isValidPassword) {
      try {
        const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', { email, password });
        localStorage.setItem('token', response.data.access_token);
        navigate('/todo');
      } catch (error) {
        console.error('Signin error:', error);
      }
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSignin}>
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
          data-testid="signin-button"
          disabled={!isValidEmail || !isValidPassword}
          type="submit"
        >
          로그인
        </button>
      </form>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}

export default Signin;
