import express from 'express'
import path from 'path'
import {requserTime, Logger} from './middlewares.js'
import serverRouts from './routs/server.js'

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()


app.set('view engine', 'ejs')
console.log(app.get('views'))



app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requserTime)
app.use(Logger)

app.use(serverRouts)

app.get('/', (req, res) => {
    res.render('index', {title: 'Гланый негрик'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'Второстипенный негрик'})
})

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// })


// app.get('/down', (req, res) => {
//     console.log(req.requserTime)
//     res.download(path.resolve(__dirname, 'static', 'index.html'))
// })

app.listen(PORT, ()=> {
    console.log(`Все работае! Ваш порт ${PORT}`)
}) //запуск приложения