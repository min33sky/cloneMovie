import React, { useEffect, useState, useRef } from 'react';
import { API_KEY } from '../../Secret';
import { API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import { Row } from 'antd';
import GridCards from '../Commons/GridCards';

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const buttonRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = endpoint => {
    // axios 써도 된다.
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        console.log(res.results[0]);
        setMovies([...movies, ...res.results]);
        setMainMovieImage(mainMovieImage || res.results[0]);
        setCurrentPage(res.page);
      });
  };

  // 영화 목록 더 보기
  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${currentPage +
      1}`;

    fetchMovies(endpoint);
  };

  // 인피니티 스크롤링
  const handleScroll = e => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;

    const body = document.body;
    const html = document.documentElement;

    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      body.scrollHeight,
      html.offsetHeight,
    );

    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      console.log('clicked');
      buttonRef.current.click();
    }
  };

  return (
    <>
      <div style={{ width: '100%', margin: '0' }}>
        {/* Main Image */}

        {mainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
            title={mainMovieImage.title}
            description={mainMovieImage.overview}
          />
        )}

        <div style={{ width: '85%', margin: '1rem auto' }}>
          <h2>최신 영화</h2>
          <hr />
          {/* Movie Grid Cards */}
          <Row gutter={[16, 16]}>
            {movies.map((movie, idx) => (
              <React.Fragment key={idx}>
                <GridCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.title}
                />
              </React.Fragment>
            ))}
          </Row>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button ref={buttonRef} onClick={loadMoreItems}>
            더 보기
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
