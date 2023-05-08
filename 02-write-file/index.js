const fs = require('fs');
const {stdin, stdout} = process;

// creating empty file
fs.writeFile("./02-write-file/text.txt", '', function(error) {
    if (error) console.log("Error on creating file №: " + error);
});

const writer = fs.createWriteStream("./02-write-file/text.txt");
console.log("Hello! Write smth you want to store:");

stdin.on('data', data => {
    if(data.toString() === 'exit\r\n')
        process.exit(0);
    writer.write(data);
});

process.on('exit', code => {
    if (code === 0) {
        console.log('See u!');
    } else {
        stderr.write(`Error, program end with code: ${code}`);
    }
});

// ловим выход через Ctrl + C
process.on('SIGINT', () => {
    process.exit(0);
});