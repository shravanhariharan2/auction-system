import "reflect-metadata" // required for typeorm
import express from 'express';
import { createConnection } from 'typeorm';
import router from './controllers';
import { AuctionModel } from './models/AuctionModel';
import { BidModel } from './models/BidModel';
import { UserModel } from './models/UserModel';
import { createUser } from "./repositories";

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

  // add fake auctioneer
  const addFakeAuctioneer = async () => {
    const auctioneerId = '249b2f8b-5285-4031-a164-63102017a9ba';
    const auctioneer = {
      id: auctioneerId,
      username: 'auctioneer',
      balance: 100,
    }
    await createUser(connection, auctioneer);
  }

  // specify prefix for the routes implemented in controllers.ts
  server.use('/', router);
}

connectToDatabase();

// start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
