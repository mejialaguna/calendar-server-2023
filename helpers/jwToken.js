const jwt = require("jsonwebtoken");
const privateKey = process.env.privateKey;

async function jwToken(id, name, email) {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      { id, name, email },
      privateKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

module.exports = { jwToken };
