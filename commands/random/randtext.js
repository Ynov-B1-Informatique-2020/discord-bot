const {dispHelp} = require("./help");

function randList(args, chan) {
    if (args.length < 2) {
        dispHelp(chan, "list");
    } else if (args.length === 2) {
        chan.send("`" + args[1] + "`");
    } else {
        let items = args.slice(1);
        let n = Math.floor((Math.random() * items.length));
        chan.send("`" + items[n] + "`");
    }
}

function randPeople(args, chan, event) {
    if (args.length !== 2) {
        dispHelp(chan, "people");
    } else {
        let people = [];
        switch (args[1]) {
            case "everyone":
            case "connected":
                chan.guild.members.cache.each(m => {
                    if (!m.user.bot) {
                        if (args[1] === "connected") {
                            if (m.user.presence.status === "online" || m.user.presence.status === "dnd") {
                                people.push(m.nickname ?? m.user.username);
                            }
                        } else {
                            people.push(m.nickname ?? m.user.username);
                        }
                    }
                });
                break;
            case "vocal":
                if (event.member.voice.channel != null) {
                    let voiceChan = event.member.voice.channel;
                    voiceChan.members.each(m => {
                        people.push(m.nickname ?? m.user.username);
                    });
                } else {
                    chan.send("You must be in a voice channel !");
                    return;
                }
                break;
            default:
                dispHelp(chan, "people");
                return;
        }
        if (people.length < 1) {
            chan.send("Nobody was found");
        } else {
            let n = Math.floor(Math.random() * people.length);
            chan.send(people[n]);
        }
    }
}

module.exports = {
    randList,
    randPeople,
}
