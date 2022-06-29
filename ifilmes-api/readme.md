# API - Projeto BootCamp Itaú Devs Expert - Let's Code. 

Está a a API do Desafio. um sistema para avaliação de filmes, consumindo API pública do IMDB, e salvando avaliações e comentários em nossa DB.

para a criação da API foi utilizado Typescript, com a seguinte Stack:


## Stack utilizada

**Back-end:** 
* Typescript
* DataBase -> MySQL (em Docker  com Docker Compose).
* Framework -> AdonisJS (NodeJs 14).
* Cache -> InMemory (para fins de desenvolvimento)

Requsitos -> 
* NodeJs 14 LTS
* Docker (com Docker Compose) para a DB
* Insomnia (ou Postman) para testes das rotas.
## Instalação

Primeiramente Clone o projeto

```bash
  git clone https://
```

 entra na pasta do projeto

```bash
  cd ifilmes-api
```

na pasta Raiz do projeto, crie um container Docker com MySQL e a base de dados utilizada.

```bash
  docker-compose up -d
```

Depois, Instale o projeto utilizando npm

```bash
    npm install
```

Rode as Migrations para a base de dados:


```bash
    node ace migration:run
```

Rode os Seeders testes dos usuários: (opcional)


```bash
    node ace db:seed
```

Configure as Váriaveis de ambiente (veja seção abaixo) e rode o servidor de desenvolvimento:

```bash
    npm run dev
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

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

Ou, renomeie o arquivo .env.example para .env (fique a vontade para alterar o IMDBAPIKEY caso queira, por sua key)

## Funcionalidades

```Ok - LEITOR: Após o cadastro, esse usuário poderá logar e buscar por um filme. Ele poderá ver as informações de um filme, comentários e dar uma nota para o filme. A cada filme que o usuário avaliar, ele ganha 1 ponto em seu perfil.
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

#### Fazer um cadastro -> Retorna um objeto com dados do usuário

```http
  POST /user/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email de cadastro |
| `name` | `string` | **Obrigatório**. nome do usuário |
| `password` | `string` | **Obrigatório**. senha |
| `passwordConfirmation` | `string` | **Obrigatório**. confirmação da senha |

#### Realizar o Login -> retorna o token de autorização

```http
  POST /auth 
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. email do usuário |
| `password` | `string` | **Obrigatório**. senha do usuário |

#### Realizar o Logout

```http
  DELETE /auth  
```

#### Upgrade do nível da conta (Leitor -> Basico -> Avançado -> Moderador) Por Pontos -> Retorna uma string

```http
  PUT /user/upgrade
```

#### Upgrade do nível da conta (-> Moderador) Por Outra Moderador -> Retorna uma String de sucesso.

```http
  PUT /user/upgrade/mod 
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Email do usuário a ser promovido |


#### Salva e retorna os Filmes -> Retorna uma Array contendo os principais resultados.

```http
  POST /movies?searchString=string
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `searchString` | `string` | **Obrigatório**. Palavra para pesquisar os filmes |


#### Pesquisa por Filme -> Retorna um objeto com as informações do filme pesquisado.

```http
  GET /movies/id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `:id` | `number` | **Obrigatório**. id do filme solicitado |


#### Avalia um filme, enviando uma nota para ele. Retorna um objeto da nota enviada. (ou atualiza uma avaliação existente)

```http
  POST /rating
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `movieId` | `number` | **Obrigatório**. Id do filme  |
| `value` | `number` | **Obrigatório**. nota do filme |

#### Posta um comentário em algum filme. Retorna um objeto do comentario enviado.

```http
  POST /comments
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `movieId` | `number` | **Obrigatório**. Id do filme a comentar |
| `content` | `string` | **Obrigatório**. Comentario |
| `wasQuotedId` | `number` | **Opcional**. Id do Comentario Mencionado (caso ele seja Avancado ou Moderador e queira mencionar algum|

#### Marca um comentário como repetido (duplicated). Retorna o objeto do comentário.

```http
  PUT /comments/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `:id` | `number` | **Obrigatório**. Id do comentário à sinalizar como repetido |


#### Apaga um comentário. Retorna uma String de sucesso.

```http
  DELETE /comments/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `:id` | `number` | **Obrigatório**. Id do comentário à sinalizar como repetido |


#### Reage à um comentário (Famoso Like e unLike). Retorna o objeto da reação.

```http
  PUT /reactions
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `commentId` | `number` | **Obrigatório**. Id do comentário à Reagir |
| `type` | `enu('like','unlike')` | **Obrigatório**. Reação ao comentário |

#### Responder à um comentário. Retorna o objeto da resposta.

```http
  POST /repliescomments
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `commentId` | `number` | **Obrigatório**. Id do comentário à responder |
| `content` | `string` | **Obrigatório**. Texto da resposta |

#### Apagar resposta à um comentário. Retorna o objeto da resposta.

```http
  DELETE /repliescomments/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `:id` | `number` | **Obrigatório**. Id da resposta do comentário à apagar |

