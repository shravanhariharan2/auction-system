import express from 'express';
import * as uuid from 'uuid';
import { Auction, Bid, User } from './types';

const router = express.Router();

// our 'database' (we'll be adding an actual database connection during the SQL workshop)
const auctions = new Map<string, Auction>();
const bids = new Map<string, Bid>();
const users = new Map<string, User>();

// add a fake auctioneer
const auctioneerId = '249b2f8b-5285-4031-a164-63102017a9ba';
const auctioneer = {
  id: auctioneerId,
  username: 'auctioneer',
  balance: 100,
}
users.set(auctioneerId, auctioneer);

// define the routes
router.get('/auctions', (req, res) => {
  const auctionList = Array.from(auctions.values());
  return res.status(200).json({ auctions: auctionList });
});

router.get('/auction/:id', (req, res) => {
  const { id } = req.params;
  const auction = auctions.get(id);
  if (auction) {
    return res.status(200).json({ auction });
  } else {
    return res.status(404).json({ error: `Auction ${id} not found` });
  }
});

router.post('/auction', (req, res) => {
  // TODO: implement
});

router.post('/auction/:id/bid', (req, res) => {
  // TODO: implement based on below steps
  // 1. check if auction id is valid
  
  // 2. check if auction hasn't ended
  
  // 3. check if user id is valid
  
  // 4. check if user has enough balance to place this bid
  
  // 5. check if bid amount is high enough
  
  // 6. update our database
  
  // 7. return successful response
  
});

router.post('/user', (req, res) => {
  // TODO: implement
});

export default router;
