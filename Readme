# Dynamically Reconfigurable Data Processor

A sophisticated, enterprise-grade data processing pipeline built with TypeScript and Next.js, demonstrating advanced software architecture patterns and SOLID principles. This system provides dynamic reconfiguration capabilities, allowing real-time switching between processing modes and database backends.

## 🏗️ Architecture Overview

This project showcases a production-ready architecture implementing multiple design patterns:

- **Strategy Pattern** - Pluggable processing modes (validation, transformation, enrichment, aggregation)
- **Factory Pattern** - Dynamic creation of processors and database adapters
- **Observer Pattern** - Event-driven system for monitoring and logging
- **Singleton Pattern** - Efficient database connection management
- **Template Method Pattern** - Consistent base implementations with customizable behavior

## 🚀 Features

### Core Capabilities
- **Dynamic Reconfiguration** - Switch processing modes and databases at runtime
- **Multiple Processing Modes** - Validation, transformation, enrichment, and aggregation
- **Multi-Database Support** - PostgreSQL, MongoDB, and Redis adapters
- **Event-Driven Architecture** - Real-time monitoring and logging
- **Type-Safe Implementation** - Full TypeScript support with comprehensive interfaces

### Processing Modes

#### Validation Mode
- Validates incoming data against database schema
- Saves valid data to the selected database
- Returns validation results with detailed error reporting

#### Transformation Mode
- Applies data transformations (normalization, formatting, etc.)
- Generates unique IDs and timestamps
- Saves transformed data to the database

#### Enrichment Mode
- Queries database for additional information
- Enriches incoming data with related records
- Maintains data relationships and context

#### Aggregation Mode
- Performs statistical analysis on data sets
- Generates summaries and aggregated metrics
- Stores analytical results for reporting

### Database Adapters

#### PostgreSQL Adapter
- Relational database operations
- ACID compliance simulation
- Advanced querying capabilities

#### MongoDB Adapter
- Document-based storage
- Flexible schema validation
- NoSQL query patterns

#### Redis Adapter
- High-performance caching
- TTL-based data expiration
- Key-value storage optimization

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Architecture**: SOLID principles, Design Patterns
- **Development**: ESLint, TypeScript strict mode

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd data-processor-pipeline
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 🎯 Usage

### Basic Usage

\`\`\`typescript
import { DataProcessorPipeline } from '@/lib/data-processor/pipeline'

// Create a new pipeline instance
const pipeline = new DataProcessorPipeline()

// Configure the pipeline
await pipeline.setProcessingMode('validation')
await pipeline.setDatabase('postgresql')

// Process data
const result = await pipeline.process({
  id: 1,
  name: "John Doe",
  email: "john@example.com"
})

console.log(result)
\`\`\`

### Advanced Configuration

\`\`\`typescript
// Get supported modes and databases
const modes = pipeline.getSupportedModes()
const databases = pipeline.getSupportedDatabases()

// Get current configuration
const config = pipeline.getConfiguration()

// Shutdown gracefully
await pipeline.shutdown()
\`\`\`

## 🏛️ Architecture Details

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
- Each processor handles one specific type of data processing
- Database adapters focus solely on data persistence
- Event system manages only notification concerns

#### Open/Closed Principle (OCP)
- New processing modes can be added without modifying existing code
- Database adapters are extensible through the common interface
- Pipeline orchestrator remains unchanged when adding new components

#### Liskov Substitution Principle (LSP)
- All processors are interchangeable through the \`DataProcessor\` interface
- Database adapters can be substituted without affecting functionality
- Base classes provide consistent behavior contracts

#### Interface Segregation Principle (ISP)
- Focused interfaces for processors, databases, and events
- No client depends on methods it doesn't use
- Clean separation of concerns across components

#### Dependency Inversion Principle (DIP)
- High-level modules depend on abstractions, not concretions
- Factories provide loose coupling between components
- Dependency injection enables flexible configuration

### Design Patterns Deep Dive

#### Strategy Pattern
\`\`\`typescript
interface DataProcessor {
  process(data: any): Promise<ProcessingResult>
  getName(): string
  getDescription(): string
}

class ValidationProcessor implements DataProcessor {
  // Validation-specific implementation
}

class TransformationProcessor implements DataProcessor {
  // Transformation-specific implementation
}
\`\`\`

#### Factory Pattern
\`\`\`typescript
class ProcessorFactory {
  static createProcessor(mode: ProcessingMode, database: DatabaseAdapter): DataProcessor {
    switch (mode) {
      case 'validation': return new ValidationProcessor(database)
      case 'transformation': return new TransformationProcessor(database)
      // ... other modes
    }
  }
}
\`\`\`

#### Observer Pattern
\`\`\`typescript
interface EventObserver {
  notify(event: ProcessingEvent): void
}

class EventSystem {
  private observers: EventObserver[] = []
  
  addObserver(observer: EventObserver): void {
    this.observers.push(observer)
  }
  
  notifyObservers(event: ProcessingEvent): void {
    this.observers.forEach(observer => observer.notify(event))
  }
}
\`\`\`

## 🔧 Extending the System

### Adding a New Processing Mode

1. **Create the processor class**
   \`\`\`typescript
   export class FilteringProcessor extends BaseProcessor {
     constructor(database: DatabaseAdapter) {
       super(database, 'filtering')
     }
     
     async process(data: any): Promise<ProcessingResult> {
       // Implement filtering logic
     }
   }
   \`\`\`

2. **Update the factory**
   \`\`\`typescript
   // Add to ProcessorFactory.createProcessor()
   case 'filtering': return new FilteringProcessor(database)
   \`\`\`

3. **Update type definitions**
   \`\`\`typescript
   export type ProcessingMode = 'validation' | 'transformation' | 'enrichment' | 'aggregation' | 'filtering'
   \`\`\`

### Adding a New Database Adapter

1. **Implement the adapter**
   \`\`\`typescript
   export class ElasticsearchAdapter extends BaseDatabase {
     async connect(): Promise<void> {
       // Elasticsearch connection logic
     }
     
     async save(data: any): Promise<boolean> {
       // Elasticsearch save logic
     }
     
     // ... other methods
   }
   \`\`\`

2. **Register in factory**
   \`\`\`typescript
   // Add to DatabaseFactory.createDatabase()
   case 'elasticsearch': adapter = new ElasticsearchAdapter(); break;
   \`\`\`

## 📊 Performance Considerations

- **Connection Pooling**: Database adapters use singleton pattern for efficient connection management
- **Async Processing**: All operations are asynchronous to prevent blocking
- **Memory Management**: Proper cleanup and resource disposal
- **Error Handling**: Comprehensive error catching and reporting

## 🧪 Testing Strategy

The architecture supports comprehensive testing through:

- **Unit Tests**: Individual processor and adapter testing
- **Integration Tests**: End-to-end pipeline testing
- **Mock Implementations**: Database adapters include mock functionality
- **Type Safety**: TypeScript ensures compile-time error detection

## 📈 Monitoring and Observability

The event system provides:

- **Processing Metrics**: Timing and performance data
- **Error Tracking**: Detailed error reporting and logging
- **Configuration Changes**: Audit trail of system modifications
- **Real-time Monitoring**: Live processing status updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern TypeScript and React best practices
- Implements enterprise-grade software architecture patterns
- Designed for scalability, maintainability, and extensibility
- Demonstrates clean code principles and SOLID design

---

**Built with ❤️ for demonstrating advanced software architecture patterns**
