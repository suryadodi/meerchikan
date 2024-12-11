import React, { useState, useEffect } from 'react';
import { ConfirmationResult } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtpRequest } from '@/services/action/otpAction';

interface Props {
  mobileNumber: string;
  confirmationResult: ConfirmationResult | null;
  onSuccess: () => void;
  onBack: () => void;
  name: string; 
  email: string;
}

const OtpStep: React.FC<Props> = ({ mobileNumber, confirmationResult, onSuccess, onBack, name, email }) => {
  console.log(mobileNumber, name, email);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(25);

  const dispatch = useDispatch();
  const verifyOtpStatus = useSelector((state: any) => state.otp.status); 

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
      }, 1000); 
    }
    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    if (confirmationResult && otp.join('').length === 6) {
      handleVerifyOtp();
    }
  }, [otp, confirmationResult]);

  useEffect(() => {
    if (verifyOtpStatus === 'success') {
      onSuccess(); 
    } else if (verifyOtpStatus === 'failure') {
      setError('Invalid OTP. Please try again.');
    }
  }, [verifyOtpStatus, onSuccess]);

  const handleOtpChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || /^\d+$/.test(e.target.value)) { 
      const newOtp = [...otp];
      newOtp[index] = e.target.value;
      setOtp(newOtp);
      if (e.target.value === '' && index > 0) {
        (document.getElementById(`otp${index - 1}`) as HTMLInputElement)?.focus();
      } else if (index < 5 && e.target.value !== '') {
        (document.getElementById(`otp${index + 1}`) as HTMLInputElement)?.focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    if (confirmationResult && otpCode.length === 6) {
      console.log(name, email, mobileNumber);
      
      // let infoData = {
      //   name: name,
      //   email: email,
      //   mobile: mobileNumber
      // }
      dispatch(verifyOtpRequest(otpCode, confirmationResult, { name, email, mobile: mobileNumber }));
    } else {
      setError('Please enter the complete OTP.');
    }
  };

  const handleResendOtp = () => {
    setTimer(25);
    // Add logic to resend OTP if needed
  };

  return (
    <div className="verification">
      <div className="verification_prevpage" onClick={onBack}>
        <img src="/images/backarrow.png" alt="Back Arrow"/>
        <h2 className="verification_title">OTP Verification</h2>
      </div>
      <p className="verification_message">We have sent a verification code to</p>
      <h1 className="verification_mobileno">{mobileNumber}</h1>
      <div className="verification_otpstyle">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp${index}`}
            type="text"
            maxLength={1}
            value={value}
            onChange={handleOtpChange(index)}
            autoFocus={index === 0}
            tabIndex={index + 1}
          />
        ))}
      </div>
      {error && <p className="verification_warning">{error}</p>}
      {timer > 0 ? (
        <p className="verification_resend">Resend Code (in {timer} sec)</p>
      ) : (
        <p className="verification_resend" onClick={handleResendOtp}>Resend Code</p>
      )}
    </div>
  );
};

export default OtpStep;
