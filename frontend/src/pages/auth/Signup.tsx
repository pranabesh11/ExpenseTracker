import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShowErrorNotification, ShowWarningNotification } from "../../utilities/ShowNotifications";
import { getApiData } from "../../shared/api/get-api-data";
import { GoogleLogin } from "@react-oauth/google";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitSignUpData = async() => {
    if(name === "" || email === "" || password === ""){
      ShowWarningNotification("Enter Credentials To Sign Up")
      return
    }
    setLoading(true)
    try{
      const response = await getApiData({
        endpoint:"/billbot/signup",
        payload: {"name":name,"email":email,"password":password}
      })
      console.log("this is response", response)
      if(response?.success){
        navigate("/emailverify",{
          state: { email }
        })
      }
    }catch(e){
      ShowErrorNotification("Sign Up Unsuccessful !")
      console.log(e);
    }finally{
      setLoading(false)
    }
    console.log("+++====+++", name, email, password)
  }
    const handleGoogleSuccess = async (credentialResponse:any) => {
      try{
        const response = await getApiData({
          endpoint:"/billbot/google/signup",
          payload: {idToken: credentialResponse.credential}
        })
        if(response?.success){
          navigate("/app/dashboard")
        }else{
          ShowErrorNotification(response?.message);
        }
        console.log(credentialResponse);
      }catch(e){
        console.log("google sign up err", e)
      }
    }

    const handleGoogleFailure = () => {
      ShowErrorNotification("Unable to sign in with Google. Please try again.")
      console.log("Google Login Failed")
    }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        bgcolor: "#06142e",
      }}
    >
      <div className="auth-bg" />

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
        <Typography sx={{ textAlign: "center", fontWeight: 700 }}>
          Create account
        </Typography>

        <Typography
          sx={{ textAlign: "center", color: "#b8c2d9", mb: 3, fontSize: 14 }}
        >
          Start tracking in seconds
        </Typography>

        <TextField
          fullWidth
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={inputStyle}
        />

        <Button
          fullWidth
          sx={primaryBtn}
          onClick={submitSignUpData}
          loading={loading}
          loadingPosition="end"
        >
          Create account
        </Button>
        
        <Box sx={{ mt: 1.5 }}>
        <Typography
          sx={{
            color: "#b8c2d9",
            fontSize: 12,
            mb: 1,
            textAlign: "center",
          }}
        >
          Or sign up with Google
        </Typography>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          text="signup_with"
          size="large"
          shape="rectangular"
        />
      </Box>

        <Typography
          onClick={() => navigate("/login")}
          sx={{
            mt: 2,
            textAlign: "center",
            fontSize: 13,
            color: "#b8c2d9",
            cursor: "pointer",
            "&:hover": { color: "#ff9933" },
          }}
        >
          Already have an account? Login
        </Typography>
      </Paper>
    </Box>
  );
};

const inputStyle = {
  mb: 1.5,
  input: {
    color: "white",
    p: 1.5,
    borderRadius: 2,
    background: "rgba(255,255,255,0.05)",
  },
};

const primaryBtn = {
  mt: 1,
  py: 1.2,
  borderRadius: 2,
  fontWeight: 600,
  background: "linear-gradient(135deg, #ff9933, #ff7a00)",
  color: "#000",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 20px rgba(255,153,51,0.25)",
  },
};

const googleBtn = {
  mt: 1.5,
  py: 1.1,
  borderRadius: 2,
  color: "white",
  textTransform: "none",
};

export default Signup;