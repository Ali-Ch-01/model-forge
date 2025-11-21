import { client } from "@gradio/client";

export type TaskType = 'classification' | 'regression' | 'clustering' | 'nlp' | 'vision' | 'forecasting' | 'anomaly_detection' | 'multimodal_reasoning';
export type DataType = 'image' | 'text' | 'tabular' | 'audio' | 'video' | 'time_series' | 'multimodal';

export interface UserInput {
  description?: string;
  taskType?: TaskType;
  dataType?: DataType;
  constraints?: { latency?: string; modelSize?: string };
}

export interface ModelRecommendation {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
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
    const recommendations: ModelRecommendation[] = (responseData.recommendations || []).map((rec: any, index: number) => ({
      id: `hf-gen-${Date.now()}-${index}`,
      name: rec.name || "Custom Model",
      description: rec.description || "No description provided.",
      pros: rec.pros || [],
      cons: rec.cons || [],
      suitabilityScore: 90 + Math.floor(Math.random() * 10), // High score for custom solutions
      architectureDiagram: rec.architectureDiagram || "graph TD\nA[Input] --> B[Model] --> C[Output]",
      trainingCode: [{ framework: 'python', code: rec.trainingCode || "# Code generation failed" }],
      mlopsBestPractices: rec.mlopsBestPractices || ["Use version control", "Monitor metrics"],
    }));

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
      suitabilityScore: 0,
      architectureDiagram: 'graph TD\nA[Error] --> B[Check Connection]',
      trainingCode: [],
      mlopsBestPractices: ['Check internet connection', 'Verify Hugging Face Space status']
    }];
  }
}
