const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'help',
    description: 'Show help commands.',
    execute(cmd) {
        const { commands } = cmd.msg.client;
        const embed = new MessageEmbed()
            .setTitle("Here's a list of all my commands:")
            .setDescription(commands.map(cmd => `**${cmd.name}**: ${cmd.description}`).join("\n"));

        cmd.msg.reply(embed)
    },
};