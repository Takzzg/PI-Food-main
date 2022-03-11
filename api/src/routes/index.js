require("dotenv").config()
const { Router } = require("express")
const axios = require("axios").default
const fs = require("fs")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()
const baseUrl = "https://api.spoonacular.com/recipes"
const apiKey = `&apiKey=${process.env.SPOONACULAR_API_KEY}`
const readFiles = true
const wirteFiles = true

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", (req, res) => {
    console.log("Get /")
    res.json({ data: "GET /" })
})

router.get("/recipes", async (req, res) => {
    console.log("GET /recipes")

    let data = {}

    if (readFiles)
        data = JSON.parse(
            fs.readFileSync(__dirname + "/../../APIresults/90.json")
        )
    else {
        let result = await axios.get(
            `${baseUrl}/complexSearch?number=90${apiKey}`
        )
        data = result.data
        if (wirteFiles)
            fs.writeFileSync(
                __dirname + "/../../APIresults/90.json",
                JSON.stringify(data, null, 4)
            )
    }

    res.json(data)
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
