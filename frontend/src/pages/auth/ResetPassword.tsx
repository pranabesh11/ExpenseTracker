import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowBack,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getApiData } from "../../shared/api/get-api-data";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await getApiData({
        endpoint: "/billbot/reset-password",
        payload: {
          token,
          password,
        },
      });

      console.log(response);

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#06142e",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated Background */}
      <div className="auth-bg" />

      {/* Glass Card */}
      <Paper
        elevation={0}
        sx={{
          width: 400,
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
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 1,
            fontSize: 26,
          }}
        >
          BillBot
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            mb: 1,
          }}
        >
          Reset Password
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#b8c2d9",
            fontSize: 14,
            mb: 3,
          }}
        >
          Create a strong new password for your account.
        </Typography>

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            mb: 2,
            input: {
              color: "white",
              p: 1.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
            },
          }}
          slotProps={{
            input: {
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: "#b8c2d9" }}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            },
            }}
        />

        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            mb: 3,
            input: {
              color: "white",
              p: 1.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
            },
          }}
          slotProps={{
            input: {
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: "#b8c2d9" }}
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            },
            }}
        />

        <Button
          fullWidth
          onClick={handleResetPassword}
          sx={{
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
          Reset Password
        </Button>

        <Typography
          onClick={() => navigate("/login")}
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            fontSize: 13,
            color: "#b8c2d9",
            cursor: "pointer",
            "&:hover": {
              color: "#ff9933",
            },
          }}
        >
          <ArrowBack fontSize="small" />
          Back to Login
        </Typography>
      </Paper>
    </Box>
  );
};

export default ResetPassword;