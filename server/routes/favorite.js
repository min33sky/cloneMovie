const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Favorite } = require('../models/Favorite');

//=================================
//             User
//=================================

// 영화의 즐겨찾기 수를 리턴
router.post('/favoriteNumber', (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, result) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({
      success: true,
      favoriteNumber: result.length,
    });
  });
});

// 내가 즐겨찾기했는지 체크
router.post('/favorited', auth, (req, res) => {
  Favorite.find({ movieId: req.body.movieId, userId: req.body.userId }).exec(
    (err, result) => {
      if (err) return res.status(404).send(err);
      return res.status(200).json({
        success: true,
        favorited: result.length > 0 ? true : false,
      });
    },
  );
});

// 내 즐겨찾기 영화 목록을 가져오기
router.post('/getMyFavoriteMovies', auth, (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, results) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      results,
    });
  });
});

// 즐겨찾기 추가
router.post('/addFavorite', auth, (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
    });
  });
});

// 즐겨찾기 제거
router.post('/deleteFavorite', auth, (req, res) => {
  Favorite.findOneAndDelete(req.body).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      result,
    });
  });
});

module.exports = router;
