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
        next(); 
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

app.post('/listaPtes', usuarioEstaAutenticado, (req, res) => {
    const { nome, raca, idade} = req.body;

    if (nome && raca && idade) {
        listapets.push({ nome, raca, idade });

        console.log('Animal cadastrado:', { nome, raca, idade });

        
        res.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Animal cadastrado</title>
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
                        <a href="/forpets.html" class="button">Voltar</a>
                    </div>
                </div>
            </body>
            </html>
        `);
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
                    width: 100%;
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
                .button {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    text-align: center;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .button.voltar {
                    background-color: #007bff;
                }
                .button.voltar:hover {
                    background-color: #0056b3;
                }
                .button.cadastrar {
                    background-color: #28a745;
                }
                .button.cadastrar:hover {
                    background-color: #218838;
                }
                .button.submit {
                    background-color: #17a2b8;
                }
                .button.submit:hover {
                    background-color: #138496;
                }
                .button.submit[disabled] {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                p {
                    text-align: center;
                    color: #666;
                    margin-top: 20px;
                }
                @media screen and (max-width: 768px) {
                    table, th, td {
                        display: block;
                        width: 100%;
                    }
                    th {
                        display: none;
                    }
                    tr {
                        margin-bottom: 10px;
                        display: block;
                        border: 1px solid #ddd;
                    }
                    td {
                        display: block;
                        text-align: right;
                        border-bottom: 1px solid #ddd;
                        position: relative;
                        padding-left: 50%;
                    }
                    td:before {
                        content: attr(data-label);
                        position: absolute;
                        left: 10px;
                        width: calc(50% - 20px);
                        padding-right: 10px;
                        text-align: left;
                        font-weight: bold;
                    }
                    .button-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .button {
                        width: 80%;
                        margin-bottom: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <h1>Lista de Interessados</h1>
            <form id="usuariosForm" action="/associarPet" method="POST">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Selecionar</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        for (let i = 0; i < listaUsuarios.length; i++) {
            conteudoResposta += `
                        <tr>
                            <td data-label="Nome">${listaUsuarios[i].nome}</td>
                            <td data-label="Email">${listaUsuarios[i].email}</td>
                            <td data-label="Telefone">${listaUsuarios[i].telefone}</td>
                            <td data-label="Selecionar">
                                <input type="checkbox" name="usuarioSelecionado" value="${i}" class="usuarioCheckbox"> Selecionar
                            </td>
                        </tr>`;
        }
        
        conteudoResposta += `
                    </tbody>
                </table>
                <div class="button-container">
                    <button type="submit" class="button submit" id="submitBtn" disabled>Confirmar Doação</button>
                    <a href="/" class="button voltar">Voltar</a>
                    <a href="./forent.html" class="button cadastrar">Continuar Cadastrando</a>
                </div>
            </form>`;
        
        if (req.cookies.dataUltimoAcesso) {
            conteudoResposta += `
                <p>Seu último acesso foi em ${req.cookies.dataUltimoAcesso}</p>`;
        }
        
        conteudoResposta += `
            <script>
                const checkboxes = document.querySelectorAll('.usuarioCheckbox');
                const submitBtn = document.getElementById('submitBtn');
    
                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        if (document.querySelectorAll('.usuarioCheckbox:checked').length > 0) {
                            submitBtn.disabled = false;
                        } else {
                            submitBtn.disabled = true;
                        }
                    });
                });
    
                document.getElementById('usuariosForm').addEventListener('submit', function(e) {
                    const selectedCheckbox = document.querySelector('.usuarioCheckbox:checked');
                    if (!selectedCheckbox) {
                        e.preventDefault();
                        alert('Por favor, selecione um usuário para confirmar a doação.');
                    } else {
                        alert('Pet foi doado para o usuário selecionado!');
                    }
                });
            </script>
        </body>
        </html>`;
        
        resp.send(conteudoResposta);
    });
    
    app.post('/associarPet', usuarioEstaAutenticado, (req, resp) => {
        const { usuarioSelecionado } = req.body;
        if (usuarioSelecionado) {
            
        }
        resp.redirect('/listarUsuarios');
    });
    
    

    app.get('/listarPtes', usuarioEstaAutenticado, (req, resp) => {
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
                    width: 100%;
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
                .button {
                    display: inline-block;
                    margin: 10px;
                    padding: 10px 20px;
                    text-align: center;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                }
                .button.voltar {
                    background-color: #007bff;
                }
                .button.voltar:hover {
                    background-color: #0056b3;
                }
                .button.cadastrar {
                    background-color: #28a745;
                }
                .button.cadastrar:hover {
                    background-color: #218838;
                }
                .button.submit {
                    background-color: #17a2b8;
                }
                .button.submit:hover {
                    background-color: #138496;
                }
                .button.submit[disabled] {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                p {
                    text-align: center;
                    color: #666;
                    margin-top: 20px;
                }
                @media screen and (max-width: 768px) {
                    table, th, td {
                        display: block;
                        width: 100%;
                    }
                    th {
                        display: none;
                    }
                    tr {
                        margin-bottom: 10px;
                        display: block;
                        border: 1px solid #ddd;
                    }
                    td {
                        display: block;
                        text-align: right;
                        border-bottom: 1px solid #ddd;
                        position: relative;
                        padding-left: 50%;
                    }
                    td:before {
                        content: attr(data-label);
                        position: absolute;
                        left: 10px;
                        width: calc(50% - 20px);
                        padding-right: 10px;
                        text-align: left;
                        font-weight: bold;
                    }
                    .button-container {
                        display: flex;
                        flex-direction: column;
                    }
                    .button {
                        margin-bottom: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <h1>Lista de Pets para Doação</h1>
            <form id="doacaoForm" action="/deletarUsuarios" method="POST">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Raça</th>
                            <th>Idade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;
        
        for (let i = 0; i < listapets.length; i++) {
            conteudoResposta += `
                        <tr>
                            <td data-label="Nome">${listapets[i].nome}</td>
                            <td data-label="Raça">${listapets[i].raca}</td>
                            <td data-label="Idade">${listapets[i].idade}</td>
                            <td data-label="Ações">
                                <input type="checkbox" name="marcarDoacao" value="${i}" class="doacaoCheckbox"> Doação
                            </td>
                        </tr>`;
        }
        
        conteudoResposta += `
                    </tbody>
                </table>
                <div class="button-container">
                    <button type="submit" class="button submit" id="submitBtn" disabled>Executar ações selecionadas</button>
                    <a href="/" class="button voltar">Voltar</a>
                    <a href="./forpets.html" class="button cadastrar">Continuar Cadastrando</a>
                </div>
            </form>`;
        
        if (req.cookies.dataUltimoAcesso) {
            conteudoResposta += `
            <p>Seu último acesso foi em ${req.cookies.dataUltimoAcesso}</p>`;
        }
        
        conteudoResposta += `
            <script>
                const checkboxes = document.querySelectorAll('.doacaoCheckbox');
                const submitBtn = document.getElementById('submitBtn');
    
                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        if (document.querySelectorAll('.doacaoCheckbox:checked').length > 0) {
                            submitBtn.disabled = false;
                        } else {
                            submitBtn.disabled = true;
                        }
                    });
                });
            </script>
        </body>
        </html>`;
        
        resp.send(conteudoResposta);
    });
    
    app.post('/deletarUsuarios', usuarioEstaAutenticado, (req, resp) => {
        const { marcarDoacao } = req.body;
        if (Array.isArray(marcarDoacao)) {
            marcarDoacao.forEach(index => {
                
            });
        } else if (marcarDoacao) {
        }
        resp.redirect('/listarUsuarios');
    });
    
    app.get('/listarUsuarios', usuarioEstaAutenticado, (req, resp) => {

    });
    

    
    
    app.get('/listarUsuarios', usuarioEstaAutenticado, (req, resp) => {
        // Código para listar os usuários cadastrados
    });
    


   


    app.listen(porta, host, () => {
        console.log(`Servidor rodando em http://${host}:${porta}`);
    });