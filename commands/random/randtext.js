const fs = require('fs');
const path = require('path');
const {dispHelp, dispResult} = require("./display");

function randList(args, chan) {
    if (args.length < 2) {
        dispHelp(chan, "list");
    } else if (args.length === 2) {
        // chan.send("`" + args[1] + "`");
        dispResult(chan, "List", args[1], ["*" + args[1] + "*"]);
    } else {
        let items = args.slice(1);
        let n = Math.floor((Math.random() * items.length));
        // chan.send("`" + items[n] + "`");
        dispResult(chan, "List", items[n], ["Given list"]);
    }
}

function randPeople(args, chan, event) {
    if (args.length !== 2) {
        dispHelp(chan, "people");
    } else {
        let people = [];
        let bounds = String();
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
                if (args[1] === "everyone") {
                    bounds = "Everyone";
                } else if (args[1] === "connected") {
                    bounds = "Everyone connected";
                }
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
                bounds = "People in vocal"
                break;
            default:
                dispHelp(chan, "people");
                return;
        }
        if (people.length < 1) {
            chan.send("Nobody was found");
        } else {
            let n = Math.floor(Math.random() * people.length);
            // chan.send(people[n]);
            dispResult(chan, "People", people[n], [bounds]);
        }
    }
}

function randMrl(args, chan) {
    if (args.length === 1) {
        let file = path.join(__dirname, 'mrl.txt');
        fs.readFile(file, function (err, data) {
            if (err) throw err;
            let lines = data.toLocaleString().split('\n');
            let n = Math.floor(Math.random() * (lines.length-1));
            // console.log("n=" + n, "Lines:", lines);
            // chan.send(lines[n]);
            dispResult(chan, "Mrl", lines[n], ["Mrl file content"]);
        });
    } else {
        dispHelp(chan, "mrl");
    }
}

module.exports = {
    randList,
    randPeople,
    randMrl,
}
