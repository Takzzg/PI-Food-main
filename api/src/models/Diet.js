const { DataTypes } = require("sequelize")

function checkString(value) {
    if (typeof value !== "string")
        throw new Error("name can only be of type string")
}

module.exports = (sequelize) => {
    sequelize.define("diet", {
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
        }
    })
}
