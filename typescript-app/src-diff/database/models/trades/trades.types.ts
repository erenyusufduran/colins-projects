import { Document, Model } from "mongoose";

export enum TimeframeOptions {
  M1 = "1 minute",
  M3 = "3 minutes",
  M5 = "5 minutes",
  M15 = "15 minutes",
  M30 = "30 minutes",
  M45 = "45 minutes",
  H1 = "1 hour",
  H2 = "2 hours",
  H3 = "3 hours",
  H4 = "4 hours",
  H6 = "6 hours",
  H8 = "8 hours",
  H12 = "12 hours",
  D1 = "1 day",
  D3 = "3 days",
  W1 = "1 week",
  MO1 = "1 month",
  MO3 = "3 months",
}

export interface ITrade {
  date?: Date;
  pair?: string;
  timeframe?: TimeframeOptions;
  shortLong: boolean;
  entry: number;
  tp?: number;
  sl?: number;
  size?: number;
  wl?: boolean;
  link?: string;
  reasons?: string;
  results?: string;
}

export interface ITradeDocument extends ITrade, Document {
  r: number;
  profit: number;
}

export interface ITradeModel extends Model<ITradeDocument> {
  build: (trade: ITrade) => Promise<ITradeDocument>;
}
