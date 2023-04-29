const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const eventSchema = require("./");

const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hash user password
// set up pre-save middleware to create password

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      console.log(`Hashed password for ${this.username}: ${hash}`);
      this.password = hash;
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }

  next();
});

// compare the incoming password with the hashed password
// userSchema.methods.isCorrectPassword = async function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const User = model("User", userSchema);

module.exports = { User };
