const fsProm = require('fs/promises');

const dirInside = fsProm.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true});
let result = [];
dirInside.then(filenames => {
    for (let filename of filenames) {
        if(filename.isFile())
            result.push(filename.name.split('.'));
    }

    for (let i=0; i<result.length; i++) {
        const fileInfo = fsProm.stat(`./03-files-in-folder/secret-folder/${result[i][0]}.${result[i][1]}`);
        fileInfo.then(data => {
            console.log(`${result[i][0]} - ${result[i][1]} - ${(data.size/1024).toFixed(3)}kb`);
        });
    }
});
