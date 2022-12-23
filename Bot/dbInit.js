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

const force = process.argv.includes('--force') || process.argv.includes('-f');

// seeds db
sequelize.sync({ force }).then(async () => {
	const shuffles = [
		Shuffle.upsert({ id: 1, duration: 20, active: true }),
	];

	const users = [
		Users.upsert({ id: 1, username: "Corey#9390" }),
		Users.upsert({ id: 2, username: "Jhonny#1290" }),

	];

	const likes = [
		Likes.upsert({ id: 1, username: "Corey#9390", value: "Isekai" }),
		Likes.upsert({ id: 2, username: "Corey#9390", value: "Romance" }),
		Likes.upsert({ id: 3, username: "Corey#9390", value: "Shounen" }),
		Likes.upsert({ id: 4, username: "Corey#9390", value: "Test" }),
		Likes.upsert({ id: 5, username: "Corey#9390", value: "Stuff" }),

		Likes.upsert({ id: 1, username: "Jhonny#1290", value: "Musicals" }),
		Likes.upsert({ id: 2, username: "Jhonny#1290", value: "Shoujo" }),
		Likes.upsert({ id: 3, username: "Jhonny#1290", value: "Horror" }),
		Likes.upsert({ id: 4, username: "Jhonny#1290", value: "Gore" }),
		Likes.upsert({ id: 5, username: "Jhonny#1290", value: "Brrrrr" }),

	];

	const dislikes = [
		Dislikes.upsert({ id: 1, username: "Corey#9390", value: "Idol Shows" }),
		Dislikes.upsert({ id: 2, username: "Corey#9390", value: "Gundam" }),
		Dislikes.upsert({ id: 3, username: "Corey#9390", value: "Etcetc" }),
		Dislikes.upsert({ id: 4, username: "Corey#9390", value: "Test" }),
		Dislikes.upsert({ id: 5, username: "Corey#9390", value: "Stuff" }),
 
		Dislikes.upsert({ id: 1, username: "Jhonny#1290", value: "Isekai" }),
		Dislikes.upsert({ id: 2, username: "Jhonny#1290", value: "Slice of Life" }),
		Dislikes.upsert({ id: 3, username: "Jhonny#1290", value: "Romance" }),
		Dislikes.upsert({ id: 4, username: "Jhonny#1290", value: "Seinen " }),
		Dislikes.upsert({ id: 5, username: "Jhonny#1290", value: "Yes" }),
	];

	const userShuffles = [
		UserShuffle.upsert({ username: "Corey#9390", shuffle_id: 1 }),
		UserShuffle.upsert({ username: "Jhonny#1290", shuffle_id: 1 }),
	];

	await Promise.all(shuffles);
	await Promise.all(users);
	await Promise.all(likes);
	await Promise.all(dislikes);
	await Promise.all(userShuffles);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);