const router = require("express").Router();
const Orders = require("./orders-model");
const ordersmMd = require("./orders-middleware");

router.get("/", async (req, res, next) => {
  try {
    const filter = { user_id: req.userInfo };
    const orders = await Orders.getAll(filter);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", ordersmMd.isIdValid, async (req, res, next) => {
  try {
    const order = await Orders.getById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = req.body;
    order.user_id = req.userInfo.id;
    const new_order = await Orders.create(order);
    res.status(200).json(new_order);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", ordersmMd.isIdValid, async (req, res, next) => {
  try {
    const order = req.body;
    order.user_id = req.userInfo.id;
    const new_order = await Orders.updateById(order, req.params.id);
    res.status(200).json(new_order);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", ordersmMd.isIdValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Orders.deleteById(id);
    res.status(200).json({ message: `${id} id'li siparişiniz iptal edildi.` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
