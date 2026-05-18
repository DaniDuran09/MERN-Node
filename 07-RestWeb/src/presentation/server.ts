import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Options {
    port: number;
    public_path: string;
}

export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {

        //* Middlewares

        // public foler
        this.app.use(express.static(this.publicPath));


        this.app.use((req, res) => {
            const indexPath = path.resolve(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });


        this.app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    }
}