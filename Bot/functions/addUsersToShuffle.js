const { UserShuffle } = require("../dbObjects.js");
const { addUser } = require("../functions/addUser.js");

module.exports = {
    addUsersToShuffle(usersArray, shuffle_id) {
		shuffleUsers(usersArray);
        for (var i = 0; i < usersArray.length - 1; i+=2) {
			addUser(usersArray[i]);
			addUser(usersArray[i+1]);
            UserShuffle.create({
                user_1_id: usersArray[i].user_id,
				user_2_id: usersArray[i+1].user_id,
                shuffle_id: shuffle_id,
            });
        }
		return usersArray;
    },
};

function shuffleUsers(usersArray) {
    let i = usersArray.length;
    while (--i > 0) {
        let temp = Math.floor(Math.random() * (i + 1));
        [usersArray[temp], usersArray[i]] = [usersArray[i], usersArray[temp]];
    }
}
