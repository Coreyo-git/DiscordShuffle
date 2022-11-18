const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reply')
		.setDescription('Replies!'),
	async execute(interaction) {
		await interaction.reply('Im replying!');
	},
};