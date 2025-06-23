// Core type definitions for the data processing pipeline

export type ProcessingMode = "validation" | "transformation" | "enrichment" | "aggregation"
export type DatabaseType = "postgresql" | "mongodb" | "redis"

export interface ProcessingResult {
  success: boolean
  data: any
  metadata: {
    mode: ProcessingMode
    database: DatabaseType
    timestamp: Date
    processingTime: number
  }
  errors?: string[]
}

export interface DataProcessor {
  process(data: any): Promise<ProcessingResult>
  getName(): string
  getDescription(): string
}

export interface DatabaseAdapter {
  connect(): Promise<void>
  disconnect(): Promise<void>
  save(data: any): Promise<boolean>
  validate(data: any): Promise<boolean>
  query(criteria: any): Promise<any[]>
  getName(): string
}

export interface ProcessingEvent {
  type: "start" | "complete" | "error" | "config_change"
  timestamp: Date
  data: any
  metadata?: any
}

export interface EventObserver {
  notify(event: ProcessingEvent): void
}

export interface ProcessorConfiguration {
  mode: ProcessingMode
  database: DatabaseType
  options?: Record<string, any>
}
