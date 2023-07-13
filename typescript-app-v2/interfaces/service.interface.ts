import { Filter, UpdateFilter } from "mongodb";

export interface Service<T> {
  find?(query: Filter<T>): Promise<T[]>;
  findOne(query: Filter<T>): Promise<T | null>;
  create(params: T): Promise<T>;
  update?(query: Filter<T>, updateObject: UpdateFilter<T>): Promise<T | null>;
  delete?(query: Filter<T>): Promise<T | Boolean>;
}
