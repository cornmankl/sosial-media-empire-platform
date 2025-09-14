@echo off
REM deploy.bat - Deployment script for Social Media Empire Platform (Windows)

echo Social Media Empire Platform - Vercel Deployment Script
echo ======================================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI could not be found
    echo Installing Vercel CLI...
    npm install -g vercel
)

echo Logging into Vercel...
vercel login

echo Deploying to Vercel...
vercel --prod

echo Deployment completed!
echo Check your Vercel dashboard for the deployment URL.

pause