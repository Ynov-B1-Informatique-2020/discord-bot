module.exports = function list(message, servQueue) {

    try {
        const musicsList = servQueue.musics.map((music, index) => {
            return index === 0 ? `:headphones: *[playing]* **${music.title}** - *${music.author}*` : `**${music.title}** - *${music.author}*`
        })
        message.event.channel.send(new message.Discord.MessageEmbed()
            .setTitle(":cd: Voici la file d'attente")
            .setDescription(musicsList.join("\n\n")))
    } catch (e) {
        return message.event.channel.send(new message.Discord.MessageEmbed()
            .setTitle(":x: Joue une musique pour faire cette commande"))
    }

}
