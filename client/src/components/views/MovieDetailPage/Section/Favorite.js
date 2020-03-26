import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

// 즐겨찾기 버튼
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
  const onFavoriteClick = () => {
    // 이미 즐겨찾기 상태일 경우와 아닐경우
    if (favorited) {
      // 즐겨찾기 취소
      axios
        .post('/api/favorite/deleteFavorite', {
          userFrom: userId,
          movieId,
        })
        .then(response => {
          if (response.data.success) {
            // 성공
            console.log('즐겨찾기 삭제');
            console.log(response.data);
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            // 실패
          }
        });
    } else {
      // 즐겨찾기 추가
      axios
        .post('/api/favorite/addFavorite', {
          userFrom: userId,
          movieId,
          movieTitle: movieInfo.title,
          moviePost: movieInfo.backdrop_path,
          movieRunTime: movieInfo.runtime,
        })
        .then(response => {
          if (response.data.success) {
            console.log('추가 성공');
            console.log(response.data);
            setFavoriteNumber(favoriteNumber + 1);
            setFavorited(!favorited);
          } else {
            // 실패
          }
        });
    }
  };

  return (
    <div>
      <Button type='primary' onClick={onFavoriteClick}>
        {favorited ? '즐겨찾기 취소' : '즐겨찾기에 추가'} {favoriteNumber}
      </Button>
    </div>
  );
};

export default Favorite;
