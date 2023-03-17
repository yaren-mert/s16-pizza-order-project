const Orders = require("./orders-model");

const isIdValid = async (req, res, next) => {
  try {
    const existingOrder = await Orders.getById(req.params.id);
    if (existingOrder) {
      req.order = existingOrder; //daha az query atmak için
      next();
    } else {
      next({
        status: 400,
        message: `${req.params.id} id'li order bulunamadı!`,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isIdValid,
};
