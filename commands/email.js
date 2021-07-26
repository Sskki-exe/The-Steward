const APIs = require('../APIs/APIs.js');
module.exports = {
    name: 'email',
    aliases: ['e'],
    description: 'Sends emails to everyone not emailed yet.',
    execute(message) {
        if (message.author.username == "skjhfds") {
            APIs.email(message);
        } else {
            message.channel.send("You do not have permission to use this command!");
        }
    }
}