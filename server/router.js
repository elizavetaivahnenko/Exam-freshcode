const express = require("express");
const router = express.Router();

const authRouter = require("./routers/authRouter");
router.use("/auth", authRouter);

const chatRouter = require("./routers/chatRouter");
router.use("/chat", chatRouter);

const contestRouter = require("./routers/contestRouter.js");
router.use("/contests", contestRouter);

const payRouter = require("./routers/payRouter");
router.use("/pay", payRouter);

const usersRouter = require("./routers/usersRouter");
router.use("/users", usersRouter);

module.exports = router;
