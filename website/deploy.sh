#!/bin/bash

# Deployment preparation script for Render.com
echo "🚀 Preparing In Quest of Knowledge website for deployment..."

# Check if we're in the website directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the website directory"
    exit 1
fi

# Clean and install dependencies
echo "📦 Installing dependencies..."
rm -rf node_modules
rm -f package-lock.json
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📋 Next steps for Render deployment:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your GitHub repo to Render"
    echo "3. Configure Firebase environment variables"
    echo "4. Deploy!"
    echo ""
    echo "🌐 Your site will be available at: https://inquestofknowledge-website.onrender.com"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
