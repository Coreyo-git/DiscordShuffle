const { Users } = require("../dbObjects.js");

module.exports = {
    // adds the user if it doesn't already exist
    async addUser(user) {
        if ((await checkIfUserExists(user)) === false) {
            console.log("addUser");
            await Users.create({
                user_id: user.user_id,
                username: user.username,
                nickname: user.nickname,
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
        return true;
    }
    return false;
}
