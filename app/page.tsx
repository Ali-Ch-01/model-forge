"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Rocket,
  Search,
  Terminal,
  Cpu,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 dark:bg-emerald-900/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex items-center justify-between border-b border-zinc-200 dark:border-white/5 backdrop-blur-sm sticky top-0 z-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            ModelForge
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <ThemeToggle />
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors text-sm font-bold"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-12 flex flex-col items-center text-center perspective-1000">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight"
            >
              Stop Guessing. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400 animate-gradient-x">
                Start Engineering.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              The AI-powered architect for your ML projects. Describe your
              problem, and get a production-ready solution with architecture
              diagrams, code, and MLOps pipelines instantly.
            </motion.p>

            {/* Problem Description Box (Interactive Mock) */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px -10px rgba(59, 130, 246, 0.3)",
              }}
              className="max-w-2xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 pl-4 flex items-center gap-4 mb-12 shadow-2xl shadow-blue-900/5 dark:shadow-blue-900/20 ring-1 ring-black/5 dark:ring-white/10 relative overflow-hidden"
            >
              <motion.div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <Search className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="e.g., 'Detect anomalies in real-time sensor data...'"
                className="bg-transparent border-none outline-none flex-1 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 h-12 relative z-10"
              />
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors relative z-10 flex items-center gap-2"
                >
                  Generate <Sparkles className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col items-center gap-6 mb-12 pt-20"
            >
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">TRUSTED BY ENGINEERING TEAMS AT</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
                {["Acme Corp", "Nebula AI", "Quantum Labs", "Future Tech"].map(
                  (name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 font-bold text-lg grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
                    >
                      <div className="w-6 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                      {name}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            style={{ y: y1 }}
            className="relative w-full max-w-6xl mx-auto perspective-1000"
          >
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-xl blur-lg opacity-30 animate-pulse" />
              <div className="relative bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl" >
                <div className="h-10 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <div className="ml-4 px-3 py-1 bg-white dark:bg-black rounded text-xs text-zinc-500 font-mono flex-1 text-center border border-zinc-200 dark:border-zinc-800/50">
                    modelforge.ai/dashboard/project-12
                  </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-sm">
                  {/* Sidebar Mock */}
                  <div className="hidden md:block space-y-4">
                    <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-900 rounded animate-pulse" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${60 + i * 10}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          className="h-4 bg-zinc-200/50 dark:bg-zinc-900/50 rounded"
                        />
                      ))}
                    </div>
                  </div>
                  {/* Main Content Mock */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="flex gap-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="h-32 w-full bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="h-6 w-1/3 bg-blue-500/20 rounded mb-2" />
                        <div className="h-4 w-full bg-blue-500/10 rounded" />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="h-32 w-full bg-emerald-900/10 border border-emerald-500/20 rounded-lg p-4 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <div className="h-6 w-1/3 bg-emerald-500/20 rounded mb-2" />
                        <div className="h-4 w-full bg-emerald-500/10 rounded" />
                      </motion.div>
                    </div>
                    <div className="h-64 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-700 font-mono text-sm relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-10">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="bg-zinc-300 dark:bg-zinc-700 rounded-sm" />
                        ))}
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        [ Architecture Diagram Visualization ]
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Core Features Section */}
        <section className="container mx-auto px-4 pt-48 pb-32 bg-zinc-50/50 dark:bg-zinc-950/50 relative">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Everything you need to ship ML
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-600 dark:text-zinc-400 text-lg"
            >
              From idea to production, ModelForge automates the heavy lifting of
              model selection and system design.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Smart Suggestions",
                desc: "AI-driven model recommendations tailored to your specific data type and constraints.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "group-hover:border-blue-500/50",
              },
              {
                icon: Terminal,
                title: "Auto-Generated Code",
                desc: "Get production-ready boilerplate for PyTorch, TensorFlow, and sklearn instantly.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "group-hover:border-emerald-500/50",
              },
              {
                icon: Cpu,
                title: "Architecture Diagrams",
                desc: "Visual flowcharts of your model's architecture, data flow, and training pipeline.",
                color: "text-teal-400",
                bg: "bg-teal-500/10",
                border: "group-hover:border-teal-500/50",
              },
              {
                icon: Rocket,
                title: "MLOps Guidance",
                desc: "Best practices for deployment, monitoring, and versioning included with every model.",
                color: "text-orange-400",
                bg: "bg-orange-500/10",
                border: "group-hover:border-orange-500/50",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`group p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 ${feature.border} transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:shadow-2xl relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div
                  className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10 text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative z-10">
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
