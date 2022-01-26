import axios, {} from "axios";


const UNAUTHORIZED = 401;

axios.defaults.baseURL = "";
axios.defaults.headers.common['Content-Type']  = 'application/json';
/*axios.defaults.withCredentials = true;*/




axios.interceptors.response.use((response) => {
    return response;
}, error => {
    if (error.response.status === UNAUTHORIZED) {

    }
    return Promise.reject(error);
})


export default axios;
