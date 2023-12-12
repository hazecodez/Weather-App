const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, "public")))
app.get('/',(req,res)=>{
    res.render('home')
})
app.set('view engine','hbs')

app.listen(3030,()=>{ console.log('Server Running.....'); })