const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Player extends Model {
    validatePass(data){
        //todo: ensure their password meets requirements here
    }
}

Player.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
              }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
          beforeCreate: async (data) => {
            data.password = bcrypt.hash(data.password, 10);
            return data;
          },
          beforeUpdate: async (data) => {
            if (data.password) {
              data.password = bcrypt.hash(data.password, 10);
            }
            return data;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'player',
      }
)