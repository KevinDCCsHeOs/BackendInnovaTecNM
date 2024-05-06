const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'ducekproject.cnway0a4kqcb.us-east-2.rds.amazonaws.com',
    user: 'adminkevin',
    password: '<R4ns0mw4r3>',
    database: 'ducekDB',
    port: 3306
});

const PORT = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = connection;