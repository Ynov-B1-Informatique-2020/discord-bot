const { execute, stop, skip, pause, resume, queue } = require("./controller")

const playlist = new Map()

module.exports = {

    description: "Play the music that makes you happy",
    usage: "play, pause, resume, stop, skip (slide), queue",
    aliases: [],
    async execute(message) {

        const args = message.argsRaw
        const action = args[0]
        args.shift()
        const musicUrl = args.join(" ")

        const servQueue = playlist.get(message.event.guild.id)

        switch (action) {
            case "play":
            case "p":
                await execute(playlist, message, servQueue, musicUrl)
                break
            case "skip":
            case "slide":
                await skip(playlist, message, servQueue, action)
                break
            case "stop":
            case "s":
                await stop(playlist, message, servQueue)
                break
            case "pause":
                await pause(playlist, message, servQueue)
                break
            case "resume":
                await resume(playlist, message, servQueue)
                break
            case "queue":
            case "q":
                await queue(message, servQueue)
                break
            default:
                message.event.channel.send(":x: Commande non valide")
        }
    }

}



