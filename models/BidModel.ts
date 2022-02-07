import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, BaseEntity } from 'typeorm';
import { AuctionModel } from './AuctionModel';
import { UserModel } from './UserModel';

@Entity('bids')
export class BidModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => AuctionModel)
  auction?: AuctionModel;

  @ManyToOne((type) => UserModel)
  bidder: UserModel;

  @Column()
  amount: number;
}