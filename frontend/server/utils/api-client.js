import axios from "axios"
const callBaseURLApi = async (method = "POST", endpoint, dataOrParams = {}, cookie) => {
	try {
		const headers = {
			"x-api-key": process.env.X_API_KEY,
			"Content-Type": "application/json"
		}
		if(cookie){
            headers.Cookie = cookie;
        }
		const config = {
			method: method.toLowerCase(),
			url: `${process.env.BASE_URL}${endpoint}`,
			headers,
			withCredentials:true
		}

		if (method.toUpperCase() === "GET") {
			config.params = dataOrParams
		} else {
			config.data = dataOrParams
		}
		console.log("===============================config=============>>>>>>>",config)
		const response = await axios(config)
		console.log("================================response=======================>>>>>>>",response)
		return response
	} catch (error) {
        console.log("/////////////////////////////////////",error)
		if (error.response) {
			console.log("=========================>>>>>>>",error)
        	return error.response;
    	}
    	throw error;
	}
}
const callMultipartApi = async (
    endpoint,
    fields = {},
    files = [],
    cookie
) => {
    try {
        const FormData = (await import("form-data")).default;
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });
        files.forEach((file) => {
            formData.append(
                file.fieldname,
                file.buffer,
                {
                    filename: file.originalname,
                    contentType: file.mimetype,
                }
            );
        });
        const headers = {
            ...formData.getHeaders(),
            "x-api-key": process.env.X_API_KEY,
        };
        if (cookie) {
            headers.Cookie = cookie;
        }
        const response = await axios.post(
            `${process.env.BASE_URL}${endpoint}`,
            formData,
            {
                headers,
                withCredentials: true,
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
        throw error;
    }
};
export default callBaseURLApi;
export { callMultipartApi };