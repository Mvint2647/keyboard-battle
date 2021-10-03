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
            unique: true,
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
            validate: {
              len: [6],
            },
        }
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {
          console.log("hashing");
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          }
          return updatedUserData;
        },
      },
      
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'player',
      }

)


module.exports = Player;