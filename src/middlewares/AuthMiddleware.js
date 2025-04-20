import jwt from "jsonwebtoken";

function ValidateAuthToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  // eslint-disable-next-line no-undef
  jwt.verify(
    token.split(" ")[1],
    process.env.JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }
      req.user = decoded;
      next();
    }
  );
}

export default ValidateAuthToken;
