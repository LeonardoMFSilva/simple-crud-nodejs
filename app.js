const http = require('http');
const url = require('url');
const queryString = require('query-string')
const fs = require('fs');


//Definição de endereço/URL
const hostname = '127.0.0.1';
const port = 3000;

//Implementação da Regra de Negócio
const server = http.createServer((req, res) => {

    let resposta;
    const urlParse = url.parse(req.url, true);
    const params = queryString.parse(url.parse(req.url, true).search);

    //Criando usuario e salvando infos e atualizando usuario
    if (urlParse.pathname == '/criar-usuario') {

        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Saved!');

            resposta = 'Usuario criado com sucesso!';

            res.statusCode = 201;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
        });

        
    }

    //Buscando usuario
    else if (urlParse.pathname == '/buscar-usuario') {
        fs.readFile('users/' + params.id + '.txt', function (err, data) {
            resposta = data;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        });
    }
    
    //Deletando usuario
    else if (urlParse.pathname == '/deletar-usuario') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
            console.log('Deleted!');

            resposta = err ? 'Usuario nao encontrado ou ja deletado' : 'Usuario deletado';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        })
    };

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

//http://localhost:3000/?nome=leeo&idade=26&id=1
//http://localhost:3000/criar-usuario?nome=leeo&idade=26&id=1
//http://localhost:3000/buscar-usuario?id=1
//http://localhost:3000/deletar-usuario?id=1