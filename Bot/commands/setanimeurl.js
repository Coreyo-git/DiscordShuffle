const { SlashCommandBuilder } = require("discord.js");
const { updateUserAnimeUrl } = require("../functions/updateUserAnimeUrl.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setanimelisturl")
        .setDescription(
            "Set a link to your anime list website or info on shows you've watched"
        )
        .addStringOption((option) =>
            option
                .setName("url")
                .setRequired(true)
                .setDescription(
                    "e.g.. https://myanimelist.net/animelist/username"
                )
        ),
    async execute(interaction) {
        const url = interaction.options.getString("url");
        await updateUserAnimeUrl(
            {
                user_id: interaction.user.id,
                username: interaction.user.tag,
                nickname: interaction.user.username,
            },
            url
        );

        return await interaction.reply({
            content: `Hello ${interaction.user.username}, Your anime list url has been set to: \n > ${url}`,
            ephemeral: true,
        });
    },
};
