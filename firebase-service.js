const { db, admin } = require('./firebase-config');

class FirebaseService {
  constructor() {
    this.collection = 'leaderboard';
    // Fallback in-memory storage if Firebase is not available
    this.fallbackScores = [];
  }

  // Get all leaderboard scores
  async getLeaderboard() {
    try {
      if (!db) {
        console.log('📊 Using fallback leaderboard storage');
        return this.fallbackScores.slice(0, 10);
      }
      
      const snapshot = await db.collection(this.collection)
        .orderBy('score', 'desc')
        .limit(10)
        .get();
      
      const scores = [];
      snapshot.forEach(doc => {
        scores.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log('📊 Loaded leaderboard from Firebase:', scores.length, 'scores');
      return scores;
    } catch (error) {
      console.error('❌ Error loading leaderboard from Firebase:', error);
      console.log('📊 Using fallback leaderboard storage');
      return this.fallbackScores.slice(0, 10);
    }
  }

  // Add a new score
  async addScore(username, score, country = '') {
    try {
      if (!db) {
        // Use fallback storage
        const scoreData = {
          id: Date.now().toString(),
          username,
          country,
          score,
          timestamp: new Date()
        };
        this.fallbackScores.push(scoreData);
        this.fallbackScores.sort((a, b) => b.score - a.score);
        this.fallbackScores = this.fallbackScores.slice(0, 10); // Keep only top 10
        console.log('✅ Score added to fallback storage:', { username, country, score });
        return scoreData.id;
      }
      
      const scoreData = {
        username,
        country,
        score,
        timestamp: new Date(),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection(this.collection).add(scoreData);
      console.log('✅ Score added to Firebase:', { username, country, score, id: docRef.id });
      
      return docRef.id;
    } catch (error) {
      console.error('❌ Error adding score to Firebase:', error);
      // Fallback to in-memory storage
      const scoreData = {
        id: Date.now().toString(),
        username,
        country,
        score,
        timestamp: new Date()
      };
      this.fallbackScores.push(scoreData);
      this.fallbackScores.sort((a, b) => b.score - a.score);
      this.fallbackScores = this.fallbackScores.slice(0, 10);
      console.log('✅ Score added to fallback storage:', { username, country, score });
      return scoreData.id;
    }
  }

  // Get updated leaderboard after adding a score
  async updateLeaderboard(username, score, country = '') {
    try {
      // Add the new score
      await this.addScore(username, score, country);
      
      // Get the updated leaderboard (top 10)
      const leaderboard = await this.getLeaderboard();
      
      if (db) {
        // Clean up old scores (keep only top 10) - only for Firebase
        const snapshot = await db.collection(this.collection)
          .orderBy('score', 'desc')
          .get();
        
        const allScores = [];
        snapshot.forEach(doc => {
          allScores.push({ id: doc.id, ...doc.data() });
        });
        
        // Delete scores beyond top 10
        if (allScores.length > 10) {
          const scoresToDelete = allScores.slice(10);
          const deletePromises = scoresToDelete.map(score => 
            db.collection(this.collection).doc(score.id).delete()
          );
          await Promise.all(deletePromises);
          console.log('🗑️ Deleted', scoresToDelete.length, 'old scores from Firebase');
        }
      }
      
      return leaderboard;
    } catch (error) {
      console.error('❌ Error updating leaderboard in Firebase:', error);
      // Return fallback leaderboard
      return this.fallbackScores.slice(0, 10);
    }
  }

  // Delete all scores (for testing)
  async clearLeaderboard() {
    try {
      if (!db) {
        this.fallbackScores = [];
        console.log('🗑️ Cleared all scores from fallback storage');
        return;
      }
      
      const snapshot = await db.collection(this.collection).get();
      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
      console.log('🗑️ Cleared all scores from Firebase');
    } catch (error) {
      console.error('❌ Error clearing leaderboard:', error);
      // Clear fallback storage as backup
      this.fallbackScores = [];
      console.log('🗑️ Cleared all scores from fallback storage');
    }
  }
}

module.exports = new FirebaseService(); 