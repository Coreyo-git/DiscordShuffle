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
		Shuffle.upsert({ id: 1, genre: "Shonen" }),
	];

	const users = [
		Users.upsert({ id: 1, user_id: "352040458098311168", username: "Corey#9390", nickname: "Coreyo" }),
		Users.upsert({ id: 2, user_id: "352040458098311167", username: "Jhonny#1290", nickname: "Jhonny" }),

	];

	const likes = [
		Likes.upsert({ id: 1, user_id: "352040458098311168", value: "Isekai" }),
		Likes.upsert({ id: 2, user_id: "352040458098311168", value: "Romance" }),
		Likes.upsert({ id: 3, user_id: "352040458098311168", value: "Shounen" }),
		Likes.upsert({ id: 4, user_id: "352040458098311168", value: "Test" }),
		Likes.upsert({ id: 5, user_id: "352040458098311168", value: "Stuff" }),

		Likes.upsert({ id: 1, user_id: "352040458098311167", value: "Musicals" }),
		Likes.upsert({ id: 2, user_id: "352040458098311167", value: "Shoujo" }),
		Likes.upsert({ id: 3, user_id: "352040458098311167", value: "Horror" }),
		Likes.upsert({ id: 4, user_id: "352040458098311167", value: "Gore" }),
		Likes.upsert({ id: 5, user_id: "352040458098311167", value: "Brrrrr" }),

	];

	const dislikes = [
		Dislikes.upsert({ id: 1, user_id: "352040458098311168", value: "Idol Shows" }),
		Dislikes.upsert({ id: 2, user_id: "352040458098311168", value: "Gundam" }),
		Dislikes.upsert({ id: 3, user_id: "352040458098311168", value: "Etcetc" }),
		Dislikes.upsert({ id: 4, user_id: "352040458098311168", value: "Test" }),
		Dislikes.upsert({ id: 5, user_id: "352040458098311168", value: "Stuff" }),
 
		Dislikes.upsert({ id: 1, user_id: "352040458098311167", value: "Isekai" }),
		Dislikes.upsert({ id: 2, user_id: "352040458098311167", value: "Slice of Life" }),
		Dislikes.upsert({ id: 3, user_id: "352040458098311167", value: "Romance" }),
		Dislikes.upsert({ id: 4, user_id: "352040458098311167", value: "Seinen " }),
		Dislikes.upsert({ id: 5, user_id: "352040458098311167", value: "Yes" }),
	];

	const userShuffles = [
		UserShuffle.upsert({ user_1_id: "352040458098311168", user_2_id: "352040458098311167", shuffle_id: 1 }),
	];

	await Promise.all(shuffles);
	await Promise.all(users);
	await Promise.all(likes);
	await Promise.all(dislikes);
	await Promise.all(userShuffles);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);