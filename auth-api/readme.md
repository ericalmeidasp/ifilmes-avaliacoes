# API - Projeto BootCamp Itaú Devs Expert - Let's Code.

Está a a API de AUTENTICAÇÃO do Desafio.

também realizei o deploy básico da aplicação, caso queira testar:

```bash
API Auth
  http://35.247.213.198:3000/
```

para a criação da API foi utilizado Typescript, com a seguinte Stack:

## Stack utilizada

**Back-end:**

- Typescript
- DataBase -> MySQL (em Docker com Docker Compose).
- Framework -> AdonisJS (NodeJs 14).
- Cache -> Redis (em Docker com Docker Compose)

Requsitos ->

- Já ter iniciado o conteiner docker na pasta ifilmes-api (inicie por lá, caso vá iniciar as APIs separadas.)
- NodeJs 14 LTS
- Docker (com Docker Compose)
- Insomnia (ou Postman) para testes das rotas.

## Instalação

## Essa instalação deve ser realizada APENAS caso você NÃO opte por rodar o docker na pasta raiz do projeto, pois lá estão as duas api já no docker.

Primeiramente Clone o projeto

```bash
  git clone https://github.com/ericalmeidasp/desafio-itau.git
```

entra na pasta do projeto e na pasta da Api de autenticação (auth-api)

```bash
  cd itau-desafio
  cd auth-api
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

`PORT=3000`

`HOST=0.0.0.0`

`NODE_ENV=development`

`APP_KEY=Uy4MWNSK7gZMPtQfek3OgMQClBMFdn5V`

`DRIVE_DISK=local`

`DB_CONNECTION=mysql`

`MYSQL_HOST=localhost`

`MYSQL_PORT=3306`

`MYSQL_USER=root`

`MYSQL_PASSWORD=secret`

`MYSQL_DB_NAME=ifilmes`

`REDIS_CONNECTION=local`

`REDIS_HOST=127.0.0.1`

`REDIS_PORT=6379`

`REDIS_PASSWORD=redispw`

## Funcionalidades

```
Ok - Criação de usuário.
Ok - Autenticação.
Ok - Envio de user.
```

## Documentação da API

#

```
Com os Seeders, foram criados 4 usuários para testes no sistema, sendo:
- leitor@letscode.com.br -> password letscode
- basico@letscode.com.br -> password letscode
- avancado@letscode.com.br -> password letscode
- moderador@letscode.com.br -> password letscode
```

#### Tabela de paramentro de autenticação

| Parâmetro Header | Tipo parâmetro | Tipo dado | Descrição                                                              |
| :--------------- | :------------- | :-------- | :--------------------------------------------------------------------- |
| `Authorization`  | `Bearer`       | `string`  | **Obrigatório para rotas autenticadas**. Utiliza o padrão Bearer Token |

#### Fazer um cadastro -> Retorna um objeto com dados do usuário

```http
  POST /register
```

| Parâmetro  | Tipo     | Descrição                          |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Obrigatório**. Email de cadastro |
| `name`     | `string` | **Obrigatório**. Nome do usuário   |
| `password` | `string` | **Obrigatório**. Senha             |

Retorno 201

```javascript
{
	"email": "exemple@gmail.com",
	"name": "exemple",
	"created_at": "2022-07-01T01:38:34.569+00:00",
	"updated_at": "2022-07-01T01:38:34.570+00:00",
	"id": 5
}
```

#### Realizar o Login -> retorna uma array com o token de autorização e o User

```http
  POST /login
```

| Parâmetro  | Tipo     | Descrição                         |
| :--------- | :------- | :-------------------------------- |
| `email`    | `string` | **Obrigatório**. email do usuário |
| `password` | `string` | **Obrigatório**. senha do usuário |

Retorno 200

```javascript
;[
  {
    type: 'bearer',
    token: 'Mw.o1R0gJBf6OOO5_fe9zjBVszYOKJswUAeRCx0we3Pf_G-Pc_oGarYFGre5LU4',
    expires_at: '2022-07-31T01:40:25.452+00:00',
  },
  {
    id: 2,
    email: 'exemple@letscode.com.br',
    name: 'Mariana Gloria',
    remember_me_token: null,
    created_at: '2022-07-01T00:54:16.000+00:00',
    updated_at: '2022-07-01T00:54:16.000+00:00',
  },
]
```

#### Realizar o Logout

```http
  DELETE /auth
```

Retorno 200 OK

#### Retorna o usuário com base no token de autenticação -> retorna o User

```http
  GET /getuserwithtoken
```

Retorno 200

```javascript
{
	"id": 1,
	"email": "leitor@letscode.com.br",
	"name": "Pedro Roberto",
	"remember_me_token": null,
	"created_at": "2022-07-01T00:54:16.000+00:00",
	"updated_at": "2022-07-01T00:54:16.000+00:00"
}
```
