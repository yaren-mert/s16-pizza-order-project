const db = require("../../data/db-config");

const getAll = () => {
  return db("orders as o")
    .leftJoin("order_malzemeler as om", "om.order_id", "o.id")
    .leftJoin("malzemeler as m", "m.id", "om.malzeme_id")
    .select("o.*", "m.name");
};

const getById = (id) => {
  return db("orders")
    .leftJoin("order_malzemeler", "order_malzemeler.order_id", "orders.id")
    .leftJoin("malzemeler", "malzemeler.id", "order_malzemeler.malzeme_id")
    .where("orders.id", id)
    .first();
};

const getByFilter = (filter) => {
  return db("orders")
    .leftJoin("order_malzemeler", "orders.id", "order_malzemeler.order_id")
    .leftJoin("malzemeler", "order_malzemeler.malzeme_id", "malzemeler.id")
    .where(filter);
};

const create = async (order) => {
  const new_order = {
    boyut: order.boyut,
    hamur: order.hamur,
    status: order.status,
    ucret: order.ucret,
    user_id: order.user_id,
  };
  let order_id;
  await db.transaction(async (trx) => {
    const [id] = await trx("orders").insert(new_order);
    order_id = id;
    if (order.malzemeler && order.malzemeler.length > 0) {
      const order_malzemeler = order.malzemeler.map((malzeme_id) => {
        return { order_id: id, malzeme_id: malzeme_id };
      });

      await trx("order_malzemeler").insert(order_malzemeler);
    }
  });

  return getById(order_id);
};

const updateById = async (order, id) => {
  const new_order = {
    boyut: order.boyut,
    hamur: order.hamur,
    status: order.status,
    ucret: order.ucret,
    user_id: order.user_id,
  };

  await db.transaction(async (trx) => {
    await trx("orders").where("id", id).update(new_order);

    if (order.malzemeler && order.malzemeler.length > 0) {
      await trx("order_malzemeler").where("order_id", id).delete();
      const order_malzemeler = order.malzemeler.map((malzeme_id) => {
        return { order_id: id, malzeme_id: malzeme_id };
      });
      await trx("order_malzemeler").insert(order_malzemeler);
    }
  });

  return getById(id);
};

const deleteById = (id) => {
  return db("orders").where("id", id).delete();
};

module.exports = {
  getAll,
  getById,
  getByFilter,
  create,
  updateById,
  deleteById,
};
