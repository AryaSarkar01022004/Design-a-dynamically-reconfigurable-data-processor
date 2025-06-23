// Factory for creating database adapters

import type { DatabaseAdapter, DatabaseType } from "../types"
import { PostgreSQLAdapter } from "../databases/postgresql-adapter"
import { MongoDBAdapter } from "../databases/mongodb-adapter"
import { RedisAdapter } from "../databases/redis-adapter"

export class DatabaseFactory {
  private static instances: Map<DatabaseType, DatabaseAdapter> = new Map()

  static async createDatabase(type: DatabaseType): Promise<DatabaseAdapter> {
    // Implement singleton pattern for database connections
    if (this.instances.has(type)) {
      return this.instances.get(type)!
    }

    let adapter: DatabaseAdapter

    switch (type) {
      case "postgresql":
        adapter = new PostgreSQLAdapter()
        break
      case "mongodb":
        adapter = new MongoDBAdapter()
        break
      case "redis":
        adapter = new RedisAdapter()
        break
      default:
        throw new Error(`Unknown database type: ${type}`)
    }

    await adapter.connect()
    this.instances.set(type, adapter)
    return adapter
  }

  static getSupportedDatabases(): DatabaseType[] {
    return ["postgresql", "mongodb", "redis"]
  }

  static async disconnectAll(): Promise<void> {
    for (const [type, adapter] of this.instances.entries()) {
      await adapter.disconnect()
    }
    this.instances.clear()
  }
}
