const { SlashCommandBuilder } = require("discord.js");
const { updateAnimeList } = require("../functions/updateAnimeList.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setanimeurl")
        .setDescription(
            "Set a link to your animelist website or info on shows you've watched"
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
        await updateAnimeList({
            user_id: interaction.user.id,
            username: interaction.user.tag,
            nickname: interaction.user.username,
            anime_list_url: url,
        });

        return await interaction.reply({
            content: `Hello ${interaction.user.username}, Your anime list url has been set to: \n > ${url}`,
            ephemeral: true,
        });
    },
};
