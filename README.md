# Sistema de Gestão de Petshop

Bem-vindo ao repositório do Sistema de Gestão de Petshop. Este projeto é desenvolvido para gerenciar um serviço de adoção de pets, com funcionalidades para login de usuários, cadastro de interessados, pets e solicitações de adoção.

## Tecnologias Utilizadas

- **Visual Studio Code**: IDE para desenvolver a aplicação.
- **Node.js**: Runtime JavaScript para construir a aplicação do lado do servidor.
  - **Express**: Framework para construir a aplicação web.
  - **Express-session**: Middleware para gerenciar sessões de usuário.
  - **Cookie-parser**: Middleware para manipulação de cookies.
- **GitHub**: Plataforma de controle de versão e colaboração.
- **Vercel**: Plataforma de hospedagem para deploy da aplicação.

## Comportamento do Sistema

### Autenticação de Usuário
- **Login Obrigatório**: Os usuários devem fazer login para acessar o menu do sistema.
- Usuario: admin
- SENHA: 123
- **Gerenciamento de Sessão**: As sessões de usuário são mantidas por 30 minutos utilizando `express-session`.

### Menu do Sistema
Após o login, o usuário pode acessar as seguintes opções no menu do sistema:
1. **Cadastro de Interessados**
2. **Cadastro de Pets**
3. **Adotar um Pet**

### Cadastro de Interessados
- **Campos do Formulário**:
  - Nome
  - Email
  - Telefone
- **Validação dos Campos**: Todos os campos são obrigatórios e a validação é feita no servidor.
- **Pós-Submissão**:
  - Exibir uma lista de interessados cadastrados.
  - Fornecer opções para retornar ao formulário de cadastro ou ao menu do sistema.

### Cadastro de Pets
- **Campos do Formulário**:
  - Nome
  - Raça
  - Idade (em anos)
- **Validação dos Campos**: Todos os campos são obrigatórios e a validação é feita no servidor.
- **Pós-Submissão**:
  - Exibir uma lista de pets cadastrados.
  - Fornecer opções para retornar ao formulário de cadastro ou ao menu do sistema.

### Adotar um Pet
- **Formulário de Solicitação de Adoção**:
  - Selecionar Interessado: Dropdown preenchido com os nomes dos interessados cadastrados.
  - Selecionar Pet: Dropdown preenchido com os nomes dos pets cadastrados.
- **Pós-Submissão**:
  - Incluir automaticamente a data da solicitação de adoção.
  - Salvar os detalhes da solicitação de adoção.

### Requisitos Adicionais
- **Último Acesso**: Exibir a data e hora do último acesso do usuário no menu do sistema utilizando cookies.
- **Credenciais de Usuário**: Um único conjunto de usuário e senha é utilizado para login conforme instruções das aulas.

## Instalação e Configuração

   

1. **Instale as dependências**:
    ```bash
    npm install
    ```

2. **Execute a aplicação**:
    ```bash
    npm start
    ```

3. **Deploy no Vercel**: Siga a documentação do Vercel para fazer o deploy da sua aplicação.

## Uso

1. Abra a aplicação no seu navegador.
2. Faça login com as credenciais fornecidas.
3. Usuario admin
4. Senha 123
5. Navegue pelo menu para cadastrar interessados, cadastrar pets ou gerenciar solicitações de adoção.

