import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";
import { authAPI } from "../api-client";

export function useAuth(options?: Partial<PublicConfiguration>){
    // Profile
    //

    const {data: profile, error, mutate} = useSWR('/profile',{
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    });
    const firstLoading = profile === undefined && error === undefined;
   async function login() {
    await authAPI.login({
        username: "test",
        password: "test123"
    });
    mutate();
   }
   async function logout() {
    await authAPI.logOut();
    mutate({}, false);
   }
    return{
        profile,
        error,
        login,
        logout,
        firstLoading,
    }
}