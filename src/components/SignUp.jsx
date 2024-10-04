import React, { useState } from 'react';

const SignUp = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    setMessage("회원가입 완료!");
    console.log("회원가입 처리", { name, email, password });
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="Phone Number"
          placeholder="Your Phone Number"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Join</button>
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