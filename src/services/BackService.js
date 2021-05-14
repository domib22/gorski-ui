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
    //users:
    async getUsers() {
        return await axios.get("http://localhost:8081/app/users");
    }
    async deleteUser(id) {
        return await axios.delete("http://localhost:8081/app/users/" + id);
    }
    async editUser(username, userGender, id) {
        return await axios.put("http://localhost:8081/app/users/" + id, { id, username, userGender });
    }
    async getOwnedProducts(username) {
        return await axios.get("http://localhost:8081/app/users/ownedProducts?username="+username);
    }
    async addOwnedProduct(username, idProduct) {
        return await axios.put("http://localhost:8081/app/users?username="+username+"&idProduct="+idProduct);
    }

    //products:
    async getProducts(criteria) {
        return await axios.get("http://localhost:8081/app/products?search=" + criteria);
    }
    async deleteProduct(id) {
       return await axios.delete("http://localhost:8081/app/products/" + id);
    }
    async addProduct(name, price, productGender, season, category, pictureName, link, description) {
        return await axios.post("http://localhost:8081/app/products", {name, price, productGender, season, category, pictureName, link, description});
    }

    //reviews:
    async addReview(id, stars, opinion, userName) {
        return await axios.post("http://localhost:8081/app/products/" + id +"?stars="+stars+"&opinion="+opinion+"&userName="+userName);
    }
    async getReviews(id) {
        return await axios.get("http://localhost:8081/app/products/" + id);
    }
    async getUserReviews(username) {
        return await axios.get("http://localhost:8081/app/reviews?username="+username);
    }

}

export default new BackService();