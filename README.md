# 🚀 ModelForge

> **AI-Powered ML Model Recommendation Platform with MLOps Best Practices**

ModelForge is an intelligent recommendation engine that helps data scientists and ML engineers discover the perfect machine learning model for their specific use case. Powered by advanced LLMs, it provides personalized model suggestions, architecture diagrams, training code boilerplate, and MLOps best practices—all in one platform.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

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

- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - Modern UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with @tailwindcss/postcss
- **Framer Motion** - Smooth animations
- **React Syntax Highlighter** - Code highlighting
- **Mermaid.js 11** - Architecture diagram rendering
- **next-themes** - Dark/light mode support
- **Radix UI** - Accessible UI components (Dialog, Dropdown, Tooltip)
- **Lucide React** - Icon library

### **Backend & Database**

- **Supabase** - PostgreSQL database with Row Level Security
- **Hugging Face Spaces** - LLM inference via Gradio Client API
- **@gradio/client** - Gradio API integration
- **jsPDF + jspdf-autotable** - PDF generation with tables
- **Sonner** - Toast notifications
- **React Hook Form + Zod** - Form validation

### **MLOps Integration**

- **ModelForge Space** - Custom Hugging Face Space (Stylique/ModelForge)
- **Qwen 2.5-72B-Instruct** - SOTA LLM for model recommendations
- **Gradio** - Backend API framework

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
```

**Get Your Credentials:**

- **Supabase**: Sign up at [supabase.com](https://supabase.com), create a project, find keys in Settings → API

**Note:** The Hugging Face Space URL is currently hardcoded to `Stylique/ModelForge` in `lib/recommendationEngine.ts`. To use your own Space, modify line 48 in that file.

### **4. Database Setup**

Run the unified schema SQL in your Supabase SQL Editor:

```bash
# File: supabase/unified_schema.sql
```

This creates all necessary tables:

- `profiles` - User profiles with subscription tiers
- `query_history` - Auto-saved search history with full recommendations
- `saved_models` - User's bookmarked models
- `model_feedback` - Ratings and feedback
- `user_preferences` - User settings (framework, theme, deployment preferences)
- `usage_stats` - Event-based usage tracking

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
│   ├── (footer)/                 # Footer static pages (about, blog, contact, docs, etc.)
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── docs/
│   │   ├── features/
│   │   ├── pricing/
│   │   └── ...
│   ├── auth/                     # Auth callback handler
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── dashboard/                # Protected dashboard routes
│   │   ├── history/              # Query history page
│   │   ├── saved/                # Saved models page
│   │   ├── settings/             # User settings
│   │   └── page.tsx              # Main dashboard
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout with theme provider
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Dashboard.tsx             # Main recommendation display
│   ├── InputSection.tsx          # Natural language + structured form
│   ├── StructuredInput.tsx       # 12-field structured form component
│   ├── ModelCard.tsx             # Model recommendation card
│   ├── ArchitectureDiagram.tsx   # Mermaid diagram renderer
│   ├── CodeGenerator.tsx         # Code snippet viewer with syntax highlighting
│   ├── MLOpsPanel.tsx            # Best practices display
│   ├── UnifiedNavbar.tsx         # Context-aware navigation
│   ├── DashboardNavbar.tsx       # Logged-in user navbar
│   ├── PublicNavbar.tsx          # Public pages navbar
│   ├── Footer.tsx                # Site footer with dark mode
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   ├── ThemeProvider.tsx         # Theme context provider
│   ├── PageLayout.tsx            # Reusable page layout wrapper
│   ├── StaticPage.tsx            # Static content page wrapper
│   ├── ModelFeedbackModal.tsx    # Feedback submission modal
│   ├── EmptyState.tsx            # Empty state placeholder
│   ├── ErrorBoundary.tsx         # Error boundary wrapper
│   └── ui/                       # Radix UI components
├── lib/                          # Core libraries
│   ├── recommendationEngine.ts   # HF Space integration via @gradio/client
│   ├── supabase-helpers.ts       # Database CRUD operations
│   ├── database.types.ts         # TypeScript types
│   ├── mockData.ts               # Fallback mock data
│   ├── downloadUtils.ts          # PDF/MD/JSON export utilities
│   └── ...
├── utils/
│   └── supabase/                 # Supabase client setup
│       ├── client.ts             # Browser client
│       └── server.ts             # Server client
├── supabase/
│   └── unified_schema.sql        # Complete database schema with RLS
├── ModelForge/                   # Hugging Face Space (Python)
│   ├── app.py                    # Gradio backend with Qwen 2.5-72B
│   └── requirements.txt          # Python dependencies
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

The ModelForge Space uses **Qwen/Qwen2.5-72B-Instruct** (SOTA chat model). To use a different model:

Edit `ModelForge/app.py` line 9:

```python
client = InferenceClient("your-model-id", token=token)
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
3. Add environment variables (Supabase URL and Anon Key)
4. Deploy!

Vercel automatically detects Next.js and configures the build settings.

### **Other Platforms**

- **Netlify**: Add `next.config.js` with `output: 'export'` for static export
- **Railway**: One-click deploy with automatic environment setup
- **AWS Amplify**: Full Next.js support with SSR

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
◊

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

**Ali Mohsin & Iqra Azam**  
MLOps Project - Semester 9

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

**⭐ Built with ❤️ for MLOps Excellence**

ModelForge - AI-Powered Model Recommendations

</div>
