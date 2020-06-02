const db = require('./config');
const crypto = require('crypto');
const usermodel = {
    createUser: ([surname, firstname, emailaddress, password], res) => {
        let sql = "INSERT INTO movieschema.users(surname, firstname, emailaddress, password)VALUES (?)";
        let values = [surname, firstname, emailaddress, password];
        db.query(sql, [values], (err,result) => {
            if (err) throw err;
            console.log("No of Rows inserted into table successfully is : " + result.affectedRows);
            res(result);
        });
    },

    validateEmail: (email, result) => {
        let sql = "Select userid, emailaddress, password from movieschema.users where emailaddress = ?";
        db.query(sql, email, (err, resdata) => {
            if (err) throw err;
            result(resdata);
        });
    },

    /*
    Retrieves userid and emailaddress for user page
    */
    getUserIdAndEmail: (id, result) => {
        let sql = "SELECT userid, emailaddress FROM movieschema.users WHERE userid = ?";
        db.query(sql, id, (err, emailaddress) => {
            if (err) throw err;
            result(emailaddress) ;
        });
    },

    /*
    Validates emailaddress for registering users
    */
    validateUserEmail: ([email], result) => {
        let sql = "Select count(*) from movieschema.users where emailaddress =?";
        db.query(sql, email,(err, count) => {
            if (err) throw err;
            console.log("Checked email in user table successfully : " +JSON.stringify(count));
            console.log("Count email in user table successfully : " +Object.values(count[0]));
            console.log(Object.values(count[0]));
            result(Object.values(count[0]));
        });
    },

    getHashedPassword: (password) => {
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(password).digest('base64');
        return hash;
    }
};

module.exports = usermodel;
