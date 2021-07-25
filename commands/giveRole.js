module.exports = {
    name: 'gr',
    description: 'This command gives me a Denizen Role',
    execute(message, args) {
        // select user
        // const targetUser = message.mentions.users.first();
        // args.shift();

        const targetUser = '625570970366902292';
        const roleName = "Denizen";

        const {
            guild
        } = message;
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        });
        if (!role) {
            console.log(`No such role as ${roleName}!`);
            return
        }

        console.log(message.author.id);
        const member = guild.members.cache.get(targetUser);
        member.roles.add(role);

        message.reply("Complete!");

        console.log("Complete!");
    }
}