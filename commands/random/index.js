const {dispHelp} = require("./help");
const {randInt, randFloat} = require("./randnbr");
const {randList, randPeople} = require("./randtext");

module.exports = {
    description: 'Bot gives a random number, between the specified bounds if they exist',
    usage: '<type> [params]',
    aliases: ['rdm'],
    execute(opts) {
        let args = opts.argsRaw;
        let chan = opts.event.channel;
        if (args.length > 0) {
            let rep = 1;
            if (args[0].startsWith("--loop=") && args[0].length > 7) {
                rep = Number(args[0].substring(7));
                if (isNaN(rep) || rep < 1) {
                    chan.send("Loop iteration range isn't valid !");
                    return;
                }
                if (rep > 20) {
                    rep = 20;
                }
                console.log("Loop:", rep);
                args = args.slice(1);
            }
            for (let i = 0; i < rep; i++) {
                switch (args[0]) {
                    case "int":
                        randInt(args, chan);
                        break
                    case "float":
                        randFloat(args, chan);
                        break
                    case "list":
                    case "liste":
                        randList(args, chan);
                        break
                    case "people":
                    case "gens":
                    case "players":
                        randPeople(args, chan, opts.event);
                        break
                    default:
                        dispHelp(chan)
                        break
                }
            }
        } else {
            dispHelp(chan);
        }
    }
}
