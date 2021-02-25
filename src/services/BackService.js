import axios from "axios";

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.token){
    const accessToken = 'Bearer ' + user.token;
    config.headers.Authorization = accessToken;
  }

  return config;
});

class BackService {
  async getUsers() {
    return await axios.get("http://localhost:8081/app/users");
  }
  async getProducts() {
      return await axios.get("http://localhost:8081/app/products");
  }
}

export default new BackService();