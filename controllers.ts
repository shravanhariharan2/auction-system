import express from 'express';
import { getConnection } from 'typeorm';
import * as uuid from 'uuid';
import { AuctionModel } from './models/AuctionModel';
import { createAuction, createBid, createUser, getAuction, getAuctions, getUser, updateHighestBid } from './repositories';
import { Auction, Bid, User } from './types';

const router = express.Router();

// define the routes
router.get('/auctions', async (req, res) => {
  const auctionList = await getAuctions(req.db);
  return res.status(200).json({ auctions: auctionList });
});

router.get('/auction/:id', async (req, res) => {
  const id: string = req.params.id;
  const auction = await getAuction(req.db, id);
  if (auction) {
    return res.status(200).json({ auction });
  } else {
    return res.status(404).json({ error: `Auction ${id} not found` });
  }
});

router.post('/auction', async (req, res) => {
  const auction: Auction = req.body.auction;

  // convert strings to dates
  auction.start = new Date(auction.start);
  auction.end = new Date(auction.end);

  // create auction
  const createdAuction = await createAuction(req.db, auction);

  return res.status(200).json({ auction: createdAuction });
});

router.post('/auction/:id/bid', async (req, res) => {
  const auctionId: string = req.params.id;
  const conn = req.db;
  const auction = await getAuction(conn, auctionId);
  // check if auction id is valid
  if (!auction) {
    return res.status(404).json({ error: `Auction ${auctionId} not found` });
  }
  // check if auction is ongoing
  const now = new Date();
  const isOngoing = now >= auction.start && now <= auction.end;
  if (!isOngoing) {
    return res.status(400).json({ error: `Auction ${auctionId} is not currently running!` });
  }

  const bid: Bid = req.body.bid;
  const bidderId = bid.bidder;
  const user = await getUser(conn, bidderId);

  // check if user id is valid
  if (!user) {
    return res.status(404).json({ error: `User ${user.username} not found` });
  }
  // check if user has enough balance to place this bid
  if (user.balance < bid.amount) {
    return res.status(400).json({ error: `User ${user.username} cannot afford this bid!` });
  }

  // check if bid amount is high enough
  const { currentBid, minIncrement } = auction;
  let minimumBid = 0;
  if (!currentBid) {
    minimumBid = auction.startingPrice + minIncrement;
  } else {
    minimumBid = currentBid.amount + minIncrement;
  }
  if (bid.amount < minimumBid) {
    return res.status(400).json({ error: `Bid amount too low! Minimum bid must be: ${minimumBid}`})
  }

  // update our database
  const bidModel = await createBid(req.db, bid, user, auction);
  await updateHighestBid(conn, auction, bidModel);

  // return success
  return res.status(200).json({ bid });
});

router.post('/user', async (req, res) => {
  const user: User = req.body.user;
  const userModel = await createUser(req.db, user);
  return res.status(200).json({ user: userModel });
});


export default router;
