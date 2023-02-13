const fs = require("node:fs"); // is used to read the commands directory and identify our fscommand files.
const path = require("node:path"); // helps construct paths to access files and directories.
const { Shuffle, UserShuffle, Users, Likes, Dislikes} = require('./dbObjects.js');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
// const db = require("./dbContext");

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

// load events file path and get any files ending in js as an array
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

// loop through each file in event file array
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
		// // init DB Connection
        // db.authenticate()
        //     .then(() => {
        //         console.log("Logged in to DB!");
        //     })
        //     .catch((err) => console.log(err));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

// reads the path to the directory and
// returns an array of all the file names it contains.
// removes any non-JavaScript files from the array. with array.filter
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

// loop over the array and dynamically set
// each command into the client.commands Collection
for (const file of commandFiles) {
    // construct a path to the commands directory
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Set a new item in the Collection with the key
    // as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Log in to Discord with your client's token
client.login(token);
