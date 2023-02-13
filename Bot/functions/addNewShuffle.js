const { Shuffle } = require("../dbObjects.js");

module.exports = {
	async addNewShuffle() {
		const newShuffle = await Shuffle.create();
		return newShuffle.id;
	}
}