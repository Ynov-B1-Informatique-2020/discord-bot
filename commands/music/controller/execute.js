const ytdl = require("ytdl-core")
const { play } = require("./")

module.exports = async function execute(queue, message, servQueue, musicUrl) {

    const voiceChannel = message.event.member.voice.channel

    if (!voiceChannel) {
        return message.event.channel.send(":relieved: Un DJ a besoin d'un public")
    }

    const permissions = voiceChannel.permissionsFor(message.event.client.user)
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.event.channel.send(":thinking: Il semble que je ne sois pas autorisé à entrer")
    }

    const musicInfo = await ytdl.getInfo(musicUrl)
    const music = {
        title: musicInfo.videoDetails.title,
        url: musicInfo.videoDetails.video_url,
        author: musicInfo.videoDetails.author.name
    }

    if (!servQueue) { // 0 music in queue, let's play

        const queueConstruct = {
            textChannel: message.event.channel,
            voiceChannel: voiceChannel,
            connection: null,
            musics: [],
            volume: 1,
            playing: true,
        }

        queue.set(message.event.guild.id, queueConstruct);
        queueConstruct.musics.push(music);

        try {

            queueConstruct.connection = await voiceChannel.join()

            console.log("play : " + queueConstruct.musics[0])
            play(queue, message, message.event.guild, queueConstruct.musics[0])

        } catch (e) {
            console.log(e)
            return message.event.channel.send(new message.Discord.MessageEmbed()
                .setTitle(":x: Une erreur est survenue"))
        }

    } else { // Add queue
        servQueue.musics.push(music)
        console.log("add queue : " + servQueue.musics)
        return message.event.channel.send(new message.Discord.MessageEmbed()
            .setTitle("Musique ajoutée à la file d'attente :tickets:")
            .setDescription(music.title + " - " + music.author))
    }

}
