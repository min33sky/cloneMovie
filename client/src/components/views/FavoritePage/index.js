import React, { useEffect, useState } from 'react';
import { Popover } from 'antd';
import './favorite.css';
import Axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config';

const FavoritePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // 즐겨찾기한 영화 가져오기
    Axios.post('/api/favorite/getMyFavoriteMovies', {
      userFrom: localStorage.getItem('userId'),
    }).then(response => {
      if (response.data.success) {
        console.log('즐겨찾기 목록 가져오기 성공');
        console.log(response.data);
        setFavoriteMovies(response.data.results);
      }
    });
  }, []);

  const onDeleteFavoriteMovie = (movieId, userFrom) => () => {
    Axios.post('/api/favorite/deleteFavorite', {
      movieId,
      userFrom,
    }).then(response => {
      if (response.data.success) {
        console.log('삭제 성공');
        setFavoriteMovies(prev =>
          prev.filter(item => item.movieId !== response.data.result.movieId),
        );
      }
    });
  };

  const renderCards = favoriteMovies.map((movie, idx) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} />
        ) : (
          'No Image'
        )}
      </div>
    );

    return (
      <tr key={idx}>
        <Popover content={content}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <button
            onClick={onDeleteFavoriteMovie(movie.movieId, movie.userFrom)}
          >
            삭제
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <h2> 즐겨찾기한 영화 </h2>
        <hr />

        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>재생시간</th>
              <th>삭제</th>
            </tr>
          </thead>
          {/* 영화 목록 출력 */}
          <tbody>{renderCards}</tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoritePage;
