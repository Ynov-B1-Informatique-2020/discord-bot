sha1 = require('js-sha1');
module.exports = function (opts) {
    let args = opts.argsRaw;
    console.log("Args:", typeof args);
    if (args.length > 0) {
        let hash = sha1(args.join(" "));
        opts.event.channel.send("Hash de '" + args.join(" ") + "' en SHA-1: __" + hash + "__");
    } else {
        opts.event.channel.send("Usage: !sha1 <hash>");
    }
}
