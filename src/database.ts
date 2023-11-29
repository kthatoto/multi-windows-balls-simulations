import Dexie, { Table } from "dexie";
import { Window, Ball } from "@/types";

export class Database extends Dexie {
  windows!: Table<Window>;
  balls!: Table<Ball>;

  constructor() {
    super('MultiWindowsBallsSimulations');
    this.version(1).stores({
      windows: 'id, main, createdAt, updatedAt',
      balls: 'id, updatedAt',
    });
  }
}

export const db = new Database();
