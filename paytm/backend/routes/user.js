const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../database");
const z = require("zod");
const dotenv = require("dotenv");

const { authMiddleware } = require("../middleware");

dotenv.config();

const router = express.Router();

const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
});

// require('crypto').randomBytes(64).toString('hex')
// const key2 = "762ffd0123cdaa9821a8b1d6fbf9bcd2e6471f43078bf153a672499456dbd37de0dbbb10db97a96cad9563c2b8594f325ba3255c7f6648dd697c9a9ea8854bcb"

// const secretKey =
//   "e22e4f058ee1c3022141406cd8502d150eada449cb50f9823e437c128e0e1e6b98f1bc5cbe0dd982a7df3a13192d6fda1655286b52544d98914b87d0a3fbc46c";

const secretKey = process.env.secretKey;

router.post("/signup", async (req, res) => {
  const body = req.body;
  const userValidity = signupSchema.safeParse(body);

  if (!userValidity.success) {
    return res.json({ message: "Invalid inputs" });
  }
  const user = body.username;

  const existingUser = await User.findOne({
    username: user,
  });

  if (existingUser) {
    return res.json({
      message: "The user already exists !",
    });
  }

  const pass = req.body.password;
  const firstName = req.body.firstname;

  const dbUser = await User.create({
    username: user,
    password: req.body.password,
    firstName: req.body.firstname,
  });

  console.log(user);
  const userId = dbUser._id;
  console.log(userId);

  const acc = await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 1000,
  });

  const token = createAuthToken(userId);

  console.log(dbUser);
  console.log(token);

  res.json({
    message: "Account created successfully !",
    username: user,
    name: req.body.firstname,
    token: "Bearer " + token,
  });
});

const signinBody = z.object({
  username: z.string(),
  password: z.string(),
});

router.post("/login", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existingUser) {
    const token = createAuthToken(existingUser._id);

    console.log(token);
    return res.json({
      token: "Bearer " + token,
    });
  }
  res.json({
    message: "Invalid credentials",
  });

  return;
});

function createAuthToken(userId) {
  return jwt.sign({ userId }, secretKey);
}

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      // lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
