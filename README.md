# Labeddit-back

### O Labeddit Full Stack é um desafio final do bootcamp Web Full Stack da Labenu, que abrange desenvolvimento em backend e frontend. O foco é criar um aplicativo com design mobile-first, com ênfase na criação de uma API, implementando funcionalidades como autenticação de usuários e gerenciamento de banco de dados.

## [Link repositótio Front-end](https://github.com/Regiane-Martins/Labeddit-front.git)

# Índice

* [Requisições (Paths)](#requisições)
* [Exemplo de Requisições](#exemplo-de-requisições)
* [Tetes](#exemplo-testes)
* [Documentação Postman](#documentação-postman)
* [Tecnologias](#tecnoligias)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Desenvolvedor(a)](#Desenvolvedor(a))

# Requisiçoes (Paths)

### Requisições de Usuários

* /users

#### Cadastro de usuário
* /users/signup

#### Login
* /users/login

### Requisições de Post

* /post
#### Editar e Deletar Posts
* /post/:id
#### Like e Dislike
* /post/:id/like

### Requisições de Comentários

* /comments
#### Editar e Deletar Posts
* /comments/:id


# Exemplo de Requisições
### Requisições de usuários

* POST/ users/signup: Cadastro de usuários.

```json
{
  "message": "Usuário cadastrado com sucesso.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1YjY1ODFkLTM4ZmItNGU5Zi05MWYwLTRmZjczZTUzY2NhNyIsIm5hbWUiOiJNaWd1ZWwiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkzODUxNjQ3LCJleHAiOjE2OTQ0NTY0NDd9.txNbwmc2QHmCCB6aCWwxOKlsaMPavfK7KjFFUHJoIGo"
}
```

* GET/ users: Retorna todos os usuário cadastrados.
```json
[
  {
    "id": "001",
    "name": "Regiane",
    "email": "regiane@email.com",
    "role": "Normal",
    "createdAt": "2023-09-04 17:41:38"
  },
  {
    "id": "20a845e8-9ade-43a5-bbd8-931c79d527b8",
    "name": "Miguel",
    "email": "miguel@email.com",
    "role": "NORMAL",
    "createdAt": "2023-09-04T18:19:23.052Z"
  },
]

```

* POST/ login: logar com uma conta cadastrada, gerando token de identificação.
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwYTg0NWU4LTlhZGUtNDNhNS1iYmQ4LTkzMWM3OWQ1MjdiOCIsIm5hbWUiOiJNaWd1ZWwiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkzOTEwMDE4LCJleHAiOjE2OTQ1MTQ4MTh9.nFyrNe3k-tqHySC4fBNqf2SmJuG4u04NYto3llVN3tc"
}
```
### Requisições de posts

* POST /posts: criaçao de posts, requer validação via token.
```json
Created
```

* GET/ posts: busca de todos os posts, requer validaçãao via token.
```json
[
  {
    "id": "e017dd12-fbb5-4daa-86bd-148b8b20ae2d",
    "content": "Deus é bom o tempo todo!",
    "likes": 0,
    "dislikes": 0,
    "created_at": "2023-09-05T16:47:46.675Z",
    "updated_at": "2023-09-05T16:47:46.675Z",
    "creator": {
      "id": "20a845e8-9ade-43a5-bbd8-931c79d527b8",
      "name": "Miguel"
    }
  },
]
```

* PUT/ posts/:id: editar posts pelo id, requer validaçãao via token.

```json
{
  "message": "Updated"
}
```

* DELETE/ posts/:id: deletar post pelo is, requer validaçãao via token.
```json
{
  "message": "Post deletado."
}
```

* PUT/ posts/:id/like : dar like e dislike em post pelo id, requer validaçãao via token.

```json
OK
```

### Requisições de comentários

* POST/ comments/:id : criação de comentário do post via id, requer validação de token.

```json
Created
```

* GET/ comments: busca por todos os comentários, requer validação de token.

```json
[
  {
    "id": "5e3aa9c5-c222-4736-9499-5b27cee44265",
    "content": "Muito bem, você conseguiu. Confie no processo!!!",
    "likes": 0,
    "dislikes": 0,
    "created_at": "2023-09-12T01:17:23.407Z",
    "updated_at": "2023-09-12T01:17:23.407Z",
    "creator": {
      "id": "f84becdc-65f1-4ae2-a11e-a4528772fd05",
      "post_id": "e017dd12-fbb5-4daa-86bd-148b8b20ae2d",
      "name": "Regiane"
    }
  }
]
```

* PUT/ comments/:id : editar um comentário pelo seu id, requer validação via token.

```json
{
  "message": "Updated"
}
```

* DELETE/ comments/:id : deletar comentário pelo seu id, requer validação via token.

```json
{
  "message": "Post deletado."
}
```

* PUT/ dar like e dislike em comentários pelo id, requer validação via token.

```json
OK
```

# Testes 
![Testes](./src//img/testes.png)


# Documentação do Postman
https://documenter.getpostman.com/view/26567220/2s9YJXZQtp

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

# 🛠 Tecnologias
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQL](https://learn.microsoft.com/pt-br/sql/?view=sql-server-ver16)
- [SQLite](https://www.sqlite.org/docs.html)
- [Knex.js](https://knexjs.org/guide/)
- [Zod](https://zod.dev/)
- [UUID Generator](https://www.npmjs.com/package/uuid)
- [Dotenv](https://www.dotenv.org/docs/)
- [JWT](https://jwt.io/introduction/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/Regiane-Martins/Labeddit-back.git>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3003 - acesse <http://localhost:3003>
```


# Desenvolvedor(a)

<img style="border-radius: 50%;" src="https://scontent.fbhz1-2.fna.fbcdn.net/v/t39.30808-6/358136904_6121985237926967_6522594282085333119_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEUlJv95Zte9M_8VSZ1ExresSaGbOpVPOWxJoZs6lU85baU8rQWK848_mIVHC1rlXTCNskCSF_ss1r6Ive_IVSw&_nc_ohc=SfrKS7N7t6YAX-S2ILP&_nc_ht=scontent.fbhz1-2.fna&oh=00_AfDsIOkG-QL67DdL9fUQOCJhWYv-dZ4OPqnj5fYzLr--rg&oe=64B3CBF6" width="100px;" alt=""/>
 <br />
 <sub style="font-size: 18px"><b>Regiane Martins</b></sub></a>
 <div>
 <br/>
<a href="https://www.linkedin.com/in/regiane-martins-henrique-6399ba65" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>


