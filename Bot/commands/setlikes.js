const { SlashCommandBuilder } = require("discord.js");
const { Likes } = require("../dbObjects.js");
const { addUser } = require("../functions/addUser.js");

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
        await addUser({
            user_id: interaction.user.id,
            username: interaction.user.tag,
            nickname: interaction.user.username,
        });
        const l1 = interaction.options.getString("like_1");
        const l2 = interaction.options.getString("like_2");
        const l3 = interaction.options.getString("like_3");
        const l4 = interaction.options.getString("like_4");
        const l5 = interaction.options.getString("like_5");

        // remove all old likes
        await Likes.destroy({
            where: {
                user_id: interaction.user.id,
            },
        });

        // create likes if they exist
        if (l1) {
            await Likes.create({ user_id: interaction.user.id, value: l1 });
        }
        if (l2) {
            await Likes.create({ user_id: interaction.user.id, value: l2 });
        }
        if (l3) {
            await Likes.create({ user_id: interaction.user.id, value: l3 });
        }
        if (l4) {
            await Likes.create({ user_id: interaction.user.id, value: l4 });
        }
        if (l5) {
            await Likes.create({ user_id: interaction.user.id, value: l5 });
        }

        return await interaction.reply({
            content: `Hello ${interaction.user.username}, Your likes have been set to: ${l1}, ${l2}, ${l3}, ${l4}, ${l5}`,
            ephemeral: true,
        });
    },
};
