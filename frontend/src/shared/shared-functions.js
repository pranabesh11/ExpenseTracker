import { getApiData } from "./api/get-api-data";
import { ShowSuccessNotification } from "../utilities/ShowNotifications";

export const handleLogout = async () => {
  try {
    const response = await getApiData({
      endpoint: "/billbot/logout",
      payload: {},
    })
    if (response) {
      ShowSuccessNotification("Logout successful")
      return true
    }
    return false
  } catch (error) {
    console.error("Logout failed", error)
    return false
  }
};