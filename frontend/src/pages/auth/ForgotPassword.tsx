import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getApiData } from "../../shared/api/get-api-data";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetRequest = async () => {
    try {
      setLoading(true);

      await getApiData({
        endpoint: "/billbot/forgot-password",
        payload: { email },
      });

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );
    } catch (err) {
      console.log(err);
      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );
    } finally {
      setLoading(false);
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
      {/* Same animated background as Login */}
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
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 1,
          }}
        >
          Forgot Password
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#b8c2d9",
            fontSize: 14,
            mb: 3,
          }}
        >
          Enter your registered email address. We'll send you a password reset
          link.
        </Typography>

        <TextField
          fullWidth
          placeholder="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 3,
            input: {
              color: "white",
              p: 1.5,
              borderRadius: 2,
              background: "rgba(255,255,255,0.05)",
            },
          }}
        />

        <Button
          fullWidth
          onClick={handleResetRequest}
          disabled={loading}
          sx={{
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            background: "linear-gradient(135deg, #ff9933, #ff7a00)",
            color: "#000",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 10px 20px rgba(255,153,51,0.25)",
            },
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        {message && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#b8c2d9",
              fontSize: 13,
            }}
          >
            {message}
          </Typography>
        )}

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

export default ForgotPassword;