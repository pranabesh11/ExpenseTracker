import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { getApiData } from "../../shared/api/get-api-data";
import { ShowErrorNotification } from "../../utilities/ShowNotifications";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useContext(AuthContext);
  const handleGoogleLogin = async (credentialResponse:any) => {
    try{
      const idToken = credentialResponse.credential;
      const response = await getApiData({
        endpoint:"/billbot/google/login",
        payload: {idToken: idToken}
      })
      if(response?.success){
        await fetchUser()
        navigate("/app/dashboard")
      }else{
        ShowErrorNotification(response?.message)
      }
    }catch(e){
      console.log("google login", e)
    }
  }
  const normalSignIn = async () => {
    setLoading(true)
    try{
      const response = await getApiData({
        endpoint:"/billbot/login",
        payload: {email:email, password:password}
      })
      if(response?.success){
        await fetchUser()
        navigate("/app/dashboard")
      }else{
        console.log("//////",response)
        ShowErrorNotification(response?.message)
      }
      console.log("Normal login",response);
    }catch(e){
      console.log("normal login",e)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        bgcolor: "#06142e",
        overflow: "hidden",
      }}
    >
      {/* animated background */}
      <div className="auth-bg" />

      {/* glass card */}
      <Paper
        elevation={0}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          position: "relative",
          zIndex: 2,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.10)",
          color: "white",
        }}
      >
        {/* logo */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 1,
          }}
        >
          BillBot
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#b8c2d9",
            mb: 3,
            fontSize: 14,
          }}
        >
          Welcome back
        </Typography>

        {/* inputs */}
        <TextField
          fullWidth
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          sx={{
            mb: 2,
            input: {
              color: "white",
              p: 1.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
            },
          }}
        />

        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="standard"
          sx={{
            mb: 1,
            input: {
              color: "white",
              p: 1.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
            },
          }}
        />
        <Typography
          onClick={() => navigate("/forgot-password")}
          sx={{
            textAlign: "right",
            fontSize: 13,
            color: "#b8c2d9",
            cursor: "pointer",
            mb: 2,
            "&:hover": {
              color: "#ff9933",
            },
          }}
        >
          Forgot Password?
        </Typography>

        {/* primary button */}
        <Button
          fullWidth
          sx={{
            mt: 1,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            background: "linear-gradient(135deg, #ff9933, #ff7a00)",
            color: "#000",
            transition: "0.2s",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 10px 20px rgba(255,153,51,0.25)",
            },
          }}
          onClick={normalSignIn}
          loading={loading}
          loadingPosition="end"
        >
          Log in
        </Button>

        {/* google */}
        <Button
          fullWidth
          sx={{
            mt: 1.5,
            py: 1.1,
            borderRadius: 2,
            color: "white",
            textTransform: "none",
          }}
        >
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </Button>

        {/* switch */}
        <Typography
          onClick={() => navigate("/signup")}
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: 13,
            color: "#b8c2d9",
            cursor: "pointer",
            "&:hover": { color: "#ff9933" },
          }}
        >
          Don’t have an account? Sign up
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;