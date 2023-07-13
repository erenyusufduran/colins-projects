import { Document, Model } from "mongoose";

export enum TimeframeOptions {
  M1,
  M3,
  M5,
  M15,
  M30,
  M45,
  H1,
  H2,
  H3,
  H4,
  H6,
  H8,
  H12,
  D1,
  D3,
  W1,
  MO1,
  MO3,
}

export interface ITrade {
  date: Date;
  pair: string;
  timeframe: TimeframeOptions;
  shortLong: boolean;
  entry: number;
  tp: number;
  sl: number;
  size: number;
  r: number;
  profit: number;
  wl: boolean;
  link: string;
  reasons: string;
  results: string;
}

export interface ITradeDocument extends ITrade, Document {}

export interface ITradeModel extends Model<ITradeDocument> {}
