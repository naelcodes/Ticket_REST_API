# Tickets REST API

## Description

A simple CRUD REST api used to manage tickets from travel agency built with NestJS, Prisma and PostgreSQL. The app can be tested using Postman or any rest api client of your choice.

Routes implemented :

- **POST /tickets** - Creates a ticket record
- **POST /tickets/upload** - upload a single ticket file, and create the corresponding ticket record
- **POST /tickets/upload/batch** - upload multiple ticket files and creates the corresponding ticket record for each file
- **GET  /tickets** - Get all tickets stored in the database
- **GET /tickets/:id** - Get a ticket record by its id
- **PATCH /tickets/:id** - Update information of a ticket record
- **DELETE /tickets/:id** - deletes a single ticket record

Note : The file aren't stored in the database. Informations related to each ticket are extracted and stored in the database. For ticket samples see folder */ticket-samples*


## 1. Setup / Installation


#### PostgreSQL
* Docker (Needed)
  * PostgresSQl will run in a docker container using docker compose, as a result docker desktop is required since it includes docker compose.
  * Docker Desktop is available for [Mac](https://docs.docker.com/desktop/install/mac-install/),[Windows](https://docs.docker.com/desktop/install/windows-install/) and [Linux](https://docs.docker.com/desktop/install/linux-install/) (Skip this step if you have docker desktop)
  * Once Docker desktop installed, pull PostgreSQL image from Docker hub using docker desktop


#### Install Project dependencies

```bash
$ npm install
```


## 2. Running the app

#### step 2 : Run Postgres Container


```bash
$ npm run db:dev:start
```

#### step 3: Run the app

```bash
# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



