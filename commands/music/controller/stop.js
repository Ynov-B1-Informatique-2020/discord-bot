module.exports = function stop(queue, message, servQueue) {

    const current = queue.get(message.event.guild.id)

    try {
        message.event.channel.send(new message.Discord.MessageEmbed().setTitle(":octagonal_sign: On stop ici"))
        current.musics = []
        current.connection.dispatcher.end()
        current.connection.disconnect()
    } catch (e) {
        current.connection.disconnect()
    }

}
