const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
const Users = require("../users/users-model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, tokenPayload) => {
      if (err) {
        next({ status: 401, message: "token geçersiz!.." });
      } else {
        req.userInfo = tokenPayload;
        next();
      }
    });
  } else {
    next({ status: 401, message: "token yok" });
  }
};

const protectedArea = (role) => (req, res, next) => {
  try {
    if (req.userInfo.role == role) {
      next();
    } else {
      next({ status: 403, message: "Burayı kullanmaya izniniz yok" });
    }
  } catch (err) {
    next(err);
  }
};

const isUserPayloadValid = (req, res, next) => {
  const payload = req.body;

  if (!payload.name || !payload.password) {
    next({ status: 400, message: "name ve password alanları gereklidir!" });
  } else if (
    payload.name.trim().length < 3 ||
    payload.name.trim().length > 128
  ) {
    next({
      status: 400,
      message: "name alanı 3 karaterden büyük 128 karakterden küçük olmalı!",
    });
  } else if (!payload.role_id) {
    req.body.role_id = 2;
  }

  next();
};

const isEmailValid = (req, res, next) => {
  const { email } = req.body;
  const emailCheck = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  if (!email) {
    next({ status: 400, message: "email alanı gereklidir!" });
  } else if (!emailCheck) {
    next({ status: 400, message: "geçerli bir email giriniz!" });
  }

  next();
};

const isEmailUnique = async (req, res, next) => {
  const { email } = req.body;

  const existingUser = await Users.getByFilter({ email });
  if (!existingUser) {
    next();
  } else {
    next({
      status: 400,
      message: "Daha önce kayıtlı bir email adresi girdiniz!",
    });
  }
};

module.exports = {
  restricted,
  protectedArea,
  isUserPayloadValid,
  isEmailValid,
  isEmailUnique,
};
