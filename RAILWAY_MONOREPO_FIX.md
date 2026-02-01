# Railway Monorepo Deployment Fix

## Problem
Railway couldn't determine which folder to deploy because your project has both `backend/` and `frontend/` folders (monorepo structure).

## Solution Applied

I've added **3 configuration files** to tell Railway to deploy only the backend:

### 1. `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS",
    "nixpacksPath": "backend"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```
- Tells Railway to use the `backend/` folder
- Uses nixpacks builder for Node.js

### 2. `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ['nodejs_20']

[phases.install]
cmds = ['cd backend && npm install']

[phases.build]
cmds = ['cd backend && npm run build']

[start]
cmd = 'cd backend && npm start'
```
- Specifies exact build steps
- Installs dependencies in backend folder
- Compiles TypeScript
- Starts the server

### 3. Updated `.railwayrc`
```json
{
  "build": {
    "builder": "nixpacks",
    "buildCommand": "cd backend && npm install && npm run build"
  },
  "deploy": {
    "startCommand": "cd backend && npm start"
  }
}
```

## What Railway Will Do Now

1. ✅ Detect the `backend/` folder
2. ✅ Install Node.js 20
3. ✅ Run `npm install` in backend
4. ✅ Run `npm run build` (compile TypeScript)
5. ✅ Start server with `npm start`
6. ✅ Connect to MongoDB Atlas
7. ✅ Server runs on assigned port

## Next Steps

### Option 1: Automatic Deployment (Recommended)
Railway will automatically redeploy when it detects the GitHub push.

**Wait 2-3 minutes** and check your Railway dashboard.

### Option 2: Manual Redeploy
1. Go to Railway dashboard
2. Click **Deployments** tab
3. Click **Redeploy**

## Verify Deployment

### Check Build Logs
Railway logs should show:
```
✅ Setting up Node.js 20
✅ Installing dependencies
✅ Building TypeScript
✅ Starting server
✅ MongoDB Connected successfully
✅ Server running on port 3000
```

### Test Backend
```bash
curl https://YOUR-RAILWAY-URL/api/health
```

Should return:
```json
{"status":"ok"}
```

## Environment Variables Reminder

Make sure these are still set in Railway Variables tab:
```
PORT=3000
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

## Troubleshooting

### If build still fails:
1. Check Railway logs for specific error
2. Verify all 5 environment variables are set
3. Try manual redeploy from Railway dashboard

### If "nixpacks not found" error:
Railway should auto-detect it. If not:
- Go to Settings → Change builder to "Nixpacks"

### If "port not found" error:
Railway automatically sets PORT variable. Your app uses `process.env.PORT || 4000`.

## Success Indicators

✅ Build completes without errors
✅ "MongoDB Connected successfully" in logs
✅ "Server running on port 3000" in logs
✅ Railway shows "Running" status
✅ `/api/health` returns ok

## What Changed

**Before:** Railway saw root folder with both backend and frontend - confused!
**After:** Railway explicitly told to deploy backend folder only - clear!

---

**Your deployment should work now!** 🚀

The configurations are pushed to GitHub. Railway will auto-deploy or you can manually trigger it.
