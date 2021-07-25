module.exports = {buzz};
function buzz(message){
    console.log(`${message.author.username}: ${message.content}`);
}