require("dotenv").config()
const { Router } = require("express")
const axios = require("axios").default
const fs = require("fs")
const { Diet, Recipe } = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()
const baseUrl = "https://api.spoonacular.com/recipes"
const apiKey = `&apiKey=${process.env.SPOONACULAR_API_KEY}`

const _90path = __dirname + "/../../APIresults/90.json"
const _detail = __dirname + "/../../APIresults/detail.json"

const _readFiles = true
const _wirteFiles = false

const readFile = (path) => {
    return JSON.parse(fs.readFileSync(path))
}

const writeFile = (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
}

const fetch = async (url) => {
    console.log(url)
    const result = await axios.get(url)
    return result.data.results
}

router.get("/recipes", async (req, res) => {
    console.log("GET /recipes")
    let data = []

    if (_readFiles) {
        let files = readFile(_90path)
        let pg = await Recipe.findAll({ include: Diet })
        data = [...pg, ...files]
    } else {
        console.log("fetching")
        let api = await fetch(
            `${baseUrl}/complexSearch?addRecipeInformation=true&number=90${apiKey}`
        )
        if (_wirteFiles) writeFile(_90path, api)
        let pg = await Recipe.findAll({ include: Diet })
        data = [...pg, ...api]
    }

    res.json(data)
})

router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params
    console.log(`GET /recipes/${id}`)
    console.log(id)
    console.log(typeof id)

    let recipe = {}

    if (id.length === 36) {
        let pg = await Recipe.findByPk(id)

        // let all = await Recipe.findAll()
        // let pgid = await Recipe.findByPk(id)
        // let pgone = await Recipe.findOne({ where: { id: id }, include: Diet })
        // console.log("pg = ", pgid, pgone, all)

        if (pg) return res.status(200).json(pg)
        return res.status(404).json({ msg: `No recipe in PSQL with id ${id}` })
    }

    if (_readFiles) {
        recipe = readFile(_detail)
        // const result = readFile(_90path)
        // recipe = result.find((r) => r.id === parseInt(id))
    } else {
        // console.log(id)
        const result = await axios.get(`${baseUrl}/${id}/information?${apiKey}`)
        recipe = result.data
    }

    if (!recipe) return res.status(404).send(`No recipe with id: ${id} found`)
    res.status(200).json(recipe)
})

router.post("/recipes", async (req, res) => {
    console.log("POST /recipes")

    const { name, summary, score, healthScore, instructions, diets } = req.body

    if (!name || !summary || !diets)
        return res.status(422).send("Missing necessary information")

    const recipe = await Recipe.create({
        name,
        summary,
        score,
        healthScore,
        instructions
    })

    recipe.setDiets(diets)
    res.status(201).json(recipe)

    // let test = { ...recipe }
    // delete test.name
    // res.status(201).json(test)
})

router.get("/types", async (req, res) => {
    console.log("GET /types")
    const types = await Diet.findAll()
    res.json(types)
})

module.exports = router
