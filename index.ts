import "reflect-metadata" // required for typeorm
import express from 'express';
import { createConnection } from 'typeorm';
import router from './controllers';
import { AuctionModel } from './models/AuctionModel';
import { BidModel } from './models/BidModel';
import { UserModel } from './models/UserModel';

const server = express();

// allow routes to parse JSON from the request
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const connectToDatabase = async () => {
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "auction",
    synchronize: true,
    entities: [
      AuctionModel,
      BidModel,
      UserModel,
    ]
  });
  console.log('Connected to database');

  // pass in connection to 'req.db' field
  server.use((req, res, next) => {
    req.db = connection;
    return next();
  });

  // specify prefix for the routes implemented in controllers.ts
  server.use('/', router);
}

connectToDatabase();

// start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
