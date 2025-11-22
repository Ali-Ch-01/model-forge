#!/usr/bin/env python3
"""
Quick Demo Runner - Generates MLflow tracking data and opens UI

This script provides a quick way to explore our MLflow experiment results.
Run this to see the model comparison in the MLflow UI.

Usage:
    python demo_mlflow.py
"""

import os
import sys

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import mlflow
        print("✅ MLflow is installed")
        return True
    except ImportError:
        print("❌ MLflow not found")
        print("\nTo install dependencies:")
        print("  pip install -r requirements-mlops.txt")
        print("\nOr just install MLflow:")
        print("  pip install mlflow")
        return False

def run_experiments():
    """Run the main experiment tracking script"""
    print("\n" + "="*60)
    print("🚀 Running Model Selection Experiments")
    print("="*60 + "\n")
    
    import mlflow_experiments
    mlflow_experiments.main()

def launch_mlflow_ui():
    """Launch MLflow UI"""
    print("\n" + "="*60)
    print("🌐 Launching MLflow UI")
    print("="*60 + "\n")
    
    print("MLflow UI will open at: http://localhost:5000")
    print("\nIn the UI you can:")
    print("  • Compare all 5 models side-by-side")
    print("  • View detailed metrics for each run")
    print("  • See the winning model (Qwen 2.7 7B)")
    print("  • Explore 47 experiment runs")
    print("\nPress Ctrl+C to stop the server\n")
    
    os.system("mlflow ui --backend-store-uri ./mlruns --port 5000")

def main():
    print("\n" + "🎯 "*20)
    print("ModelForge MLOps Demo")
    print("🎯 "*20 + "\n")
    
    print("This demo will:")
    print("  1. Check dependencies")
    print("  2. Run MLflow experiment tracking")
    print("  3. Launch MLflow UI for exploration\n")
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Run experiments
    try:
        run_experiments()
    except Exception as e:
        print(f"\n❌ Error running experiments: {e}")
        sys.exit(1)
    
    # Launch UI
    print("\n" + "="*60)
    input("Press Enter to launch MLflow UI... ")
    
    try:
        launch_mlflow_ui()
    except KeyboardInterrupt:
        print("\n\n✅ MLflow UI stopped")
        print("="*60)
        print("\nTo restart the UI anytime:")
        print("  mlflow ui --backend-store-uri ./mlruns --port 5000")
        print("\nTo view results without UI:")
        print("  cat MLFLOW_RESULTS.md")
        print("="*60 + "\n")

if __name__ == "__main__":
    main()
