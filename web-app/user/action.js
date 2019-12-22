let query = require("./query");
let path = require("path");
const bcrypt = require('bcryptjs');
const _ = require("lodash");
const jwt = require('jsonwebtoken');

createUser = async (req, res) => {
    try {
        let data = await query.getAllUsersQuery();
        let exists = data.some(element => element.Username === req.body.Username);
        if (!exists) {
            const userRequest = req.body;
            const passHash = bcrypt.hashSync(userRequest.Password, 10);
            await query.createUserQuery(userRequest, passHash);
            res.status(200).redirect("/");
        } else {
            res.status(422).send("Username is alredy taken");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

userLogin = async (req, res, next) => {
    const pass = req.body.Password;
    try {
        let data = await query.userLoginQuery(req.body.Username);
        let user = data[0];
        if (user !== undefined) {
            const matchPass = bcrypt.compareSync(pass, user.Password);
            if (matchPass) {
                const token = jwt.sign({ user }, "random", { expiresIn: "1h" });
                res.header("authToken", token).send(_.pick(user, ["Id", "Username", "Email"]));
            } else {
                var error = new Error("Invalid  Password");
                error.status = 404;
                next(error);
            }
        } else {
            var error = new Error("Invalid Username");
            error.status = 404;
            next(error);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

getSpecificUser = async (req, res) => {
    try {
        let data = await query.getSpecificUserQuery(req.params.Id);
        res.status(200).send(data[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

makeSupplier = async (req, res, next) => {
    try {
        let requestedBy = await query.getUserByIdQuery(req.body.userId);
        if (requestedBy[0].Is_admin) {
            let data = await query.getUserByUsernameQuery(req.body.newSupplierUsername);
            if (data[0] !== undefined) {
                await query.makeSupplierQuery(data[0].Username);
                res.status(200).send("New Supplier added");
            } else {
                var error = new Error("Username does not exists");
                error.status = 404;
                next(error);
            }
        } else {
            var error = new Error("You dont have permission to make supplier");
            error.status = 403;
            next(error);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { createUser, makeSupplier, getSpecificUser, userLogin }