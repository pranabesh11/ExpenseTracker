
import callBaseURLApi from "../utils/api-client.js";
const settings = (app)=>{
    app.post("/billbot/settingsData", async(req, res)=>{
        console.log("****-----******------******--------",req.body);
        try{
            const response = await callBaseURLApi(
            "POST",
            process.env.GET_SETTINGS_DATA,
            req.body,
            req.headers.cookie
        );
        const cookies = response.headers["set-cookie"];
        if (cookies) {
            res.setHeader("Set-Cookie", cookies);
        }
        res.status(200).json(response.data);
        }catch(error){
          res.status(500).json({ error: error.message });
        }
    })
}
export default settings;