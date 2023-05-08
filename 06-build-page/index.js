const fs = require('fs');
const {stdin, stdout} = process;
const fsProm = require('fs/promises');

fs.mkdir(`${__dirname}/project-dist`, { recursive: true }, (err) => {
    if (err) console.error("Directory wasn't created, err № " + err);
});

// CSS bundle start
const writer = fs.createWriteStream(`${__dirname}/project-dist/bundle.css`);

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
// CSS bundle end

// creating index.html
fs.readFile(`${__dirname}/template.html`, 'utf-8', (err, data) => {
    if (err) return console.error('Error on reading from file - ' +err);
    
    fs.writeFile(`${__dirname}/project-dist/index.html`, data, (err) => {
        console.log(data);
        if (err) return console.error('Error on writing to file - ' +err);
        
    });

});

