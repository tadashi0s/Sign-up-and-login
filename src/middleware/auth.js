const jwt = require("jsonwebtoken");
const Userdata = require("../models/userdata");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, "mynameisshivavermareciansonbhadra");
    const user = await Userdata.findone({ _id: verifyUser._id });
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
module.exports = auth;
