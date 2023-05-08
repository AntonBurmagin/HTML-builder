const fs = require('fs');
const fsProm = require('fs/promises');
const { dirname } = require('path');

function copyDir(){
    let filesForCopy = [];
    fs.mkdir(`${__dirname}/files-copy`, { recursive: true }, (err) => {
        if (err) console.error("Directory wasn't created, err № " + err);
    });
    fsProm.readdir(`${__dirname}/files`, {withFileTypes: true}).then(data => {
        for (let file of data) {
            if(file.isFile())
                filesForCopy.push(file.name);
        }

        fsProm.readdir(`${__dirname}/files-copy`).then(data => {
            let filesAlreadyCopied = data;
            for (let file of filesAlreadyCopied) {
                if (!filesForCopy.includes(file))
                    fs.unlink(`${__dirname}/files-copy/${file}`, (err) => {
                        if (err) console.error(err);
                    });
            }
        })
        for (let file of filesForCopy) {
            fs.copyFile(`${__dirname}/files/${file}`, `${__dirname}/files-copy/${file}`, (err) => {
                if (err) console.error(err);
            });
        } 
    });
}

copyDir();
