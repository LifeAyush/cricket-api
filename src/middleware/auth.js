const jwt = require('../utils/jwt');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'Unauthorized', status_code: 401 });
  }

  try {
    const decoded = jwt.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'Invalid token', status_code: 401 });
  }
};

module.exports = auth;