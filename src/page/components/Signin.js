import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TokenContext } from '../../App';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = email.includes('@');
  const isValidPassword = password.length >= 8;

  const handleSignin = async (event) => {
    event.preventDefault();
  
    if (isValidEmail && isValidPassword) {
      try {
        const response = await axios.post('https://www.pre-onboarding-selection-task.shop/auth/signin', { email, password });
        const accessToken = response.data.access_token;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
        navigate('/todo');
      } catch (error) {
        console.error('Signin error:', error);
        setErrorMessage('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
