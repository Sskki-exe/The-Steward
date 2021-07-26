const { testing } = require('googleapis/build/src/apis/testing');

module.exports = {buzz};
function buzz(message){
    const msg = message.content;
    console.log(`${message.author.username}: ${msg}`);

    // import buzzes
    const fs = require('fs');
    let buzzes = JSON.parse(fs.readFileSync('buzz.json'));
    
    // check if word in buzzes
    for (const word of msg.split(' ')) {
        console.log(word);
        console.log(typeof(word));
        if (Object.keys(buzzes).includes(word.toLowerCase())){
            message.channel.send(buzzes[word.toLowerCase()]);
        }
    }
}