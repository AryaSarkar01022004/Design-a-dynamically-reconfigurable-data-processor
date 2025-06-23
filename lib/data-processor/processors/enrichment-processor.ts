// Enrichment processor - enriches data with additional information from database

import { BaseProcessor } from "./base-processor"
import type { ProcessingResult, DatabaseAdapter } from "../types"

export class EnrichmentProcessor extends BaseProcessor {
  constructor(database: DatabaseAdapter) {
    super(database, "enrichment")
  }

  async process(data: any): Promise<ProcessingResult> {
    const startTime = Date.now()
    const inputErrors = this.validateInput(data)

    if (inputErrors.length > 0) {
      return this.createResult(false, null, startTime, inputErrors)
    }

    try {
      // Query database for enrichment data
      const enrichmentData = await this.database.query({ id: data.id })

      // Enrich the data
      const enrichedData = {
        ...data,
        enriched: true,
        additionalInfo: enrichmentData.length > 0 ? enrichmentData[0] : null,
        enrichmentTimestamp: new Date().toISOString(),
      }

      // Save enriched data
      await this.database.save(enrichedData)

      return this.createResult(true, enrichedData, startTime)
    } catch (error) {
      return this.createResult(false, data, startTime, [
        `Enrichment error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ])
    }
  }

  getName(): string {
    return "EnrichmentProcessor"
  }

  getDescription(): string {
    return "Enriches incoming data with additional information from database"
  }
}
