const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Match extends Model {}

Match.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        queryID: {          //the queryparameter value that identifies this match. this is how people can join matches through the url
            type: DataTypes.STRING,
            allowNull: false
        },
        player1_id: { //the player who created the match
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'player',
                key: 'id'
            }
        },
        player2_id: { //the player who joined the match
            type: DataTypes.INTEGER,
            references: {
                model: 'player',
                key: 'id'
            }
        },
        text_id: { //references the text the player will type
            type: DataTypes.INTEGER,
            references: {
                model: 'text',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'match',
      }
)

module.exports = Match;