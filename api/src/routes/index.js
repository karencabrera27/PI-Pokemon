const { Router } = require('express');
const axios = require('axios')

const { Pokemon, Type } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// https://pokeapi.co/api/v2/pokemon?limit=40

const router = Router();

//** OBTENCION DE DATOS DE LA API **/

async function controllerApi(){
    try {
        // cambiar a 40!!!!!!!!
        const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
        const pokemons = apiUrl.data.results
        const newPokemon = []
        for (let i = 0; i < pokemons.length; i++) {
            const infoPoke = await axios.get(pokemons[i].url) 
            const dataPoke = infoPoke.data
            newPokemon.push({
                id: dataPoke.id,
                name: dataPoke.name,
                types: dataPoke.types.map(e=>e.type.name),
                hp: dataPoke.stats[0].base_stat,
                attack: dataPoke.stats[1].base_stat,
                defense: dataPoke.stats[3].base_stat,
                height: dataPoke.height,
                weight: dataPoke.weight,
                image: dataPoke.sprites.other.dream_world.front_default
            })  
        }
        return newPokemon
    } catch (error) {
        console.log(error)
    }
}
//** OBTENCION DE DATOS DE LA BD **/

const controllerDb = async () => {
	const data = (await Pokemon.findAll({ 
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })).map(pokemon => {
    const json = pokemon.toJSON();
    return{
      ...json,
      types: json.types.map( type => type.name)
    }
  });
  
  return data
}


//** CONCATENACION DE DATOS DE API Y DB **/
async function controllerAll(){
    const apiDataInfo = await controllerApi();
    const dbDataInfo = await controllerDb();
    const apiDb = [...apiDataInfo, ...dbDataInfo];
    return apiDb

}


//** RUTA GET POKEMONS Y OBTENCION DE POKEMON POR QUERY  **/

router.get("/pokemon", async (req, res) => {

    console.log("Hola desde ruta get pokemon")
    // el query no afecta a la ruta si no le paso un name
    try {
        const {name} = req.query;
        const pokemon = await controllerAll()
        // res.send(pokemon)
        if(name){
            // const nombre = pokemon.filter(e =>e.name.toLowerCase().includes(name.toLowerCase()))
            // si quiero que busque por aproximacion 
            const nombre = pokemon.filter(e =>e.name === name)
            if(nombre.length > 0){
                res.json(nombre)
            } else{
                res.send("No se encontro ese nombre")
            }
        } else{
            res.send(pokemon)
        }
    } catch (error) {
        console.log(error)
    }
    
})

//** RUTA GET POR ID **/

router.get("/pokemon/:id", async (req, res)=>{
    
    try {
        const { id } = req.params
        const allPokemons = await controllerAll()

        if (id) {
            const pokemonId = allPokemons.filter(el => el.id.toString() === id.toString());
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(400).send("Pokemon not found")
        }
    } catch (error) {
        console.log(error)
    }
})

//** RUTA POST **/

router.post("/pokemon", async (req, res)=>{
    
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
    let pokeName = await controllerApi()
        .then(e=>e.find((e)=> e.name === name))

    let pokeType = await Type.findOne({
        where: {
            name: types
        }
    })

    try {

        if(!name || !hp || !attack || !defense || !speed || !height || !weight || !types){
            res.status(400).send("Faltan cargar datos")
        }

        if(pokeName){
            res.status(400).send("El nombre ya existe")
        } 
        if(pokeType){
            res.status(400).send("El tipo de pokemon es inválido")
        } else {
            const newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height, 
            weight,
            image
        })

        const typeDb = await Type.findAll({
            where:{
                name: types
            }
        })
        console.log(typeDb)
        
        newPokemon.addType(typeDb)

        res.status(200).send("Pokemon creado exitosamente!")
        }

        
    } catch (error) {
        console.log(error)
    }


})


//** RUTA GET TYPES**/
// async function controllerTypes(){
//     try {
//         const apiTypes = await axios.get("https://pokeapi.co/api/v2/type")
//         const pokemonsType = apiTypes.data.results
//         return pokemonsType
//     } catch (error) {
//         console.log(error)
//     }
// }

router.get('/types', async (req, res) =>{
    const apiTypes = await axios.get("https://pokeapi.co/api/v2/type")
    const pokemonsType = apiTypes.data.results
    
    // const pokemones = await controllerTypes()

  
        // recorre todo el arreglo con el forEach
        pokemonsType.forEach(t =>{
            // busca o crea en el modelo 
            Type.findOrCreate({
                where: {
                    // con este nombre
                    name: t.name
                }
            })
        })
        const tipos = await Type.findAll()
        return res.status(200).send(tipos)
        
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
