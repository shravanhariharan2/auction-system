export type Auction = {
  id?: string;
  auctioneer: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  item: string;
  startingBid: number
  minIncrement: number	// the minimum difference between the highest existing bid and an incoming bid
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
