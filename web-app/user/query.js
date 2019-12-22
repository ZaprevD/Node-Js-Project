let con = require("../database");

getAllUsersQuery = () => {
    let query = "SELECT * FROM user";
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

userLoginQuery = (username) => {
    let query = "SELECT Username, Password, Email, Id FROM user WHERE Username = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [username] , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

getSpecificUserQuery = (id) => {
    let query = "SELECT Email, Age FROM user WHERE Id = ?";
    return new Promise((resolve, reject) => {
        con.query(query , [id] , (error, results , fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};

makeSupplierQuery = (username) => {
    let query = "UPDATE user SET Is_supplier = true WHERE Username = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [username], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

createUserQuery = (body, password) => {
    let query = "INSERT INTO user (Username, Password, Email, Age) VALUES (?, ?, ?, ?)";
    let user = [body.Username, password, body.Email, body.Age];
    return new Promise((resolve, reject) => {
        con.query(query, user, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            };
        });
    });
};

getUserByIdQuery = (userId) => {
    let query = "SELECT Is_admin FROM user WHERE Id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

getUserByUsernameQuery = (username) => {
    let query = "SELECT * FROM user WHERE Username = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [username], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};




module.exports = { getAllUsersQuery, createUserQuery, makeSupplierQuery , getUserByIdQuery,
     getUserByUsernameQuery, getSpecificUserQuery, userLoginQuery}