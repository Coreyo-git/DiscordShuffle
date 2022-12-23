// joining table for current shuffle and user in shuffle

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user_shuffle', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		shuffle_id: DataTypes.INTEGER,
	}, {
		timestamps: false,
	});
};