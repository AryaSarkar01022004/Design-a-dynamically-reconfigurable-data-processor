// Abstract base class for database adapters

import type { DatabaseAdapter } from "../types"

export abstract class BaseDatabase implements DatabaseAdapter {
  protected connectionString: string
  protected isConnected = false

  constructor(connectionString: string) {
    this.connectionString = connectionString
  }

  abstract connect(): Promise<void>
  abstract disconnect(): Promise<void>
  abstract save(data: any): Promise<boolean>
  abstract validate(data: any): Promise<boolean>
  abstract query(criteria: any): Promise<any[]>
  abstract getName(): string

  protected ensureConnected(): void {
    if (!this.isConnected) {
      throw new Error(`Database ${this.getName()} is not connected`)
    }
  }
}
