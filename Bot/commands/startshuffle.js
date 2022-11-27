const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('startshuffle')
		.setDescription('begins a new shuffle event'),
	async execute(interaction) {
		await interaction.reply('React to this with a tick to include yourself!');
	},
};