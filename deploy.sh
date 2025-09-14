#!/bin/bash
# deploy.sh - Deployment script for Social Media Empire Platform

echo "Social Media Empire Platform - Vercel Deployment Script"
echo "======================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "Vercel CLI could not be found"
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "Logging into Vercel..."
vercel login

echo "Deploying to Vercel..."
vercel --prod

echo "Deployment completed!"
echo "Check your Vercel dashboard for the deployment URL."