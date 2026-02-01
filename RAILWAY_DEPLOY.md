# Railway Deployment - Complete Step-by-Step Guide

## Problem: Build Failing on Railway

Your build is failing because Railway needs proper configuration to build TypeScript.

## ✅ Solution: Updated Build Process

I've updated your configuration with:
- ✅ Automatic TypeScript compilation during deploy
- ✅ Proper Procfile with release and web processes
- ✅ Railway-specific configuration file
- ✅ Postinstall build hook

---

## 🚀 Deploy to Railway (Step-by-Step)

### Step 1: Verify MongoDB Connection String

Your MongoDB URI should be:
```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/InterviewPrepDB?retryWrites=true&w=majority
```

✅ Includes database name: `InterviewPrepDB`
✅ Includes retry settings

### Step 2: Go to Railway Dashboard

1. Visit: https://railway.app
2. Select your **AI-Interview-Prep** project
3. Click **"Variables"** tab

### Step 3: Verify ALL Environment Variables

Make sure you have exactly these 5 variables:

```
PORT=3000
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ **Make sure:**
- ✅ No extra spaces
- ✅ All values are correct
- ✅ No missing variables

### Step 4: Trigger Redeploy

**Option A: Manual Redeploy**
1. Go to **Deployments** tab
2. Click the three dots on latest deployment
3. Click **"Redeploy"**

**Option B: Force Rebuild**
1. Go to **Settings** → **Danger Zone**
2. Click **"Redeploy"** or wait for GitHub commit

### Step 5: Monitor Build

1. Click on the active deployment to see **Logs**
2. Wait for these messages:

   ✅ **Build Success Indicators:**
   ```
   ✅ MongoDB Connected successfully
   Server running on port 3000
   ```

   ❌ **Error Indicators:**
   ```
   ❌ MongoDB Connection Error
   ❌ Cannot find module
   ❌ ENOENT: no such file
   ```

### Step 6: Test Backend

Once deployed:
```bash
curl https://YOUR-RAILWAY-URL/api/health
```

Should return:
```json
{"status":"ok"}
```

---

## 📝 What Changed in This Update

### Procfile (Updated)
```
release: npm run build
web: npm start
```
- `release`: Runs before starting server (compiles TypeScript)
- `web`: Starts the server with compiled code

### package.json (Updated)
```json
"postinstall": "npm run build"
```
- Automatically builds after `npm install`
- Ensures `dist/` folder is created

### .railwayrc (New)
```json
{
  "build": {
    "builder": "nixpacks"
  }
}
```
- Tells Railway to use nixpacks builder
- Better Node.js support

---

## 🐛 If Build Still Fails

### Check These Common Issues

**Issue 1: Wrong MongoDB URI**
- **Fix**: Make sure it includes `/InterviewPrepDB`
- **Example**: `mongodb+srv://...mongodb.net/InterviewPrepDB?...`

**Issue 2: Missing Environment Variables**
- **Fix**: Double-check all 5 variables are set
- **Go to**: Variables tab → Add any missing ones

**Issue 3: Invalid Character in Password**
- **Fix**: If password has special chars (!, @, #), URL-encode them
- **Example**: `!` becomes `%21`
- **Tool**: https://www.urlencoder.org/

**Issue 4: Ports Already in Use**
- **Fix**: Railway handles this automatically
- **Just**: Redeploy and wait

---

## 📊 Deployment Timeline

1. Click Redeploy (10 seconds)
2. Build starts (30-60 seconds)
   - npm install dependencies
   - TypeScript compilation
   - Preparation
3. Container startup (10-20 seconds)
4. Server listening (ready! ✅)

**Total time: 2-3 minutes**

---

## ✅ Success Checklist

After deployment:
- [ ] MongoDB Connection shows ✅ in logs
- [ ] Server running on port 3000
- [ ] `/api/health` returns ok
- [ ] No error messages in logs
- [ ] Railway shows "Running" status

---

## 🔗 Get Your Backend URL

1. Go to Railway dashboard
2. Select your project
3. Look for **"Domains"** or deployment URL
4. Copy URL (e.g., `https://ai-interview-prep.railway.app`)

**Save this URL** - you'll need it for frontend!

---

## Next Steps After Backend Works

1. ✅ Update frontend `VITE_API_URL` with your Railway URL
2. ✅ Redeploy frontend on Vercel
3. ✅ Test full application end-to-end

---

## Quick Reference

| Status | What It Means | What to Do |
|--------|--------------|-----------|
| 🟢 Running | ✅ Good! | Test with `/api/health` |
| 🟡 Deploying | ⏳ Building | Wait 2-3 minutes |
| 🔴 Failed | ❌ Error | Check logs tab |
| 🟣 Crashed | ❌ Runtime error | Check logs for MONGO_URI issue |

---

## Common Error Messages & Fixes

### Error: "connect ECONNREFUSED 127.0.0.1"
- **Cause**: Trying to connect to localhost MongoDB
- **Fix**: Use MongoDB Atlas connection string

### Error: "Authentication failed"
- **Cause**: Wrong MongoDB username/password
- **Fix**: Verify in MongoDB Atlas

### Error: "Cannot find module 'express'"
- **Cause**: Dependencies not installed
- **Fix**: Should auto-install, force redeploy

### Error: "ENOENT: no such file or directory dist/src/server.js"
- **Cause**: TypeScript not compiled
- **Fix**: Procfile issue, should be fixed now

---

## Support & Debugging

### Enable Debug Mode
Set environment variable:
```
DEBUG=*
```

### View More Logs
In Railway → Logs tab:
- Select "All" instead of filtering
- Scroll through all build steps

### Test Locally First
```bash
cd backend
PORT=3000 npm start
```

Should work before deploying!

---

## ⚠️ Important Notes

1. **MongoDB Atlas**: Free tier is 512MB - enough for testing
2. **Railway**: Free tier is $5/month credit - you get plenty!
3. **Gemini API**: Free tier with rate limits
4. **Build Time**: 2-3 minutes is normal

---

**Your backend deployment should now work! 🚀**

If it still fails, let me know the exact error from Railway logs and I can diagnose further.
