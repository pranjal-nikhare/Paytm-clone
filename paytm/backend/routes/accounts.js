const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../database");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token, { complete: false });
  const userId = decoded.userId;

  const account = await Account.findOne({
    userId: userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async function (req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { toAccountId, amount } = req.body;
  // const userId = req.userId;

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.decode(token, { complete: false });
  const userId = decoded.userId;

  // console.log(userId);

  // const account = await Account.findOne({ userId: userId }).session(session);
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    // session.endSession();
    return res.status(400).json({ message: "Insufficient balance" });
  }

  console.log(account);
  console.log(toAccountId);

  const toAccount = await Account.findOne({ userId: toAccountId }).session(
    session
  );

  console.log(toAccount);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Please recheak the account number",
    });
  }

  // // deduct money
  // await Account.findByIdAndUpdate(userId, {
  //   $inc: { balance: -amount },
  // });
  // // add money
  // await Account.findByIdAndUpdate(toAccountId, {
  //   $inc: { balance: amount },
  // });

  await Account.updateOne(
    { userId: userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: toAccountId },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  console.log("Transaction successful");
  session.endSession();
  res.json({ message: "Transaction successful" });
});

module.exports = router;

// 65afb95c8aac215f8330bd0d
// 65afb92e8aac215f8330bd03
// 65afb9478aac215f8330bd0a
