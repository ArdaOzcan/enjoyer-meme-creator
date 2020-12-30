const { prefix } = require('./config.json');
const splitargs = require('splitargs');

class Command {
    constructor(message) {
        this.args = splitargs(message.content)
        this.msg = message
        if (this.args.length != 0) {
            if (this.args[0].startsWith(prefix))
                this.name = this.args[0].trim().substr(prefix.length)
            else
                this.name = this.args[0].trim()
        }
    }
}

module.exports = class CommandReader {
    constructor(commands) {
        this.commands = commands
    }

    read(message) {
        if (!message.content.startsWith(prefix) || message.author.bot || !message) return;
        this.executeCommand(new Command(message))
    }

    executeCommand(cmd) {
        try {
            this.commands.get(cmd.name).execute(cmd);
        } catch (error) {
            console.log("Unknown command: " + cmd.name);
        }
    }
}