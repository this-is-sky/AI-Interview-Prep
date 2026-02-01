#!/bin/bash

# AI Interview Prep - Deployment Helper Script
# This script helps you deploy your application to Railway and Vercel

echo "🚀 AI Interview Prep - Deployment Setup"
echo "=========================================="
echo ""

# Check if git is configured
echo "✓ Checking git configuration..."
git config user.name > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Git not configured. Run:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your@email.com'"
    exit 1
fi

echo "✓ Git configured"
echo ""

# Check if code is committed
echo "✓ Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Committing now..."
    git add .
    git commit -m "chore: prepare for production deployment"
fi

echo "✓ Code up to date"
echo ""

# Display deployment URLs needed
echo "📋 DEPLOYMENT CHECKLIST"
echo "========================"
echo ""
echo "✅ Backend Environment Variables (Railway):"
echo "   PORT=3000"
echo "   GEMINI_API_KEY=AIzaSyAxyaFa5gXZIci0Oq6nhv5qvO0JeXtQ3Io"
echo "   MONGO_URI=mongodb://0.0.0.0/InterviewPrepDB"
echo "   JWT_SECRET=MAX_SUPER_SECRET_KEY_88777997"
echo "   NODE_ENV=production"
echo ""
echo "✅ Frontend Environment Variables (Vercel):"
echo "   VITE_API_URL=https://YOUR-RAILWAY-URL"
echo ""

echo "🌐 DEPLOYMENT INSTRUCTIONS"
echo "==========================="
echo ""
echo "1️⃣  BACKEND (Railway)"
echo "   • Go to: https://railway.app"
echo "   • Click 'New Project' → 'Deploy from GitHub repo'"
echo "   • Select 'AI-Interview-Prep' repository"
echo "   • Add environment variables (see above)"
echo "   • Copy your backend URL"
echo ""

echo "2️⃣  FRONTEND (Vercel)"
echo "   • Go to: https://vercel.com"
echo "   • Click 'Add New' → 'Project'"
echo "   • Select 'AI-Interview-Prep' repository"
echo "   • Set root directory: 'frontend'"
echo "   • Add VITE_API_URL with your Railway URL"
echo "   • Deploy!"
echo ""

echo "3️⃣  TEST"
echo "   • Visit your Vercel URL"
echo "   • Register and test features"
echo "   • Check browser console for errors"
echo ""

echo "✅ Repository Status:"
git log --oneline -3
echo ""

echo "📚 For detailed instructions, see: PRODUCTION_DEPLOYMENT.md"
echo ""
echo "🎉 Happy Deploying!"
