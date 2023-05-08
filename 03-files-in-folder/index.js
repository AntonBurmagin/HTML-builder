const fsProm = require('fs/promises')
const path = require('path');
const dirInside = fsProm.readdir('./03-files-in-folder/secret-folder', {withFileTypes: true});

dirInside.then(filenames => {
    for (let filename of filenames) {
        if(filename.isFile())
            console.log(filename);
    }
});
