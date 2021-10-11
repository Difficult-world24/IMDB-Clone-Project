const express = require('express')
const app = express()

const port = 8080;

app.set('view engine','ejs')
app.use(express.static('public'))
app.set('views','views')


app.get('/',(req,res)=>{
	res.render('home')
})

app.listen(port,()=> console.log(`Site is working visit at:http://localhost:${port}`))