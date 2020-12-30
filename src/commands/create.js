const Jimp = require("jimp")

let textData = {
    firstX: 220,
    firstMaxWidth: 160,
    secondX: 610,
    secondMaxWidth: 130
};

let imgRaw = "template/empty.png";
let imgExported = "out/out.png";

module.exports = {
    name: 'create',
    description: 'Create an enjoyer meme.',
    execute(cmd) {
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
            .then(() => cmd.msg.reply("Here is your meme", { files: [imgExported] }))
            .catch(function(err) {
                console.error(err);
            });
    },
};