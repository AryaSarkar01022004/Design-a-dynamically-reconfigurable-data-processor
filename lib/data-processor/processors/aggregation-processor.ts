// Aggregation processor - aggregates data and saves summary to database

import { BaseProcessor } from "./base-processor"
import type { ProcessingResult, DatabaseAdapter } from "../types"

export class AggregationProcessor extends BaseProcessor {
  constructor(database: DatabaseAdapter) {
    super(database, "aggregation")
  }

  async process(data: any): Promise<ProcessingResult> {
    const startTime = Date.now()
    const inputErrors = this.validateInput(data)

    if (inputErrors.length > 0) {
      return this.createResult(false, null, startTime, inputErrors)
    }

    try {
      // Query existing data for aggregation
      const existingData = await this.database.query({})

      // Perform aggregation
      const aggregatedData = this.aggregateData(data, existingData)

      // Save aggregated result
      await this.database.save(aggregatedData)

      return this.createResult(true, aggregatedData, startTime)
    } catch (error) {
      return this.createResult(false, data, startTime, [
        `Aggregation error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ])
    }
  }

  private aggregateData(newData: any, existingData: any[]): any {
    return {
      summary: {
        totalRecords: existingData.length + 1,
        latestRecord: newData,
        aggregatedAt: new Date().toISOString(),
      },
      statistics: {
        averageId:
          existingData.length > 0
            ? (existingData.reduce((sum, item) => sum + (item.id || 0), 0) + (newData.id || 0)) /
              (existingData.length + 1)
            : newData.id || 0,
      },
    }
  }

  getName(): string {
    return "AggregationProcessor"
  }

  getDescription(): string {
    return "Aggregates incoming data with existing data and saves summary"
  }
}
