// Factory for creating data processors

import type { DataProcessor, ProcessingMode, DatabaseAdapter } from "../types"
import { ValidationProcessor } from "../processors/validation-processor"
import { TransformationProcessor } from "../processors/transformation-processor"
import { EnrichmentProcessor } from "../processors/enrichment-processor"
import { AggregationProcessor } from "../processors/aggregation-processor"

export class ProcessorFactory {
  static createProcessor(mode: ProcessingMode, database: DatabaseAdapter): DataProcessor {
    switch (mode) {
      case "validation":
        return new ValidationProcessor(database)
      case "transformation":
        return new TransformationProcessor(database)
      case "enrichment":
        return new EnrichmentProcessor(database)
      case "aggregation":
        return new AggregationProcessor(database)
      default:
        throw new Error(`Unknown processing mode: ${mode}`)
    }
  }

  static getSupportedModes(): ProcessingMode[] {
    return ["validation", "transformation", "enrichment", "aggregation"]
  }
}
