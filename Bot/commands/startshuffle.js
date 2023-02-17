const { SlashCommandBuilder } = require("discord.js");
const { addNewShuffle } = require("../functions/addNewShuffle.js");
const { addUsersToShuffle } = require("../functions/addUsersToShuffle.js");
const { createShuffleDm } = require("../functions/createShuffleDm.js");

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
        )
        .addStringOption((option) =>
            option
                .setName("genre")
                .setDescription("Set a genre for the shuffle")
        ),
    async execute(interaction) {
        const timer = interaction.options.getInteger("timer");
        const genre = interaction.options.getString("genre");

        let shuffle_id = await addNewShuffle(genre);
        const message = await interaction.reply({
            content: `A new shuffle #${shuffle_id} has started the genre is **${genre}**, sign up will last ${String(
                timer
            )} hour! React with 👍 to join or 👎 to skip this round. \n __if there is an uneven amount of users at the end the last user will be removed from the shuffle__`,
            fetchReply: true,
        });
        message.react("👍").then(() => message.react("👎"));

        const filter = (reaction, user) => {
            return ["👍"].includes(reaction.emoji.name); //&& // TODO: uncomment conditional
            //user.id != message.author.id
        };

        const collector = message.createReactionCollector({
            filter,
            time: timer * 2000, // TODO: Keep at 3600000
            errors: ["time"],
        });

        var usersArray = [];
        collector.on("collect", (reaction, user) => {
            usersArray.push({
                user_id: user.id,
                username: user.tag,
                nickname: user.username,
            });
        });

        collector.on("end", (collected) => {
            if (collected.size === 0) {
                interaction.reply("No Reactions");
                return;
                msg.send(value);
            }
            // if the amount of users is uneven pop the last element off
            if (usersArray.length % 2 !== 0) {
                usersArray.pop();
            }

            let shuffledUsers = addUsersToShuffle(usersArray, shuffle_id);
            let shuffledUsersReply = `The shuffle is allocated as below \n`;
            for (let i = 0; i < shuffledUsers.length - 1; i += 2) {
                shuffledUsersReply += `| **${shuffledUsers[i].username} | ${
                    shuffledUsers[i].nickname
                }** is paired with **${shuffledUsers[i + 1].username} | ${
                    shuffledUsers[i + 1].nickname
                }** |\n`;

                // get user info and send messages to each
                const dm1 = createShuffleDm(
                    shuffledUsers[i + 1],
                    interaction.guild.name,
                    shuffle_id,
                    genre
                );
                interaction.client.users
                    .fetch(shuffledUsers[i].user_id)
                    .then((msg) => {
                        // msg.send(value);
                        console.log("ss" + dm1);
                        // console.log(value);
                    });

                // let dm2 = createShuffleDm(
                //     shuffledUsers[i],
                //     interaction.guild.name,
                //     shuffle_id,
                //     genre
                // );
                // interaction.client.users
                //     .fetch(shuffledUsers[i + 1].user_id)
                //     .then((msg) => {
                //         // msg.send(value);
                //         console.log(dm2);
                //     });
            }

            interaction.followUp(shuffledUsersReply);
        });
    },
};
