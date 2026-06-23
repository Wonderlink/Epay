// Mock Authentication Service
// In production, connect to Firebase or your backend API

const authService = {
  login: async (email, password) => {
    // Simulated API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          resolve({
            id: Math.random().toString(),
            email,
            token: 'mock_token_' + Math.random().toString(),
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  signup: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          resolve({
            id: Math.random().toString(),
            email,
            token: 'mock_token_' + Math.random().toString(),
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },

  getCurrentUser: async () => {
    // Check if user is stored in AsyncStorage
    return null;
  },
};

export { authService };
