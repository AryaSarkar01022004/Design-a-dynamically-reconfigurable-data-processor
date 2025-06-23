// Event system for observing processing events

import type { ProcessingEvent, EventObserver } from "../types"

export class EventSystem {
  private observers: EventObserver[] = []

  addObserver(observer: EventObserver): void {
    this.observers.push(observer)
  }

  removeObserver(observer: EventObserver): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notifyObservers(event: ProcessingEvent): void {
    this.observers.forEach((observer) => observer.notify(event))
  }

  createEvent(type: ProcessingEvent["type"], data: any, metadata?: any): ProcessingEvent {
    return {
      type,
      timestamp: new Date(),
      data,
      metadata,
    }
  }
}

export class ConsoleLogger implements EventObserver {
  notify(event: ProcessingEvent): void {
    console.log(`[${event.timestamp.toISOString()}] ${event.type.toUpperCase()}:`, event.data)
    if (event.metadata) {
      console.log("Metadata:", event.metadata)
    }
  }
}
