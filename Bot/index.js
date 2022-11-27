const fs = require('node:fs');// is used to read the commands directory and identify our command files.
const path = require('node:path'); // helps construct paths to access files and directories.
require('dotenv').config(); // used for accessing the .env tokens
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.TOKEN; // stores token from .env


// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

// reads the path to the directory and 
// returns an array of all the file names it contains.
// removes any non-JavaScript files from the array. with array.filter
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// loop over the array and dynamically set 
// each command into the client.commands Collection
for (const file of commandFiles) {
	// construct a path to the commands directory
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	// Set a new item in the Collection with the key 
	// as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
};

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

// event that will execute code when your application receives an interaction
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	// logs the interaction for info
	// console.log(interaction);

	// gets the commands interactions
	const command = interaction.client.commands.get(interaction.commandName);
	console.log(command.data.name);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
client.login(TOKEN);