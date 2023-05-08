const fs = require('fs');
const {stdin, stdout} = process;

fs.writeFile("./02-write-file/text.txt", '', function(error) {
    if (error) console.log("Error on creating file №: " + error);
});

const writer = fs.createWriteStream;
console.log("Hello! Write smth you want to store:");

stdin.on('data', data => {
    if(data.toString().toLowerCase() == 'exit\r\n') {
        process.exit(0);
    }
    fs.appendFile("./02-write-file/text.txt", data, function(error) {
        if (error) console.log("Error on creating file №: " + error);
    });
});

process.on('exit', code => {
    if (code === 0) {
        console.log('See u!');
    } else {
        stderr.write(`Ошибка! Программа завершилась с кодом ${code}`);
    }
});

