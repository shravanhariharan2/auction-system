import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { BidModel } from './BidModel';
import { UserModel } from './UserModel';

@Entity('auctions')
export class AuctionModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => UserModel)
  auctioneer: UserModel;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamptz' })
  start: Date;
  
  @Column({ type: 'timestamptz' })
  end: Date;

  @Column()
  startingPrice: number;

  @OneToOne(type => BidModel)
  @JoinColumn()
  currentBid: BidModel;

  @Column()
  minIncrement: number;
}