function toMorse(msg) {
    var ref = {
        ' ': '/',
        'a': '.-',
        'b': '-...',
        'c': '-.-.',
        'd': '-..',
        'e': '.',
        'f': '..-.',
        'g': '--.',
        'h': '....',
        'i': '..',
        'j': '.---',
        'k': '-.-',
        'l': '.-..',
        'm': '--',
        'n': '-.',
        'o': '---',
        'p': '.--.',
        'q': '--.-',
        'r': '.-.',
        's': '...',
        't': '-',
        'u': '..-',
        'v': '...-',
        'w': '.--',
        'x': '-..-',
        'y': '-.--',
        'z': '--..',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        '0': '-----'
    };
    return msg
        .join(' ')
        .toLowerCase()
        .split('')
        .map(
            a => ref[a]
        ).join(' ');
}

module.exports = {
    name: 'say',
    aliases: ['s', 'repeat'],
    description: 'Returns args in morse code.',
    execute(message, args) {
        let output = toMorse(args);
        if (output == '') {
            message.channel.send('. -- .--. - -.--');
        } else {
            message.channel.send(output);
        }
    }
}