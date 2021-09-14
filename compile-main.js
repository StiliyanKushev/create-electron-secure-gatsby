const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const killProcess = require('kill-process-by-name');
const asar = require('asar');
const {Asarmor, Trashify, Bloat} = require('asarmor');

let currentOS = "win";

if(fs.existsSync("./dist/linux-unpacked")){
    fs.renameSync("./dist/linux-unpacked","./dist/unpacked");
    currentOS = "linux";
}
else if(fs.existsSync("./dist/win-unpacked")){
    fs.renameSync("./dist/win-unpacked","./dist/unpacked");
}

console.log('looking for the executable in the dist folder (unpacked)');
let exeName = JSON.parse(fs.readFileSync("./package.json")).name;
let files = fs.readdirSync("./dist/unpacked");
let exeFile;
for (let file of files) {
    if (currentOS == "win" && file.toLowerCase().endsWith(".exe")) {
        exeFile = file;
        break;
    }
    else if(currentOS == "linux" && file == exeName){
        exeFile = file;
        break;
    }
}

console.log(`found executable ${exeFile} running it`);

cp.execFile(exeFile, [], {
    cwd: path.join(__dirname, '/dist/unpacked/')
});

let productName = JSON.parse(fs.readFileSync("./package.json")).build.productName;
console.log('killing ' + productName);
killProcess(productName);

setTimeout(() => {
    console.log("packing to asar");
    const src = path.join(__dirname, '/dist/unpacked/resources/app');
    const dest = path.join(__dirname, '/dist/unpacked/resources/app.asar');
    asar.createPackage(src, dest).then(() => {
        console.log('removing the app folder');
        fs.rmdirSync(src, { recursive: true });
        console.log('applying asarmor');
        const asarmor = new Asarmor(dest);
        //asarmor.applyProtection(new FileCrash('main.js', -699));
        asarmor.applyProtection(new Trashify(['main.js'], Trashify.Randomizers.randomExtension()));
        asarmor.applyProtection(new Trashify(['main.js'], Trashify.Randomizers.junkExtension()));
        asarmor.applyProtection(new Bloat(42069));
        asarmor.write(dest)
        .then(outputPath => {
            console.log(`successfully wrote changes to ${outputPath}`)
            console.log("remove unnecessary files");
            for(let file of fs.readdirSync(path.join(__dirname, '/dist'))){
                const p = path.join(__dirname, `/dist/${file}`);
                if(file == "unpacked"){
                    fs.unlinkSync(path.join(p,"LICENSE.electron.txt"));
                    fs.unlinkSync(path.join(p,"LICENSES.chromium.html"));
                    continue;
                }
                if(fs.lstatSync(p).isDirectory()){
                    fs.rmdirSync(p, { recursive: true });
                }
                else{
                    fs.unlinkSync(p);
                }
            }
            console.log("Rename the folder to product name...");
            fs.renameSync(path.join(__dirname, '/dist/unpacked'),path.join(__dirname, `/dist/${productName}`));

            console.log(`Everything finished.`)
        })
        .catch(console.error);
    });
}, 2000);

