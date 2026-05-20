import express, { Router } from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options {
    port: number;
    routes: Router;
    public_path: string;
}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string
    private readonly routes: Router;


    constructor(options: Options) {
        const { port, routes, public_path } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes
    }

    async start() {

        //* Middlewares
        this.app.use(express.json()); // application/json
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        // public foler
        this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use(this.routes);


        this.app.use((req, res) => {
            const indexPath = path.resolve(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    }
}