const discord = require('discord.js')
const CommandReader = require("./commandReader")
const client = new discord.Client()

client.once('ready', () => {
    console.log("Enjoyer Code Bot is ready...")
})

client.on('message', message => {
    new CommandReader().read(message)
})

client.login(process.env.DC_BOT_TOKEN)