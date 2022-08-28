import { LoginPayload } from "../models"
import axiosClient from "./axios-client"

export const authAPI = {
    login(payload: LoginPayload){
        return axiosClient.post("./login", payload)
    },
    getProfile(){
        return axiosClient.get("./profile")
    },
    logOut(){
        return axiosClient.post("./logout")
    }
}