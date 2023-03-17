const Users = require("./users-model");

const isIdValid = async (req, res, next) => {
  try {
    const existingUser = await Users.getById(req.params.id);
    if (existingUser) {
      req.user = existingUser; //daha az query atmak için
      next();
    } else {
      next({ status: 400, message: `${req.params.id} id'li user bulunamadı!` });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isIdValid,
};
