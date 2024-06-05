import express from 'express';
import path from 'path';
import session from 'express-session';

import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3000;



let listaUsuarios = [];
let listapets = [];

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'MinH4Ch4v3S3cr3t4', 
    resave: true, 
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 15 
    }
}));

app.use(cookieParser());

function usuarioEstaAutenticado(requisicao, resposta, next){
    if (requisicao.session.usuarioAutenticado){
        next(); //permitir que a requisição continue a ser processada
    }
    else{
        resposta.redirect('/login.html');
    }
}

app.post('/cadastrarUsuario', usuarioEstaAutenticado, (req, res) => {
    const { nome, email, telefone } = req.body;

    if (nome && email && telefone) {
        listaUsuarios.push({ nome, email, telefone });

        console.log('Usuário cadastrado:', { nome, email, telefone });

        
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Usuário Cadastrado</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                        color: #333;
                    }
                    .container {
                        max-width: 400px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        text-align: center;
                        color: #333;
                        margin-bottom: 20px;
                    }
                    p {
                        text-align: center;
                        color: #666;
                        margin-top: 20px;
                    }
                    .button-container {
                        text-align: center;
                        margin-top: 20px;
                    }
                    a.button {
                        display: inline-block;
                        margin: 10px;
                        padding: 10px 20px;
                        text-align: center;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        background-color: #28a745;
                        transition: background-color 0.3s;
                    }
                    a.button:hover {
                        background-color: #218838;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Usuário Cadastrado</h1>
                    <p>O usuário ${nome} foi cadastrado com sucesso!</p>
                    <div class="button-container">
                        <a href="/" class="button">Voltar</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    } else {
        
        res.status(400).send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Erro no Cadastro</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f8f9fa;
                        margin: 0;
                        padding: 20px;
                        color: #333;
                    }
                    .container {
                        max-width: 400px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        text-align: center;
                        color: #dc3545;
                        margin-bottom: 20px;
                    }
                    p {
                        text-align: center;
                        color: #dc3545;
                        margin-top: 20px;
                    }
                    .button-container {
                        text-align: center;
                        margin-top: 20px;
                    }
                    a.button {
                        display: inline-block;
                        margin: 10px;
                        padding: 10px 20px;
                        text-align: center;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        background-color: #dc3545;
                        transition: background-color 0.3s;
                    }
                    a.button:hover {
                        background-color: #c82333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Erro no Cadastro</h1>
                    <p>Por favor, preencha todos os campos do formulário.</p>
                    <div class="button-container">
                        <a href="/forent.html" class="button">Voltar</a>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
});

app.post('/enviar-formulario1', (req, res) => {
    const { nome, raca, idade } = req.body;

    if (nome && raca && idade) {
        
        console.log('Nome:', nome);
        console.log('Raça:', raca);
        console.log('Idade:', idade);

        res.send('Formulário enviado com sucesso!');
    } else {
        res.status(400).send('Por favor, preencha todos os campos do formulário.');
    }
});

    function autenticarUsuario(requisicao, resposta) {
        const usuario = requisicao.body.usuario;
        const senha = requisicao.body.senha;
        if (usuario == 'admin' && senha == '123') {
            requisicao.session.usuarioAutenticado = true;
            resposta.cookie('dataUltimoAcesso', new Date().toLocaleString(), {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 30
            });
            resposta.redirect('/');
        } else {
            resposta.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Falha ao realizar login</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            padding: 20px;
                        }
                        .container {
                            max-width: 400px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .error-message {
                            color: #dc3545;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .link {
                            color: #007bff;
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Falha ao realizar login</h1>
                        <p class="error-message">Usuário ou senha inválidos!</p>
                        <a href="/login.html" class="link">Voltar</a>
                        <div id="lastAccess"></div>
                    </div>
                    <script>
                        document.addEventListener('DOMContentLoaded', () => {
                            const lastAccess = document.getElementById('lastAccess');
                            const lastAccessTime = '${requisicao.cookies.dataUltimoAcesso || ''}';
                            if (lastAccessTime) {
                                lastAccess.innerHTML = '<p>Seu último acesso foi em ' + lastAccessTime + '</p>';
                            }
                        });
                    </script>
                </body>
                </html>
            `);
        }
    }
    
    app.post('/login', autenticarUsuario);

    app.get('/login', (req,resp)=>{
        resp.redirect('/login.html');
    });

    app.get('/logout', (req, resp) => {
        req.session.destroy();
        //req.session.usuarioLogado = false;
        resp.redirect('/login.html');
    });

    app.use(express.static(path.join(process.cwd(), 'publico')));
    app.use(usuarioEstaAutenticado,express.static(path.join(process.cwd(), 'protegido')));
    
   
    
    app.post('/cadastrarUsuario', usuarioEstaAutenticado,);

    app.get('/listarUsuarios', usuarioEstaAutenticado, (req, resp) => {
        let conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Produtos</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 30px;
                }
                table {
                    width: 80%;
                    margin: 0 auto;
                    border-collapse: collapse;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    background-color: #fff;
                }
                th, td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #333;
                    color: white;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                tr:hover {
                    background-color: #e9e9e9;
                }
                .button-container {
                    text-align: center;
                    margin-top: 20px;
                }
                a.button {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    text-align: center;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                a.button.voltar {
                    background-color: #007bff;
                }
                a.button.voltar:hover {
                    background-color: #0056b3;
                }
                a.button.cadastrar {
                    background-color: #28a745;
                }
                a.button.cadastrar:hover {
                    background-color: #218838;
                }
                p {
                    text-align: center;
                    color: #666;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h1>Lista de enteressados</h1>
            <table>
                <thead>
                    <tr>
                        <th>nome</th>
                        <th>email</th>
                        <th>telefone</th>
                    </tr>
                </thead>
                <tbody>`;
        
        for (let i = 0; i < listaUsuarios.length; i++) {
            conteudoResposta += `
                    <tr>
                        <td>${listaUsuarios[i].nome}</td>
                        <td>${listaUsuarios[i].email}</td>
                        <td>${listaUsuarios[i].telefone}</td>
                    </tr>`;
        }
        conteudoResposta += `
                </tbody>
            </table>
            <div class="button-container">
                <a href="/" class="button voltar">Voltar</a>
                <a href="./forent.html" class="button cadastrar">Continuar Cadastrando</a>
            </div>`;
        
        if (req.cookies.dataUltimoAcesso) {
            conteudoResposta += `
                <p>Seu último acesso foi em ${req.cookies.dataUltimoAcesso}</p>`;
        }
        conteudoResposta += `
        </body>
        </html>`;
    
        resp.send(conteudoResposta);
    });

    app.get('/listaPtes', usuarioEstaAutenticado, (req, resp) => {
        let conteudoResposta = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Interessados</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f8f9fa;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 30px;
                }
                table {
                    width: 80%;
                    margin: 0 auto;
                    border-collapse: collapse;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    background-color: #fff;
                }
                th, td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #333;
                    color: white;
                    font-weight: bold;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                tr:hover {
                    background-color: #e9e9e9;
                }
                .button-container {
                    text-align: center;
                    margin-top: 20px;
                }
                a.button {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    text-align: center;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                a.button.voltar {
                    background-color: #007bff;
                }
                a.button.voltar:hover {
                    background-color: #0056b3;
                }
                a.button.cadastrar {
                    background-color: #28a745;
                }
                a.button.cadastrar:hover {
                    background-color: #218838;
                }
                p {
                    text-align: center;
                    color: #666;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h1>Lista de ptes para doação</h1>
            <form action="/deletarUsuarios" method="POST">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Raca</th>
                            <th>Idade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
        for (let i = 0; i < listapets.length; i++) {
            conteudoResposta += `
                        <tr>
                            <td>${listapets[i].nome}</td>
                            <td>${listapets[i].raca}</td>
                            <td>${listapets[i].idade}</td>
                            <td>
                                <input type="checkbox" name="marcarExcluir" value="${i}"> Marcar para excluir
                                <br>
                                <input type="checkbox" name="marcarDoacao" value="${i}"> Marcar para doação
                            </td>
                        </tr>`;
        }
        conteudoResposta += `
                    </tbody>
                </table>
                <div class="button-container">
                    <button type="submit" class="button">Executar ações selecionadas</button>
                    <a href="/" class="button voltar">Voltar</a>
                    <a href="./forent.html" class="button cadastrar">Continuar Cadastrando</a>
                </div>
            </form>`;
    
        if (req.cookies.dataUltimoAcesso) {
            conteudoResposta += `
                <p>Seu último acesso foi em ${req.cookies.dataUltimoAcesso}</p>`;
        }
        conteudoResposta += `
        </body>
        </html>`;
    
        resp.send(conteudoResposta);
    });
    





































    app.listen(porta, host, () => {
        console.log(`Servidor rodando em http://${host}:${porta}`);
    });