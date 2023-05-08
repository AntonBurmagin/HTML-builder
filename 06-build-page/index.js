const fs = require('fs');
const {stdin, stdout} = process;
const fsProm = require('fs/promises');

fs.mkdir(`${__dirname}/project-dist`, { recursive: true }, (err) => {
    if (err) console.error("Directory wasn't created, err № " + err);
});

// CSS bundle start
const writer = fs.createWriteStream(`${__dirname}/project-dist/style.css`);

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
    let text = data;
    
    // search tags for replacement
    let tags = [];
    for (let i=0; i<text.length-1; i++) {
        if (text[i] === '{' && text[i+1] ==='{') {
            let j = 0;
            for ( ; i+j <text.length-1; j++) {
                if (text[i+j]==='}' && text[i+j+1] === '}') {
                    tags.push(text.substring(i, i+j+2));
                    i += j;
                    break;
                }
            }
        }
    }

    for (let tag of tags) {
        fs.readFile(`${__dirname}/components/${tag.substring(2, tag.length-2)}.html`,
            'utf-8',
            (err, componentData) => {
                text = text.replace(tag, componentData);
                
                fs.writeFile(`${__dirname}/project-dist/index.html`, text, (err) => {
                    if (err) return console.error('Error on writing to file - ' +err);
                });
        });
    }
});

// copying assets
function copyDir(src, destination){
    fs.mkdir(`${destination}`, { recursive: true }, (err) => {
        if (err) console.error("Directory wasn't created, err № " + err);
    });
    let filesForCopy = [];
    
    fsProm.readdir(`${src}`, {withFileTypes: true}).then(data => {
        for (let file of data) {
            if(file.isFile()) {
                filesForCopy.push(file.name);
            } else if (file.isDirectory) {
                copyDir(`${src}/${file.name}`, `${destination}/${file.name}`);
            }
        }

        fsProm.readdir(`${destination}`, {withFileTypes: true}).then(data => {
            let filesAlreadyCopied = [];
            for (let file of data) {
                if(file.isFile())
                    filesAlreadyCopied.push(file.name);
            }
            for (let file of filesAlreadyCopied) {
                if (!filesForCopy.includes(file))
                    fs.unlink(`${destination}/${fileExist}`, (err) => {
                        if (err) console.error(err);
                    });
            }
        })
        for (let file of filesForCopy) {
            fs.copyFile(`${src}/${file}`, `${destination}/${file}`, (err) => {
                if (err) console.error(err);
            });
        } 
    });
}


copyDir(`${__dirname}/assets`, `${__dirname}/project-dist/assets`)