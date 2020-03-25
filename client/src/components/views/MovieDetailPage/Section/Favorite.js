import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorite = ({ movieId, movieInfo, userId }) => {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    // 즐겨찾기 수를 가져오기
    axios
      .post('/api/favorite/favoriteNumber', {
        movieId,
      })
      .then(response => {
        if (response.data.success) {
          // 성공
          console.log(response.data);
          setFavoriteNumber(response.data.favoriteNumber);
        }
      });

    // 내가 즐겨찾기 했는지에 대해서 가져오기
    axios
      .post('/api/favorite/favorited', {
        movieId,
        userId,
      })
      .then(response => {
        if (response.data.success) {
          // 성공
          console.log(response.data);
          setFavorited(response.data.favorited);
        }
      });
  }, []);

  // 즐겨찾기 버튼
  const handleClick = () => {
    // todo
  };

  return (
    <div>
      <button onClick={handleClick}>
        {favorited ? '즐겨찾기 취소' : '즐겨찾기에 추가'} {favoriteNumber}
      </button>
    </div>
  );
};

export default Favorite;
