const bytenode = require('bytenode');
const fs = require('fs');
var killProcess = require('kill-process-by-name');

const data_public = (name) => `
    require('bytenode').runBytecodeFile(require('path').join(__dirname,"../../app.asar/public/${name}.jsc"));
`

async function compileJs(p,data_func){
    // compile all js files in the given folder with bytenode
    let files = fs.readdirSync(p);
    for(let file of files){
        if(!file.endsWith('.js')) {
            if(file.endsWith('.map') || file.endsWith('.txt') || file == "chunk-map.json") fs.unlinkSync(`${p}/${file}`);
            continue;
        }
        file = file.substr(0,file.length - 3);
        let raw = fs.readFileSync(`${p}/${file}.js`);
        let compiled = await bytenode.compileElectronCode(raw);
        fs.writeFileSync(`${p}/${file}.jsc`,compiled);
        // make all js files call the compiled versions
        fs.writeFileSync(`${p}/${file}.js`,data_func(file),{encoding:'utf8',flag:'w'});
        console.log(`${file}.jsc is generated in public`);
    }
}

exports.onPostBuild = async ({ reporter }) => {
    console.log("[#] Killing previous process...");
    let productName = JSON.parse(fs.readFileSync("./package.json")).build.productName;
    killProcess(productName);
    console.log("[#] Compiling public files to .jsc files...");
    await compileJs("./public/",data_public);
    console.log("[#] Successful .jsc compilation");
}

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
    const config = getConfig()
    config.node = {
        fs: 'empty',
    }
}