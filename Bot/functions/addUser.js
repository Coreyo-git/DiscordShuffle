const { Users } = require("../dbObjects.js");

module.exports = {
    // adds the user if it doesn't already exist
    async addUser(user) {
        if ((await checkIfUserExists(user)) === false) {
            await Users.create({
                user_id: user.user_id,
                username: user.username,
                nickname: user.nickname,
				anime_list_url: user.anime_list_url,
            });
        }
    },
};

// returns an empty array if nothing is found
// empty returns false
async function checkIfUserExists(user) {
    let res = await Users.findAll({
        where: {
            user_id: user.user_id,
        },
    });

    if (res[0]) {
		// updates the user by id incase the user has changed their info
		await Users.update({ username: user.username, nickname: user.nickname }, {where: { user_id: user.user_id}});
        return true;
    }
    return false;
}
