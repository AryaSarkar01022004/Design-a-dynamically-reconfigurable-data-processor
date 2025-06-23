// MongoDB database adapter implementation

import { BaseDatabase } from "./base-database"

export class MongoDBAdapter extends BaseDatabase {
  private mockCollection: any[] = []

  constructor() {
    super("mongodb://localhost:27017/dataprocessor")
  }

  async connect(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    this.isConnected = true
    console.log("Connected to MongoDB")
  }

  async disconnect(): Promise<void> {
    this.isConnected = false
    console.log("Disconnected from MongoDB")
  }

  async save(data: any): Promise<boolean> {
    this.ensureConnected()

    const document = {
      ...data,
      _id: data._id || new Date().getTime().toString(),
      createdAt: new Date(),
      collection: "processed_data",
    }

    this.mockCollection.push(document)
    return true
  }

  async validate(data: any): Promise<boolean> {
    this.ensureConnected()

    // MongoDB-style validation
    const requiredFields = ["name", "email"]
    return requiredFields.every((field) => data[field] !== undefined && data[field] !== null)
  }

  async query(criteria: any): Promise<any[]> {
    this.ensureConnected()

    if (Object.keys(criteria).length === 0) {
      return [...this.mockCollection]
    }

    return this.mockCollection.filter((doc) => {
      return Object.entries(criteria).every(([key, value]) => doc[key] === value)
    })
  }

  getName(): string {
    return "mongodb"
  }
}
