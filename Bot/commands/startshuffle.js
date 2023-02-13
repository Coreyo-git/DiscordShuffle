const { SlashCommandBuilder, Collection } = require("discord.js");
const { addNewShuffle } = require("../functions/addNewShuffle.js");
const { addUsersToShuffle } = require("../functions/addUsersToShuffle.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("startshuffle")
        .setDescription("begins a new shuffle event")
        .addIntegerOption((option) =>
            option
                .setName("timer")
                .setDescription(
                    "Sets a timer at an hourly duration: 1 = an hour"
                )
                .setMinValue(1)
                .setMaxValue(72)
                .setRequired(true)
        ),
    async execute(interaction) {
        const timer = interaction.options.getInteger("timer");

        let shuffle_id = await addNewShuffle();
        const message = await interaction.reply({
            content: `A new shuffle #${shuffle_id} has started, sign up will last ${String(
                timer
            )} hour! React with 👍 to join or 👎 to skip this round. \n __if there is an uneven amount of users at the end the last user will be removed from the shuffle__`,
            fetchReply: true,
        });
        message.react("👍").then(() => message.react("👎"));

        const filter = (reaction, user) => {
            return (
                ["👍"].includes(reaction.emoji.name) &&
                user.id != message.author.id
            );
        };

        const collector = message.createReactionCollector({
            filter,
            time: timer * 3600000,
            errors: ["time"],
        });

        var usersArray = [];
        collector.on("collect", (reaction, user) => {
            usersArray.push(user.tag);
        });

        collector.on("end", (collected) => {
            if (collected.size === 0) {
                interaction.reply("No Reactions");
                return;
            }
			// if the amount of users is uneven pop the last element off
			if(usersArray.length % 2 !== 0 )
			{
				usersArray.pop();
			}

            let shuffledUsers = addUsersToShuffle(usersArray, shuffle_id);
			let shuffledUsersReply = `The shuffle is allocated as below \n`  
			for(let i = 0; i < shuffledUsers.length - 1; i+=2) {
				shuffledUsersReply += `| **${shuffledUsers[i]}** is paired with **${shuffledUsers[i+1]}** |\n`;
			}
            interaction.followUp(shuffledUsersReply);
        });
    },
};
