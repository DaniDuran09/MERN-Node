// @ts-ignore
import { yarg } from "./config/plugins/args.plugin.ts"
// @ts-ignore
import { ServerApp } from "./presentation/server-app.ts";


(async () => {
    await main();
})();

async function main() {
    const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarg
    ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}