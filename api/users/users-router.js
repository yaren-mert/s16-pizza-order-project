const router = require("express").Router();
const Users = require("./users-model");
const usersMd = require("./users-middleware");
const authMd = require("../auth/auth-middleware");

//owner'ın yapacağı işlemler
router.get("/", authMd.protectedArea("admin"), async (req, res, next) => {
  const users = await Users.getAll();
  res.status(200).json(users);
});

router.delete(
  "/:id",
  authMd.protectedArea("admin"),
  usersMd.isIdValid,
  async (req, res, next) => {
    try {
      await Users.deleteById(req.params.id);
      res.status(200).json({ message: "users deleted" });
    } catch (err) {
      next(err);
    }
  }
);

//user işlemleri
router.put("/:id", usersMd.isIdValid, async (req, res, next) => {
  try {
    const user = await Users.updateById(req.body, req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
