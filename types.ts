export type Auction = {
  id?: string;
  auctioneer: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  item: string;
  startingNumber: number; // renamed from 'startingBid' in recording
  currentBid: Bid;  // stores the current highest bid placed on the auction (this is needed for POST /auction/:id/bid implementation)
  minIncrement: number;	// the minimum difference between the highest existing bid and an incoming bid
}

export type Bid = {
  id?: string;
  auction: string;
  bidder: string;
  amount: number;
}

export type User = {
  id?: string;
  username: string;
  balance: number;
}
