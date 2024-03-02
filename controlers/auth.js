import bicrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {conn} from '../database/database.js'


export const login = function(req, res) {
    const email = req.body.email

  let candidat = conn.query('SELECT 1 FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
    } else {
      if (results.length > 0) {
        let candidatPas = conn.query('SELECT password FROM users WHERE email = ?', [email], (error, passBd) =>{
          if (error) {
            console.log(error)
          }else {
            let pasbdUwer = passBd[0].password
            const passwordResult = bicrypt.compareSync(req.body.password, pasbdUwer)

                if (passwordResult) {
                  const token = jwt.sign({
                    email: results
    
                  }, 'dev-jsv', {expiresIn: 60 * 60})
        
                  res.status(200).json({
                    toket: token
                  })
                }else {
                  res.status(401).json({
                    message: 'Пароли не совпадают'
                  })
                }

          }
        })
      } else {
        res.status(404).json({
          message: "Такой почты еше нету!"
        })
      }}})}


export const register = async function(req, res) {
    let email = req.body.email
    conn.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          console.error(error);
        } else {
          if (results.length > 0) {
            res.status(409).json({
                message: 'Такое емаил уже есть'
            })
          } else {

            const stlt = bicrypt.genSaltSync(10)
            const pass = req.body.password

            let email = req.body.email,
                password = bicrypt.hashSync(pass, stlt),
                name = req.body.name 
            
            conn.query(`INSERT INTO users(id, name, email, password, number) VALUES(6,'${name}', '${email}', '${password}', 88)`, (err, result) => {
              if (err) {
                console.error('Error adding user: ' + err.stack);
                return;
              }
              res.status(201).json({
                message: 'Вы успешно зарегестрировались'
              })
            });
          }
        }
      });
}
    // const candidat =  conn.query(`SELECT 1 FROM users WHERE email='${email}'`)
    //     if (candidat) {
    //         res.status(409).json({
    //             message: 'Такое емаил уже есть'
    //         })
    //     } else {
    //     //     const salt = bicrypt.genSaltSync(10)
    //     //     const passw = req.body.password
    
    //     //     let email = req.body.email,
    //     //         password = bicrypt.hashSync(passw, salt)
            
            
    
    //     //    try  {
    //     //     const sql = `INSERT INTO users(id, name, email, password, number) VALUES(2,'helly', '${email}', '${password}', 88)`
    //     //    } catch(e) {
            
    //     //    }
        
    //     console.log('GOOD')
    //     console.log(email + ' po')
    //     }}