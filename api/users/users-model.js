const db = require("../../data/db-config");

const getAll = () => {
  return db("users as u")
    .leftJoin("roles as r", "u.role_id", "r.id")
    .select("u.id as user_id", "u.name as name", "u.email", "r.name as role");
};

const getById = (id) => {
  return db("users as u")
    .leftJoin("roles as r", "r.id", "u.role_id")
    .select("u.id as user_id", "u.name as name", "u.email", "r.name as role")
    .where("u.id", id)
    .first();
};

const getByFilter = (filter) => {
  return db("users as u")
    .leftJoin("roles as r", "r.id", "u.role_id")
    .select(
      "u.id as user_id",
      "u.name as name",
      "u.email",
      "r.name as role",
      "u.password"
    )
    .where(filter)
    .first();
};

const create = async (user) => {
  const [id] = await db("users").insert(user);
  return getById(id);
};

const updateById = async (user, id) => {
  await db("users").where("id", id).update(user);
  return getById(id);
};

const deleteById = (id) => {
  return db("users").where("id", id).delete();
};

module.exports = {
  getAll,
  getById,
  getByFilter,
  create,
  updateById,
  deleteById,
};
