const { Shuffle } = require("../dbObjects.js");

module.exports = {
	async addNewShuffle(genre) {
		const newShuffle = await Shuffle.create({ genre: genre});
		return newShuffle.id;
	}
}