-- Create a table for storing model recommendations
create table public.models (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  pros text[],
  cons text[],
  suitability_score integer,
  architecture_diagram text, -- Mermaid code
  training_code jsonb, -- Array of objects {framework, code}
  mlops_best_practices text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for storing user queries
create table public.queries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id), -- Optional if we allow anonymous
  input_text text,
  input_structured jsonb,
  recommended_model_ids uuid[], -- Array of model IDs
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.models enable row level security;
alter table public.queries enable row level security;

-- Create policies
-- Allow anyone to read models
create policy "Allow public read access to models"
  on public.models for select
  using (true);

-- Allow authenticated users to insert queries
create policy "Allow auth users to insert queries"
  on public.queries for insert
  with check (auth.uid() = user_id);

-- Allow users to read their own queries
create policy "Allow users to read own queries"
  on public.queries for select
  using (auth.uid() = user_id);

-- Seed some initial data (optional, based on our mock data)
insert into public.models (name, description, pros, cons, suitability_score, architecture_diagram, training_code, mlops_best_practices)
values
(
  'ResNet-50',
  'A widely used convolutional neural network for image classification.',
  ARRAY['Good balance of accuracy and speed', 'Pre-trained weights available', 'Easy to fine-tune'],
  ARRAY['Not the state-of-the-art accuracy', 'Can be heavy for edge devices'],
  95,
  'graph TD\n    A[Input Image] --> B[Conv1]\n    B --> C[Pooling]\n    C --> D[ResBlock 1]\n    D --> E[ResBlock 2]\n    E --> F[ResBlock 3]\n    F --> G[ResBlock 4]\n    G --> H[Avg Pooling]\n    H --> I[FC Layer]\n    I --> J[Output Class]',
  '[{"framework": "pytorch", "code": "import torch\nimport torchvision.models as models\n\n# Load pre-trained ResNet50\nmodel = models.resnet50(pretrained=True)\n\n# Modify the last layer for your number of classes\nnum_classes = 10\nmodel.fc = torch.nn.Linear(model.fc.in_features, num_classes)\n\n# Define loss and optimizer\ncriterion = torch.nn.CrossEntropyLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)"}, {"framework": "tensorflow", "code": "import tensorflow as tf\nfrom tensorflow.keras.applications import ResNet50\n\n# Load pre-trained ResNet50\nbase_model = ResNet50(weights=''imagenet'', include_top=False, input_shape=(224, 224, 3))\n\n# Add custom layers\nx = base_model.output\nx = tf.keras.layers.GlobalAveragePooling2D()(x)\noutput = tf.keras.layers.Dense(10, activation=''softmax'')(x)\n\nmodel = tf.keras.Model(inputs=base_model.input, outputs=output)\n\nmodel.compile(optimizer=''adam'', loss=''categorical_crossentropy'', metrics=[''accuracy''])"}]'::jsonb,
  ARRAY['Use Data Version Control (DVC) for image datasets', 'Track experiments with MLflow or Weights & Biases', 'Quantize model for mobile deployment using ONNX']
),
(
  'BERT Base',
  'Bidirectional Encoder Representations from Transformers for NLP tasks.',
  ARRAY['State-of-the-art for many NLP tasks', 'Contextual understanding', 'Huge ecosystem'],
  ARRAY['Computationally expensive', 'Slow inference speed'],
  92,
  'graph TD\n    A[Input Text] --> B[Tokenizer]\n    B --> C[Embedding Layer]\n    C --> D[Transformer Encoder 1]\n    D --> E[Transformer Encoder 2]\n    E --> F[...]\n    F --> G[Transformer Encoder 12]\n    G --> H[Pooling]\n    H --> I[Classifier Head]\n    I --> J[Output]',
  '[{"framework": "pytorch", "code": "from transformers import BertTokenizer, BertForSequenceClassification\nimport torch\n\ntokenizer = BertTokenizer.from_pretrained(''bert-base-uncased'')\nmodel = BertForSequenceClassification.from_pretrained(''bert-base-uncased'', num_labels=2)\n\ninputs = tokenizer(\"Hello, my dog is cute\", return_tensors=\"pt\")\nlabels = torch.tensor([1]).unsqueeze(0)  # Batch size 1\noutputs = model(**inputs, labels=labels)\nloss = outputs.loss\nlogits = outputs.logits"}]'::jsonb,
  ARRAY['Use Hugging Face Model Hub for versioning', 'Implement dynamic padding for efficient batching', 'Monitor token usage and latency in production']
),
(
  'XGBoost',
  'Gradient boosting library for tabular data.',
  ARRAY['Extremely fast and efficient', 'Handles missing values well', 'High performance on structured data'],
  ARRAY['Can overfit if not tuned', 'Not suitable for unstructured data (images/audio)'],
  98,
  'graph TD\n    A[Input Data] --> B[Decision Tree 1]\n    A --> C[Decision Tree 2]\n    A --> D[...]\n    A --> E[Decision Tree N]\n    B --> F[Weighted Sum]\n    C --> F\n    D --> F\n    E --> F\n    F --> G[Prediction]',
  '[{"framework": "sklearn", "code": "import xgboost as xgb\nfrom sklearn.model_selection import train_test_split\n\n# Load data\nX, y = load_data()\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = xgb.XGBClassifier(use_label_encoder=False)\nmodel.fit(X_train, y_train)\n\n# Evaluate\naccuracy = model.score(X_test, y_test)\nprint(f\"Accuracy: {accuracy}\")"}]'::jsonb,
  ARRAY['Log feature importance charts', 'Use SHAP values for explainability', 'Save models in JSON/UBJSON for interoperability']
);
