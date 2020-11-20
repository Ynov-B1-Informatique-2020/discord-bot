module.exports = function (opts) {
    let args = opts.argsRaw;
    let chan = opts.event.channel;
    if (args.length > 0) {
        if (args[0] === "int") {
            randInt(args, chan);
        }
    } else {
        chan.send("Usage: !random <int/...> [x:y]");
    }
}

function randInt(args, chan) {
    if (args.length === 1) {
        chan.send(Math.floor(Math.random() * Math.random() * 100));
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
        chan.send(strNbr);
    } else {
        chan.send("Usage: !random int [x:y]");
    }
}
