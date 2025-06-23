// Abstract base class implementing common processor functionality

import type { DataProcessor, ProcessingResult, ProcessingMode, DatabaseAdapter } from "../types"

export abstract class BaseProcessor implements DataProcessor {
  protected database: DatabaseAdapter
  protected mode: ProcessingMode

  constructor(database: DatabaseAdapter, mode: ProcessingMode) {
    this.database = database
    this.mode = mode
  }

  abstract process(data: any): Promise<ProcessingResult>
  abstract getName(): string
  abstract getDescription(): string

  protected async createResult(
    success: boolean,
    data: any,
    startTime: number,
    errors?: string[],
  ): Promise<ProcessingResult> {
    return {
      success,
      data,
      metadata: {
        mode: this.mode,
        database: this.database.getName() as any,
        timestamp: new Date(),
        processingTime: Date.now() - startTime,
      },
      errors,
    }
  }

  protected validateInput(data: any): string[] {
    const errors: string[] = []

    if (!data) {
      errors.push("Input data is required")
    }

    if (typeof data !== "object") {
      errors.push("Input data must be an object")
    }

    return errors
  }
}
