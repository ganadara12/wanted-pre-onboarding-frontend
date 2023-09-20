import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TokenContext } from '../../App';
import './Signin.scss';
import siteLogo from '../../assets/images/logo.png';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

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
        setIsErrorModalVisible(true);
      }
    }
  };

  const closeModal = () => {
    setIsTermsVisible(false);
    setIsPrivacyVisible(false);
    setIsErrorModalVisible(false);
  };

  return (
    <div className="signin-background"> 
      <div className="signin-box">
        <img src={siteLogo} alt="Site Logo" className="site-logo" />
        <form className="form" onSubmit={handleSignin}>
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
        <Link className="signup-link" to="/signup">회원가입</Link>
      </div>
      <div className="footer-text">
        <span onClick={() => setIsTermsVisible(true)}>이용약관</span> <span onClick={() => setIsPrivacyVisible(true)}>개인정보처리방침</span>
      </div>
      {isTermsVisible && (
        <div className="modal">
          <h2>이용약관</h2>
          <hr />
          <p>여기에 이용약관을 적어주세요.</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
      {isPrivacyVisible && (
        <div className="modal">
          <h2>개인정보 처리방침</h2>
          <hr />
          <p>여기에 개인정보 처리방침을 적어주세요.</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      )}
      {isErrorModalVisible && (
      <div className="modal">
        <h2>오류 메시지</h2>
        <hr />
        <p>{errorMessage}</p>
        <button onClick={closeModal}>닫기</button>
      </div>
    )}
    </div>
  );
}

export default Signin;
