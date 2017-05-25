# Michigan Vote Tracker

Currently the server and the client will live in the same repo.  This can change later on if need be.

## Install
First install `node`.  [Follow these instructions](https://docs.npmjs.com/getting-started/installing-node).

Install `yarn`, our package manager.  [Found here](https://yarnpkg.com/lang/en/docs/install/).

[Install MongoDb](https://www.mongodb.com/download-center#community), our database.

Finally, run `yarn install`.

## Run Server
Run `mongod`

Run `yarn start`

Go to [http://localhost:3000/](http://localhost:3000/)

## To Do
### API / Flow of data
- Create database
  - On home computer?
- Read and write to db from api
- API Server that accepts data and adds to the db

### Collecting base law data
- Develop tooling for scraping
- Build a scraper for law data
  - should build a large dataset in memory
- Sending data to the api
  - then (perhaps) iterate over that data, sending it to the api

### Collecting bill data
### Cron job
