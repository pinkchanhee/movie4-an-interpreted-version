import React from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const handleBookmark = async (movieId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert('You can bookmark after logging in');
    return;
  }

  const { error } = await supabase.from('bookmarks').insert([{ user_id: user.id, movie_id: movieId }]);
  
  if (error) {
    alert('Failed to bookmark the movie!');
  } else {
    alert('Movie bookmarked successfully!');
  }
};

const MovieCard = ({ id, title, posterPath, voteAverage }) => {
  return (
    <div className="movie-card">
      <Link to={`/details/${id}`}>
        <img src={posterPath} alt={title} />
        <h3>{title}</h3>
        <p>평점: {voteAverage}</p>
        <button onClick={() => handleBookmark(id)}>북마크</button>
      </Link>
    </div>
  );
};

export default MovieCard;