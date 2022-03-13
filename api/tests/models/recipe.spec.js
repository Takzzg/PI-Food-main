const { Recipe, conn } = require("../../src/db.js")
const { expect } = require("chai")
const { recipe1, recipe2 } = require("../exampleRecipes")

describe.only("Recipe model", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err)
        })
    )

    describe("Validators", () => {
        beforeEach(() => Recipe.sync({ force: true }))

        describe("name", () => {
            it("should throw an error if name is null", (done) => {
                let noName = { ...recipe1, name: null }

                Recipe.create(noName)
                    .then(() => done(new Error("It requires a valid name")))
                    .catch(() => done())
            })

            it("should throw an error if name is not a string", (done) => {
                let numName = { ...recipe1, name: 123 }
                let objName = { ...recipe2, name: { name: "Torta" } }

                Recipe.create(numName)
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if the name is a number"
                            )
                        )
                    )
                    .catch(() => Recipe.create(objName))
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if the name is an object"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should work when its a valid name", (done) => {
                Recipe.create(recipe1)
                    .then(() => Recipe.create(recipe2))
                    .then(() => done())
                    .catch(() =>
                        done(new Error("Valid recipes should be created"))
                    )
            })
        })

        describe("summary", () => {
            it("should throw an error if summary is null", (done) => {
                let noSummary = { ...recipe2, name: null }

                Recipe.create(noSummary)
                    .then(() => done(new Error("It requires a valid summary")))
                    .catch(() => done())
            })

            it("should throw an error if summary is not a string", (done) => {
                let numName = { ...recipe1, summary: 123 }
                let objName = { ...recipe2, summary: { summary: "Torta" } }

                Recipe.create(numName)
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if the summary is a number"
                            )
                        )
                    )
                    .catch(() =>
                        Recipe.create(objName)
                            .then(() =>
                                done(
                                    new Error(
                                        "It should not be created if the summary is an object"
                                    )
                                )
                            )
                            .catch(() => done())
                    )
            })

            it("should work when its a valid summary", (done) => {
                Recipe.create(recipe1)
                    .then(() => Recipe.create(recipe2))
                    .then(() => done())
                    .catch(() =>
                        done(new Error("Valid recipes should be created"))
                    )
            })
        })

        describe("score", () => {
            it("should throw an error if score < 0", (done) => {
                let lowScore = { ...recipe1, score: -1 }

                Recipe.create(lowScore)
                    .then(() =>
                        done(
                            new Error(
                                "Recipes with score < 0 should not be created"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should throw an error if score > 100", (done) => {
                let highScore = { ...recipe2, score: 101 }

                Recipe.create(highScore)
                    .then(() =>
                        done(
                            new Error(
                                "Recipes with score > 100 should not be created"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should throw an error if score is not a number", (done) => {
                let strScore = { ...recipe1, score: "Genial" }
                let objScore = { ...recipe2, score: { number: 48 } }

                Recipe.create(strScore)
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if score is a string"
                            )
                        )
                    )
                    .catch(() => Recipe.create(objScore))
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if score is an object"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should work if score is between 0 and 100", (done) => {
                Recipe.create(recipe1)
                    .then(() => Recipe.create(recipe2))
                    .then(() => done())
                    .catch(() =>
                        done(
                            new Error(
                                "Recipes with score between 0 and 100 should be created"
                            )
                        )
                    )
            })
        })

        describe("healthScore", () => {
            it("should throw an error if healthScore < 0", (done) => {
                let lowScore = { ...recipe1, healthScore: -1 }

                Recipe.create(lowScore)
                    .then(() =>
                        done(
                            new Error(
                                "Recipes with healthScore < 0 should not be created"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should throw an error if healthScore > 100", (done) => {
                let highScore = { ...recipe2, healthScore: 101 }

                Recipe.create(highScore)
                    .then(() =>
                        done(
                            new Error(
                                "Recipes with healthScore > 100 should not be created"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should throw an error if healthScore is not a number", (done) => {
                let strScore = { ...recipe1, healthScore: "Genial" }
                let objScore = { ...recipe2, healthScore: { number: 48 } }

                Recipe.create(strScore)
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if healthScore is a string"
                            )
                        )
                    )
                    .catch(() => Recipe.create(objScore))
                    .then(() =>
                        done(
                            new Error(
                                "It should not be created if healthScore is an object"
                            )
                        )
                    )
                    .catch(() => done())
            })

            it("should work if healthScore is between 0 and 100", (done) => {
                Recipe.create(recipe1)
                    .then(() => Recipe.create(recipe2))
                    .then(() => done())
                    .catch(() =>
                        done(
                            new Error(
                                "Recipes with healthScore between 0 and 100 should be created"
                            )
                        )
                    )
            })
        })

        describe("instructions", () => {
            it("should throw an error if instructions is not an array", (done) => {
                let strInstructions = Recipe.create({
                    ...recipe1,
                    instructions: "hacer la pizza"
                })
                let numInstructions = Recipe.create({
                    ...recipe2,
                    instructions: 123
                })
                let objInstructions = Recipe.create({
                    ...recipe1,
                    instructions: { 1: "cocinar la pizza", 2: "comer la pizza" }
                })
                let boolInstructions = Recipe.create({
                    ...recipe2,
                    instructions: true
                })

                // Promise.all([
                //     strInstructions,
                //     numInstructions,
                //     objInstructions,
                //     boolInstructions
                // ])
                //     .then(() =>
                //         done(new Error("Instructions can only be an array"))
                //     )
                //     .catch(() => done())

                Recipe.create(strInstructions)
                    .then(() => {
                        done(
                            new Error(
                                "It should not be created if intructions is a string"
                            )
                        )
                        throw new Error("test stopped")
                    })
                    .catch(() => Recipe.create(numInstructions))
                    .then(() => {
                        done(
                            new Error(
                                "It should not be created if intructions is a number"
                            )
                        )
                        throw new Error("test stopped")
                    })
                    .catch(() => Recipe.create(objInstructions))
                    .then(() => {
                        done(
                            new Error(
                                "It should not be created if intructions is an object"
                            )
                        )
                        throw new Error("test stopped")
                    })
                    .catch(() => Recipe.create(boolInstructions))
                    .then(() => {
                        done(
                            new Error(
                                "It should not be created if intructions is a boolean"
                            )
                        )
                        throw new Error("test stopped")
                    })
                    .catch(() => done())
            })

            it("should throw an error if any element of the array is not a string", (done) => {
                let numInstructions = {
                    ...recipe1,
                    instructions: [...recipe1.instructions, 123]
                }
                let objInstructions = {
                    ...recipe1,
                    instructions: [...recipe1.instructions, { final: "Comer" }]
                }
                let boolInstructions = {
                    ...recipe2,
                    instructions: [...recipe2.instructions, true]
                }

                Recipe.create(numInstructions)
                    .then(() =>
                        done(new Error("Instructions can't contain a number"))
                    )
                    .catch(() => Recipe.create(objInstructions))
                    .then(() =>
                        done(new Error("Instructions can't contain an object"))
                    )
                    .catch(() => Recipe.create(boolInstructions))
                    .then(() =>
                        done(new Error("Instructions can't contain a boolean"))
                    )
                    .catch(() => done())
            })

            it("should work with valid instructions", (done) => {
                Recipe.create(recipe1)
                    .then(() => Recipe.create(recipe2))
                    .then(() => done())
                    .catch(() =>
                        done(
                            new Error(
                                "Recipes with calid instructions should be created"
                            )
                        )
                    )
            })
        })
    })
})
