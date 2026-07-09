
import callBaseURLApi from "../utils/api-client.js";
const auth = (app)=>{
    app.post("/billbot/signup", async(req, res)=>{
        try{
            const response = await callBaseURLApi(
            "POST",
            process.env.SIGN_UP,
            req.body,
        );
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
    app.post("/billbot/verify-otp", async(req, res)=>{
        try{
            const response = await callBaseURLApi(
            "POST",
            process.env.VERIFY_OTP,
            req.body,
        );
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
    app.post("/billbot/google/signup", async(req, res)=>{
        try{
            const response = await callBaseURLApi(
            "POST",
            process.env.GOOGLE_SIGN_UP,
            req.body,
        );
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
    app.post("/billbot/login", async (req, res) => {
        try {
            const response = await callBaseURLApi(
                "POST",
                process.env.LOG_IN,
                req.body,
            );
            // Forward Spring's cookies to the browser
            const cookies = response.headers["set-cookie"];
            if (cookies) {
                res.setHeader("Set-Cookie", cookies);
            }
            res.status(response.status).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    });
    app.post("/billbot/google/login", async(req, res)=>{
        try{
            const response = await callBaseURLApi(
            "POST",
            process.env.GOOGLE_LOG_IN,
            req.body,
        );
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
    app.get("/billbot/me", async(req, res)=>{
        try{
            const response = await callBaseURLApi(
            "GET",
            process.env.ABOUT_ME,
            req.body,
            req.headers.cookie
        );
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
}
export default auth;