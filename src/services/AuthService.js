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
            {username, password, userGender})
                .then(function(response) {
                     if (response.status === 200) {
                         console.log("User registered!");
                     } else if (response.status === 422) {
                         console.log("User with that username already exist!");
                         alert("Użytkownik z takim loginem już istnieje! Podaj inny");
                     } else {
                         console.log("User not registered");
                     }
                })
                .catch(err => console.error(err));
    }

}

export default new AuthService();