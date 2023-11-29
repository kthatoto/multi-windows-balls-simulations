import Dexie, { Table } from "dexie";
import { Window } from "@/types";

export class Database extends Dexie {
  windows!: Table<Window>;

  constructor() {
    super('MultiWindowsBallsSimulations');
    this.version(1).stores({
      windows: 'id, lastUpdatedAt'
    });
  }
}

export const db = new Database();
