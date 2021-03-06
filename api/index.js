//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js")
const { conn, Diet, Recipe } = require("./src/db.js")

const dietTypes = [
    "Vegan",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Pescatarian",
    "Ketogenic",
    "Gluten Free",
    "Dairy Free",
    "Whole30",
    "Low FODMAP",
    "Primal",
    "Paleo"
]

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
    console.log("creating pizza")

    dietTypes.forEach((diet) => Diet.create({ name: diet }))

    let pizza = await Recipe.create({
        name: "Pizza",
        summary:
            "Pizza de cebolla, pertenece a todos los tipos de dietas existentes",
        score: 100,
        healthScore: 10,
        instructions: ["Preparas la pizza", "La metes en el horno", "Disfrutas"]
    })

    let dietsId = await Diet.findAll({ raw: true, attributes: ["id"] })
    pizza.setDiets(dietsId.map((d) => d.id))
    server.listen(3001, () => {
        console.log("%s listening at 3001") // eslint-disable-line no-console
    })
})
