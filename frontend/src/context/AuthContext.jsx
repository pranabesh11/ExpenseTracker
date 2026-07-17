import { createContext, useEffect, useState } from "react";
import { getApiData } from "../shared/api/get-api-data";
export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    loading: true,
    fetchUser:()=>{}
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await getApiData({
                endpoint: "/billbot/me",
                method: "GET",
                payload: {}
            });

            setUser(response.data);
            startRefreshTimer();
            return response.data;
        } catch {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }
    const refreshToken = async () => {
        try {
            await getApiData({
                endpoint: "/billbot/refreshToken",
                method: "POST",
                payload: {}
            });

            startRefreshTimer();
        } catch {
            setUser(null);
        }
    };

    const startRefreshTimer = () => {
        setTimeout(() => {
            refreshToken();
        }, 14 * 60 * 1000);
    };

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                fetchUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}