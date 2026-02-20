import { create } from "zustand";

interface AuthState {

    token: string | null;
    refreshToken: string | null;
    email: string | null;
    userExternalId: string | null;

    login: (data: {
        token: string;
        refreshToken: string;
        email: string;
        userExternalId: string;
    }) => void;

    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    email: localStorage.getItem("email"),
    userExternalId: localStorage.getItem("userExternalId"),

    login: (data) => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userExternalId", data.userExternalId);

        set({
            token: data.token,
            refreshToken: data.refreshToken,
            email: data.email,
            userExternalId: data.userExternalId
        });
    },

    logout: () => {

        localStorage.clear();

        set({
            token: "",
            refreshToken: "",
            email: "",
            userExternalId: ""
        });
    }

}));