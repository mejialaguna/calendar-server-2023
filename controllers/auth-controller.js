const { response } = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const { jwToken } = require("../helpers/jwToken");

// todo <============================== add new user ===================================>

const addNewUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    // ! check if email already exists
    if (findUser) {
      return res.status(400).json({
        ok: false,
        message: `user already exists with this email address: ${findUser?.email}`,
      });
    }

    // !! add new user to db.
    let user = new User(req?.body);
    await user.save();

    // ! creating a JWT with user payload and send it to the frontend
    const token = await jwToken(req?.body);

    // !! sending all meta data if everythings is successfull.
    res.status(201).json({
      ok: true,
      username: user?.username,
      email: user?.email,
      message: "new user added to 'DB'",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while creating user -> ${err.message}`,
    });
  }
};

// todo <============================== login user ===================================>

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // !! on login checking if the user already exists.
    const user = await User.findOne({ email });

    // !we are using user const in line  #40 not the user model instance.
    // !! checking if the user password from the payload is correct and it matches the encrypted version on db.
    const validPassword = bcrypt.compareSync(password, user.password);

    //  ! creating a JWT with user payload and send it to the frontend

    const token = await jwToken(user.id, user.username, user.email);

    if (!!user && validPassword) {
      return res.status(200).json({
        ok: true,

        user: { userId: user.id, name: user.username, email: user.email },
        token,
      });
    }

    res
      .status(400)
      .json({ ok: false, message: `invalid email and or password` });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      message: `something went wrong while login user -> ${err.message}`,
    });
  }
};

// todo <=====================aka renew ========= revalidate token ===================================>

const revalidateToken = async (req, res = response) => {
  //!! we are receiving all user information from the got decoded from validateJwToken middleware.
  const { id, name, email } = req;

  // !! we are re-issuing the token to give the user a new token.
  const revalidatedToken = await jwToken({ id, name, email });

  res.status(200).json({
    ok: true,
    message: "token revalidated and renew",
    revalidatedToken,
  });
};

module.exports = {
  addNewUser,
  loginUser,
  revalidateToken,
};
