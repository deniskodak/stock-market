"use server";

import { Watchlist } from "../../database/models/watchlist.model";
import { connectToDatabase } from "../../database/mongoose";

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection is not established");
    }


    const user = await db.collection<DBUser>('user').findOne({ email });
    if (!user) return [];

    const userId = user.id || user._id.toString();
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map(item => String(item.symbol));
  } catch (error) {
    console.error("Error fetching watchlist symbols:", error);
    return [];
  }
}
