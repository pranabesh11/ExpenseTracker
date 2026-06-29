
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
}
export default auth;