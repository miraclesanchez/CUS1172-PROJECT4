//allows us to use the file system library
const fs = require ('fs');

//loads the databse from the filesystem. if it is already there then it loads it, if not it creates one THEN loads it
var loadDatabase = (db_connection, schema = {}) =>{
    if(!fs.existsSync(db_connection)){
        fs.writeFileSync(db_connection,JSON.stringify(schema));
    }

    let model = require(db_connection);

    //creates the db object
    var db = {
        model: model,
        filename: db_connection,
        update: () =>{
            fs.writeFileSync(db_connection,JSON.stringify(model));
        },
        addCollection : (collection) => {
            model['collection'] = [];
        }
    }
    return db;
}

//allows the method to be used in other modules
module.exports = loadDatabase;