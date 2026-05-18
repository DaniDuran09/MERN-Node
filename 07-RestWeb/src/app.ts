import { Server } from "./presentation/server.js";



(async () => {
    main();
})();

function main() {
    const server = new Server();

    server.start();
}