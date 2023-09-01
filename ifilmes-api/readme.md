# API - Projeto BootCamp Itaú Devs Expert - Let's Code.

Está a a API do Desafio. um sistema para avaliação de filmes, consumindo API pública do IMDB, e salvando avaliações e comentários em nossa DB.

- API Principal (ifilmes - comentários e avaliações)

para a criação da API foi utilizado Typescript, com a seguinte Stack:

## Stack utilizada

**Back-end:**

- Typescript
- DataBase -> MySQL (em Docker com Docker Compose).
- Framework -> AdonisJS (NodeJs 14).
- Cache -> Redis (em Docker com Docker Compose - para a API de Autenticação)

Requsitos ->

- NodeJs 14 LTS
- Docker (com Docker Compose)
- Insomnia (ou Postman) para testes das rotas.

## Instalação

## Essa instalação deve ser realizada APENAS caso você NÃO opte por rodar o docker na pasta raiz do projeto, pois lá estão as duas api já no docker.

Primeiramente Clone o projeto

```bash
  git clone https://github.com/ericalmeidasp/desafio-itau.git
```

entra na pasta do projeto e na pasta da Api de comentários (ifilmes-api)

```bash
  cd itau-desafio
  cd ifilmes-api
```

na pasta ifilmes-api, Rode o Docker compose up para startar a DB MySQL e o Redis.

```bash
  docker compose up -d
```

Faça as instalações do projeto:

```bash
  npm install
```

Configure as Váriaveis de ambiente (veja seção abaixo), e Rode as Migrations para a base de dados:

```bash
  node ace migration:run
```

Rode os Seeders testes dos usuários:

```bash
  node ace db:seed
```

E rode o servidor de desenvolvimento:

```bash
  npm run dev
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env (para facilitar, já subi o .env no git)

`PORT=3333`

`HOST=0.0.0.0`

`NODE_ENV=development`

`APP_KEY=OE-5GiLyvZkePqVIVMpH4BXb15HtCZ9H`

`DRIVE_DISK=local`

`DB_CONNECTION=mysql`

`MYSQL_HOST=localhost`

`MYSQL_PORT=3306`

`MYSQL_USER=root`

`MYSQL_PASSWORD=secret`

`MYSQL_DB_NAME=ifilmes`

`IMDB_API_KEY=335c0da8`

`IMDB_URL=https://www.omdbapi.com/?apikey=${IMDB_API_KEY}&`

`SESSION_DRIVER=cookie`

`API_AUTH_URL=http://localhost:3000`

(fique a vontade para alterar o IMDBAPIKEY caso queira, por sua key)

## Funcionalidades

```
Ok - LEITOR: Após o cadastro, esse usuário poderá logar e buscar por um filme. Ele poderá ver as informações de um filme, comentários e dar uma nota para o filme. A cada filme que o usuário avaliar, ele ganha 1 ponto em seu perfil.
Ok - BÁSICO: O usuário leitor poderá se tornar BÁSICO quando adquirir 20 pontos. Nesse perfil será possível postar comentários, notas e responder comentários. Cada resposta que o usuário enviar, ele ganha 1 ponto.
Ok - AVANÇADO: O usuário básico poderá se tornar AVANÇADO quando adquirir 100 pontos. Esse perfil tem as capacidades do BÁSICO, e mais citar outros comentários (comentários feitos por outros usuários) e marcar comentários como “gostei” ou "não gostei”.
Ok - MODERADOR: Um usuário poderá se tornar MODERADOR de 2 formas: um moderador torna outro usuário moderador ou por pontuação, para se tornar MODERADOR o usuário deverá ter 1000 pontos. O moderador tem as capacidades do AVANÇADO, e mais excluir um comentário ou marcar como repetida.


Ok - Um usuário não poderá logar sem ter feito um cadastro
Ok - Um usuário não poderá ver filmes e comentários e notas sem estar logado
Ok - Um usuário não poderá criar, editar ou excluir comentários e notas sem estar logado
Ok - Um usuário de um determinado perfil não poderá realizar ações que não fazem parte de seu perfil
Ok - Todas as funcionalidade de seu sistema devem receber um token de autenticação, gerados pela sua API de autorização
Ok - Um usuário não autenticado(que não possui o token) não poderá realizar ações no sistema.
Ok - Um usuário com token invalido não poderá realizar ações no sistema.
Ok - Todas as tentativas falhas de login devem ser salvas em um cache.
Ok - Caso um usuário tente 3 vezes logar e erre, na 4 vez deverá ser retornado uma mensagem de “limite de tentativas excedido “
```

## Documentação da API

#### Somente as duas primeiras rotas não são autenticadas `(POST /user/register e POST /auth)` todas as demais são.

#### Existe um Middleware (ACL) para controle dos acessos, seguindos os requisitos.

#

```
Com os Seeders, foram criados 4 usuários para testes no sistema, sendo:
- leitor@letscode.com.br -> password letscode
- basico@letscode.com.br -> password letscode
- avancado@letscode.com.br -> password letscode
- moderador@letscode.com.br -> password letscode
```

#### Tabela de parâmetros de autenticação

| Parâmetro Header | Tipo parâmetro | Tipo dado | Descrição                                                                                                                              |
| :--------------- | :------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`  | `Bearer`       | `string`  | **Obrigatório para rotas autenticadas**. Utiliza o padrão => 'Bearer MTU.aKqvAG7GjM4m-5LBsINLnyKKv-NhPwDehSftqFDlCKW-YZ3WB-VhwRRh4aNa' |

#### Tabela de parâmetros permissões (Acess Controll List)

| ACL userLevel | Permissões  |
| :------------ | :---------- |
| `leitor`      | `Leitor`    |
| `basico`      | `Básico`    |
| `avancado`    | `Avançado`  |
| `moderador`   | `Moderador` |

#### Fazer um cadastro -> Retorna um objeto com dados do usuário

```http
  POST /user/register
```

- Rota não autenticada
- ACL: leitor,basico,avancado,moderador

| Parâmetro              | Tipo     | Descrição                             |
| :--------------------- | :------- | :------------------------------------ |
| `email`                | `string` | **Obrigatório**. email de cadastro    |
| `name`                 | `string` | **Obrigatório**. nome do usuário      |
| `password`             | `string` | **Obrigatório**. senha                |
| `passwordConfirmation` | `string` | **Obrigatório**. confirmação da senha |

Retorno 201

```javascript
{
	"email": "eric@letscode.com.br",
	"name": "Éric Almeida",
	"created_at": "2022-06-30T19:38:31.893-03:00",
	"updated_at": "2022-06-30T19:38:31.893-03:00",
	"id": 5
}
```

#### Realizar o Login -> retorna o token de autorização

```http
  POST /auth
```

- Rota não autenticada
- ACL: leitor,basico,avancado,moderador

| Parâmetro  | Tipo     | Descrição                         |
| :--------- | :------- | :-------------------------------- |
| `email`    | `string` | **Obrigatório**. email do usuário |
| `password` | `string` | **Obrigatório**. senha do usuário |

Retorno 200

```javascript
{
	"type": "bearer",
	"token": "MTU.aKqvAG7GjM4m-5LBsINLnyKKv-NhPwDehSftqFDlCKW-YZ3WB-VhwRRh4aNa",
	"expires_at": "2022-07-30T19:40:18.244-03:00"
}
```

#### Realizar o Logout

```http
  DELETE /auth
```

- Rota Autenticada
- ACL: leitor,basico,avancado,moderador

Retorno 200

#### Upgrade do nível da conta (Leitor -> Basico -> Avançado -> Moderador) Por Pontos -> Retorna um objeto

```http
  PUT /user/upgrade
```

- Rota Autenticada
- ACL: leitor,basico,avancado,moderador

Retorno 200

```javascript
{
	"responseText": "Usuário não elegível para Upgrade, junte mais Pontos.",
	"userPoints": 1
}
```

#### Upgrade do nível da conta (-> Moderador) Por Outra Moderador -> Retorna uma String de sucesso.

```http
  PUT /user/upgrade/mod
```

- Rota Autenticada
- ACL: moderador

| Parâmetro | Tipo     | Descrição                                         |
| :-------- | :------- | :------------------------------------------------ |
| `email`   | `string` | **Obrigatório**. Email do usuário a ser promovido |

Retorno 200

```javascript
"Usuário promovido a moderador com sucesso";
```

#### Obtem Filmes da API IMDB e Salva os Filmes em nossa DB -> Retorna uma Array contendo os principais resultados.

```http
  POST /movies?searchString=string
```

- Rota Autenticada
- ACL: leitor,basico,avancado,moderador

| Parâmetro      | Tipo     | Descrição                                         |
| :------------- | :------- | :------------------------------------------------ |
| `searchString` | `string` | **Obrigatório**. Palavra para pesquisar os filmes |

Retorno 200

```javascript
[
  {
    id: 1,
    imdb_id: "tt0848228",
    title: "The Avengers",
    year: "2012",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    type: "movie",
    comments: [],
    myActiveRating: null,
    movieRating: null,
  },
];
```

#### Lista os Filmes em nossa DB -> Retorna uma Array contendo os principais resultados.

```http
  GET /movies?searchString=string
```

- Rota Autenticada
- ACL: leitor,basico,avancado,moderador

| Parâmetro      | Tipo     | Descrição                                         |
| :------------- | :------- | :------------------------------------------------ |
| `searchString` | `string` | **Obrigatório**. Palavra para pesquisar os filmes |

Retorno 200

```javascript
[
  {
    id: 1,
    imdb_id: "tt0848228",
    title: "The Avengers",
    year: "2012",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    type: "movie",
    comments: [
      {
        id: 1,
        content: "Comentário 1",
        movie_id: 1,
        duplicated: 0,
        created_at: "2022-07-01T00:55:02.000+00:00",
        updated_at: "2022-07-01T00:55:14.000+00:00",
        user: {
          id: 4,
          name: "Inara Lima",
          email: "moderador@letscode.com.br",
        },
        wasQuoted: [],
        replyComments: [
          {
            id: 2,
            content: "respondi esse",
            comment_id: 1,
            created_at: "2022-07-01T00:55:51.000+00:00",
            updated_at: "2022-07-01T00:55:51.000+00:00",
            user: {
              id: 4,
              name: "Inara Lima",
              email: "moderador@letscode.com.br",
            },
          },
        ],
        likeCount: {
          like: 1,
          unLike: 0,
        },
      },
    ],
    myActiveRating: 9,
    movieRating: "9.00",
  },
];
```

#### Pesquisa por Filme -> Retorna um objeto com as informações do filme pesquisado e todas informações referentes à ele (avaliações, comentarios, etc.).

```http
  GET /movies/:id
```

- Rota Autenticada
- ACL: leitor,basico,avancado,moderador

| Parâmetro | Tipo     | Descrição                               |
| :-------- | :------- | :-------------------------------------- |
| `:id`     | `string` | **Obrigatório**. Id do filme solicitado |

Retorno 200 OK || 400 BadRequest

```javascript
{
    id: 1,
    imdb_id: "tt0848228",
    title: "The Avengers",
    year: "2012",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    type: "movie",
    comments: [
      {
        id: 1,
        content: "Comentário 1",
        movie_id: 1,
        duplicated: 0,
        created_at: "2022-07-01T00:55:02.000+00:00",
        updated_at: "2022-07-01T00:55:14.000+00:00",
        user: {
          id: 4,
          name: "Inara Lima",
          email: "moderador@letscode.com.br",
        },
        wasQuoted: [],
        replyComments: [
          {
            id: 2,
            content: "respondi esse",
            comment_id: 1,
            created_at: "2022-07-01T00:55:51.000+00:00",
            updated_at: "2022-07-01T00:55:51.000+00:00",
            user: {
              id: 4,
              name: "Inara Lima",
              email: "moderador@letscode.com.br",
            },
          },
        ],
        likeCount: {
          like: 1,
          unLike: 0,
        },
      },
    ],
    myActiveRating: 9,
    movieRating: "9.00",
  }
```

#### Avalia um filme, atualizando ou criando uma nota para ele. Retorna um objeto da nota.

```http
  PUT /rating
```

- Rota Autenticada
- ACL: leitor,basico,avancado,moderador

| Parâmetro | Tipo     | Descrição                      |
| :-------- | :------- | :----------------------------- |
| `movieId` | `number` | **Obrigatório**. Id do filme   |
| `value`   | `number` | **Obrigatório**. nota do filme |

Retorno 200 OK || 400 BadRequest

```javascript
{
	"id": 1,
	"user_id": 4,
	"movie_id": 1,
	"value": 9,
	"created_at": "2022-07-01T00:54:55.000+00:00",
	"updated_at": "2022-07-01T00:54:55.000+00:00"
}
```

#### Posta um comentário em algum filme. Retorna um objeto do comentario enviado.

```http
  POST /comments
```

- Rota Autenticada
- ACL: basico,avancado,moderador

| Parâmetro     | Tipo     | Descrição                                                                                               |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------ |
| `movieId`     | `number` | **Obrigatório**. Id do filme a comentar                                                                 |
| `content`     | `string` | **Obrigatório**. Comentario                                                                             |
| `wasQuotedId` | `number` | **Opcional**. Id do Comentario Mencionado (caso ele seja Avancado ou Moderador e queira mencionar algum |

Retorno 200 OK || 400 BadRequest

```javascript
{
	"movie_id": 1,
	"content": "Comentário 1",
	"created_at": "2022-07-01T01:11:27.931+00:00",
	"updated_at": "2022-07-01T01:11:27.931+00:00",
	"id": 2,
	"user": {
		"id": 4,
		"name": "Inara Lima",
		"email": "moderador@letscode.com.br"
	},
	"wasQuoted": [],
	"likeCount": {
		"like": 0,
		"unLike": 0
	}
}
```

#### Marca um comentário como repetido (duplicated). Retorna o objeto do comentário.

```http
  PUT /comments/:id
```

- Rota Autenticada
- ACL: moderador

| Parâmetro | Tipo     | Descrição                                                   |
| :-------- | :------- | :---------------------------------------------------------- |
| `:id`     | `number` | **Obrigatório**. Id do comentário à sinalizar como repetido |

Retorno 200 OK || 400 BadRequest

```javascript
{
	"id": 1,
	"content": "Comentário 1",
	"movie_id": 1,
	"duplicated": true,
	"created_at": "2022-07-01T00:55:02.000+00:00",
	"updated_at": "2022-07-01T01:12:02.858+00:00",
	"likeCount": {
		"like": 0,
		"unLike": 0
	}
}
```

#### Apaga um comentário. Retorna uma String de sucesso.

```http
  DELETE /comments/:id
```

- Rota Autenticada
- ACL: moderador

| Parâmetro | Tipo     | Descrição                                                   |
| :-------- | :------- | :---------------------------------------------------------- |
| `:id`     | `number` | **Obrigatório**. Id do comentário à sinalizar como repetido |

Retorno 200 OK || 400 BadRequest

```javascript
"Comentário Apagado com Sucesso";
```

#### Reage à um comentário (Famoso Like e unLike). Retorna o objeto da reação.

```http
  PUT /reactions
```

- Rota Autenticada
- ACL: avancado,moderador

| Parâmetro   | Tipo                   | Descrição                                  |
| :---------- | :--------------------- | :----------------------------------------- |
| `commentId` | `number`               | **Obrigatório**. Id do comentário à Reagir |
| `type`      | `enu('like','unlike')` | **Obrigatório**. Reação ao comentário      |

Retorno 200 OK || 400 BadRequest

```javascript
{
	"comment_id": 2,
	"type": "like",
	"id": 2
}
```

#### Responder à um comentário. Retorna o objeto da resposta.

```http
  POST /repliescomments
```

- Rota Autenticada
- ACL: basico,avancado,moderador

| Parâmetro   | Tipo     | Descrição                                     |
| :---------- | :------- | :-------------------------------------------- |
| `commentId` | `number` | **Obrigatório**. Id do comentário à responder |
| `content`   | `string` | **Obrigatório**. Texto da resposta            |

Retorno 200 OK || 400 BadRequest

```javascript
{
	"comment_id": 2,
	"content": "respondi esse",
	"created_at": "2022-07-01T01:14:23.777+00:00",
	"updated_at": "2022-07-01T01:14:23.777+00:00",
	"id": 3,
	"user": {
		"id": 4,
		"name": "Inara Lima",
		"email": "moderador@letscode.com.br"
	}
}
```

#### Apagar resposta à um comentário. Retorna o objeto da resposta.

```http
  DELETE /repliescomments/:id
```

- Rota Autenticada
- ACL: moderador

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `:id`     | `number` | **Obrigatório**. Id da resposta do comentário à apagar |

Retorno 200 OK || 400 BadRequest

```javascript
"Comentário Apagado com Sucesso";
```

## Testes das rotas

Inclui aqui na pasta raiz, um arquivo Json do Insomnia, caso queira facilitar as criações das rotas para os testes. nele já está o Header Authorization automático com a resposta do login, e tem todas as rotas com os dados necessários.

```bash
  Insomnia_API-iFilmes.json
```
Para incluir, é só ir em -> Preferences -> Data -> Import Data -> From File, e selecionar o arquivo json.

## Gratidão.
Desde já, fica meu muito obrigado por essa oportunidade.
