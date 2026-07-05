
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
            process.env.VERIFY_OTP,
            req.body,
        );
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
    app.post("/billbot/login", async(req, res)=>{
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
    app.post("/billbot/google/login", async(req, res)=>{
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
}
export default auth;