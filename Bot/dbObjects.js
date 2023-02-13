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

UserShuffle.hasMany(Users, { foreignKey: 'user1', as: 'user1' });
UserShuffle.hasMany(Users, { foreignKey: 'user2', as: 'user2' });
UserShuffle.hasMany(Shuffle, { foreignKey: 'id', as: 'shuffle' });

Shuffle.belongsToMany(Users, { foreignKey: 'username', through: UserShuffle, uniqueKey: false})

// users
Users.hasMany(Likes, { foreignKey: 'username', as: 'user_likes' });
Users.hasMany(Dislikes, { foreignKey: 'username', as: 'user_dislikes' });
Users.hasMany(UserShuffle, { foreignKey: 'username', as: 'user_shuffles' });

module.exports = { Shuffle, UserShuffle, Users, Likes, Dislikes };
