
import callBaseURLApi, { callMultipartApi } from "../utils/api-client.js";
import multer from "multer";
const upload = multer();
const settings = (app)=>{
    app.post("/billbot/settingsData", async(req, res)=>{
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
    app.post("/billbot/settingsSave",upload.any(), async (req, res) => {
            try {
                const response = await callMultipartApi(
                    process.env.SAVE_SETTINGS_DATA,
                    req.body,
                    req.files,
                    req.headers.cookie
                );
                const cookies = response.headers["set-cookie"];
                if (cookies) {
                    res.setHeader("Set-Cookie", cookies);
                }
                res.status(response.status).json(response.data);
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                });
            }
        }
    );
}
export default settings;