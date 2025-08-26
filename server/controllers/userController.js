const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function register(req, res) {
  const data = req.body;
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  data.password = await bcrypt.hash(data.password, salt);
  const result = await User.createUser(data);
  res.status(201).send(result);
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByUsername(data.username);
    const match = await bcrypt.compare(data.password, user.password);
    if (match) {
      const payload = { username: user.username };
      const sendToken = (err, token) => {
        if (err) {
          throw Error("Error in token generation");
        }
        res.status(200).json({
          success: true,
          token: token,
        });
      };
      jwt.sign(
        payload,
        process.env.SECRET_TOKEN,
        { expiresIn: 3600 },
        sendToken
      );
    } else {
      throw Error("User authentication unsuccessful");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { register, login };
