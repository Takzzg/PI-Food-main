const recipe1 = {
    name: "Fideos con manteca",
    summary: "Fideos luchetti con manteca y sal",
    score: 50,
    healthScore: 50,
    instructions: [
        "Poner a hervir el agua con un poco de sal",
        "Una vez hirviendo, agregar los fideos",
        "Revolver hasta que los fideos esten bien cocinados",
        "Colar los fideos",
        "Agregar la manteca, y sal si hace falta",
        "Servir"
    ]
}

const recipe2 = {
    name: "Torre de panqueques",
    summary: "Torre de panqueques salada, ideal para las fiestas",
    score: 100,
    healthScore: 70,
    instructions: [
        "Hacer los panqueques como de costumbre",
        "poner un panqueque en el plato y pintarlo con mayonesa",
        "Elegir el relleno para la capa (puede ser huevo, jamon, queso, lechuga, o lo que quieras)",
        "Colocar el relleno sobre el panqueque (no mucho)",
        "Cubrir con otro panqueque y pintar con mayonesa por encima",
        "Repetir pasos 2-4 hasta que quede armada la torre",
        "Refrigerar una hora (si se quiere)",
        "Cortar en porciones y servir"
    ]
}

module.exports = { recipe1, recipe2 }
