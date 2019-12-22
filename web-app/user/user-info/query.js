let conn = require("../../database");

changeEmailQuery = (email, id) => {
    let query = "UPDATE user SET Email = ? Where Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [email, id], (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};

changeAgeQuery = (age, id) => {
    let query = "UPDATE user SET Age = ? Where Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [age, id], (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};

changePasswordQuery = (pass, id) => {
    let query = "UPDATE user SET Password = ? Where Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [pass, id], (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
}


module.exports = {changeEmailQuery, changeAgeQuery, changePasswordQuery}