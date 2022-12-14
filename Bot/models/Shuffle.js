// Base Model for a shuffle instance, 
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('shuffle', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		duration: {
			type: DataTypes.INTEGER,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
	}, {
		timestamps: false,
	});
};