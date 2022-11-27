const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
} = require("discord.js");

// event that will execute code when your application receives an interaction
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        // logs the interaction for info
        // console.log(interaction);

        // gets the commands interactions
        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            // executes the specific command
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};
