import axios from 'axios';

// const API_BASE_URL = 'https://iamintern.adnovumlabs.com/minced-meat-backend/api/login-history';
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const loginHistoryService = {
  // Get all login history
  getAll: async () => {
    const response = await axios.get(`${backendUrl}/login-history`);
    return response.data;
  },

  // Get login history by loginId
  getByLoginId: async (loginId) => {
    const response = await axios.get(`${backendUrl}/login-history/${loginId}`);
    return response.data;
  },

  // ✅ Get today's login history (with optional loginId)
  getTodayHistory: async (loginId = '') => {
    const url = loginId
      ? `${backendUrl}/login-history/today/${loginId}`
      : `${backendUrl}/login-history/today`;
    const response = await axios.get(url);
    return response.data;
  },
};

export default loginHistoryService;
