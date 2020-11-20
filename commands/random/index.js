const discord = require("discord.js")

module.exports = {
    description: 'Bot gives a random number, between the specified bounds if they exist',
    usage: 'random <type> <params>',
    aliases: ['rdm'],
    execute(opts) {
        let args = opts.argsRaw;
        let chan = opts.event.channel;
        if (args.length > 0) {
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
                default:
                    dispHelp(chan)
                    break
            }
        } else {
            dispHelp(chan);
        }
    }
}

function dispHelp(chan) {
    try {
        let embed = new discord.MessageEmbed().setTitle("Usage - random").setDescription("!random <type> <params>").setColor("#9F4839");
        embed.addField("int", "[x:y]");
        embed.addField("list", "<item1> [item2] [item3] [...]");
        chan.send(embed);
    } catch (e) {
        console.log("Error:", e);
    }
}

function randInt(args, chan) {
    if (args.length === 1) {
        chan.send("`" + Math.floor(Math.random() * Math.random() * 100) + "`");
    } else if (args.length === 2) {
        if (args[1].length < 3) {
            chan.send("Usage: !random <int/...> [x-y]");
            return;
        }
        let setPos = args[1].indexOf(":");
        let min = 0, max = 0;
        if (setPos !== -1 && setPos !== 0 && setPos !== args[1].length - 1) {
            min = Number(Number(args[1].substring(0, setPos)).toFixed());
            max = Number(Number(args[1].substring(setPos + 1)).toFixed());
        } else {
            return;
        }
        if (isNaN(min)) {
            chan.send(args[1].substring(0, setPos) + " is not a valid number !");
            return;
        }
        if (isNaN(max)) {
            chan.send(args[1].substring(setPos + 1) + " is not a valid number !");
            return;
        }
        console.info("Min:", min, "/ Max:", max);
        if (max <= min) {
            chan.send("The upper bound must be greater than the lower bound !");
            return;
        }
        let adjustedHigh = (max - min) + 1;
        let nbr = Math.floor((Math.random() * adjustedHigh) + min);
        let strNbr = String(nbr).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        chan.send("`" + strNbr + "`");
    } else {
        chan.send("Usage: !random int [x:y]");
    }
}

function randFloat(args, chan) {
    if (args.length === 1) {

    }
}

function randList(args, chan) {
    if (args.length < 2) {
        chan.send("Usage: !random list item1 item2 item3 ...");
    } else if (args.length === 2) {
        chan.send("`" + args[1] + "`");
    } else {
        let items = args.slice(1);
        for (let i = 0; i < 10; i++) {
            let n = Math.floor((Math.random() * items.length));
            chan.send("`" + items[n] + "`");
        }

    }
}
