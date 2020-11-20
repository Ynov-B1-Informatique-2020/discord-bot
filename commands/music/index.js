const ytdl = require("ytdl-core")
const discord = require("discord.js")

const queue = new Map()

module.exports = async function (message) {

    const args = message.argsRaw
    const action = args[0]
    args.shift()
    const musicUrl = args.join(" ")

    const servQueue = queue.get(message.event.guild.id)

    switch (action) {
        case "play":
        case "p":
            await execute(message, servQueue, musicUrl)
            break
        case "skip":
        case "slide":
            await skip(message, servQueue, action)
            break
        case "stop":
        case "s":
            await stop(message, servQueue)
            break
        case "queue":
        case "q":
            await list(message, servQueue)
            break
        case "forward":
        case "fwd":
            await forward(message, servQueue)
            break
        default:
            message.event.channel.send(":x: Commande non valide")
    }

}

async function execute(message, servQueue, musicUrl) {

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
            play(message.event.guild, queueConstruct.musics[0])

        } catch (e) {
            console.log(e)
            return message.event.channel.send(new discord.MessageEmbed()
                .setTitle(":x: Une erreur est survenue"))
        }

    } else { // Add queue
        servQueue.musics.push(music)
        console.log("add queue : " + servQueue.musics)
        return message.event.channel.send(new discord.MessageEmbed()
            .setTitle("Musique ajoutée à la file d'attente :tickets:")
            .setDescription(music.title + " - " + music.author))
    }

}

function play(guild, music) {

    const musicPlayed = queue.get(guild.id)

    const player = musicPlayed.connection
        .play(ytdl(music.url, {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25

        })).on("finish",  () => {
            musicPlayed.musics.shift()
            play(guild, musicPlayed.musics[0])

        }).on("error", e => console.log(e))
    player.setVolume(1)

    return musicPlayed.textChannel.send(new discord.MessageEmbed()
        .setTitle("Musique actuelle :cd: :point_down:")
        .setDescription(`${music.title} - ${music.author}`))

}

function skip(message, servQueue, action) {

    if(servQueue.musics.length > 1) {
        message.event.channel.send(new discord.MessageEmbed().setTitle(`On ${action}, c'est pas ouf :unamused:`))
        servQueue.connection.dispatcher.end()
    }

}

function stop(message, servQueue) {

    if(servQueue.musics.length === 1) {
        message.event.channel.send(new discord.MessageEmbed().setTitle(":octagonal_sign: On stop ici"))
        queue.get(message.event.guild.id).musics = []
        queue.get(message.event.guild.id).connection.dispatcher.end()
    }

}

function list(message, servQueue) {

    try {
        const musicsList = servQueue.musics.map((music, index) => {
            return index === 0 ? `:headphones: *[playing]* **${music.title}** - *${music.author}*` : `**${music.title}** - *${music.author}*`
        })
        message.event.channel.send(new discord.MessageEmbed()
            .setTitle(":cd: Voici la file d'attente")
            .setDescription(musicsList.join("\n\n")))
    } catch (e) {
        return message.event.channel.send(new discord.MessageEmbed()
            .setTitle(":x: Joue une musique pour faire cette commande"))
    }

}

function forward(message, servQueue) {

}
