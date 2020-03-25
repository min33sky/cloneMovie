import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

const GridCards = ({ landingPage, image, movieId, movieName, actorName }) => {
  if (landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <Link to={`/movie/${movieId}`}>
            <img
              style={{ width: '100%', height: '420px' }}
              src={image}
              alt={movieName}
            />
          </Link>
        </div>
      </Col>
    );
  }
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>
        <img
          style={{ width: '100%', height: '420px' }}
          src={image}
          alt={actorName}
        />
        <br />
        <h2 style={{ textAlign: 'center' }}>{actorName}</h2>
      </div>
    </Col>
  );
};

export default GridCards;
