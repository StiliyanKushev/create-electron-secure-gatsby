const fs = require("fs");
const path = require("path");

if (fs.existsSync(path.join(__dirname,'/main-src.js'))) {
    fs.unlinkSync(path.join(__dirname,'/main-src.js'));
}

if (fs.existsSync(path.join(__dirname,'/main-src.jsc'))) {
    fs.unlinkSync(path.join(__dirname,'/main-src.jsc'));
}