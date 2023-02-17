const { Likes } = require("../dbObjects.js");

module.exports = {
    async getUserLikes(user_id) {
        const likes = await Likes.findAll({
            raw: true,
            where: { user_id: user_id },
			attributes: ['value']
        });
		return likes;
    },
};
