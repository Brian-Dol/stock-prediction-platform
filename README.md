<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e1b4b,100:6366f1&height=170&section=header&text=Stock%20Prediction%20Platform&fontColor=ffffff&fontSize=44&fontAlignY=38&desc=Secure%20forecasting%20dashboard%20with%20JWT%20auth%2C%20admin%20tools%20and%20an%20ML%20service&descAlignY=60&descSize=16" alt="Stock Prediction Platform" />

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![Node](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47a248?style=flat-square&logo=mongodb&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-ML%20service-000000?style=flat-square&logo=flask&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-f7931e?style=flat-square&logo=scikitlearn&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-ff6384?style=flat-square&logo=chartdotjs&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

</div>

My MSc capstone: a full-stack platform where users sign up, request stock data for a ticker and timeframe, see it charted, and keep a history of their requests, while administrators manage users and review activity.

> [!NOTE]
> The prediction service is a **baseline**. `/predict` currently fetches recent closing prices from Yahoo Finance (`yfinance`) and returns them for charting. A `LinearRegression` model and preprocessing helpers are included but are not wired into the endpoint yet. See the [roadmap](#-roadmap).

## ✨ Features

- 🔐 **Authentication:** sign-up and login with `bcrypt`-hashed passwords and JWT sessions, plus change password
- 🛡️ **Role-based admin area:** admins can list users (sign-up and last-login dates), review everyone's predictions and create other admins
- 📈 **Interactive dashboard:** ticker and timeframe form (days, weeks, months, years) with Chart.js price charts
- 🗂️ **Prediction history:** each user's saved requests, newest first
- 🧩 **Three small services** with clear boundaries: React UI, Express API, Flask data service

## 🏗️ Architecture

```mermaid
flowchart LR
    U[User / Admin] --> F["React dashboard<br/>:3001"]
    F -->|"/signup /login /predictions<br/>/changepassword /admin/*"| A["Express API<br/>:3000"]
    F -->|"POST /predict"| M["Flask service<br/>:5000"]
    A <-->|Mongoose| DB[(MongoDB)]
    M -->|yfinance| Y[(Yahoo Finance)]
    A -. JWT verify .-> A
```

## 🔌 API reference

### Express API (`:3000`)

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `POST` | `/signup` | none | Register a user |
| `POST` | `/login` | none | Returns a JWT and the `isAdmin` flag |
| `POST` | `/predict` | JWT | Save a prediction for the current user |
| `GET` | `/predictions` | JWT | List the current user's predictions |
| `POST` | `/changepassword` | JWT | Change password (requires the current one) |
| `POST` | `/create-admin` | Admin | Create an admin user |
| `GET` | `/admin/users` | Admin | List users |
| `GET` | `/admin/predictions` | Admin | List all predictions with user emails |

### Flask service (`:5000`)

| Method | Endpoint | Body | Returns |
|---|---|---|---|
| `POST` | `/predict` | `{ "features": "AAPL", "timeframe": "days" }` | `{ "prediction": [closing prices] }` |

## 🚀 Getting started

**Prerequisites:** Node.js 18+, Python 3.10+, MongoDB running locally (or a connection string).

```bash
git clone https://github.com/Brian-Dol/stock-prediction-platform.git
cd stock-prediction-platform
```

**1. Express API**

```bash
cd backend
cp .env.example .env        # set JWT_SECRET (the API refuses to start without it)
npm install
npm start
```

**2. Flask service**

```bash
cd ml-service
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m app.main
```

**3. React frontend**

```bash
cd frontend
npm install
npm start                   # served on http://localhost:3001
```

The frontend calls the API at `http://localhost:3000` and the Flask service at `http://127.0.0.1:5000`.

## 📁 Project structure

```text
stock-prediction-platform/
├── frontend/      React app (dashboard, auth pages, admin pages, charts)
├── backend/       Express API, Mongoose models (User, Prediction)
└── ml-service/    Flask app, yfinance data collection, LinearRegression baseline
```

## 🧰 Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router, Material UI, Bootstrap, Chart.js |
| API | Node.js, Express, Mongoose, bcryptjs, jsonwebtoken |
| Data service | Flask, pandas, yfinance, scikit-learn |
| Database | MongoDB |

## 🗺️ Roadmap

- [ ] Wire a trained model into `/predict` (the baseline only returns historical closes)
- [ ] Add token expiry, rate limiting and request validation on the API
- [ ] Move API base URLs into frontend environment variables
- [ ] Docker Compose for the whole stack
- [ ] Automated tests for the API and ML service

## 👤 Author

**Brian Dol**, Senior Full Stack Engineer · [Portfolio](https://portfolio.dol-brian23.workers.dev/) · [LinkedIn](https://linkedin.com/in/brian-dol-31a06115a/)
