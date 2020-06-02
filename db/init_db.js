const db = require('./config.js');

db.query("DROP DATABASE IF EXISTS movieschema", function (err, res) {
    if (err) throw err;
    console.log("Schema/Database File Deleted");
});

db.query("CREATE DATABASE movieschema", function (err, res) {
    if (err) throw err;
    console.log("Schema/Database File Created");
});

db.query("USE movieschema", function(err,res){
    if(err) throw err;
    console.log("Using database movieschema");
});

db.query("CREATE TABLE movieschema.users (userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,surname VARCHAR(255),firstname VARCHAR(255),emailaddress VARCHAR(255),password VARCHAR(255))", function(err,res){
    if(err) throw err;
    console.log("Table Created");
});

db.query("CREATE TABLE movieschema.userrating (ratingid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,userid INT NOT NULL,user_rating INT,movieid INT ,FOREIGN KEY(userid) REFERENCES users(userid))", function(err,res){
    if(err) throw err;
    console.log("Table Created");
});
