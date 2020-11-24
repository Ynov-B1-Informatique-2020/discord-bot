const {dispHelp} = require("./help");

function randInt(args, chan) {
    if (args.length === 1) {
        chan.send("`" + Math.floor(Math.random() * Math.random() * 100) + "`");
    } else if (args.length === 2) {
        if (args[1].length < 3) {
            dispHelp(chan, "int");
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
        if (max <= min) {
            chan.send("The upper bound must be greater than the lower bound !");
            return;
        }
        let adjustedHigh = (max - min) + 1;
        let nbr = Math.floor((Math.random() * adjustedHigh) + min);
        let strNbr = String(nbr).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        chan.send("`" + strNbr + "`");
    } else {
        dispHelp(chan, "int");
    }
}

function randFloat(args, chan) {
    if (args.length === 1) {
        chan.send("`" + Math.random() * Math.random() * 100 + "`");
    } else if (args.length === 2) {
        if (args[1].length < 3) {
            dispHelp(chan, "float");
            return;
        }
        let setPos = args[1].indexOf(":");
        let min = 0.0, max = 0.0;
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
        if (max <= min) {
            chan.send("The upper bound must be greater than the lower bound !");
            return;
        }
        let adjustedHigh = (max - min) + 1;
        let nbr = (Math.random() * adjustedHigh) + min;
        let strNbr = String(nbr).split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "." + String(nbr).split(".")[1];
        chan.send("`" + strNbr + "`");
    } else {
        dispHelp(chan, "float");
    }
}

module.exports = {
    randInt,
    randFloat,
}
