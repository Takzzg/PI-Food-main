const session = require("supertest-session")
const app = require("../../src/app.js")
const { Recipe, conn } = require("../../src/db.js")
const { recipe1, recipe2, minRecipe } = require("../exampleRecipes")

const agent = session(app)

describe("Recipe routes", () => {
    let diets = [1, 2, 3]

    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err)
        })
    )

    beforeEach(() =>
        Recipe.sync({ force: true })
            .then(() => Recipe.create(recipe1))
            .then(() => Recipe.create(recipe2))
            .then(() => Recipe.create(minRecipe))
    )

    describe("GET /recipes", () => {
        it("should respond with 200", () => {
            agent.get("/recipes").expect(200)
        })

        it("should respond with json", () => {
            agent.get("/recipes").expect("Content-Type", /json/)
        })
    })

    describe("GET /recipes/:id", () => {
        let recipes

        before(async () => {
            let result = await agent.get("/recipes")
            recipes = result.body
        })

        it("should respond with 404 for an invalid id", () => {
            agent.get(`/recipes/wrongId`).expect(404)
            agent.get(`/recipes/1`).expect(404)
        })

        it("should respond with 200 for valid ids", () => {
            recipes.forEach((r) => agent.get(`/recipes/${r.id}`).expect(200))
        })

        it("should return a json for valid ids", () => {
            recipes.forEach((r) => {
                agent.get(`/recipes/${r.id}`).expect("Content-Type", /json/)
                // console.log(r.name || r.title, r.id)
            })
        })
    })

    describe("POST /recipes", () => {
        let noName = { ...recipe1 }
        delete noName.name

        let noSummary = { ...recipe2 }
        delete noSummary.summary

        it("should respond with 422 if the recipe is missing a name", () => {
            agent
                .post("/recipes")
                .send({ ...noName, diets })
                .expect(422)
        })

        it("should respond with 422 if the recipe is missing a summary", () => {
            agent
                .post("/recipes")
                .send({ ...noSummary, diets })
                .expect(422)
        })

        it("should respond with 201 if the recipe was created", () => {
            agent
                .post("/recipes")
                .send({ ...recipe1, diets })
                .expect(201)
        })

        it("should return the recipe that was created", (done) => {
            agent
                .post("/recipes")
                .send({ ...recipe2, diets })
                .end(function (err, res) {
                    if (err) return done(err)
                    Object.keys(recipe2).forEach((k) => {
                        if (!res.body.hasOwnProperty(k)) {
                            done(new Error("Response obj is missing key: ", k))
                            throw new Error("End test")
                        }
                    })
                    done()
                })
        })
    })
})
