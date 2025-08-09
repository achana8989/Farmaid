import axios from 'axios';

// Replace with your Codespaces public server URL
const API_BASE = 'https://<your-codespace-id>-3000.app.github.dev';

export default {
  uploadImage: (base64) => axios.post(`${API_BASE}/api/diagnose`, { image: base64 }),
  requestDelivery: (payload) => axios.post(`${API_BASE}/api/delivery`, payload)
}
