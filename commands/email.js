const APIs = require('../APIs/APIs.js');
module.exports = {
    name: 'email',
    aliases: ['e'],
    description: 'Sends emails to everyone not emailed yet.',
    execute(message) {
        APIs.email(message);
    }
}