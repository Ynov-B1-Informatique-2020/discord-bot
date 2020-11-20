const { embed } = require("./embed");
const { error } = require("./error");

module.exports = {
    description: 'Delete the selected amount of messages (needs MANAGE_MESSAGES permission)',
    usage: '[amount]',

    execute(opts) {
        let message = opts.event;
        let channel = message.channel;
        let amount = opts.argsRaw[0];

        if (error(amount, channel)) { //stop the program if an error is caught
            return;
        }

        const member = message.guild.members.cache.get(message.author.id);
        if (!member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(embed("Clear", "You don't have the permissions to use this command"));
            return;
        } else {
            message.delete(); //delete the command message
            //fetch and delete the messages
            message.channel.messages.fetch({ limit: amount })
                .then(messages => {
                    message.channel.bulkDelete(messages)
                });

            //create the embed
            const { Client, MessageEmbed } = require('discord.js');
            const embed = new MessageEmbed()
                .setTitle("Clear")
                .setColor(0xcbe330)
                .setDescription(amount + " messages has been deleted !")
                .setFooter("Command by: " + message.member.displayName, message.author.avatarURL())
                .setTimestamp(new Date())

            //send the embed
            channel.send(embed)
                .then(function(message) {
                    setTimeout(function() {
                        message.delete();
                    }, 3000);
                })
        }
    }
}