# TransEnder

A web-based game with Firebase-powered leaderboard system.

## 🚀 Features

- Real-time leaderboard using Firebase Firestore
- RESTful API for score submissions
- Automatic top 10 score maintenance
- Cross-platform compatibility

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Database**: Firebase Firestore
- **Frontend**: HTML/CSS/JavaScript
- **Authentication**: Firebase Admin SDK

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase (see `FIREBASE_SETUP.md`)
4. Start the server:
   ```bash
   npm start
   ```

## 🔥 Firebase Setup

See `FIREBASE_SETUP.md` for detailed Firebase configuration instructions.

## 🎮 API Endpoints

- `GET /api/leaderboard` - Get current leaderboard
- `POST /api/score` - Submit a new score
- `DELETE /api/leaderboard` - Clear leaderboard (development only)

## 📊 Data Structure

Each score in Firebase contains:
- `username` (string)
- `score` (number)
- `timestamp` (date)
- `createdAt` (server timestamp)

## 🎯 Game Features

- Real-time score tracking
- Global leaderboard
- Automatic score ranking
- Mobile-responsive design

## 🔧 Development

```bash
# Start development server
npm run dev

# Test API endpoints
curl http://localhost:3000/api/leaderboard
```

## 📝 License

MIT License
## Leaderboard

1. Anonymous - 1120
2. Frank - 760
3. Anonymous - 700
4. Anonymous - 0
5. Anonymous - 0