import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

export default (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  const token = req.headers.authorization.split(" ")[1];
  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};