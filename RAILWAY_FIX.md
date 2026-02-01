# Railway Service Offline - Fix Guide

## Problem
Railway service is offline because it's trying to connect to `mongodb://0.0.0.0/InterviewPrepDB` which is a **local MongoDB**. Railway can't access your local machine's database.

## Solution: Use MongoDB Atlas (Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a project
4. Create a cluster (free tier M0)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Select "Drivers" → "Node.js"
3. Copy the connection string
4. Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

### Step 3: Update Railway Environment Variables
1. Go to your Railway project dashboard
2. Click "Variables" tab
3. Replace `MONGO_URI` with your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/InterviewPrepDB
   ```
4. Save and redeploy

### Step 4: Verify Connection
- Railway will auto-redeploy
- Check logs: should show "MongoDB Connected"
- Test with: `curl https://your-railway-url/api/health`

---

## Quick MongoDB Atlas Setup (5 minutes)

1. **Sign Up**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**: Click "Create" → Select "Free" tier (M0)
3. **Create User**: 
   - Go to "Database Access"
   - Add username & password
   - Make sure to allow "%" for all IPs
4. **Get Connection String**:
   - Click cluster "Connect" button
   - Choose "Drivers"
   - Copy connection string
   - Replace `<password>` and `<username>`
5. **Example**:
   ```
   mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/InterviewPrepDB
   ```

---

## What Changed?
- **Before**: Using local MongoDB (localhost) - only works on your machine
- **After**: Using MongoDB Atlas - works anywhere (Railway, Vercel, etc.)

**All your code stays the same!** Only the `MONGO_URI` environment variable changes.

---

## After Fixing MongoDB

✅ Railway will automatically redeploy
✅ Service should come online
✅ Backend will be accessible
✅ Then deploy frontend with Railway URL

---

## Troubleshooting

**Still offline after updating?**
- Check MongoDB Atlas connection string is correct
- Verify database user exists
- Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
- Check Railway logs for errors

**Can't see logs?**
- Railway dashboard → Your project → Logs tab
- Look for error messages
- Common issues: authentication failed, invalid connection string

---

## Test After Fix

```bash
# Once deployed:
curl https://your-railway-url/api/health
# Should return: {"status":"ok"}
```

Then test login/registration with your frontend!
