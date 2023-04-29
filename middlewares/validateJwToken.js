const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const privateKey = process.env.privateKey;

// TODO ================> validating token, calling this as middle on event routes.

const validateToken = (req = request, res = response, next) => {
  // !header that is coming from the request, it need to be pass inside the headers
  const token = req.header("x-token");

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "theres no token", ok: false });
  }

  try {
    // !! the token is being decoded..
    const {
      id: userId,
      name: username,
      email: userEmail,
    } = jwt.verify(token, privateKey);

    // !! 3 different ways to add the JWT data to the request body
    // for (let [key, value] of Object.entries(data)) {
    //   req[key] = value;
    // }

    //   Object.entries(data).forEach(([key, value]) => (req[key] = value));

    // !!after token has been decoded all data is getting added to the request body for re-
    Object.assign(req, { userId, username, userEmail });

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: 401, message: "Invalid token", ok: false });
  }
};

module.exports = { validateToken };
