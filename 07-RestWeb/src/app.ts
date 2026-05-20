import { envs } from "./config/env.js";
import { AppRoutes } from "./config/routes.js";
import { Server } from "./presentation/server.js";



(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });

    server.start();
}