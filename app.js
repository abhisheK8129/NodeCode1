import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import request from 'request'
import dotenv from 'dotenv'
dotenv.config()
let port = process.env.PORT || 8000
let app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



app.use(express.static(path.join(__dirname +'public')))
app.set('views','./src/views')
app.set('view engine','ejs')


app.get('/',(req,res)=>{

    let city = req.query.city?req.query.city:'Delhi'
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=${process.env.KEY}`

    request(url,(err,response)=>{
        if(err) throw err
        const output = JSON.parse(response.body)
        res.render('index',{title:'Weather App',result:output})

    })
})


app.listen(port,(err)=>{
    if(err) throw err
    console.log(`Your port is running on ${port}`);
})