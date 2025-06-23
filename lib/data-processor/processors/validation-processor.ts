// Validation processor - validates data against database schema

import { BaseProcessor } from "./base-processor"
import type { ProcessingResult, DatabaseAdapter } from "../types"

export class ValidationProcessor extends BaseProcessor {
  constructor(database: DatabaseAdapter) {
    super(database, "validation")
  }

  async process(data: any): Promise<ProcessingResult> {
    const startTime = Date.now()
    const inputErrors = this.validateInput(data)

    if (inputErrors.length > 0) {
      return this.createResult(false, null, startTime, inputErrors)
    }

    try {
      // Validate against database schema/rules
      const isValid = await this.database.validate(data)

      if (isValid) {
        // Save validated data
        await this.database.save(data)
        return this.createResult(true, { ...data, validated: true }, startTime)
      } else {
        return this.createResult(false, data, startTime, ["Data validation failed"])
      }
    } catch (error) {
      return this.createResult(false, data, startTime, [
        `Validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
      ])
    }
  }

  getName(): string {
    return "ValidationProcessor"
  }

  getDescription(): string {
    return "Validates incoming data against database schema and saves if valid"
  }
}
