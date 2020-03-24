import React from 'react';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

const GridCards = ({ image, movieId, movieName }) => {
  return (
    <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>
        <Link to=''>
          <img
            style={{ width: '100%', height: '420px' }}
            src={image}
            alt={movieName}
          />
        </Link>
      </div>
    </Col>
  );
};

export default GridCards;
