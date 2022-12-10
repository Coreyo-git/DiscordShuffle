const { SlashCommandBuilder, Collection } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("startshuffle")
        .setDescription("begins a new shuffle event")
        .addIntegerOption((option) =>
            option
                .setName("timer")
                .setDescription("Sets a timer at an hourly duration: 1 = an hour")
                .setMinValue(1)
                .setMaxValue(72)
                .setRequired(true)
        ),
    async execute(interaction) {
        const timer = interaction.options.getInteger("timer");

        const message = await interaction.reply({
            content:
                `A new shuffle has started, sign up will last ${String(timer)} hour! React with 👍 to join or 👎 to skip this round`,
            fetchReply: true,
        });
        message.react("👍").then(() => message.react("👎"));

        const filter = (reaction, user) => {
            return ["👍"].includes(reaction.emoji.name) && user.id != message.author.id;
        };

        const collector = message.createReactionCollector({
            filter,
            time: timer * 3600000,
            errors: ["time"],
        });

        let users = "Users in shuffle: \n\n";
        collector.on("collect", (reaction, user) => {
            users += `${user.tag}\n`;
        });

        collector.on("end", (collected) => {
            if (collected.size === 0) {
                interaction.reply("No Reactions");
                return;
            }
            interaction.followUp(users);
        });
    },
};
