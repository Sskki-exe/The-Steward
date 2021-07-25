const APIs = require('../APIs/APIs.js');

module.exports = {
    name: 'verify',
    aliases: ['v'],
    description: 'Verifies users in channel with verification codes.',
    execute(message,Client) {
        APIs.verify(message,Client);
    }
}