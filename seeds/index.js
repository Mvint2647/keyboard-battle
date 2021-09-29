const sequelize = require('../config/connection');
const { Player, Match, Text } = require('../models');

const playerSeedData = require('./playerSeedData.json');
const textSeedData = require('./textSeedData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const players = await Player.bulkCreate(playerSeedData);
  const text = await Text.bulkCreate(textSeedData);

  process.exit(0);
};

seedDatabase();