const router = require("express").Router();
const { User } = require("../Model/User");
const authorize = require("../middleware/authorize");

/**
 * @swagger
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         word:
 *           type: string
 *         meaning:
 *           type: string
 *         topic:
 *           type: string
 *         topicID:
 *           type: string
 *         isMemorized:
 *           type: boolean
 *         isBookmarked:
 *           type: boolean
 *     WordRequest:
 *       type: object
 *       required:
 *         - word
 *         - meaning
 *         - topic
 *         - topicID
 *       properties:
 *         word:
 *           type: string
 *         meaning:
 *           type: string
 *         topic:
 *           type: string
 *         topicID:
 *           type: string
 *     WordsResponse:
 *       type: object
 *       properties:
 *         words:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Word'
 */

router.use(authorize);

/**
 * @swagger
 * /api/word:
 *   get:
 *     summary: 현재 사용자의 모든 단어 조회
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 단어 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WordsResponse'
 *       500:
 *         description: 서버 오류
 */
router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((resultData) => {
      res.status(200).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어조회 실패", err });
    });
});

/**
 * @swagger
 * /api/word:
 *   post:
 *     summary: 새 단어 생성
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WordRequest'
 *     responses:
 *       201:
 *         description: 단어 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WordsResponse'
 *       500:
 *         description: 서버 오류
 */
router.post("/", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { words: { ...req.body, isMemorized: false, isBookmarked: false } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(201).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어등록 실패", err });
    });
});

/**
 * @swagger
 * /api/word/{_id}:
 *   patch:
 *     summary: 단어 수정
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: 단어 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *               meaning:
 *                 type: string
 *               isMemorized:
 *                 type: boolean
 *               isBookmarked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: 단어 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WordsResponse'
 *       400:
 *         description: 단어를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.patch("/:_id", (req, res) => {
  const updateObj = {};

  Object.keys(req.body).forEach((key) => {
    updateObj[`words.$[wordsFilter].${key}`] = req.body[key];
  });
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $set: updateObj },
    { arrayFilters: [{ "wordsFilter._id": req.params._id }], new: true }
  )
    .then((resultData) => {
      if (resultData === null) return res.status(400).json({});
      res.status(200).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어수정 실패", err });
    });
});

/**
 * @swagger
 * /api/word/{_id}:
 *   delete:
 *     summary: 단어 삭제
 *     tags: [Words]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: 단어 ID
 *     responses:
 *       200:
 *         description: 단어 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WordsResponse'
 *       500:
 *         description: 서버 오류
 */
router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $pull: { words: { _id: req.params._id } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(200).json({ words: resultData.words });
    })
    .catch((err) => {
      res.status(500).json({ msg: "단어삭제 실패", err });
    });
});

module.exports = router;
