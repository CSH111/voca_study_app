function authorize(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ success: true });
}

module.exports = authorize;
