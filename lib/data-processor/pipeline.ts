// Main pipeline orchestrator

import type {
  DataProcessor,
  DatabaseAdapter,
  ProcessingResult,
  ProcessingMode,
  DatabaseType,
  ProcessorConfiguration,
} from "./types"
import { ProcessorFactory } from "./factories/processor-factory"
import { DatabaseFactory } from "./factories/database-factory"
import { EventSystem, ConsoleLogger } from "./events/event-system"

export class DataProcessorPipeline {
  private currentProcessor: DataProcessor | null = null
  private currentDatabase: DatabaseAdapter | null = null
  private configuration: ProcessorConfiguration
  private eventSystem: EventSystem

  constructor() {
    this.configuration = {
      mode: "validation",
      database: "postgresql",
    }

    this.eventSystem = new EventSystem()
    this.eventSystem.addObserver(new ConsoleLogger())
  }

  async setProcessingMode(mode: ProcessingMode): Promise<void> {
    if (this.configuration.mode !== mode) {
      this.configuration.mode = mode
      await this.reconfigure()

      this.eventSystem.notifyObservers(
        this.eventSystem.createEvent("config_change", { mode }, { previousMode: this.configuration.mode }),
      )
    }
  }

  async setDatabase(database: DatabaseType): Promise<void> {
    if (this.configuration.database !== database) {
      this.configuration.database = database
      await this.reconfigure()

      this.eventSystem.notifyObservers(
        this.eventSystem.createEvent("config_change", { database }, { previousDatabase: this.configuration.database }),
      )
    }
  }

  private async reconfigure(): Promise<void> {
    try {
      // Get or create database adapter
      this.currentDatabase = await DatabaseFactory.createDatabase(this.configuration.database)

      // Create processor with current database
      this.currentProcessor = ProcessorFactory.createProcessor(this.configuration.mode, this.currentDatabase)
    } catch (error) {
      throw new Error(`Failed to reconfigure pipeline: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async process(data: any): Promise<ProcessingResult> {
    if (!this.currentProcessor || !this.currentDatabase) {
      await this.reconfigure()
    }

    this.eventSystem.notifyObservers(
      this.eventSystem.createEvent("start", data, {
        mode: this.configuration.mode,
        database: this.configuration.database,
      }),
    )

    try {
      const result = await this.currentProcessor!.process(data)

      this.eventSystem.notifyObservers(this.eventSystem.createEvent("complete", result))

      return result
    } catch (error) {
      this.eventSystem.notifyObservers(this.eventSystem.createEvent("error", error))
      throw error
    }
  }

  getConfiguration(): ProcessorConfiguration {
    return { ...this.configuration }
  }

  getSupportedModes(): ProcessingMode[] {
    return ProcessorFactory.getSupportedModes()
  }

  getSupportedDatabases(): DatabaseType[] {
    return DatabaseFactory.getSupportedDatabases()
  }

  async shutdown(): Promise<void> {
    await DatabaseFactory.disconnectAll()
    this.currentProcessor = null
    this.currentDatabase = null
  }
}
