import React, { useEffect, useState } from 'react';
import { API_KEY } from '../../Secret';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Commons/MainImage';
import MovieInfo from './Section/MovieInfo';
import { Row } from 'antd';
import GridCards from '../Commons/GridCards';
import Favorite from './Section/Favorite';

const MovieDetailPage = ({ match }) => {
  const movieId = match.params.movieId;
  const userId = localStorage.getItem('userId');
  const [movieInfo, setMovieInfo] = useState('');
  const [castInfo, setCastInfo] = useState(null);
  const [actorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    // 캐스팅 정보
    fetch(endpointCrew)
      .then(res => res.json())
      .then(res => {
        console.log(res.cast);
        setCastInfo(res.cast);
      });
    // 영화 정보
    fetch(endpointInfo)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setMovieInfo(res);
      });
  }, []);

  const onToggle = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div>
      {/* Header */}
      {movieInfo && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movieInfo.backdrop_path}`}
          title={movieInfo.title}
          description={movieInfo.overview}
        />
      )}
      {/* BODY */}
      <div style={{ width: '85%', margin: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite movieId={movieId} movieInfo={movieInfo} userId={userId} />
        </div>

        {/* Movie Info */}
        <MovieInfo movie={movieInfo} />
        <br />
        {/* Actors Grid */}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
        >
          <button onClick={onToggle}>출연진 보기</button>
        </div>

        {actorToggle && (
          <Row gutter={[16, 16]}>
            {castInfo &&
              castInfo.map((cast, idx) => (
                <React.Fragment key={idx}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    actorName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
