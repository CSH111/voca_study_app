const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - pw
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         pw:
 *           type: string
 *         name:
 *           type: string
 *     LoginResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *         userName:
 *           type: string
 */

/**
 * @swagger
 * /api/session:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: 잘못된 인증 정보
 */
router.post("/", authenticate, (req, res) => {
  //세션활성화

  const userSession = { email: req.body.email, name: req.body.name };
  req.session.user = userSession;

  // express-session에 의해 브라우저에 세션이 생성
  //
  // req.session 에 하위 객체(user)를 만들었을 때 DB에 세션 생성
  // req.session 를 수정함으로써 session객체를 initialized 상태로 만들어줌
  // initialized된 세션객체는 쿠키로(sessionID만) 전송되고 DB에 session데이터가 저장(갱신)됨
  //
  // session의 하위객체(user) 존재여부에 따라 authorize 가능(DB에 저장된 user를 가져오기때문)
  //(authenticate 통과한 세션만 user를 가지고 있기 때문)
  // session의 하위 객체내용에 따라 필요 데이터 전송가능

  res.status(200).json({ msg: "로그인성공", userName: userSession.name });
});

/**
 * @swagger
 * /api/session:
 *   delete:
 *     summary: 사용자 로그아웃
 *     tags: [Session]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: 로그아웃 실패
 */
router.delete("/", (req, res) => {
  req.session.destroy((err) => {
    //DB의 세션 데이터를 삭제
    if (err) {
      res.status(500).json({ msg: "로그아웃 실패" });
      return;
    }
    res.status(200).json({ msg: "로그아웃 성공" });
  });
});

module.exports = router;
