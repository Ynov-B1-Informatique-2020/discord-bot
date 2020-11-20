module.exports = function pause(queue, message, servQueue) {
    if(servQueue.musics.length >= 1) {
        message.event.channel.send(new message.Discord.MessageEmbed().setTitle(":cocktail: On fait une pause"))
        queue.get(message.event.guild.id).connection.dispatcher.pause(true)
    }
}
