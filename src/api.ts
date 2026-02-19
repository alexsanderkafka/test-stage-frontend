import axios from "axios";

export const api: any = axios.create({
    baseURL: "http://localhost:8080/api/",
});