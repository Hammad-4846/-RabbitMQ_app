const router = require("express").Router();

const { getUserDetailsController } = require("../controllers/userController");

router.route("/users").post(getUserDetailsController);


module.exports = router;