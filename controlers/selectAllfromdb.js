import {conn} from '../database/database.js'


export const selectAllFromdb = (req, res) => {
    conn.query('SELECT * FROM product', (err, results) => {
      if (err) {
        console.error('Ошибка выполнения запроса: ' + err.stack);
        return res.status(500).send('Ошибка выполнения запроса');
      }
      
      res.json(results);
    });
  };