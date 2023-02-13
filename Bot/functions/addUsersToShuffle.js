const { UserShuffle } = require("../dbObjects.js");

module.exports = {
    addUsersToShuffle(usersArray, shuffle_id) {
		shuffleUsers(usersArray);
        for (var i = 0; i < usersArray.length - 1; i+=2) {
            UserShuffle.create({
                user_1: usersArray[i],
				user_2: usersArray[i+1],
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
