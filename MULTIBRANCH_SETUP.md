# Multi-Branch Jenkins Pipeline Setup Guide

This guide explains how to configure a multi-branch Jenkins pipeline for the Celsius to Fahrenheit Converter application.

## Overview

The multi-branch pipeline automatically:
- Detects branches in your GitHub repository
- Triggers builds on push via GitHub webhook
- Runs parallel tests (unit tests and linting)
- Performs conditional deployments based on branch:
  - `main` → Production deployment
  - `dev` → Staging deployment
  - Other branches → Deployment skipped
- Archives build artifacts

## Step 1: Create Multi-Branch Pipeline in Jenkins

1. Open Jenkins dashboard
2. Click **New Item**
3. Enter item name: `NodeApp-MultiEnv-Pipeline`
4. Select **Multibranch Pipeline**
5. Click **OK**

## Step 2: Configure Branch Sources

1. In the **Branch Sources** section:
   - Click **Add source** → Select **GitHub**
   - **Repository HTTPS URL**: `https://github.com/Hashmatcheema/SCD_LAB_10.git`
   - **Credentials**: Leave blank (for public repo) or add if private
   - **Behaviors**: 
     - Click **Add** → Select **Discover branches**
     - Click **Add** → Select **Discover pull requests from origin**

2. In **Build Configuration**:
   - **Script Path**: `Jenkinsfile` (should be in root directory)

3. In **Scan Multibranch Pipeline Triggers**:
   - Check **"Periodically if not otherwise run"**
   - Set interval (e.g., `1 hour`)
   - OR check **"Build whenever a SNAPSHOT dependency is built"**

## Step 3: Configure GitHub Webhook (Auto-trigger)

### Option A: Use Existing Webhook (if already configured)

If you already have a webhook for the repository, it will work for multi-branch pipelines too.

### Option B: Add New Webhook

1. Go to: `https://github.com/Hashmatcheema/SCD_LAB_10/settings/hooks`
2. Click **Add webhook**
3. Configure:
   - **Payload URL**: `http://<your-jenkins-ip>:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select **"Just the push event"** or **"Let me select individual events"** and check:
     - ✅ Pushes
     - ✅ Pull requests
4. Click **Add webhook**

## Step 4: Initial Scan

1. After saving the pipeline configuration, Jenkins will automatically scan for branches
2. You can also click **"Scan Multibranch Pipeline Now"** to manually trigger a scan
3. Jenkins will discover all branches and create pipeline jobs for each

## Step 5: Test the Pipeline

### Test with Main Branch

1. Make a change and push to `main`:
   ```powershell
   git checkout main
   echo "# Production build" >> Task2/README.md
   git add Task2/README.md
   git commit -m "Test production deployment"
   git push origin main
   ```

2. Check Jenkins - should see:
   - Build triggered automatically
   - "Deployed to Production Environment (main branch)" message

### Test with Dev Branch

1. Create and push to `dev` branch:
   ```powershell
   git checkout -b dev
   echo "# Staging build" >> Task2/README.md
   git add Task2/README.md
   git commit -m "Test staging deployment"
   git push origin dev
   ```

2. Check Jenkins - should see:
   - New branch detected automatically
   - Build triggered
   - "Deployed to Staging Environment (dev branch)" message

### Test with Feature Branch

1. Create a feature branch:
   ```powershell
   git checkout -b feature/new-feature
   echo "# Feature" >> Task2/README.md
   git add Task2/README.md
   git commit -m "Test feature branch"
   git push origin feature/new-feature
   ```

2. Check Jenkins - should see:
   - New branch detected
   - Build triggered
   - "Feature branch detected – Deployment Skipped." message

## Expected Pipeline Output

### For Main Branch:
```
==========================================
Checking out branch: main
Build #1
==========================================
Installing dependencies...
Running unit tests...
Running linting...
==========================================
Deployed to Production Environment (main branch)
Production deployment simulation completed
==========================================
Archiving build artifacts...
==========================================
Build #1 on branch main completed successfully at 2025-11-16 20:00:00
==========================================
```

### For Dev Branch:
```
==========================================
Deployed to Staging Environment (dev branch)
Staging deployment simulation completed
==========================================
```

### For Feature Branches:
```
==========================================
Feature branch detected (feature/new-feature) – Deployment Skipped.
==========================================
```

## Pipeline Features

### 1. Automatic Branch Detection
- Jenkins automatically discovers all branches
- Creates separate pipeline jobs for each branch
- Updates when new branches are pushed

### 2. Parallel Test Execution
- Unit Tests and Linting run simultaneously
- Faster build times
- Both must pass for build to succeed

### 3. Conditional Deployment
- **main branch**: Production deployment simulation
- **dev branch**: Staging deployment simulation
- **Other branches**: Deployment skipped

### 4. Artifact Archiving
- Build artifacts are zipped per branch
- Named: `build-artifacts-<branch-name>.zip`
- Available for download from Jenkins

### 5. Notifications
- Success message with build number, branch name, and timestamp
- Failure notifications

## Troubleshooting

### Branches Not Detected

1. **Check Branch Source Configuration**:
   - Verify repository URL is correct
   - Check credentials if repository is private

2. **Manual Scan**:
   - Click "Scan Multibranch Pipeline Now"
   - Check console output for errors

3. **Check Jenkinsfile Location**:
   - Must be in repository root
   - Named exactly `Jenkinsfile` (case-sensitive)

### Webhook Not Triggering

1. **Verify Webhook Configuration**:
   - Check GitHub webhook settings
   - Verify payload URL is correct
   - Check webhook delivery logs in GitHub

2. **Check Jenkins Logs**:
   - Location: `C:\Jenkins\.jenkins\logs\`
   - Look for webhook-related errors

### Build Failing

1. **Check Console Output**:
   - Review error messages
   - Verify npm dependencies are installed
   - Check if Task2 directory exists

2. **Verify Branch Name**:
   - Ensure branch names match expected values (main, dev)
   - Check `env.BRANCH_NAME` in console output

## Branch Naming Convention

- **main**: Production deployments
- **dev**: Staging deployments
- **feature/***: Feature branches (deployment skipped)
- **hotfix/***: Hotfix branches (deployment skipped)
- **release/***: Release branches (deployment skipped)

## Repository Structure

```
SCD_LAB_10/
├── Jenkinsfile          # Multi-branch pipeline definition
├── Task2/               # Celsius to Fahrenheit converter
│   ├── converter.js
│   ├── test.js
│   ├── package.json
│   └── ...
└── ...
```

## Next Steps

1. Configure the multi-branch pipeline in Jenkins
2. Set up GitHub webhook
3. Test with different branches
4. Monitor builds in Jenkins dashboard

The pipeline will automatically handle all branches and perform appropriate deployments based on branch names.

