const router = require("express").Router();
const { signUp, login } = require("../controllers/auth.controller");
const { userVerification } = require("../middlewares/auth.middleware");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/", userVerification);

module.exports = router;
