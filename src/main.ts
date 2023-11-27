import {App} from "./app";

//Starting server
async function main(){
    const app = new App();
    await app.listen();
}

main();
