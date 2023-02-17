const { SlashCommandBuilder } = require('discord.js');
// Create a new client instance

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const user = await interaction.client.users.fetch('352040458098311168');
		user.send("Hello");
		await interaction.reply('Pong!');
	},
};