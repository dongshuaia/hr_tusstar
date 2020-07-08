var mysql = require('mysql');

/*var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'TusstarDBPassword123',
    port: '3306',
    database: 'demotest'
});*/

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'tusstar',
    password: 'TusstarDB@123',
    port: '3306',
    database: 'TusstarDB'
});
connection.connect();

if (0) {
    var addSql = 'INSERT INTO testTable VALUES(10,\'测试\')';
    //增
    connection.query(addSql, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });
} else {
    connection.query('SELECT * FROM testTable', function (error, results, fields) {
        if (error) throw error;
        console.log('The id is: ', results);
    });
}
connection.end();