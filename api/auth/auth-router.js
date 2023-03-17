const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const md = require("./auth-middleware");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "auth version 1 working" });
});

router.post(
  "/register",
  md.isUserPayloadValid,
  md.isEmailValid,
  md.isEmailUnique,
  async (req, res, next) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    const newUser = await Users.create(user);
    res.status(200).json(newUser);
  }
);

router.post("/login", async (req, res, next) => {
  const user = req.body;
  //get user from the db
  const filter = { email: user.email };
  const existingUser = await Users.getByFilter(filter);

  //password kontrolü
  const isPasswordValid = bcrypt.compareSync(
    user.password,
    existingUser.password
  );
  if (existingUser && isPasswordValid) {
    //generate token
    const token = generateToken(existingUser);
    //return token
    res
      .status(200)
      .json({ message: `${existingUser.name} hoş geldin...`, token });
  } else {
    res.status(401).json({ message: "Giriş bilgileriniz doğru değil" });
  }
});

function generateToken(user) {
  const payload = { id: user.user_id, role: user.role };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
}

module.exports = router;
