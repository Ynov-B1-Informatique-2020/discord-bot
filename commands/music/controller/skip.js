const { stop } = require("./")

module.exports = function skip(queue, message, servQueue, action) {

    if(servQueue.musics.length > 1) {
        message.event.channel.send(new message.Discord.MessageEmbed().setTitle(`On ${action}, c'est pas ouf :unamused:`))
        servQueue.connection.dispatcher.end()
    } else {
        stop(queue, message, servQueue)
    }

}
