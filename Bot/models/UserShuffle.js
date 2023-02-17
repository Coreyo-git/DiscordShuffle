// joining table for current shuffle and user in shuffle

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user_shuffle', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_1_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_2_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		shuffle_id: DataTypes.INTEGER,
	}, {
		timestamps: false,
	});
};