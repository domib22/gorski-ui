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
  // users:
  async getUsers() {
    return await axios.get("http://localhost:8081/app/users");
  }
  async deleteUser(id) {
    return await axios.delete("http://localhost:8081/app/users/" + id);
  }

  // products:
  async getProducts() {
      return await axios.get("http://localhost:8081/app/products");
  }
  async deleteProduct(id) {
      return await axios.delete("http://localhost:8081/app/products/" + id);
  }
  async addProduct(name, price, productGender, season, category, pictureName, link) {
      return await axios.post("http://localhost:8081/app/products", { name, price, productGender, season, category, pictureName, link });
  }

}

export default new BackService();