const express = require ('express')
const app = express()

// app.get((ruta),(callback))
app.get("/productos",(req,res)=>{
     res.send(`Bienvenidos a express :) `)
})
app.get("/productosRandom",(req,res)=>{
     res.send(`Bienvenidos a express :) `)
})
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
     console.log (`Listening on PORT ${PORT}`);
})
server.on("error", (err)=>{
     console.log (`Whe have a problem...${err}`)
})