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

module.exports = router;
