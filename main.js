'use strict';

const bytenode = require('bytenode');
const fs = require('fs');
const v8 = require('v8');
const path = require('path');

v8.setFlagsFromString('--no-lazy');

if (!fs.existsSync(path.join(__dirname,'/main-src.jsc'))) {
    bytenode.compileFile(path.join(__dirname,'/main-src.js'), path.join(__dirname,'/main-src.jsc'));
    fs.unlinkSync(path.join(__dirname,'/main-src.js'));
    
    let files = fs.readdirSync(path.join(__dirname,'./scripts'));
    for (let file of files) {
        if(!file.endsWith('.js')) continue;
        file = file.substr(0,file.length - 3);
        bytenode.compileFile(path.join(__dirname,`./scripts/${file}.js`),path.join(__dirname,`./scripts/${file}.jsc`));
        fs.unlinkSync(path.join(__dirname,`./scripts/${file}.js`));
    }
}

require(path.join(__dirname,'/main-src.jsc'));