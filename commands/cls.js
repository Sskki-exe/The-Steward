module.exports = {
    name: 'cls',
    description: 'Clears all messages in channel.',
    execute(message) {
        if (message.author.username == "skjhfds") {
            message.channel.bulkDelete(100)
                .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
                .catch(console.error);
        } else {
            message.channel.send("You do not have permission to use this command!");
        }
    }
}