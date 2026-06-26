import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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
          ExpenseTracker
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

        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              sx={{ color: "#ff9933" }}
            />
          }
          label={<span style={{ color: "#b8c2d9", fontSize: 13 }}>Remember me</span>}
        />

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
        >
          Sign in
        </Button>

        {/* google */}
        <Button
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            mt: 1.5,
            py: 1.1,
            borderRadius: 2,
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            textTransform: "none",
          }}
        >
          Continue with Google
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