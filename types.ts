export type Auction = {
  auctioneer: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  startingPrice: number;
  currentBid: Bid;
  minIncrement: number;	// the minimum difference between the highest existing bid and an incoming bid
}

export type Bid = {
  auctionId?: string;
  bidder: string;
  amount: number;
}

export type User = {
  username: string;
  balance: number;
}