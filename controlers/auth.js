import bicrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {conn} from '../database/database.js'
import express from 'express'
const router = express.Router()


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
                  let candidatName = conn.query('SELECT name FROM users WHERE email = ?', [email], (error, nameBd) =>{
                    if (error) {
                      console.log(error)
                    }else {
                      const data = {
                        name: nameBd[0].name,
                        email: req.body.email
                      }
                      res.status(200).json(data)
                    }})
                  
                }else {
                  res.status(401).send('Пароли не совпадают')
                }
          }
        })
      } else {
        res.status(404).json({
          message: "Такой почты еше нету!"
        })
      }}})}


export const errorReg = function(req, res) {
  res.status(200).json({
    message: 'Вы успешно зарегестрировались'
  })
}

export const register = async function(req, res) {
    let email = req.body.email
    conn.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
          console.error(error);
        } else {
          if (results.length > 0) {
            res.status(200).send('привет')
           
          } else {

            const stlt = bicrypt.genSaltSync(10)
            const pass = req.body.password

            let email = req.body.email,
                password = bicrypt.hashSync(pass, stlt),
                name = req.body.name 
                function generateUserId() {
                  return Math.floor(Math.random() * 1000) + 1; // Генерация случайного числа от 1 до 1000
              }
            conn.query(`INSERT INTO users(id, name, email, password, number) VALUES(${generateUserId()},'${name}', '${email}', '${password}', 88)`, (err, result) => {
              if (err) {
                console.error('Error adding user: ' + err.stack);
                return;
              }
              res.status(201).send('все окей')
            });
          }
        }
      });
}