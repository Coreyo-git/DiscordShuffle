const { getUserLikes } = require("./getUserLikes.js");
const { getUserDislikes } = require("./getUserDislikes.js");

module.exports = {
    createShuffleDm(user, server, shuffle_id, genre) {
        let dm = `The Shuffle #${shuffle_id} in ${server} has begun! The genre is: ${genre}!\nYou have been paired with ${user.username} server nickname: ${user.nickname}\nTheir likes are: | `;

        const likes = getUserLikes(user.user_id);

		for(var i = 0; i< likes.length - 1; i++) {
			console.log("likes:" + likes[i]);
			dm+= `${likes[i]} | `
		}

		dm += `\nTheir dislikes are: | `
		
        const dislikes = getUserDislikes(user.user_id);

		for(var i = 0; i< dislikes.length - 1; i++) {
			dm+= `${dislikes[i]} | `
		}

		console.log("dm: " + dm);

		return dm;
    },
};
