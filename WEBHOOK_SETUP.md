# GitHub Webhook Setup Guide for Jenkins

This guide explains how to configure GitHub webhooks to automatically trigger Jenkins pipelines.

## Prerequisites

1. Jenkins server running and accessible
2. GitHub repository with Jenkinsfile
3. GitHub Hook Plugin installed in Jenkins (usually comes pre-installed)

## Step 1: Configure Jenkins Pipeline for Webhook Trigger

### In Jenkins UI:

1. Go to your pipeline project (e.g., **NodeApp-CI**)
2. Click **Configure**
3. Scroll down to **Build Triggers** section
4. Check **"GitHub hook trigger for GITScm polling"**
5. Click **Save**

## Step 2: Find Your Jenkins Server URL

You need to know your Jenkins server's public URL. Options:

- **If Jenkins is on localhost**: You'll need to expose it publicly using:
  - ngrok: `ngrok http 8080`
  - Or use your public IP address
- **If Jenkins is on a server**: Use the server's public IP or domain

### Get your Jenkins URL:
- Local Jenkins: `http://localhost:8080` (for local testing)
- Public Jenkins: `http://<your-ip>:8080` or `http://<your-domain>:8080`

## Step 3: Configure GitHub Webhook

1. Go to your GitHub repository: `https://github.com/Hashmatcheema/SCD_LAB_10`
2. Click **Settings** → **Webhooks** → **Add webhook**
3. Configure the webhook:
   - **Payload URL**: `http://<your-jenkins-ip>:8080/github-webhook/`
     - Example: `http://192.168.1.100:8080/github-webhook/`
     - For localhost testing with ngrok: `https://<ngrok-url>/github-webhook/`
   - **Content type**: `application/json`
   - **Secret**: (Optional, leave blank for now)
   - **Which events would you like to trigger this webhook?**
     - Select: **Just the push event** (for commits)
     - Or: **Let me select individual events** and check:
       - ✅ Pushes
       - ✅ Pull requests
4. Click **Add webhook**

## Step 4: Test the Webhook

### Option 1: Test via GitHub (Recommended)

1. Make a small change to any file (e.g., update README.md)
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Test webhook trigger"
   git push origin main
   ```
3. Check Jenkins - the pipeline should automatically start!

### Option 2: Test via GitHub Webhook UI

1. Go to your webhook in GitHub Settings → Webhooks
2. Click on the webhook you created
3. Scroll down and click **"Recent Deliveries"**
4. Click on the latest delivery
5. Click **"Redeliver"** to manually trigger the webhook

## Step 5: Verify Webhook is Working

After pushing a commit, check:

1. **Jenkins Console Output** should show:
   ```
   ==========================================
   Build #12 triggered at 2025-10-31 10:20:42
   Triggered by GitHub Webhook
   ==========================================
   ```

2. **GitHub Webhook Logs**:
   - Go to Settings → Webhooks → Your webhook
   - Check "Recent Deliveries" for status (should be green checkmark)

## Troubleshooting

### Webhook not triggering Jenkins

1. **Check Jenkins is accessible**:
   - Test URL: `http://<your-ip>:8080/github-webhook/`
   - Should return 200 OK (or similar)

2. **Check Jenkins logs**:
   - Location: `C:\Jenkins\.jenkins\logs\`
   - Look for webhook-related errors

3. **Verify GitHub Hook Plugin is installed**:
   - Manage Jenkins → Manage Plugins → Installed
   - Search for "GitHub plugin"

4. **Check firewall/network**:
   - Ensure port 8080 is accessible from GitHub
   - For localhost, use ngrok or similar tunneling service

### Using ngrok for Local Testing

If Jenkins is on localhost, use ngrok:

1. Install ngrok: https://ngrok.com/
2. Run: `ngrok http 8080`
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
4. Use this URL in GitHub webhook: `https://abc123.ngrok.io/github-webhook/`

### Webhook shows 403 Forbidden

- Check CSRF protection in Jenkins
- Go to: Manage Jenkins → Configure Global Security
- Temporarily disable CSRF protection for testing

## Expected Behavior

When you push to the main branch:

1. GitHub sends webhook to Jenkins
2. Jenkins automatically starts the pipeline
3. Console shows:
   - Build number
   - Timestamp
   - "Triggered by GitHub Webhook" message
4. Pipeline executes all stages automatically

## Repository Information

- **Repository**: `https://github.com/Hashmatcheema/SCD_LAB_10.git`
- **Pipeline**: NodeApp-CI (uses Task1/Jenkinsfile)
- **Branch**: main

