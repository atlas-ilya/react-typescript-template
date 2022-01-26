import axios from "../index"
import {IUserLogin} from "./userTypes";

export const userAPI = {

    async userLogin(obj: IUserLogin) {
        let pld = (await axios.post(`/api/login`, obj)).data;
        return pld;
    },

    async getUser() {
        let pld = (await axios.get(`/api/auth/me`)).data;
        return pld;
    },

    async logoutUser() {
        let pld = (await axios.delete(`/api/logout`)).data;
        return pld;
    },
}
