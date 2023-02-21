const { Users } = require("../dbObjects.js");

module.exports = {
    // adds the user if it doesn't already exist
    async updateUserAnimeUrl(user, url) {
        // updates the user by id incase the user has changed their info
        await Users.update(
            { username: user.username, nickname: user.nickname, anime_list_url: url },
            { where: { user_id: user.user_id } }
        );
    },
};
