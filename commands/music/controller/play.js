const ytdl = require("ytdl-core")

module.exports = function play(queue, message, guild, music) {

    const musicPlayed = queue.get(guild.id)

    const player = musicPlayed.connection

    console.log("Music url :", music.url)

    if (music.url) {
        player.play(ytdl(music.url, {
            filter: "audioonly",
            quality: "highestaudio",
            highWaterMark: 1 << 25
        })).setVolume(1)
    } else {
        stop()
    }

    player.on("finish",  () => {
        musicPlayed.musics.shift()
        play(queue, guild, musicPlayed.musics[0])
    }).on("error", e => console.log(e))

    return musicPlayed.textChannel.send(new message.Discord.MessageEmbed()
        .setTitle("Musique actuelle :cd: :point_down:")
        .setDescription(`${music.title} - ${music.author}`))

}
