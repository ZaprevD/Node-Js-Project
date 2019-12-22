let express = require("express");
require("dotenv").config();
let bodyParser = require("body-parser");
let router = require("./router");
let middlewares = require("./middlewares/common");
var jwt = require("express-jwt");
var unless = require('express-unless');
let app = express();
const publicRoutes = ["/token", "/favicon.ico" ,"/user", "/signup" , "/login", "/"];

app.use(express.static(__dirname + "/public"));
app.use(jwt({ secret: "random" }).unless({ path: publicRoutes }));
app.use(middlewares.logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.get("/", (req, res) => {                             //LOGIN PAGE
    res.sendFile(__dirname + "/public/index.html");
});
app.use(middlewares.wrongRoute);
app.use(middlewares.errorHandler);

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening to port : ${port}`);
});