const { SlashCommandBuilder, Collection } = require("discord.js");
const { Dislikes } = require("../dbObjects.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setdislikes")
        .setDescription("Set your 5 likes")
        .addStringOption((option) =>
            option.setName("like_1").setDescription("Dislike #1")
        )
        .addStringOption((option) =>
            option.setName("dislike_2").setDescription("Dislike #2")
        )
        .addStringOption((option) =>
            option.setName("dislike_3").setDescription("Dislike #3")
        )
        .addStringOption((option) =>
            option.setName("dislike_4").setDescription("Dislike #4")
        )
        .addStringOption((option) =>
            option.setName("dislike_5").setDescription("Dislike #5")
        ),
    async execute(interaction) {
        const l1 = interaction.options.getString("dislike_1");
        const l2 = interaction.options.getString("dislike_2");
        const l3 = interaction.options.getString("dislike_3");
        const l4 = interaction.options.getString("dislike_4");
        const l5 = interaction.options.getString("dislike_5");

        Dislikes.destroy({
            // remove all old dislikes
            where: {
                username: interaction.user.tag,
            },
        });

		// create dislikes if they exist
        if (l1) {
            Dislikes.create({ username: interaction.user.tag, value: l1 });
        }
        if (l2) {
            Dislikes.create({ username: interaction.user.tag, value: l2 });
        }

        if (l3) {
            Dislikes.create({ username: interaction.user.tag, value: l3 });
        }
        if (l4) {
            Dislikes.create({ username: interaction.user.tag, value: l4 });
        }
        if (l5) {
            Dislikes.create({ username: interaction.user.tag, value: l5 });
        }

        return interaction.reply(
            `Hello ${interaction.user.tag}, Your dislikes have been set to: ${l1}, ${l2}, ${l3}, ${l4}, ${l5}`
        );
    },
};
