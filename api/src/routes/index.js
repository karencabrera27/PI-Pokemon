const { Router } = require('express');
const axios = require('axios')

const { Pokemon, Type } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// https://pokeapi.co/api/v2/pokemon?limit=40

const router = Router();

async function controllerApi(){
    try {
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

async function controllerDb(){
    return await Pokemon.findAll({
        includes: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
}

async function controllerAll(){
    const apiDataInfo = await controllerApi();
    const dbDataInfo = await controllerDb();
    const apiDb = [...apiDataInfo, ...dbDataInfo];
    return apiDb

}


// router.get("/pokemons1", async(req, res)=>{
//     res.send(controllerDb)
// })
router.get("/pokemon", async (req, res) => {

    console.log("Hola desde ruta get character")
    // el query no afecta a la ruta si no le paso un name
    try {
        // const {name} = req.query;
        const pokemon = await controllerAll()
        res.send(pokemon)
    } catch (error) {
        console.log(error)
    }
    
})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
