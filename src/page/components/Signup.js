import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import siteLogo from '../../assets/images/logo.png';
import './Signup.scss';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

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
        if (error.response && error.response.data && error.response.data.message === '이미 사용중인 이메일입니다.') {
          setErrorMessage('이미 사용중인 이메일입니다.');
        } else {
          setErrorMessage('회원가입 중 오류가 발생했습니다.');
        }
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
    <div className="signup-background">
      <div className="signup-box">
        <img src={siteLogo} alt="Site Logo" className="site-logo" />
        <h2>회원가입</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <Link className="signin-link" to="/signin">로그인 페이지로 돌아가기</Link>
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

export default Signup;
