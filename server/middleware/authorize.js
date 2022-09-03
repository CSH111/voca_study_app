function authorize(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(403).json({ success: true });
}

module.exports = authorize;
