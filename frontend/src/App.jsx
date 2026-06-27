import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { NotificationHolder } from "./utilities/ShowNotifications";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationHolder />
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;