module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		username: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		nickname: { // NOT IMPLEMENTED YET
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false,
	});
};