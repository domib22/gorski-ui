import axios from "axios";

class AuthService {
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    login = (username, password) => {
        return axios.post("http://localhost:8081/app/auth/login", {username, password})
                .then(response => {
                  if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                  }
                  if (response.status === 200) {
                    console.log("User logged in!");
                  } else {
                    console.log("User not logged in");
                  }

                  return response.data;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register = async(username, password, userGender) => {
        return axios.post("http://localhost:8081/app/auth/registration",
            {username, password, userGender});
    }

}

export default new AuthService();