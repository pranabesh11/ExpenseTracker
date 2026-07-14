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
export default callBaseURLApi;