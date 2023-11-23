import {App} from "./app";
const config = require("./config/config.js");

//Starting server
async function main(){
    const app = new App();
    await app.listen();
}

main();
