import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const MyPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        throw new Error("사용자가 인증되지 않았습니다.");
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      setBookmarks(data);
    } catch (error) {
      console.error("북마크를 가져오는 중 오류 발생:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>북마크 목록</h1>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>{bookmark.movie_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;