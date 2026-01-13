import http from 'http';
import fs from 'fs';

http.createServer(function (req, res){
    let filePath;
    if(req.url === '/'){
        filePath = './index.html';
    }else if(req.url === '/about'){
        filePath = './about.html';
    }else if(req.url === '/contact'){
        filePath = './contact-me.html';
    }else{
        filePath = './404.html';
    }

    fs.readFile(filePath,(err,data) => {
        if(err){
            res.writeHead(500);
            res.end('error');
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data);
        }
    })



}).listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
