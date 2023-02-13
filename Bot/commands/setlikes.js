const { SlashCommandBuilder, Collection } = require("discord.js");
const { Likes } = require("../dbObjects.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setlikes")
        .setDescription("Set your 5 likes")
        .addStringOption((option) =>
            option.setName("like_1").setDescription("Like #1")
        )
        .addStringOption((option) =>
            option.setName("like_2").setDescription("Like #2")
        )
        .addStringOption((option) =>
            option.setName("like_3").setDescription("Like #3")
        )
        .addStringOption((option) =>
            option.setName("like_4").setDescription("Like #4")
        )
        .addStringOption((option) =>
            option.setName("like_5").setDescription("Like #5")
        ),
    async execute(interaction) {
        const l1 = interaction.options.getString("like_1");
        const l2 = interaction.options.getString("like_2");
        const l3 = interaction.options.getString("like_3");
        const l4 = interaction.options.getString("like_4");
        const l5 = interaction.options.getString("like_5");

        Likes.destroy({
            // remove all old likes
            where: {
                username: interaction.user.tag,
            },
        });

		// create likes if they exist
        if (l1) {
            Likes.create({ username: interaction.user.tag, value: l1 });
        }
        if (l2) {
            Likes.create({ username: interaction.user.tag, value: l2 });
        }

        if (l3) {
            Likes.create({ username: interaction.user.tag, value: l3 });
        }
        if (l4) {
            Likes.create({ username: interaction.user.tag, value: l4 });
        }
        if (l5) {
            Likes.create({ username: interaction.user.tag, value: l5 });
        }

        return interaction.reply(
            `Hello ${interaction.user.tag}, Your likes have been set to: ${l1}, ${l2}, ${l3}, ${l4}, ${l5}`
        );
    },
};
