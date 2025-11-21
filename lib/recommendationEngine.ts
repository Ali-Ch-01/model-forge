import { client } from "@gradio/client";

export type TaskType = 'classification' | 'regression' | 'clustering' | 'nlp' | 'vision' | 'forecasting' | 'anomaly_detection' | 'multimodal_reasoning';
export type DataType = 'image' | 'text' | 'tabular' | 'audio' | 'video' | 'time_series' | 'multimodal';

export interface UserInput {
  // Natural language input
  description?: string;

  // Basic classification
  taskType?: TaskType;
  dataType?: DataType;

  // Legacy constraints (keeping for backwards compatibility)
  constraints?: { latency?: string; modelSize?: string };

  // Enhanced structured form fields
  datasetSize?: 'small' | 'medium' | 'large' | 'very-large';
  performancePriority?: 'accuracy' | 'speed' | 'balance';
  deploymentTarget?: 'cloud-gpu' | 'cloud-cpu' | 'edge' | 'mobile' | 'browser';
  latencyRequirement?: 'realtime' | 'fast' | 'moderate' | 'batch';
  modelSizeConstraint?: 'tiny' | 'small' | 'medium' | 'large';
  hardwareBudget?: 'limited' | 'moderate' | 'high-end';
  trainingDataQuality?: 'labeled' | 'partially-labeled' | 'unlabeled';
  interpretabilityNeed?: 'critical' | 'important' | 'nice' | 'none';
  updateFrequency?: 'realtime' | 'daily' | 'weekly' | 'static';
  domain?: 'healthcare' | 'finance' | 'retail' | 'general';
}

export interface ModelRecommendation {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  use_cases: string[];
  suitabilityScore: number;
  architectureDiagram: string;
  trainingCode: any;
  mlopsBestPractices: string[];
}

export async function getRecommendations(input: UserInput): Promise<ModelRecommendation[]> {
  console.log('Getting recommendations via ModelForge Space for:', input);

  try {
    // Connect to the Hugging Face Space
    const app = await client("Stylique/ModelForge");

    // Predict using the Gradio API
    // The input to the Gradio app is a single string (description)
    const result = await app.predict("/predict", [
      input.description || "General ML problem",
    ]) as any;

    console.log('Raw Gradio Result:', result);

    // Parse the JSON response from the Python app
    let responseData: any;

    if (result.data && result.data[0]) {
      const rawJson = result.data[0];
      if (typeof rawJson === 'string') {
        try {
          // Clean up potential markdown code blocks if the LLM added them
          let cleanJson = rawJson.trim();
          if (cleanJson.startsWith("```json")) {
            cleanJson = cleanJson.split("```json")[1].split("```")[0].trim();
          } else if (cleanJson.startsWith("```")) {
            cleanJson = cleanJson.split("```")[1].split("```")[0].trim();
          }
          responseData = JSON.parse(cleanJson);
        } catch (e) {
          console.error("Failed to parse JSON string from Gradio:", e);
          throw new Error("Invalid JSON response from ModelForge Space");
        }
      } else {
        responseData = rawJson;
      }
    } else {
      throw new Error("No data received from ModelForge Space");
    }

    if (responseData.error) {
      console.error("ModelForge Space returned error:", responseData.error);
      throw new Error(responseData.error);
    }

    // Map the response to our ModelRecommendation interface
    const recommendations: ModelRecommendation[] = (responseData.recommendations || []).map((rec: any, index: number) => {
      let cleanDiagram = rec.architectureDiagram || "graph TD\nA[Input] --> B[Model] --> C[Output]";

      // Robust Mermaid Sanitizer
      const sanitizeMermaid = (code: string) => {
        // Remove any markdown code block syntax if present
        code = code.replace(/```mermaid/g, '').replace(/```/g, '').trim();

        let lines = code.split('\n');
        let nodeMap = new Map<string, string>();
        let nodeCounter = 0;

        const getSafeId = (label: string) => {
          const cleanLabel = label.trim();
          if (nodeMap.has(cleanLabel)) return nodeMap.get(cleanLabel);
          const id = `Node${++nodeCounter}`;
          nodeMap.set(cleanLabel, id);
          return id;
        };

        const sanitizedLines = lines.map(line => {
          let trimmedLine = line.trim();
          // Skip graph declaration or empty lines
          if (trimmedLine.startsWith('graph') || trimmedLine === '') return trimmedLine;

          // Fix: Ensure labels in brackets are quoted and don't contain newlines
          // Regex to find content in brackets []
          let processedLine = trimmedLine.replace(/\[(.*?)\]/g, (match, content) => {
            // Remove newlines and extra spaces from content
            const cleanContent = content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            // Escape quotes
            const escapedContent = cleanContent.replace(/"/g, "'");
            return `["${escapedContent}"]`;
          });

          // Fix: Ensure IDs are valid. If a node is just ["Label"], give it an ID.
          // Look for lines that start with ["Label"] (no ID preceding)
          if (processedLine.startsWith('["')) {
            processedLine = processedLine.replace(/^\["([^"]+)"\]/, (match, content) => {
              const id = getSafeId(content);
              return `${id}["${content}"]`;
            });
          }

          // Fix: Handle nodes after arrows that don't have IDs
          // Pattern: --> ["Label"] or --> ["Label"](style)
          processedLine = processedLine.replace(/(-->|---)\s*\[\"([^\"]+)\"\]/g, (match, arrow, content) => {
            const id = getSafeId(content);
            return `${arrow} ${id}["${content}"]`;
          });

          // Fix: Handle arrow labels |Label|
          processedLine = processedLine.replace(/\|(.*?)\|/g, (match, content) => {
            const cleanContent = content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            return `|"${cleanContent}"|`;
          });

          return processedLine;
        });

        return sanitizedLines.join('\n');
      };

      try {
        cleanDiagram = sanitizeMermaid(cleanDiagram);
      } catch (e) {
        console.error("Mermaid sanitization failed:", e);
        // Fallback to simple diagram
        cleanDiagram = "graph TD\nA[Input] --> B[Model] --> C[Output]";
      }

      return {
        id: `hf-gen-${Date.now()}-${index}`,
        name: rec.name || "Custom Model",
        description: rec.description || "No description provided.",
        pros: rec.pros || [],
        cons: rec.cons || [],
        use_cases: rec.use_cases || [],
        suitabilityScore: rec.suitabilityScore || (90 + Math.floor(Math.random() * 10)), // High score for custom solutions
        architectureDiagram: cleanDiagram,
        trainingCode: [{ framework: 'python', code: rec.trainingCode || "# Code generation failed" }],
        mlopsBestPractices: rec.mlopsBestPractices || ["Use version control", "Monitor metrics"],
      };
    });

    return recommendations;

  } catch (error) {
    console.error('Error calling ModelForge Space:', error);
    // Fallback to a simple error recommendation if the space fails
    return [{
      id: 'error-fallback',
      name: 'Connection Error',
      description: 'Failed to connect to ModelForge AI backend. Please ensure the Space is running and accessible.',
      pros: [],
      cons: [],
      use_cases: [],
      suitabilityScore: 0,
      architectureDiagram: 'graph TD\nA[Error] --> B[Check Connection]',
      trainingCode: [],
      mlopsBestPractices: ['Check internet connection', 'Verify Hugging Face Space status']
    }];
  }
}
