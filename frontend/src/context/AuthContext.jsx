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
            return response.data;
        } catch {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }

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