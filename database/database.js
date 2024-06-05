import mysql from 'mysql2'

export const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  });
  
  conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  
    // Создание базы данных
    conn.query('CREATE DATABASE IF NOT EXISTS ProductDB', (err) => {
      if (err) throw err;
      console.log('Database created');
  
      // Выбор базы данных
      conn.query('USE mydatabase', (err) => {
        if (err) throw err;
  
        // Создание таблицы с несколькими столбцами
        conn.query('CREATE TABLE IF NOT EXISTS product (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), model VARCHAR(255), manufacturer VARCHAR(255), square INT, price INT, img VARCHAR(255), discountPrice INT, discount BOOLEAN NOT NULL DEFAULT 0)', (err) => {
          if (err) throw err;
          console.log('Table created');
        //   BOOLEAN NOT NULL DEFAULT TRUE
          
        });
      });
    });
  });