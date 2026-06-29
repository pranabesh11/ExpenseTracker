import axios from "axios"
const callBaseURLApi = async (method = "POST", endpoint, dataOrParams = {}) => {
	try {
		const headers = {
			"x-api-key": process.env.X_API_KEY,
			"Content-Type": "application/json"
		}
		const config = {
			method: method.toLowerCase(),
			url: `${process.env.BASE_URL}${endpoint}`,
			headers
		}

		if (method.toUpperCase() === "GET") {
			config.params = dataOrParams
		} else {
			config.data = dataOrParams
		}
        console.log("===================>>>>>>>>>>",config)
		const response = await axios(config)
        console.log("/////////////////////////////////////",response)
		return response
	} catch (error) {
        console.log("/////////////////////////////////////",error)
	}
}
export default callBaseURLApi;