const http = require('http');
const {URL} = require('url');

const server = http.createServer((req, res) => {
    const {method, url} = req;
    const parsedUrl = new URL(url,`https://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Acces-Control-Allow-Headers','Content-Type');

    if(method === 'OPTIONS'){
        res.writeHead(204)
        res.end();
    }
})