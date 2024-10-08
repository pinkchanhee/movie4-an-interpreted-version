import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SignUp = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("유효한 이메일을 입력하세요.");
      return;
    }
    if (password.length < 6) {
      setMessage("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      await supabase.from('profiles').insert([{ id: data.user.id, name }]);
      setMessage("환영합니다!");
    }
  };

  return (
    <div className="signup">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">가입하기</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
// import React, { useState } from 'react';

// const SignUp = () => {
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // 회원가입 처리 로직 추가
//     setMessage("회원가입 완료!");
//     console.log("회원가입 처리");
//   };

//   return (
//     <div className="signup">
//       <h2>회원가입</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="이메일" required />
//         <input type="password" placeholder="비밀번호" required />
//         <button type="submit">가입하기</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SignUp;