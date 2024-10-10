import React, { useState } from 'react'; // React와 useState 훅을 가져옵니다.
import { createClient } from '@supabase/supabase-js'; // Supabase 클라이언트를 가져옵니다.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase URL 환경 변수에서 가져옵니다.
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Supabase 키 환경 변수에서 가져옵니다.
const supabase = createClient(supabaseUrl, supabaseKey); // Supabase 클라이언트를 초기화합니다.

const SignUp = () => {
  // 회원가입 컴포넌트 정의
  // 이 컴포넌트는 사용자가 이메일과 비밀번호를 통해 회원가입할 수 있는 폼을 제공합니다.

  const [message, setMessage] = useState(''); // 사용자에게 보여줄 메시지를 저장할 상태
  const [name, setName] = useState(''); // 사용자 이름을 저장할 상태
  const [email, setEmail] = useState(''); // 사용자 이메일을 저장할 상태
  const [password, setPassword] = useState(''); // 사용자 비밀번호를 저장할 상태
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인을 위한 상태

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 기본 동작(페이지 리로드)을 방지합니다.

    // 비밀번호와 비밀번호 확인이 일치하는지 검사합니다.
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다!"); // 불일치 시 오류 메시지 설정
      return; // 함수 종료
    }

    // 이메일 유효성 검사를 위한 정규 표현식
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
      setMessage("유효한 이메일을 입력하세요."); // 유효하지 않은 이메일 경고
      return; // 함수 종료
    }

    // 비밀번호 길이 검사
    if (password.length < 6) {
      setMessage("비밀번호는 최소 6자리 이상이어야 합니다."); // 비밀번호 길이 경고
      return; // 함수 종료
    }

    // Supabase를 통해 회원가입 처리
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message); // 오류 발생 시 오류 메시지 설정
    } else {
      // 사용자 프로필 정보 추가
      await supabase.from('profiles').insert([{ id: data.user.id, name }]);
      setMessage("환영합니다!"); // 회원가입 성공 시 환영 메시지 설정
    }
  };

  return (
    <div className="signup"> {/* 회원가입 컴포넌트의 컨테이너 */}
      <h2>회원가입</h2> {/* 제목 */}
      <form onSubmit={handleSubmit}> {/* 폼 제출 시 handleSubmit 호출 */}
        <input
          type="text"
          placeholder="이름"
          value={name} // 이름 입력 필드의 값
          onChange={(e) => setName(e.target.value)} // 입력 값 변경 시 상태 업데이트
          required // 필수 입력 필드
        />
        <input
          type="email"
          placeholder="이메일"
          value={email} // 이메일 입력 필드의 값
          onChange={(e) => setEmail(e.target.value)} // 입력 값 변경 시 상태 업데이트
          required // 필수 입력 필드
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password} // 비밀번호 입력 필드의 값
          onChange={(e) => setPassword(e.target.value)} // 입력 값 변경 시 상태 업데이트
          required // 필수 입력 필드
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword} // 비밀번호 확인 입력 필드의 값
          onChange={(e) => setConfirmPassword(e.target.value)} // 입력 값 변경 시 상태 업데이트
          required // 필수 입력 필드
        />
        <button type="submit">가입하기</button> {/* 가입 버튼 */}
      </form>
      {message && <p>{message}</p>} {/* 메시지가 있을 경우 표시 */}
    </div>
  );
};

export default SignUp; // SignUp 컴포넌트를 내보냅니다.