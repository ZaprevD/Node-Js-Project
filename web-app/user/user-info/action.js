let query = require("./query");
const bcrypt = require('bcryptjs');

changeEmail = async(req, res) => {
    try {
        await query.changeEmailQuery(req.body.Email, req.params.id);
        res.status(200).send("Email updated");
    } catch (error) {
        res.status(500).send(error.message);
    }
}


changeAge = async(req, res) => {
    try {
        await query.changeAgeQuery(req.body.Age, req.params.id);
        res.status(200).send("Age updated");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

changePassword = async(req, res) => {
    try {
        const passHash = bcrypt.hashSync(req.body.Password, 10);
        await query.changePasswordQuery(passHash, req.params.id);
        res.status(200).send("Password changed!");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {changeEmail, changeAge, changePassword}