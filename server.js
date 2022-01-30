const express = require ('express');
const path = require('path');
const app = express();
const fs = require('fs');


class Contenedor{
     constructor(location){
         this.location=location;
         this.aux_array=[]
         this.cont=0;
     }
     async save(obj){
          let idAsigned
          await fs.promises.readFile(`${this.location}`,"utf8")
               .then ( () => {
                    obj.id=this.cont;
                    this.cont++;
                    this.aux_array.push(obj);
               })
               .catch(err => {
                    console.log (err)
               })        
          try {
              await fs.promises.writeFile(`${this.location}`,JSON.stringify(this.aux_array,null,2))
              console.log('guardado con exito');
              // console.log (this.aux_array)
          }
          catch(err){
              console.log ('errrrrrr'+err)
          }
          return idAsigned;
     }
     async randomProduct(){
          let toReturn
          function getRandomArbitrary(min, max) {
               return Math.floor(Math.random() * (max - min)) + min;
          }
          await fs.promises.readFile(`${this.location}`,"utf8")
               .then ( res => {
                    let productos=JSON.parse(res)
                    console.log (JSON.parse(res).length) // 8
                    // .length porque el max está excluido
                    let unProducto= productos[getRandomArbitrary(0,productos.length)];
                    console.log ('unProducto tipo: '+typeof(unProducto)) //tipo: objeto
                    console.log (unProducto);
                    toReturn=JSON.stringify(unProducto); //string
                    console.log ('toReturn tipo: '+typeof(toReturn)) //tipo: string
                    toReturn=JSON.stringify(unProducto);
                    console.log(toReturn); // {"title":"beldent fruta","price":60,"thumbnail":"www.placedog.net/200/200","id":4}
               })
               .catch(err => {
                    console.log ('           ups...             ')
                    console.log ('mY ErRoR: '+err)
               })
          return toReturn;
     }
}
const name='\\productos.txt'
const user_path_file=(__dirname.toString()).concat(name);
const oneContainer= new Contenedor(user_path_file)

//############################ EXPRESS ROUTE ##################################
// app.get((ruta),(callback))
app.get("/productos",(req,res)=>{
     res.send('Estás en productos');
})
app.get("/productosRandom",(req,res)=>{
     // res.send('Estas en productos Random');
     console.log ('--->'+ oneContainer.randomProduct());
     res.send(`${oneContainer.randomProduct()}`);
})

async function agregaProductos () {
     console.log ('agregando producto')
     await oneContainer.save({title:'sprite',price:200,thumbnail:'www.placedog.net/200/200'})    
     await oneContainer.save({title:'coca',price:200,thumbnail:'www.placedog.net/200/200'})
     await oneContainer.save({title:'fanta',price:200,thumbnail:'www.placedog.net/200/200'})
     await oneContainer.save({title:'beldent menta',price:60,thumbnail:'www.placedog.net/200/200'})
     await oneContainer.save({title:'beldent fruta',price:60,thumbnail:'www.placedog.net/200/200'})
     await oneContainer.save({title:'yerba',price:300,thumbnail:'www.placedog.net/200/200'})
     await oneContainer.save({title:'te',price:130,thumbnail:'www.placedog.net/200/200'})
     await oneContainer.save({title:'agua mineral',price:130,thumbnail:'www.placedog.net/200/200'})
}
agregaProductos();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>{
     console.log (`Listening on PORT ${PORT}`);
})
server.on("error", (err)=>{
     console.log (`Whe have a problem...${err}`)
})