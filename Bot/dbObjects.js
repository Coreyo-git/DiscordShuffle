const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Shuffle = require('./models/Shuffle.js')(sequelize, Sequelize.DataTypes);
const UserShuffle = require('./models/UserShuffle.js')(sequelize, Sequelize.DataTypes);
const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Likes = require('./models/Likes.js')(sequelize, Sequelize.DataTypes);
const Dislikes = require('./models/Dislikes.js')(sequelize, Sequelize.DataTypes);

UserShuffle.hasMany(Users, { foreignKey: 'user_id', as: 'user1_id' });
UserShuffle.hasMany(Users, { foreignKey: 'user_id', as: 'user2_id' });
UserShuffle.hasMany(Shuffle, { foreignKey: 'id', as: 'shuffle' });

Shuffle.belongsToMany(Users, { foreignKey: 'user_id', through: UserShuffle, uniqueKey: false})

// users
Users.hasMany(Likes, { foreignKey: 'user_id', as: 'user_likes' });
Users.hasMany(Dislikes, { foreignKey: 'user_id', as: 'user_dislikes' });
Users.hasMany(UserShuffle, { foreignKey: 'user_id', as: 'user_shuffles' });

module.exports = { Shuffle, UserShuffle, Users, Likes, Dislikes };
