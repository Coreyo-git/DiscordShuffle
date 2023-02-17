const { SlashCommandBuilder, Collection } = require("discord.js");
const { Dislikes } = require("../dbObjects.js");
const { addUser } = require("../functions/addUser.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setdislikes")
        .setDescription("Set your 5 likes")
        .addStringOption((option) =>
            option.setName("dislike_1").setDescription("Dislike #1")
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
        await addUser({
            user_id: interaction.user.id,
            username: interaction.user.tag,
            nickname: interaction.user.username,
        });

        const l1 = interaction.options.getString("dislike_1");
        const l2 = interaction.options.getString("dislike_2");
        const l3 = interaction.options.getString("dislike_3");
        const l4 = interaction.options.getString("dislike_4");
        const l5 = interaction.options.getString("dislike_5");

        // remove all old dislikes
        await Dislikes.destroy({
            where: {
                user_id: interaction.user.id,
            },
        });

        // create dislikes if they exist
        if (l1) {
            await Dislikes.create({ user_id: interaction.user.id, value: l1 });
        }
        if (l2) {
            await Dislikes.create({ user_id: interaction.user.id, value: l2 });
        }
        if (l3) {
            await Dislikes.create({ user_id: interaction.user.id, value: l3 });
        }
        if (l4) {
            await Dislikes.create({ user_id: interaction.user.id, value: l4 });
        }
        if (l5) {
            await Dislikes.create({ user_id: interaction.user.id, value: l5 });
        }

        return await interaction.reply({
            content: `Hello ${interaction.user.username}, Your dislikes have been set to: ${l1}, ${l2}, ${l3}, ${l4}, ${l5}`,
            ephemeral: true,
        });
    },
};
