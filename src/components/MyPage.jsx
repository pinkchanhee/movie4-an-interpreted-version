import React, { useEffect, useState } from "react"; // React와 훅을 가져옵니다.
import { createClient } from "@supabase/supabase-js"; // Supabase 클라이언트를 가져옵니다.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase URL 환경 변수
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Supabase 키 환경 변수
const supabase = createClient(supabaseUrl, supabaseKey); // Supabase 클라이언트 초기화

const MyPage = () => {
  // 사용자의 북마크 목록을 표시하는 컴포넌트입니다.
  
  const [bookmarks, setBookmarks] = useState([]); // 북마크 목록을 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리할 상태

  const fetchBookmarks = async () => { // 북마크 가져오기 함수
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser(); // 현재 사용자 정보 가져오기
      if (userError) throw userError; // 사용자 오류 처리

      if (!user) {
        throw new Error("사용자가 인증되지 않았습니다."); // 인증되지 않은 경우 오류 처리
      }

      // 사용자의 북마크를 Supabase에서 가져옵니다.
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id); // 사용자의 ID로 북마크 필터링

      if (error) throw error; // 오류 처리

      setBookmarks(data); // 북마크 상태 업데이트
    } catch (error) {
      console.error("북마크를 가져오는 중 오류 발생:", error.message); // 오류 로그
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  useEffect(() => {
    fetchBookmarks(); // 컴포넌트 마운트 시 북마크 가져오기
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  if (loading) return <p>로딩 중...</p>; // 로딩 중 메시지

  return (
    <div>
      <h1>북마크 목록</h1> {/* 제목 */}
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>{bookmark.movie_id}</li> // 북마크 목록 표시
        ))}
      </ul>
    </div>
  );
};

export default MyPage; // MyPage 컴포넌트를 내보냅니다.