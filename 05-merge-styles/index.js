const fs = require('fs');
const fsProm = require('fs/promises');

const writer = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');

let cssFileNames = [];

const files = fsProm.readdir(`${__dirname}/styles`, {withFileTypes: true}).then(data => {
    for (let file of data) {
        if(file.isFile() && file.name.split('.')[1] === 'css')
            cssFileNames.push(file.name);
    }

    let readers = [];

    for (let i=0; i<cssFileNames.length; i++) {
        readers.push(fs.createReadStream(`${__dirname}/styles/${cssFileNames[i]}`));
        readers[i].pipe(writer);
    }
});
