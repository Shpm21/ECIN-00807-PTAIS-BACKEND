require("dotenv").config();
const jwt = require("jsonwebtoken");

const isRutValid = (rut) => {
  if (rut.search(".") != -1 || rut.search("-") != -1) return true;
  return false;
};

exports.validateTokenAuthentication = (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (!authorization)
      return res.status(401).json({ message: "Necesitas autorización" });
    const token =
      authorization.split(" ").length == 2 ? authorization.split(" ")[1] : null;

    if (!token)
      return res.status(401).json({ message: "Necesitas autorización" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken)
      return res.status(401).json({ message: "Necesitas autorización" });
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Necesitas autorización" });
  }
};

exports.validateRutBody = (req, res, next) => {
  try {
    if (isRutValid(req.body.rutStudent)) return next();
    return res.status(404).json({ message: "Rut no valido" });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.validateRut = (req, res, next) => {
  try {
    if (isRutValid(req.params.rut)) return next();
    return res.status(404).json({ message: "Rut no valido" });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.validateRutLogin = (req, res, next) => {
  try {
    if (isRutValid(req.body.rutStudent)) return next();
    return res.status(404).json({ message: "Rut no valido" });
  } catch (err) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
