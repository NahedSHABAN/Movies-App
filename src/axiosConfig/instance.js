import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3", 
    params: {
        api_key: "cf8dea07935387e4396fe9318f97c225", 
    },
    timeout: 10000,
});

export default axiosInstance;
