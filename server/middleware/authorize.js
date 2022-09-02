function authorize(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(200).json({ success: true, login: false });
}

module.exports = authorize;
