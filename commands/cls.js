module.exports = {
    name: 'cls',
    description: 'Clears all messages in channel.',
    execute(message) {
        message.channel.bulkDelete(100)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
        // message.channel.messages.fetch({
        //     limit: 100
        // }).then(messages => {
        //     console.log(`Received ${messages.size} messages`);
        //     //Iterate through the messages here with the variable "messages".
        //     messages.forEach(message => message.delete())
        // });
    }
}