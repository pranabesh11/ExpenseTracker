import axios from "axios";

const api = axios.create({
    withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((promise) => {
        if(error){
            promise.reject(error);
        }
        else{
            promise.resolve();
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        /*
            Access token expired
        */
        if(
            (error.response?.status === 401 || error.response?.status === 403) &&
            !originalRequest._retry
        ){
            if(isRefreshing){
                return new Promise((resolve,reject)=>{
                    failedQueue.push({
                        resolve,
                        reject
                    });
                })
                .then(()=>{
                    return api(originalRequest);
                })
                .catch(err=>{
                    return Promise.reject(err);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try{
                /*
                    Call refresh API

                    Browser automatically sends
                    refreshToken cookie
                */
                await api.post(
                    "/billbot/refreshToken",
                    {}
                );
                isRefreshing = false;
                processQueue(null);
                /*
                    Retry original failed API
                */
                return api(originalRequest);
            }
            catch(refreshError){
                isRefreshing = false;
                processQueue(refreshError);
                /*
                    Refresh token also invalid
                    Logout user
                */
                try{
                    await api.post(
                        "/billbot/logout",
                        {}
                    );
                }
                catch(e){
                    console.log(
                        "Logout API failed"
                    );
                }
                window.location.href="/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;