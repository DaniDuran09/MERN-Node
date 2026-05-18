import { envs } from "./config/env.js";
import { Server } from "./presentation/server.js";



(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    });

    server.start();
}