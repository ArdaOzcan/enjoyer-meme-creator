const { prefix } = require('./config.json');
const { list: helpList } = require('./help.json')
const Jimp = require("jimp")
const splitargs = require('splitargs');

class Command {
    constructor(message) {
        this.args = splitargs(message.content)
        console.log(this.args)
        this.textChannel = message.channel
        if (this.args.length != 0) {
            this.name = this.args[0]
        }
    }
}

module.exports = class CommandReader {
    read(message) {
        if (!message.content.startsWith(prefix) || message.author.bot || !message) return;
        this.executeCommand(new Command(message))
    }

    executeCommand(cmd) {
        switch (cmd.name) {
            case "!create":
                let textData = {
                    firstX: 220,
                    firstMaxWidth: 160,
                    secondX: 610,
                    secondMaxWidth: 130
                };

                let imgRaw = "private/empty.png";
                let imgExported = "out/out.png";
                var loadedImage;

                Jimp.read(imgRaw)
                    .then(function(image) {
                        loadedImage = image;
                        return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
                    })
                    .then(function(font) {
                        loadedImage.print(font, textData.firstX, 0, cmd.args[1], textData.firstMaxWidth)
                            .print(font, textData.secondX, 0, cmd.args[2], textData.secondMaxWidth)
                            .write(imgExported);
                    })
                    .then(() => cmd.textChannel.send("Here is you meme", { files: [imgExported] }))
                    .catch(function(err) {
                        console.error(err);
                    });

                break;
            case "!help":
                const keys = Object.keys(helpList)
                const values = Object.values(helpList)
                for (let index = 0; index < keys.length; index++) {
                    const key = keys[index];
                    const value = values[index];
                    cmd.textChannel.send(`>>> **${key}** : ${value}`)
                }
                break;
        }
    }
}