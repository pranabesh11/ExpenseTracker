import React, { useEffect, useRef, useState } from "react";
import "./style/emailverification.css"
import { useLocation, useNavigate } from "react-router-dom";
import { getApiData } from "../../shared/api/get-api-data";
import { ShowErrorNotification, ShowInfoNotification, ShowWarningNotification } from "../../utilities/ShowNotifications";
const OTP_LENGTH = 5;

const EmailVerification: React.FC = () => {
const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
const location = useLocation();
const email = location.state?.email;
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updated = [...otp];
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const updated = [...otp];

    pasted.split("").forEach((digit, i) => {
      updated[i] = digit;
    });

    setOtp(updated);

    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const verifyCode = async() => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      alert("Please enter all 5 digits.");
      return;
    }
    setLoading(true)
    const payload = { email:email, otp:code }
    try{
      const response = await getApiData({
        endpoint:"/billbot/verify-otp",
        payload: payload
      })
      if(response?.success){
        navigate("/login")
      }else{
        ShowWarningNotification(response?.message)
      }
    }catch(e){
      console.log("verify-otp",e);
    }finally{
      setLoading(false)
    }
  };
  const resendCode = async() => {
    if(!email){
      ShowWarningNotification("Try to Sign up again")
    }
    try{
      setLoading(true);
      const payload = {email:email}
      const response = await getApiData({
        endpoint:"/billbot/resend-otp",
        payload:payload
      })
      if(response?.success){
        ShowInfoNotification("Check your E-Mail");
      }else{
        ShowErrorNotification("Re-Try")
      }
    }catch(e){
      console.log("resend-err",e);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="verification-page">
      <div className="background-circle circle1"></div>
      <div className="background-circle circle2"></div>

      <div className="verification-card">
        <div className="email-icon">📧</div>

        <h2>Email Verification</h2>

        <p>
          Enter the <strong>5-digit verification code</strong> sent to your
          email.
        </p>

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="otp-input"
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <button className="verify-btn" onClick={verifyCode} disabled={loading}>
          Verify Email
        </button>

        <div className="footer">
          Didn't receive the code?

          <button className="resend-btn" disabled={loading} onClick={resendCode}>
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;