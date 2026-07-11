import axios from "axios"

export const getApiData = async ({ endpoint, method = "POST", payload }) => {
	let response = {
		Result: false,
		Data: null,
		ErrorMessage: null
	}

	try {
		switch (method.toLocaleUpperCase()) {
			case "POST":
				response = await axios.post(endpoint, payload)
				break
			case "GET":
				response = await axios.get(endpoint, { params: payload })
				break
		}
		if (response.data.statusCode) {
			return JSON.parse(response.data.body)
		}
		if (response.data.result) {
			return {
				...response,
				Result: response.data.result,
				Data: response.data.data
			}
		}
		return response.data
	} catch (error) {
		let errorMessage = "Sorry, an error occurred"
		if (error.response) {
			errorMessage = `Error: ${error.response.status} - ${error.response.statusText}`
		} else if (error.request) {
			errorMessage = "Network Error: No response received from the server"
		} else if (error.code === "ECONNABORTED") {
			errorMessage = "Request Timeout: The server took too long to respond"
		} else {
			errorMessage = error.message ?? "Sorry, an unknown error occurred"
		}

		return {
			...response,
			ErrorMessage: errorMessage
		}
	}
}
