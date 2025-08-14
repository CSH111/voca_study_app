const router = require("express").Router();
const authorize = require("../middleware/authorize");
const { User } = require("../Model/User");

/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         topicName:
 *           type: string
 *         lang:
 *           type: string
 *     TopicRequest:
 *       type: object
 *       required:
 *         - topicName
 *         - lang
 *       properties:
 *         topicName:
 *           type: string
 *         lang:
 *           type: string
 *     TopicsResponse:
 *       type: object
 *       properties:
 *         topics:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Topic'
 */

router.use(authorize);

/**
 * @swagger
 * /api/topic:
 *   get:
 *     summary: 현재 사용자의 모든 주제 조회
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 주제 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopicsResponse'
 *       500:
 *         description: 서버 오류
 */
router.get("/", (req, res) => {
  User.findOne({ email: req.session.user.email })
    .then((resultData) => {
      res.status(200).json({ topics: resultData.topics });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

/**
 * @swagger
 * /api/topic:
 *   post:
 *     summary: 새 주제 생성
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopicRequest'
 *     responses:
 *       201:
 *         description: 주제 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TopicsResponse'
 *       500:
 *         description: 서버 오류
 */
router.post("/", (req, res) => {
  const { topicName, lang } = req.body;
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $push: { topics: { topicName, lang } } },
    { new: true }
  )
    .then((resultData) => {
      res.status(201).json({ topics: resultData.topics });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

/**
 * @swagger
 * /api/topic/{_id}:
 *   delete:
 *     summary: 주제 및 관련 단어 삭제
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: 주제 ID
 *     responses:
 *       200:
 *         description: 주제 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Topic'
 *                 words:
 *                   type: array
 */
router.delete("/:_id", (req, res) => {
  User.findOneAndUpdate(
    { email: req.session.user.email },
    {
      $pull: {
        topics: { _id: req.params._id },
        words: { topicID: req.params._id },
      },
    },
    { new: true }
  )
    .then((resultData) => {
      const { topics, words } = resultData;
      res.status(200).json({ topics, words });
    })
    .catch(console.log);
});

/**
 * @swagger
 * /api/topic/{_id}:
 *   patch:
 *     summary: 주제 수정
 *     tags: [Topics]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: 주제 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topicName:
 *                 type: string
 *               lang:
 *                 type: string
 *     responses:
 *       200:
 *         description: 주제 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Topic'
 *                 words:
 *                   type: array
 */
router.patch("/:_id", (req, res) => {
  const updateObj = {};
  Object.keys(req.body).forEach((key) => {
    updateObj[`topics.$[topicsFilter].${key}`] = req.body[key];
    updateObj[`words.$[wordsFilter].${key === "topicName" ? "topic" : key}`] = req.body[key];
  });
  User.findOneAndUpdate(
    { email: req.session.user.email },
    { $set: updateObj },
    {
      arrayFilters: [
        { "wordsFilter.topicID": req.params._id },
        { "topicsFilter._id": req.params._id },
      ],
      multi: true,
      new: true,
    }
  )
    .then((resultData) => {
      const { topics, words } = resultData;
      res.status(200).json({ topics, words });
    })
    .catch(console.log);
});

module.exports = router;
