#!/bin/bash
set -e

echo "🔨 Building backend application..."
cd backend
npm install
npm run build
echo "✅ Build complete!"
