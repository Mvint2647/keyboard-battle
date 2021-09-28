const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Text extends Model {}

Text.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        content: { //what the players have to type
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'text',
      }
)

module.exports = Text;