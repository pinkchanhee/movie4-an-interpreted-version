import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin, handleGoogleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await handleLogin(email, password);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("로그인 성공!");
      navigate('/');
    }
  };

  const handleGoogleClick = async () => {
    await handleGoogleLogin();
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="google-login" onClick={handleGoogleClick}>Google로 로그인</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;