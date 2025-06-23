// Transformation processor - transforms data and saves to database

import { BaseProcessor } from "./base-processor"
import type { ProcessingResult, DatabaseAdapter } from "../types"

export class TransformationProcessor extends BaseProcessor {
  constructor(database: DatabaseAdapter) {
    super(database, "transformation")
  }

  async process(data: any): Promise<ProcessingResult> {
    const startTime = Date.now()
    const inputErrors = this.validateInput(data)

    if (inputErrors.length > 0) {
      return this.createResult(false, null, startTime, inputErrors)
    }

    try {
      // Transform the data
      const transformedData = this.transformData(data)

      // Save transformed data
      await this.database.save(transformedData)

      return this.createResult(true, transformedData, startTime)
    } catch (error) {
      return this.createResult(false, data, startTime, [
        `Transformation error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ])
    }
  }

  private transformData(data: any): any {
    // Example transformation logic
    return {
      ...data,
      id: data.id || Math.floor(Math.random() * 10000),
      processedAt: new Date().toISOString(),
      normalized: {
        name: data.name?.toLowerCase().trim(),
        email: data.email?.toLowerCase().trim(),
      },
    }
  }

  getName(): string {
    return "TransformationProcessor"
  }

  getDescription(): string {
    return "Transforms incoming data and saves the result to database"
  }
}
