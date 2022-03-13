const { Diet, conn } = require("../../src/db.js")

describe("Diet model", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err)
        })
    )

    beforeEach(() =>
        Diet.sync({ force: true }).catch((err) => console.log(err))
    )

    describe("edge cases", () => {
        it("should not save an empty diet", (done) => {
            Diet.create({})
                .then(() =>
                    done(new Error("Empty objects should not be saved"))
                )
                .catch(() => done())
        })

        it("should save a diet even if extra fields are provided", (done) => {
            Diet.create({ name: "Dieta 2", extra: "info", being: "provided" })
                .then(() => done())
                .catch(() =>
                    done(
                        new Error(
                            "Extra fields should not prevent a diet from being created"
                        )
                    )
                )
        })
    })

    describe("name", () => {
        it("should throw an error if name is null", (done) => {
            Diet.create({ name: null })
                .then(() => done(new Error("It requires a valid name")))
                .catch(() => done())
        })

        it("should throw an error if name is not a string", (done) => {
            Diet.create({ name: 123 })
                .then(() =>
                    done(
                        new Error(
                            "It should not be created if the name is a number"
                        )
                    )
                )
                .catch(() => Diet.create({ name: { name: "Diet object" } }))
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
            Diet.create({ name: "Diet 4" })
                .then(() => Diet.create({ name: "Diet 5" }))
                .then(() => done())
                .catch(() => done(new Error("Valid diets should be created")))
        })
    })
})
