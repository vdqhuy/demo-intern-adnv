import axios from 'axios';

const API_BASE_URL = 'https://iamwebapp.adnovumlabs.com:3000/api/login-history';

const loginHistoryService = {
  // Get all login history
  getAll: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Get login history by loginId
  getByLoginId: async (loginId) => {
    const response = await axios.get(`${API_BASE_URL}/${loginId}`);
    return response.data;
  },
};

export default loginHistoryService;
