const discord = require("discord.js")

function dispHelp(chan, subCmd = "global") {
    try {
        let embed = new discord.MessageEmbed().setColor("#9F4839");
        if (subCmd === "int") {
            embed.setTitle("Random - int").setDescription("!random int [x:y]");
        } else if (subCmd === "float") {
            embed.setTitle("Random - float").setDescription("!random float [x:y]");
        } else if (subCmd === "list") {
            embed.setTitle("Random - list").setDescription("!random list <item1> [item2] [item3] [...]");
        } else if (subCmd === "people") {
            embed.setTitle("Random - list").setDescription("!random people <everyone/connected/vocal>");
        } else if (subCmd === "mrl") {
            embed.setTitle("Random - mrl").setDescription("!random mrl");
        } else {
            embed.setTitle("Usage - random").setDescription("!random <type> <params>");
            embed.addField("int", "[x:y]");
            embed.addField("float", "[x:y]");
            embed.addField("list", "<item1> [item2] [item3] [...]");
            embed.addField("mrl", "just enjoy :)");
        }
        chan.send(embed);
    } catch (e) {
        console.log("Error:", e);
    }
}

function dispResult(chan, type, result, bounds = []) {
    try {
        let embed = new discord.MessageEmbed().setColor("#9F4839");
        embed.setTitle("Random - " + type);
        if (bounds.length > 0) {
            embed.setDescription("Bounds: " + bounds.join(" - "));
        } else {
            embed.setDescription("No bounds");
        }
        embed.setThumbnail("http://pngimg.com/uploads/dice/dice_PNG156.png");
        embed.addField("Result:", "**`" + result + "`**");
        chan.send(embed);
    } catch (e) {
        console.log("Error:", e);
    }
}

module.exports = {
    dispHelp,
    dispResult,
}
