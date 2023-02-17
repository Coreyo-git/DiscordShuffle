const { Dislikes } = require("../dbObjects.js");

module.exports = {
    async getUserDislikes(user_id) {
        const dislikes =  await Dislikes.findAll({
            raw: true,
            where: { user_id: user_id },
			attributes: ['value']
        });

		return dislikes;
    },
};
