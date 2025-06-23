// PostgreSQL database adapter implementation

import { BaseDatabase } from "./base-database"

export class PostgreSQLAdapter extends BaseDatabase {
  private mockData: any[] = []

  constructor() {
    super("postgresql://localhost:5432/dataprocessor")
  }

  async connect(): Promise<void> {
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.isConnected = true
    console.log("Connected to PostgreSQL")
  }

  async disconnect(): Promise<void> {
    this.isConnected = false
    console.log("Disconnected from PostgreSQL")
  }

  async save(data: any): Promise<boolean> {
    this.ensureConnected()

    // Simulate save operation
    this.mockData.push({
      ...data,
      savedAt: new Date().toISOString(),
      id: data.id || this.mockData.length + 1,
    })

    return true
  }

  async validate(data: any): Promise<boolean> {
    this.ensureConnected()

    // Simulate validation logic
    return !!(data.name && data.email && data.email.includes("@"))
  }

  async query(criteria: any): Promise<any[]> {
    this.ensureConnected()

    // Simulate query operation
    if (Object.keys(criteria).length === 0) {
      return [...this.mockData]
    }

    return this.mockData.filter((item) => {
      return Object.entries(criteria).every(([key, value]) => item[key] === value)
    })
  }

  getName(): string {
    return "postgresql"
  }
}
