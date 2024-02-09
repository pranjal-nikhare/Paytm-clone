const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// mongodb+srv://pranjalnikhare2003:1234qwer@cluster0.jspiyrg.mongodb.net/
// mongodb+srv://<username>:<password>@cluster0.jspiyrg.mongodb.net/

const dbUrl = process.env.Mongo_URL;

mongoose.connect(dbUrl);
console.log("Connected to database");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  firstName: {
    type: String,
    required: true,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Accounts", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
