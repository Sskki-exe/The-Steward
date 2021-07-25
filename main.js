const discordToken = 'ODU3NTQ4NzE0MDI5ODc1MjEx.YNRMeQ.zF58I_6q2It4rc7D815hIMh9i44';
const tapeCarID = '857562855694663701';
const engineID = '857319136749289522';
const momID = '868931989418430526';

/**
 * Initialise
 */
const Discord = require('discord.js'); // Import Discord module
const client = new Discord.Client(); // Create bot instance

// import commands folder
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// start bot
client.login(discordToken);

/**
 * On Ready
 */
client.once('ready', () => {
    console.log('Steward is online!');
});

/**
 * While Running
 */
client.on('message', message => {
    // ignore self
    if (message.author.bot) {
        console.log('  bot: ' + message.content);
        return
    }
    const args = message.content.split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command && message.author.username == "skjhfds") {
        console.log(`  ${message.author.username} -${command}: ${args}`);
        command.execute(message, args);
    } else {
        console.log(`${message.author.username}: ${message.content}`);
        switch (cmd){
            case "hello":
            case "hi":
                message.channel.send("Hello!");
        }
    }
})