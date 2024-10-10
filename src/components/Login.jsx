import React, { useState } from 'react'; // React 라이브러리와 useState 훅을 가져옵니다.
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅을 가져옵니다.

const Login = ({ handleLogin, handleGoogleLogin }) => {
  // Login 컴포넌트 정의
  // 이 컴포넌트는 사용자가 이메일과 비밀번호로 로그인할 수 있는 폼을 제공합니다.
  
  const [email, setEmail] = useState(''); // 이메일 상태를 관리합니다. 초기값은 빈 문자열입니다.
  const [password, setPassword] = useState(''); // 비밀번호 상태를 관리합니다. 초기값은 빈 문자열입니다.
  const [message, setMessage] = useState(''); // 로그인 후 사용자에게 보여줄 메시지를 관리합니다.
  
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수를 초기화합니다.

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작(페이지 리로드)을 방지합니다.
    
    // handleLogin 함수 호출하여 로그인 시도, 이메일과 비밀번호를 인자로 전달합니다.
    const { error } = await handleLogin(email, password); 
    if (error) {
      setMessage(error.message); // 로그인 실패 시 오류 메시지를 상태에 설정합니다.
    } else {
      setMessage("로그인 성공!"); // 로그인 성공 시 성공 메시지를 설정합니다.
      navigate('/'); // 홈 페이지로 이동합니다.
    }
  };

  const handleGoogleClick = async () => {
    await handleGoogleLogin(); // 구글 로그인 처리 함수 호출
  };

  return (
    <div className="login"> {/* 로그인 컴포넌트의 컨테이너 */}
      <h2>Login</h2> {/* 로그인 제목 */}
      <form onSubmit={handleSubmit}> {/* 폼 제출 시 handleSubmit 호출 */}
        <input
          type="text" // 이메일 입력 필드
          placeholder="E-mail" // 입력 필드 플레이스홀더
          value={email} // 이메일 상태를 입력 필드에 연결
          onChange={(e) => setEmail(e.target.value)} // 입력 값 변경 시 상태 업데이트
          required // 필수 입력 필드
        />
        <input
          type="password" // 비밀번호 입력 필드
          placeholder="Password" // 입력 필드 플레이스홀더
          value={password} // 비밀번호 상태를 입력 필드에 연결
          onChange={(e) => setPassword(e.target.value)} // 입력 값 변경 시 상태 업데이트
          required // 필수 입력 필드
        />
        <button type="submit">Login</button> {/* 로그인 버튼 */}
      </form>
      <button className="google-login" onClick={handleGoogleClick}>Google로 로그인</button> {/* 구글 로그인 버튼 */}
      {message && <p>{message}</p>} {/* 메시지가 있을 경우 표시 */}
    </div>
  );
};

export default Login; // Login 컴포넌트를 내보냅니다.