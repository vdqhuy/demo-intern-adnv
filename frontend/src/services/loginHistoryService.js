import axios from 'axios';

const API_BASE_URL = 'http://iamwebapp.adnovumlabs.com:3000/api/login-history';

const loginHistoryService = {
  // Lấy toàn bộ lịch sử
  getAll: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Lấy lịch sử theo login_id
  getByLoginId: async (loginId) => {
    const response = await axios.get(`${API_BASE_URL}/${loginId}`);
    return response.data;
  },

  // Thêm/cập nhật lịch sử login
  upsertLogin: async (loginId, app) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      login_id: loginId,
      app: app
    });
    return response.data;
  }
};

export default loginHistoryService;
