let express = require("express");
let routes = express.Router();
let action = require("./action");
let helper = require("../helper");

routes.get("/user/:Id", action.getSpecificUser);
routes.post("/token", action.userLogin);
routes.post("/user", helper.userNameValidator, helper.passwordValidator, helper.isAdult, helper.emailValidator, action.createUser);
routes.patch("/newsupplier", action.makeSupplier);

module.exports = routes;