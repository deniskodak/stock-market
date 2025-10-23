'use server';

import { connectToDatabase } from "@/database/mongoose";

export const getAllUsersForNewsEmail = async () => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection is not established");
    }

    const users = await db.collection<DBUser>('user').find(
      { email: { $exists: true, $ne: null } },
      { projection: { _id: 1, id: 1, name: 1, email: 1, country: 1 } }
    ).toArray();

    const validUsers= users.filter(user => user.email && user.name);
    return validUsers.map(user => ({
      id: user.id || user._id.toString() || '',
      name: user.name ?? '',
      email: user.email ?? '',
      country: user.country ?? '',
    }));

  } catch (error) {
    console.error("Fetching all users for news delivery failed with error:", error);
    return [];
  }
}