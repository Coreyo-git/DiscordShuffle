const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('attack')
		.setDescription('attacks!'),
	async execute(interaction) {
		await interaction.reply('Attacks you!');
	},
};