module.exports = {
    name: 'showBuzz',
    aliases: ['sb','showMeTheBuzz'],
    description: 'Sends JSON of buzz word pairs.',
    execute(message) {
        message.channel.send({ files: ['buzz.json'] });
    }
}