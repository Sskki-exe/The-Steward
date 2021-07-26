const motherID = '868931989418430526';
const tapeCarID = '857562855694663701';
/**
 * Initialise
 */
const Discord = require('discord.js'); // Import Discord module
const client = new Discord.Client(); // Create bot instance

// get token
const fs = require('fs');
fs.readFile('token.txt', 'utf-8', (err, data) => {
    if (err) throw err;    
    client.login(data);// start bot
})

// import commands folder
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/**
 * On Ready
 */
client.once('ready', () => {
    console.log('Steward is online!');
});

/**
 * While Running
 */
const buzz = require('./buzz.js');
client.on('message', message => {
    // ignore self
    if (message.author.bot) {
        console.log('  bot: ' + message.content);
        return
    }
    const args = message.content.split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command && (message.channel == motherID || message.channel == tapeCarID)) {
        console.log(`  ${message.author.username} -${cmd}: ${args}`);
        command.execute(message, args);
    } else {
        buzz.buzz(message);        
    }
})