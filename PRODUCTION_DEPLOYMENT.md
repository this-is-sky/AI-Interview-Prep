# Production Deployment Instructions

## Your Credentials (Ready to Deploy!)

✅ **Gemini API Key**: `AIzaSyAxyaFa5gXZIci0Oq6nhv5qvO0JeXtQ3Io`
✅ **MongoDB URI**: `mongodb://0.0.0.0/InterviewPrepDB`
✅ **JWT Secret**: `MAX_SUPER_SECRET_KEY_88777997`

---

## Step 1: Deploy Backend to Railway ⚡

### 1.1 Go to Railway
- Visit: https://railway.app
- Sign up/Login with GitHub
- Click "New Project"

### 1.2 Select Repository
- Click "Deploy from GitHub repo"
- Select: `AI-Interview-Prep` repository
- Railway auto-detects Node.js → Click "Deploy"

### 1.3 Add Environment Variables
Once deployed, go to **Variables** tab and add:

```
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=production
```

### 1.4 Get Backend URL
- Go to "Deployments" tab
- Copy the URL (e.g., `https://ai-interview-prep.railway.app`)
- **Save this URL** - you'll need it for frontend

### 1.5 Test Backend
```bash
curl https://your-railway-url/api/health
```
Should return: `{"status":"ok"}`

---

## Step 2: Deploy Frontend to Vercel 🚀

### 2.1 Go to Vercel
- Visit: https://vercel.com
- Sign up/Login with GitHub
- Click "Add New..." → "Project"

### 2.2 Import Project
- Click "Import Git Repository"
- Select: `AI-Interview-Prep`
- Framework: Select "Vite"

### 2.3 Configure Settings
Before deploying:
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 2.4 Add Environment Variable
Add this to "Environment Variables":
```
VITE_API_URL=https://your-railway-backend-url
```
(Replace with your Railway URL from Step 1.4)

### 2.5 Deploy
- Click "Deploy"
- Wait for build to complete
- Get your frontend URL (e.g., `https://ai-interview-prep.vercel.app`)

---

## Step 3: Test Your Application 🧪

### 3.1 Open Your App
Visit your Vercel URL: `https://your-app-name.vercel.app`

### 3.2 Test Features
1. ✅ Register new account
2. ✅ Login
3. ✅ Upload resume (PDF)
4. ✅ Start interview
5. ✅ Answer a question
6. ✅ View results
7. ✅ Check history & statistics

---

## Troubleshooting

### Backend shows 502 error
- Check Railway logs: Go to project → Logs tab
- Verify MongoDB URI is correct
- Ensure GEMINI_API_KEY is valid

### Frontend shows blank page
- Open DevTools (F12) → Console tab
- Check if API calls are going to correct URL
- Verify VITE_API_URL in Vercel environment variables

### MongoDB connection failed
- Check `MONGO_URI` format: `mongodb://0.0.0.0/InterviewPrepDB`
- Verify you can connect locally first: `npm run dev`

---

## Your Live URLs (After Deployment)

- **Frontend**: `https://your-vercel-url.vercel.app`
- **Backend**: `https://your-railway-url.railway.app`
- **API Docs**: `https://your-railway-url.railway.app/api/health`

---

## Quick Reference

| Service | Status | URL |
|---------|--------|-----|
| Frontend (Vercel) | 🟡 Pending | Coming soon |
| Backend (Railway) | 🟡 Pending | Coming soon |
| Database (Local) | ✅ Ready | `mongodb://0.0.0.0/InterviewPrepDB` |

---

## Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | ✅ Yes | FREE |
| Railway | ✅ $5/month | $0-5 |
| MongoDB Atlas | ✅ 512MB | FREE |
| **TOTAL** | | **FREE-$5/month** |

**Note**: Railway $5/month is usually more than enough for small projects. You likely won't exceed free tier.

---

## Manual Deployment (If Needed)

If automatic deployment doesn't work, you can deploy manually:

### Backend Manual Deploy
```bash
cd backend
npm install
npm run build
npm start
```

### Frontend Manual Build
```bash
cd frontend
npm install
npm run build
# Upload 'dist' folder to Vercel
```

---

## Next Steps

1. ✅ Deploy backend to Railway (Step 1)
2. ✅ Deploy frontend to Vercel (Step 2)
3. ✅ Test your application (Step 3)
4. ✅ Share your live URL!

**You're about 15 minutes away from a live application! 🎉**
