const { DataTypes } = require("sequelize")
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

function checkString(value) {
    if (typeof value !== "string")
        throw new Error("name can only be of type string")
}

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("recipe", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isString(value) {
                    checkString(value)
                }
            }
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isString(value) {
                    checkString(value)
                }
            }
        },
        score: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        healthScore: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        instructions: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            validate: {
                isString(value) {
                    if (!value) return value
                    if (!Array.isArray(value))
                        throw new Error("instructions should be an array")
                    value.forEach((v) => checkString(v))
                }
            }
        }
    })
}
