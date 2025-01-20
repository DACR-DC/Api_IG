const mysql = require('mysql2');

 const db = mysql.createConnection({
   host: 'sql5.freesqldatabase.com',
   user: 'sql5758303',
   password: 'D8CDUN2A6F',
   database: 'sql5758303'
 });



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;