import { Connection } from "typeorm";
import { AuctionModel } from "./models/AuctionModel";
import { BidModel } from "./models/BidModel";
import { UserModel } from "./models/UserModel";
import { Auction, Bid, User } from "./types";

export const getAuctions = async (conn: Connection) => {
  return conn.manager.find(AuctionModel);
}

export const getAuction = async (conn: Connection, id: string) => {
  return conn.manager.findOne(AuctionModel, {
    where: {
      id
    }
  });
}

export const createAuction = async (conn: Connection, auction: Auction) => {
  const auctioneer = await conn.manager.findOne(UserModel, {
    where: {
      id: auction.auctioneer
    }
  })
  return conn.manager.save(AuctionModel, AuctionModel.create({
    ...auction,
    auctioneer: auctioneer,
    currentBid: null,
  }));
}

export const updateHighestBid = async (conn: Connection, auction: AuctionModel, highestBid: BidModel) => {
  auction.currentBid = highestBid;
  await conn.manager.save(AuctionModel, auction);
}

export const createBid = async (conn: Connection, bid: Bid, bidder: UserModel, auction: AuctionModel) => {
  return conn.manager.save(BidModel, BidModel.create({
    ...bid,
    auction,
    bidder
  }));
}

export const getUser = async (conn: Connection, id: string) => {
  return conn.manager.findOne(UserModel, { where: { id }});
}

export const createUser = async (conn: Connection, user: User) => {
  // ORM call
  return conn.manager.save(UserModel, user);
}