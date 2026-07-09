import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { NotificationHolder } from "./utilities/ShowNotifications";
import { getApiData } from "./shared/api/get-api-data";
import { useEffect,useContext } from "react";
const theme = createTheme();
import { AuthContext } from "./context/AuthContext";

function App() {
  const { loading } = useContext(AuthContext);
  if(loading){
    return <div>Loading...</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <NotificationHolder />
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;