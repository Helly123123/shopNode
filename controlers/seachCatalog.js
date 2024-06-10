import {conn} from '../database/database.js'

export const searchProduct = async(req, res) => {
    const searchModel = req.body.searchs;
    conn.query(`SELECT * FROM product WHERE model='${searchModel}'`, (err, results) => {
      if (err) {
        res.status(500).send('Error searching for products');
        return;
      } 
      let a = {
        cm: 'sd'
      }
      res.json(a);
    });
  };