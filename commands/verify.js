const APIs = require('../APIs/APIs.js');

module.exports = {
    name: 'verify',
    aliases: ['v'],
    description: 'Verifies users in channel with verification codes.',
    execute(message, Client) {
        if (message.author.username == "skjhfds") {
            APIs.verify(message, Client);
        } else {
            message.channel.send("You do not have permission to use this command!");
        }
    }
}