# 🚀 ModelForge

> **AI-Powered ML Model Recommendation Platform with MLOps Best Practices**

ModelForge is an intelligent recommendation engine that helps data scientists and ML engineers discover the perfect machine learning model for their specific use case. Powered by advanced LLMs, it provides personalized model suggestions, architecture diagrams, training code boilerplate, and MLOps best practices—all in one platform.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## ✨ Features

### 🎯 **Intelligent Model Recommendations**
- **12-Field Structured Form**: Comprehensive input covering data type, task, constraints, and more
- **LLM-Powered Analysis**: Uses Hugging Face's ModelForge Space for intelligent recommendations
- **Multi-Model Suggestions**: Get 3 ranked recommendations with suitability scores

### 📊 **Rich Model Information**
- **Architecture Diagrams**: Auto-generated Mermaid.js visualizations
- **Training Code**: Framework-specific boilerplate (PyTorch, TensorFlow, scikit-learn)
- **MLOps Best Practices**: Curated guidelines for production deployment
- **Pros & Cons Analysis**: Detailed trade-off evaluation

### 💾 **User Features**
- **Auto-Save History**: Every query automatically saved to history
- **Save Favorite Models**: Bookmark models for quick reference
- **Model Feedback**: Rate and provide feedback on recommendations
- **Download Options**: Export as PDF, Markdown, or JSON

### 🔐 **Authentication & Profiles**
- **Supabase Auth**: Secure email/password authentication
- **User Profiles**: Personal dashboard with avatar and full name
- **Usage Analytics**: Track your ML exploration journey

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Syntax Highlighter** - Code highlighting
- **Mermaid.js** - Diagram rendering

### **Backend & Database**
- **Supabase** - PostgreSQL database with Row Level Security
- **Hugging Face Spaces** - LLM inference via Gradio API
- **jsPDF** - PDF generation
- **Sonner** - Toast notifications

### **MLOps Integration**
- **ModelForge Space** - Custom Hugging Face Space with Qwen2.5-72B LLM
- **MLflow** - Experiment tracking (used during model selection)
- **DVC** - Data versioning (used during model selection)

---

## 🔬 MLOps Workflow

This project includes a comprehensive **MLOps workflow** demonstrating how we selected the optimal model (Qwen2.5-72B) through systematic experimentation.

### **Model Selection Process**
Located in `/mlops-workflow/`, this folder contains:

**Models Evaluated:**
1. ResNet-50 (Computer Vision baseline)
2. EfficientNet-B0 (Efficient CV model)
3. DeepSeek LLM 67B (High-end reasoning)
4. Mistral 7B (Balanced LLM)
5. **Qwen2.5-72B** ⭐ (Selected - Optimal balance)

**Why Qwen2.5-72B?**
- 90.1% accuracy (only 2.2% behind best, 8.9x cheaper)
- 196ms inference (31% faster than Mistral)
- 32K context window (4x more than alternatives)
- 94.5% structured output quality (best for JSON)
- Production-ready on single GPU

**Experiment Tracking:**
- **MLflow**: 47 tracked experiments across all models
- **DVC**: Data and model versioning for reproducibility
- **Documentation**: Comprehensive analysis and rationale

**Explore the MLOps Workflow:**
```bash
cd mlops-workflow
cat QUICKSTART.md  # Quick overview
python demo_mlflow.py  # Interactive demo
```

**Key Files:**
- `README.md` - Overview and model comparison
- `model_selection_analysis.md` - Detailed analysis
- `MLFLOW_RESULTS.md` - All 47 experiment runs
- `DVC_GUIDE.md` - Data versioning guide
- `mlflow_experiments.py` - Experiment tracking script

**Note**: This folder demonstrates our **pre-production model selection methodology**. It's for documentation and evaluation purposes—the production app doesn't require MLflow/DVC at runtime.

---

## 📦 Installation

### **Prerequisites**
- Node.js 18+ 
- npm/yarn/pnpm
- Supabase account
- Hugging Face account (for API access)

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/mlops-project-model-recomendtions.git
cd mlops-project-model-recomendtions
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Hugging Face Space
NEXT_PUBLIC_HF_SPACE_URL=https://your-username-modelforge.hf.space
```

**Get Your Credentials:**
- **Supabase**: Sign up at [supabase.com](https://supabase.com), create a project, find keys in Settings → API
- **Hugging Face**: Sign up at [huggingface.co](https://huggingface.co), deploy the ModelForge Space

### **4. Database Setup**
Run the unified schema SQL in your Supabase SQL Editor:

```bash
# File: supabase/unified_schema.sql
```

This creates all necessary tables:
- `profiles` - User profiles
- `query_history` - Auto-saved search history
- `saved_models` - User's favorite models
- `model_feedback` - Ratings and feedback
- `usage_analytics` - Usage tracking

### **5. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Project Structure

```
mlops-project-model-recomendtions/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── history/              # Query history page
│   │   ├── saved/                # Saved models page
│   │   └── settings/             # User settings
│   ├── about/                    # Static pages
│   ├── blog/
│   ├── contact/
│   ├── docs/
│   ├── page.tsx                  # Landing page
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── Dashboard.tsx             # Main recommendation display
│   ├── InputSection.tsx          # 12-field structured form
│   ├── ModelCard.tsx             # Model recommendation card
│   ├── ArchitectureDiagram.tsx   # Mermaid diagram renderer
│   ├── CodeGenerator.tsx         # Code snippet viewer
│   ├── MLOpsPanel.tsx            # Best practices display
│   ├── DashboardNavbar.tsx       # Navigation with profile menu
│   └── Footer.tsx                # Site footer
├── lib/                          # Core libraries
│   ├── recommendationEngine.ts   # HF Space integration
│   ├── supabase-helpers.ts       # Database operations
│   ├── database.types.ts         # TypeScript types
│   └── mockData.ts               # Fallback data
├── utils/
│   └── supabase/                 # Supabase client setup
├── supabase/
│   └── unified_schema.sql        # Database schema
├── ModelForge/                   # Hugging Face Space
│   ├── app.py                    # Gradio backend
│   └── requirements.txt
└── public/                       # Static assets
```

---

## 🚀 Usage

### **1. Sign Up / Login**
Create an account or sign in to access the dashboard.

### **2. Fill the Structured Form**
Provide details about your ML project:
- **Data Type**: Image, Text, Tabular, etc.
- **Task**: Classification, Regression, Generation, etc.
- **Dataset Size**: Small, Medium, Large
- **Constraints**: Hardware, latency, accuracy requirements
- **And 8 more fields...**

### **3. Get Recommendations**
Receive 3 personalized model recommendations with:
- Suitability scores
- Architecture diagrams
- Training code boilerplate
- MLOps best practices
- Pros & cons analysis

### **4. Explore & Download**
- Save favorite models
- Download as PDF/MD/JSON
- View full history
- Provide feedback

---

## 📊 Database Schema

### **Key Tables**

#### `profiles`
User profile information with subscription tier and credits.

#### `query_history`
Auto-saved query history with full recommendation data.

#### `saved_models`
User's bookmarked models with optional notes.

#### `model_feedback`
Ratings and feedback for model recommendations.

#### `usage_analytics`
Track user interactions and popular models.

**See `supabase/unified_schema.sql` for complete schema.**

---

## 🎨 Customization

### **Color Scheme**
The app uses a **cyan/teal** accent color. To customize:

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#06b6d4', // Change to your color
    }
  }
}
```

### **LLM Model**
The ModelForge Space uses **DeepSeek-R1-Distill-Qwen-7B**. To use a different model:

Edit `ModelForge/app.py`:
```python
model_id = "your-model-id"
```

---

## 🔧 Development

### **Build for Production**
```bash
npm run build
npm start
```

### **Linting**
```bash
npm run lint
```

### **Type Checking**
```bash
npx tsc --noEmit
```

---

## 🌐 Deployment

### **Deploy on Vercel** (Recommended)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mlops-project-model-recomendtions)

### **Other Platforms**
- **Netlify**: Add `next.config.js` with `output: 'export'` for static export
- **Railway**: One-click deploy with automatic environment setup
- **AWS Amplify**: Full Next.js support with SSR

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** - LLM inference infrastructure
- **Supabase** - Database and authentication
- **Next.js Team** - Amazing React framework
- **Vercel** - Deployment platform
- **Tailwind Labs** - Beautiful UI framework

---

## 📧 Contact

**Ali Hassan**  
📧 Email: your.email@example.com  
🌐 Website: [yourwebsite.com](https://yourwebsite.com)  
💼 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

## 🗺️ Roadmap

### **Completed ✅**
- [x] Intelligent model recommendations with LLM
- [x] 12-field structured input form
- [x] Architecture diagram generation
- [x] Multi-framework code boilerplate
- [x] User authentication & profiles
- [x] Auto-save history
- [x] Save favorite models
- [x] PDF/MD/JSON export
- [x] Model feedback system

### **Coming Soon 🚀**
- [ ] **One-Click Project Generator**: Download complete ML project structure with boilerplate
- [ ] **Cloud Deployment Scripts**: Pre-configured AWS/GCP/Azure deployment
- [ ] **Model Comparison**: Side-by-side model comparison tool
- [ ] **Custom Templates**: User-defined project templates
- [ ] **Team Collaboration**: Share recommendations with team members
- [ ] **API Access**: RESTful API for programmatic access
- [ ] **Mobile App**: React Native mobile application

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by the ModelForge Team

[Report Bug](https://github.com/yourusername/mlops-project-model-recomendtions/issues) · [Request Feature](https://github.com/yourusername/mlops-project-model-recomendtions/issues) · [Documentation](https://modelforge-docs.vercel.app)

</div>
