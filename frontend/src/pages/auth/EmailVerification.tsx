import React, { useEffect, useRef, useState } from "react";
import "./style/emailverification.css"
import { useLocation } from "react-router-dom";
const OTP_LENGTH = 5;

const EmailVerification: React.FC = () => {
const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
const location = useLocation();
const email = location.state?.email;

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

  const verifyCode = () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      alert("Please enter all 5 digits.");
      return;
    }

    alert(`Verification Code: ${code}`);

    // Call your API here
  };

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

        <button className="verify-btn" onClick={verifyCode}>
          Verify Email
        </button>

        <div className="footer">
          Didn't receive the code?

          <button className="resend-btn">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;