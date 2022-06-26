import httpClient from "../http-common";
import authHeader from "../auth-header";

const register = (firstName,lastName,email,password) => {
    return httpClient.post("/login/signUp",{
        firstName,
        lastName,
        email,
        password,
    });
};

const login = (email,password) => {
    return httpClient.post("/login/signIn",{
        email,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user",JSON.stringify(response.data));
            }
            return response.data;
        });
};

const updateUser = data => {
    return httpClient.put("/profile",data,{headers : authHeader()});
}

const logout = () => {
    localStorage.removeItem("user");
    setTimeout(function tick() {
        window.location.href = '/';
    }, 100);
};

const userInfo = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const exportedObject = {
    register,
    login,
    logout,
    userInfo,
    updateUser
};

export default exportedObject;