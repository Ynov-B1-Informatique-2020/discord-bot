module.exports = function resume(queue, message, servQueue) {
    if(servQueue.musics.length >= 1) {
        message.event.channel.send(new message.Discord.MessageEmbed().setTitle(":cd: Et c'est reparti !"))
        queue.get(message.event.guild.id).connection.dispatcher.resume()
    }
}
