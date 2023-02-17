const { Events } = require("discord.js");

// When the client is ready, run this code
module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
		// const user = await client.users.fetch('352040458098311168');
		// user.send("Hello");
    },
};
