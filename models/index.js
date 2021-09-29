const Player = require('./Player');
const Match = require('./Match');
const Text = require('./Text');

//matches should be one to two where each match has one player1 and player2 and each player belongs to match
//this could be done through a through table but i dont hate myself so we'll simply have it look up the id manually.

//we could use foreignkeys to access the text based on text id but for now that seems a bit obtuse. will likely end up doing this anyway. 

/*Match.belongsTo(Text, {
    foreignKey: 'text_id'
});*/




module.exports = { Player, Match, Text };