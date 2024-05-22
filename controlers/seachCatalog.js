import {conn} from '../database/database.js'

export const searchProduct = async(req, res) => {
    console.log('ОК')
    const searchModel = req.body.searchs;
    console.log(searchModel)
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