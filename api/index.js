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

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
        console.log("%s listening at 3001") // eslint-disable-line no-console

        dietTypes.forEach((diet) => Diet.create({ name: diet }))

        Recipe.create({
            name: "Pizza",
            summary: "Pizza de cebolla",
            score: 100,
            healthScore: 10,
            instructions: [
                "Preparas la pizza",
                "La metes en el horno",
                "Disfrutas"
            ]
        })
    })
})
