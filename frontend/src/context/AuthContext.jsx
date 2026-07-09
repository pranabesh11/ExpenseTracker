import { createContext, useEffect, useState } from "react";
import { getApiData } from "../shared/api/get-api-data";
export const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getApiData({
                    endpoint: "/billbot/me",
                    payload: {}
                });
                setUser(response.data);
            } catch (error) {
                console.log("User not logged in");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}