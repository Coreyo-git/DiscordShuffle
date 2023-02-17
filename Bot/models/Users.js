module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nickname: { // NOT IMPLEMENTED YET
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false,
	});
};