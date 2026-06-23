// Mock Banking Service
// In production, connect to your banking backend API

const mockTransactions = [
  {
    id: 1,
    type: 'Received',
    amount: 500,
    date: 'Dec 20, 2024',
    category: 'Salary',
    status: 'Completed',
  },
  {
    id: 2,
    type: 'Sent',
    amount: 50,
    date: 'Dec 19, 2024',
    category: 'Transfer',
    status: 'Completed',
  },
  {
    id: 3,
    type: 'Received',
    amount: 100,
    date: 'Dec 18, 2024',
    category: 'Refund',
    status: 'Completed',
  },
  {
    id: 4,
    type: 'Sent',
    amount: 25,
    date: 'Dec 17, 2024',
    category: 'Bills',
    status: 'Completed',
  },
];

const bankService = {
  getAccountInfo: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          balance: 2450.75,
          accountNumber: '****1234',
          accountType: 'Checking',
        });
      }, 500);
    });
  },

  getRecentTransactions: async (limit = 5) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTransactions.slice(0, limit));
      }, 500);
    });
  },

  getAllTransactions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTransactions);
      }, 500);
    });
  },

  transfer: async (transferData) => {
    const { recipientEmail, amount, description } = transferData;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (amount > 0) {
          resolve({
            success: true,
            transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9),
            amount,
            recipient: recipientEmail,
            timestamp: new Date().toISOString(),
          });
        } else {
          reject(new Error('Invalid amount'));
        }
      }, 1500);
    });
  },

  getUserProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fullName: 'John Doe',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, City, State 12345',
          memberSince: 'January 2023',
        });
      }, 500);
    });
  },
};

export { bankService };
