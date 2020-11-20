function embedMessage(title, message) {
    const { Client, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
        .setTitle(title)
        .setColor(0xcbe330)
        .setDescription(message)
    return embed;
}


module.exports = {
    embed: embedMessage,
}