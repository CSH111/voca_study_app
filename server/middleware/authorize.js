function authorize(req, res, next) {
  if (req.session.user) {
    // session이 유효하다면 DB에서 user를 가져왔을것임
    return next();
  }
  res.status(401).json({ success: true });
}

module.exports = authorize;
