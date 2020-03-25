import React, { useEffect } from 'react';
import { Descriptions } from 'antd';

const MovieInfo = ({ movie }) => {
  const genres =
    movie &&
    movie.genres
      .map(v => v['name'])
      .splice(0, 3)
      .join(', ');

  return (
    <Descriptions title='영화 정보' bordered>
      <Descriptions.Item label='제목'>{movie.title}</Descriptions.Item>
      <Descriptions.Item label='장르'>{genres}</Descriptions.Item>
      <Descriptions.Item label='개봉일'>{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label='수익'>{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label='런타임'>{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label='평점'>{movie.vote_average}</Descriptions.Item>
      <Descriptions.Item label='상태'>{movie.status}</Descriptions.Item>
      <Descriptions.Item label='관객수'>{movie.popularity}</Descriptions.Item>
      <Descriptions.Item label='언어'>
        {movie.original_language}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MovieInfo;
