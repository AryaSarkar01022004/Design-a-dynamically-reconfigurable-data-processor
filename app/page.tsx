"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Database, Settings, Zap } from "lucide-react"
import { DataProcessorPipeline } from "@/lib/data-processor/pipeline"
import type { ProcessingMode, DatabaseType } from "@/lib/data-processor/types"

export default function DataProcessorDemo() {
  const [pipeline] = useState(() => new DataProcessorPipeline())
  const [selectedMode, setSelectedMode] = useState<ProcessingMode>("validation")
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseType>("postgresql")
  const [inputData, setInputData] = useState('{"id": 1, "name": "John Doe", "email": "john@example.com"}')
  const [results, setResults] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcess = async () => {
    setIsProcessing(true)
    try {
      // Configure the pipeline
      pipeline.setProcessingMode(selectedMode)
      pipeline.setDatabase(selectedDatabase)

      // Process the data
      const data = JSON.parse(inputData)
      const result = await pipeline.process(data)

      const timestamp = new Date().toLocaleTimeString()
      setResults((prev) => [
        `[${timestamp}] Mode: ${selectedMode}, DB: ${selectedDatabase}`,
        `Result: ${JSON.stringify(result, null, 2)}`,
        "---",
        ...prev,
      ])
    } catch (error) {
      const timestamp = new Date().toLocaleTimeString()
      setResults((prev) => [
        `[${timestamp}] Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        "---",
        ...prev,
      ])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">Data Processing Pipeline</h1>
          <p className="text-slate-600">Dynamically Reconfigurable Architecture Demo</p>
        </div>

        {/* Architecture Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Architecture
            </CardTitle>
            <CardDescription>
              Built with Strategy, Factory, and Observer patterns following SOLID principles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Zap className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">Processing Modes</h3>
                <p className="text-sm text-slate-600">Strategy Pattern</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold">Database Adapters</h3>
                <p className="text-sm text-slate-600">Factory Pattern</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold">Event System</h3>
                <p className="text-sm text-slate-600">Observer Pattern</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Configuration</CardTitle>
              <CardDescription>Configure processing mode and database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Processing Mode</label>
                <Select value={selectedMode} onValueChange={(value: ProcessingMode) => setSelectedMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="validation">Validation Mode</SelectItem>
                    <SelectItem value="transformation">Transformation Mode</SelectItem>
                    <SelectItem value="enrichment">Enrichment Mode</SelectItem>
                    <SelectItem value="aggregation">Aggregation Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Database</label>
                <Select value={selectedDatabase} onValueChange={(value: DatabaseType) => setSelectedDatabase(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="redis">Redis Cache</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Input Data (JSON)</label>
                <Textarea
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="Enter JSON data to process"
                  rows={4}
                />
              </div>

              <Button onClick={handleProcess} disabled={isProcessing} className="w-full">
                {isProcessing ? "Processing..." : "Process Data"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Results</CardTitle>
              <CardDescription>Real-time processing output</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="text-slate-500">No results yet. Configure and process some data!</div>
                ) : (
                  results.map((result, index) => (
                    <div key={index} className="mb-1">
                      {result}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Design Patterns Used */}
        <Card>
          <CardHeader>
            <CardTitle>Design Patterns & Principles</CardTitle>
            <CardDescription>Architecture highlights demonstrating clean code practices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Design Patterns</h3>
                <div className="space-y-2">
                  <Badge variant="outline">Strategy Pattern - Processing Modes</Badge>
                  <Badge variant="outline">Factory Pattern - Database Creation</Badge>
                  <Badge variant="outline">Observer Pattern - Event System</Badge>
                  <Badge variant="outline">Command Pattern - Operations</Badge>
                  <Badge variant="outline">Dependency Injection - Loose Coupling</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">SOLID Principles</h3>
                <div className="space-y-2">
                  <Badge variant="secondary">Single Responsibility</Badge>
                  <Badge variant="secondary">Open/Closed</Badge>
                  <Badge variant="secondary">Liskov Substitution</Badge>
                  <Badge variant="secondary">Interface Segregation</Badge>
                  <Badge variant="secondary">Dependency Inversion</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
