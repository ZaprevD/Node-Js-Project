let express = require("express");
let router = express.Router();
let actions = require("./action");
let helper = require("../../helper");

router.patch("/change/email/:id", helper.emailValidator, actions.changeEmail);
router.patch("/change/age/:id" , helper.isAdult, actions.changeAge);
router.patch("/change/password/:id", helper.passwordValidator, actions.changePassword)

module.exports = router;