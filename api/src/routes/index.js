require("dotenv").config()
const { Router } = require("express")
const axios = require("axios").default
const fs = require("fs")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()
const baseUrl = "https://api.spoonacular.com/recipes"
const apiKey = `&apiKey=${process.env.SPOONACULAR_API_KEY}`

const _90path = __dirname + "/../../APIresults/90.json"

const _readFiles = true
const _wirteFiles = true

const readFile = (path) => {
    return JSON.parse(fs.readFileSync(path))
}

const writeFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
}

router.get("/recipes", async (req, res) => {
    console.log("GET /recipes")
    let data = {}

    if (_readFiles) data = readFile(_90path)
    else {
        let result = await axios.get(
            `${baseUrl}/complexSearch?addRecipeInformation=true&number=90${apiKey}`
        )
        data = result.data
        if (_wirteFiles) writeFile(_90path, data)
    }

    res.json(data)
})

router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params
    console.log(`GET /recipes/${id}`)

    let recipe = {}

    if (_readFiles) {
        const result = readFile(_90path)
        recipe = result.results.find((r) => r.id === parseInt(id))
    } else {
        console.log(id)
        const result = await axios.get(`${baseUrl}/${id}/information?${apiKey}`)
        recipe = result.data
    }

    if (!recipe) return res.status(404).send(`No recipe with id: ${id} found`)
    res.status(200).json(recipe)
})

router.post("/recipes", (req, res) => {
    console.log("POST /recipes")
    res.json({ data: "POST /recipes" })
})

router.get("/types", (req, res) => {
    console.log("GET /types")
    res.json({ data: "GET /types" })
})

module.exports = router
