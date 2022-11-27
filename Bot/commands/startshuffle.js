const { SlashCommandBuilder } = require("discord.js");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("startshuffle")
    .setDescription("begins a new shuffle event"),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("primary")
        .setLabel("Sign up!")
        .setStyle(ButtonStyle.Primary)
    );
	await interaction.reply({ content: 'Sign up for the shuffle!', components: [row] });
  },
};
