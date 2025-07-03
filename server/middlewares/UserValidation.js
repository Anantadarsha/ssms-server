function validateUserData(req, res, next) {
  const errors = [];
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    errors.push("Email is required");
  }

  if (!password || !password.trim()) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res
      .status(422)
      .json({ message: errors });
  }

  next();
}

module.exports = validateUserData;