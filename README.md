# Quantyx Intel — Contact Intelligence Platform

A full-stack contact intelligence dashboard with secure JWT-based login, advanced filtering, CSV export, and a live data table — built with **Node.js + Express** (backend on Render) and **vanilla HTML/CSS/JS** (frontend on GitHub Pages).

---

## 🚀 Live Demo

| Layer | URL |
|-------|-----|
| Frontend | `https://yourusername.github.io/your-repo` |
| Backend API | `https://your-app.onrender.com` |

---

## ✨ Features

- 🔐 **Secure Login** — JWT token-based auth (works cross-domain)
- 📋 **Contact Table** — paginated, sortable, with row-level detail panel
- 🔎 **Smart Filters** — seniority, department, industry, country, city, job title, company, date range
- 📤 **CSV Export** — streaming export with live progress bar
- 📊 **Stats Bar** — total records, companies, countries, industries
- 🕐 **Live Clock** — real-time date/time in nav bar
- 📱 **Responsive** — works on desktop and tablet

---

## 🗂️ Project Structure

```
quantyx-intel/
├── index.js          # Express backend (deploy to Render)
├── index.html        # Frontend dashboard (host on GitHub Pages)
├── package.json      # Node.js dependencies
└── README.md
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | Node.js, Express |
| Database | PostgreSQL (Supabase) |
| Auth | JWT (jsonwebtoken) |
| Hosting (Frontend) | GitHub Pages |
| Hosting (Backend) | Render |

---

## 🔧 Local Development Setup

### Prerequisites
- Node.js >= 18.0.0
- A PostgreSQL database (Supabase recommended)

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the root
```env
DATABASE_URL=your_supabase_postgres_connection_string
JWT_SECRET=any_long_random_secret_string
LOGIN_USER_1=admin
LOGIN_PASS_1=yourpassword
FRONTEND_URL=http://localhost:5500
```

### 4. Start the backend
```bash
npm run dev
```
Backend runs at `http://localhost:3000`

### 5. Open the frontend
Open `index.html` with Live Server (VS Code extension) or any local server on port 5500.

---

## ☁️ Deployment

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set **Build Command:** `npm install`
5. Set **Start Command:** `npm start`
6. Add these **Environment Variables:**

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `JWT_SECRET` | A long random secret string |
| `LOGIN_USER_1` | Your chosen login ID |
| `LOGIN_PASS_1` | Your chosen password |
| `FRONTEND_URL` | `https://yourusername.github.io` |

> **Add more users:** Add `LOGIN_USER_2` / `LOGIN_PASS_2`, `LOGIN_USER_3` / `LOGIN_PASS_3`, etc.

### Frontend → GitHub Pages

1. Go to your repo on GitHub → **Settings → Pages**
2. Set **Source:** `Deploy from a branch`
3. Set **Branch:** `main` → `/ (root)`
4. Click **Save**
5. Your site will be live at `https://yourusername.github.io/your-repo`

> **Important:** Update the `API_BASE` variable in `index.html` to point to your Render URL:
> ```js
> const API_BASE = 'https://your-app.onrender.com';
> ```

---

## 🔐 Auth Flow

```
User opens GitHub Pages site
        ↓
Login screen shown
        ↓
POST /auth/login → Render backend
        ↓
Backend verifies credentials from env vars
        ↓
Returns JWT token (valid 8 hours)
        ↓
Token stored in sessionStorage
        ↓
All API calls send: Authorization: Bearer <token>
        ↓
Backend validates token on every request
```

- Token expires after **8 hours** — user is asked to log in again
- Token clears automatically when the **browser tab is closed**
- All data routes return **401 Unauthorized** without a valid token

---

## 🛢️ Database

The app connects to a **PostgreSQL** database (hosted on Supabase) and reads from a table called `submissions1`.

### Expected columns

| Column | Type |
|--------|------|
| `id` | integer |
| `First_Name` | text |
| `Last_Name` | text |
| `Email_ID_ABM` | text |
| `Company_Name` | text |
| `Job_Title` | text |
| `Department` | text |
| `Seniority` | text |
| `Industry` | text |
| `Country` | text |
| `City` | text |
| `Date` | date |
| `RA_Name` | text |
| `Campaign_Name` | text |
| *(and more...)* | |

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/login` | ❌ Public | Login with ID + password, returns JWT |
| `GET` | `/auth/verify` | ✅ Required | Verify token is still valid |
| `GET` | `/stats` | ✅ Required | Total records, companies, countries, industries |
| `GET` | `/filters` | ✅ Required | Dropdown values for all filter fields |
| `GET` | `/data` | ✅ Required | Paginated, filtered, sorted contact data |
| `GET` | `/record/:id` | ✅ Required | Single contact detail |
| `GET` | `/export-count` | ✅ Required | Row count for current filters |
| `GET` | `/export` | ✅ Required | Streaming CSV export |
| `GET` | `/health` | ❌ Public | Health check |

---

## ⚠️ Common Issues

**"Cannot reach server" on login**
- Check your Render service is live (green status)
- Verify `API_BASE` in `index.html` matches your Render URL exactly
- Make sure `FRONTEND_URL` env var is set on Render to your GitHub Pages URL
- Free Render services sleep after 15 min inactivity — first request may take 30–60s to wake up

**CORS errors in browser console**
- `FRONTEND_URL` env var on Render must exactly match your GitHub Pages origin (e.g. `https://yourusername.github.io`)

**401 Unauthorized after login**
- Check `JWT_SECRET` is set in Render env vars
- Token may have expired (8h limit) — just log in again

---

## 📄 License

MIT — free to use and modify.

---

*Built with ❤️ for Quantyx Intel*
