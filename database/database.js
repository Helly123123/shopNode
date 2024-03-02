import mysql from 'mysql2'

export const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'product',
    password: ''
})


conn.connect(function(err){
    if (err) {
        return console.error('ошибка' + err.message)
    }else{
        console.log('Подключено все отчлино крч')
    }
})