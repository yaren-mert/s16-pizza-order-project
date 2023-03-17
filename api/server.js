const express = require("express");
const server = express();

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const ordersRouter = require("./orders/orders-router");

const md = require("./auth/auth-middleware");
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", md.restricted, usersRouter);
server.use("/api/orders", md.restricted, ordersRouter);

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server error",
    stack: err.stack,
  });
});

module.exports = server;
