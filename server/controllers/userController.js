const User = require("../models/User");
const { createToken } = require("../services/authentication");
const log = require("../services/Logger");
const bcrypt = require("bcrypt");

async function handleSignup(req, res) {
  try {
    const { fullName, username, password } = req.body;
    const isUser = await User.findOne({ username });

    if (isUser) {
      return res.status(400).json({ message: ["User already exists"] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    await User.create({ fullName, username, password: hashedPass });
    return res.status(201).json({ message: ["User created successfully"] });
  } catch (error) {
    log(`handleSignup: ${error}`);
    return res.status(422).json({ message: ["Failed to create user "] });
  }
}

async function handleLogin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: ["User not found"] });
    }

    //compare password
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res.status(401).json({ message: ["Incorrect Password"] });
    }

    //if match then create token
    const token = createToken(user);

    return res
      .status(200)
      .json({ message: ["Login successful"], token: token });
  } catch (error) {
    log(`handleLogin: ${error}`);
    return res.status(401).json({ message: ["Failed to login."] });
  }
}

module.exports = {
  handleLogin,
  handleSignup,
};
