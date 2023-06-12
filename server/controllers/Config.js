const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../environment/', `${process.env.NODE_ENV}.env`)
});
console.log(path.resolve(__dirname, '../environment/', `${process.env.NODE_ENV}.env`));

//console.log(process.env);
module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 8000
}