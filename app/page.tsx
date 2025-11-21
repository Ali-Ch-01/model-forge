'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Code, Rocket, CheckCircle2, Search, Terminal, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Gradients - Less Purple, More Blue/Slate */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            ModelForge
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-bold"
            >
              Get Started
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Stop Guessing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Start Engineering.
              </span>
            </h1>

            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              The AI-powered architect for your ML projects. Describe your problem, and get a
              production-ready solution with architecture diagrams, code, and MLOps pipelines instantly.
            </p>

            {/* Problem Description Box (Interactive Mock) */}
            <div className="max-w-2xl mx-auto bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-2 pl-4 flex items-center gap-4 mb-12 shadow-2xl shadow-blue-900/20 ring-1 ring-white/10">
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="e.g., 'Detect anomalies in real-time sensor data...'"
                className="bg-transparent border-none outline-none flex-1 text-zinc-200 placeholder-zinc-600 h-12"
              />
              <Link
                href="/signup"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                Generate
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col items-center gap-4 mb-20">
              <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Trusted by Engineers at</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['Acme Corp', 'Nebula AI', 'Quantum Labs', 'Future Tech'].map((name) => (
                  <div key={name} className="flex items-center gap-2 text-zinc-400 font-bold text-lg">
                    <div className="w-6 h-6 bg-zinc-800 rounded-full" />
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl blur opacity-20" />
            <div className="relative bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                <div className="ml-4 px-3 py-1 bg-black rounded text-xs text-zinc-500 font-mono flex-1 text-center">
                  modelforge.ai/dashboard/project-12
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-zinc-950">
                {/* Sidebar Mock */}
                <div className="hidden md:block space-y-4">
                  <div className="h-8 w-32 bg-zinc-900 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-900/50 rounded" />
                    <div className="h-4 w-3/4 bg-zinc-900/50 rounded" />
                    <div className="h-4 w-5/6 bg-zinc-900/50 rounded" />
                  </div>
                </div>
                {/* Main Content Mock */}
                <div className="md:col-span-2 space-y-6">
                  <div className="flex gap-4">
                    <div className="h-32 w-full bg-blue-900/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="h-6 w-1/3 bg-blue-500/20 rounded mb-2" />
                      <div className="h-4 w-full bg-blue-500/10 rounded" />
                    </div>
                    <div className="h-32 w-full bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-4">
                      <div className="h-6 w-1/3 bg-emerald-500/20 rounded mb-2" />
                      <div className="h-4 w-full bg-emerald-500/10 rounded" />
                    </div>
                  </div>
                  <div className="h-64 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-700 font-mono text-sm">
                    [ Architecture Diagram Visualization ]
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Core Features Section */}
        <section className="container mx-auto px-4 py-24 bg-zinc-950/50">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to ship ML</h2>
            <p className="text-zinc-400 text-lg">
              From idea to production, ModelForge automates the heavy lifting of model selection and system design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Smart Suggestions",
                desc: "AI-driven model recommendations tailored to your specific data type and constraints.",
                color: "text-blue-400",
                bg: "bg-blue-500/10"
              },
              {
                icon: Terminal,
                title: "Auto-Generated Code",
                desc: "Get production-ready boilerplate for PyTorch, TensorFlow, and sklearn instantly.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10"
              },
              {
                icon: Cpu,
                title: "Architecture Diagrams",
                desc: "Visual flowcharts of your model's architecture, data flow, and training pipeline.",
                color: "text-purple-400",
                bg: "bg-purple-500/10"
              },
              {
                icon: Rocket,
                title: "MLOps Guidance",
                desc: "Best practices for deployment, monitoring, and versioning included with every model.",
                color: "text-orange-400",
                bg: "bg-orange-500/10"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-900"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
