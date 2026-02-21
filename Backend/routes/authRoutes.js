const router = require("express").Router();
const { register, login, profile } = require("../controllers/authController");
const { requireAuth } = require("../config/passport");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", requireAuth, profile);

module.exports = router;