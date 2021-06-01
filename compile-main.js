const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const killProcess = require('kill-process-by-name');
const asar = require('asar');
const {Asarmor, FileCrash, Trashify, Bloat} = require('asarmor');

console.log('looking for the exe in the dist folder (unpacked)')
let files = fs.readdirSync("./dist/win-unpacked");
let exeFile;
for (let file of files) {
    if (file.endsWith(".exe")) {
        exeFile = file;
        break;
    }
}

console.log(`found exe ${exeFile} running it`);
cp.execFile(exeFile, [], {
    cwd: path.join(__dirname, '/dist/win-unpacked/')
});

let productName = JSON.parse(fs.readFileSync("./package.json")).build.productName;
console.log('killing ' + productName);
killProcess(productName);

setTimeout(() => {
    console.log("packing to asar");
    const src = path.join(__dirname, '/dist/win-unpacked/resources/app');
    const dest = path.join(__dirname, '/dist/win-unpacked/resources/app.asar');
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
                if(file == "win-unpacked"){
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
            fs.renameSync(path.join(__dirname, '/dist/win-unpacked'),path.join(__dirname, `/dist/${productName}`));

            console.log(`Everything finished.`)
        })
        .catch(console.error);
    });
}, 2000);

