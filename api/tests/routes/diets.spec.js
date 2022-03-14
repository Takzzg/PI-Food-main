const session = require("supertest-session")
const app = require("../../src/app.js")
const { Diet, conn } = require("../../src/db.js")
const { recipe1, recipe2, minRecipe } = require("../exampleRecipes")

const agent = session(app)

describe("Recipe routes", () => {
    const dietTypes = [
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Low FODMAP",
        "Whole30"
    ]

    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err)
        })
    )

    beforeEach(async () => {
        await Diet.sync({ force: true })
        dietTypes.forEach(async (diet) => await Diet.create(diet))
    })

    describe("GET /types", () => {
        it("should respond with 200", () => {
            agent.get("/types").expect(200)
        })

        it("should return a json", () => {
            agent.get("/types").expect("Content-Type", /json/)
        })
    })
})
