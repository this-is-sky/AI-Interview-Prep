# Deployment Guide - Free Hosting Options

## Quick Comparison

| Service | Frontend | Backend | Database | Cost |
|---------|----------|---------|----------|------|
| **Vercel + Railway** | ✅ Free | ✅ Free tier | ✅ MongoDB Atlas | FREE |
| **Netlify + Render** | ✅ Free | ✅ Free tier | ✅ MongoDB Atlas | FREE |
| **Heroku** | ❌ | ⚠️ Paid only | ✅ Free tier | PAID |

**Recommended: Vercel (Frontend) + Railway (Backend) + MongoDB Atlas (Database)**

---

## Option 1: Vercel (Frontend) + Railway (Backend) - Recommended ⭐

### Step 1: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a cluster (free tier available)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
5. Create a database user and whitelist your IP

### Step 2: Railway Backend Deployment

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → "Deploy from GitHub repo"
4. Select your AI-Interview-Prep repository
5. Railway will auto-detect Node.js
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong secret (e.g., use `openssl rand -hex 32`)
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: 3000

7. Deploy! Railway generates a URL like: `https://your-project.railway.app`

**Update backend package.json start script:**
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "ts-node src/server.ts"
  }
}
```

### Step 3: Vercel Frontend Deployment

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Import your project
4. Vercel auto-detects Vite
5. Add environment variable:
   - `VITE_API_URL`: `https://your-project.railway.app` (your Railway backend URL)

6. Deploy! Your frontend gets a URL like: `https://ai-interview-prep.vercel.app`

---

## Option 2: Netlify (Frontend) + Render (Backend)

### Frontend - Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

6. Add environment variable: `VITE_API_URL=your_render_url`
7. Deploy!

### Backend - Render

1. Go to https://render.com
2. Sign up with GitHub
3. Create "New +" → "Web Service"
4. Select your repository
5. Configure:
   - Root Directory: `backend`
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Environment: Node

6. Add environment variables (same as Railway)
7. Deploy! (Free tier has ~15-minute auto-shutdown, upgrade for always-on)

---

## Step-by-Step: Railway + Vercel Setup

### Prerequisites
- MongoDB Atlas account (free)
- Google Gemini API key
- GitHub account with your code pushed

### 1. Set Up MongoDB Atlas

```bash
# After creating cluster and database user:
# Your connection string will look like:
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/databasename
```

### 2. Deploy Backend to Railway

**A. Prepare backend for production:**

Update `backend/package.json`:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "ts-node src/server.ts"
  },
  "engines": {
    "node": "18.x"
  }
}
```

Create `backend/Procfile` (for Railway):
```
web: npm start
```

**B. Push to GitHub:**
```bash
cd /Users/akashsingh/Music/Music/Dev/Interview-Prep
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

**C. Deploy on Railway:**
1. Visit https://railway.app/new
2. Select "Deploy from GitHub repo"
3. Choose `AI-Interview-Prep` repository
4. Railway auto-detects Node.js and builds
5. Go to Variables tab and add:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/interview_prep
   JWT_SECRET=your_super_secret_key_here_12345
   GEMINI_API_KEY=your_gemini_api_key
   PORT=3000
   NODE_ENV=production
   ```
6. Click "Deploy"
7. Your backend URL appears under "Deployments" (e.g., `https://ai-interview-prep-prod.railway.app`)

### 3. Deploy Frontend to Vercel

**A. Prepare frontend:**

Update `frontend/.env.production`:
```env
VITE_API_URL=https://your-railway-url.railway.app
```

**B. Push to GitHub:**
```bash
git add .
git commit -m "chore: add production env config"
git push origin main
```

**C. Deploy on Vercel:**
1. Visit https://vercel.com/new
2. Import `AI-Interview-Prep` repository
3. Select "Other" (not Vite default)
4. Configure:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Add environment variable:
   ```
   VITE_API_URL=https://your-railway-url.railway.app
   ```
6. Deploy!
7. Your frontend URL appears (e.g., `https://ai-interview-prep.vercel.app`)

---

## Testing Production Deployment

1. Visit your Vercel frontend URL
2. Register a new account
3. Login
4. Upload a resume
5. Start an interview
6. Check if backend is responding correctly

If there are issues, check:
- Environment variables are set correctly
- MongoDB connection string is valid
- GEMINI_API_KEY is active
- Backend logs on Railway/Render dashboard

---

## Free Tier Limitations

### Vercel (Frontend)
- ✅ Unlimited deployments
- ✅ Unlimited bandwidth
- ✅ Auto-scaling
- ✅ Free forever

### Railway (Backend)
- ✅ $5 free credit per month (should be enough)
- ⚠️ May need to add payment method for verification
- ✅ Auto-scales
- 💡 Tip: Free tier is generous for small projects

### MongoDB Atlas (Database)
- ✅ 512 MB storage (free tier)
- ✅ Shared cluster
- ✅ Free forever
- 💡 Tip: Should be enough for your interview data

### Google Gemini API
- ✅ Free tier available (rate limited)
- 📊 Check your API quota at: https://aistudio.google.com

---

## Monitoring & Logs

### Railway
1. Dashboard → Your project
2. Deployments tab shows build logs
3. Logs tab shows runtime errors
4. Metrics tab shows CPU/memory usage

### Vercel
1. Dashboard → Your project
2. Deployments tab shows build status
3. Function logs for API errors
4. Analytics shows usage

---

## Custom Domain (Optional)

### Vercel
1. Domain Registrar (Namecheap, GoDaddy, etc.) - get free domain from Freenom
2. Vercel Dashboard → Settings → Domains
3. Add your domain and update DNS settings

### Railway
1. Not recommended for custom domain (use Vercel for frontend)
2. If needed: use Cloudflare CNAME forwarding (free)

---

## Troubleshooting

### Backend not responding
- Check Railway logs for errors
- Verify MongoDB connection string
- Ensure environment variables are set
- Check GEMINI_API_KEY is valid

### Frontend showing blank page
- Check Vercel build logs
- Verify VITE_API_URL is correct
- Open browser DevTools → Network tab
- Check if API calls are going to correct URL

### Database connection errors
- Whitelist 0.0.0.0/0 in MongoDB Atlas (allows all IPs - free tier)
- Verify username/password in connection string
- Check database name matches

---

## Next Steps

1. ✅ Create MongoDB Atlas free account
2. ✅ Get Gemini API key (free tier)
3. ✅ Deploy backend to Railway
4. ✅ Deploy frontend to Vercel
5. ✅ Update frontend with backend URL
6. ✅ Test all features
7. ✅ Optional: Set up custom domain

**Estimated time: 30-45 minutes**

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Vercel Frontend | FREE |
| Railway Backend | FREE (with free credits) |
| MongoDB Atlas | FREE (512MB tier) |
| Domain (optional) | FREE (Freenom) or $1-10/year |
| **TOTAL** | **FREE!** |

🎉 Your complete AI Interview Prep application is now live and free to host!
