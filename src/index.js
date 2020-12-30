const discord = require('discord.js')
const CommandReader = require("./commandReader")
const fs = require('fs');

const client = new discord.Client()
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cmdReader = new CommandReader(client.commands)

client.once('ready', () => {
    console.log("Enjoyer Code Bot is ready...")
    console.log(client.commands)
})

client.on('message', message => {
    cmdReader.read(message)
})

client.login(process.env.DC_BOT_TOKEN)