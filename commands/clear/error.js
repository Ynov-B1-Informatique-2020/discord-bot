const { embed } = require("./embed");

function errorHandler(amount, channel) {
    if (isNaN(amount) || (amount <= 0)) {
        channel.send(embed("Clear", "Please, enter a valid number"));
        return true;
    }

    if (!amount) {
        channel.send(embed("Clear", "You didn't say how many messages do you want to clear."))
        return true;
    }

    if (amount > 100) {
        channel.send(embed("Clear", "You can't delete more than 100 messages."));
        return true;
    }
    return false;
}

module.exports = {
    error: errorHandler,
}