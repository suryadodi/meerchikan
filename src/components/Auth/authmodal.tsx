import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoginStep from "./login";
import SignupStep from "./signup";
import OtpStep from "./verification";
import { ConfirmationResult } from "firebase/auth";
import { useAuth } from "@/auth-provider";
import {
  addToCartRequest,
  addToCartUpdate,
} from "@/services/action/cartAction";
import { useDispatch } from "react-redux";
import { AppDispatch, persistor } from "@/services/store";

enum Steps {
  Login = "login",
  Signup = "signup",
  Otp = "otp",
  Success = "success",
}

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [currentStep, setCurrentStep] = useState<Steps>(Steps.Login);
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [confirmationResult, setConfirmationResult] =
  //   useState<ConfirmationResult | null>(null);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");

  const handleLoginContinue = (
    confirmationResult: any | null
  ) => {
    if (confirmationResult) {
      setCurrentStep(Steps.Success);
    } else {
      alert("Mobile number not registered. Please sign up.");
      setCurrentStep(Steps.Signup);
    }
  };

  // const handleSignupContinue = (
  //   mobile: string,
  //   name: string,
  //   email: string,
  //   confirmationResult: ConfirmationResult
  // ) => {
  //   setMobileNumber(mobile);
  //   setName(name);
  //   setEmail(email);
  //   setConfirmationResult(confirmationResult);
  //   setCurrentStep(Steps.Otp);
  // };

  // const handleOtpSuccess = () => {
  //   setCurrentStep(Steps.Success);
  // };

  // const handleBackToSignup = () => {
  //   setCurrentStep(Steps.Signup);
  // };

  const handleModalClose = () => {
    setCurrentStep(Steps.Login);
    onClose();
  };

  const handleModal = () => {
    setCurrentStep(Steps.Signup);
    onClose();
  };
  const processCartItems = async () => {
    const cartStateFromLocalStorage: any = localStorage.getItem("persist:root");
    const parsedCartState = JSON.parse(cartStateFromLocalStorage);

    const cart = JSON.parse(parsedCartState.cart);

    const dispatchPromises = cart.item.map((items: any) => {
      const { product_id, image, product_name, attributes, price, quantity,offered_price,selling_price,original_price } =items;

      const cartItem = {
        id: product_id,
        image,
        name: product_name,
        selectedQuantity: attributes.prices.selectedQuantity,
        price:quantity*offered_price,
        offered_price,
        quantity,
        user_id: user?.id,
        selling_price
      };
 
      dispatch(addToCartUpdate(cartItem));
    });

    try {
      await Promise.all(dispatchPromises);
      localStorage.removeItem('persist:root')
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  useEffect(() => {
    
    if (currentStep === Steps.Success && user?.id) {
      handleModalClose();
      processCartItems();
    }
  }, [user]);

  return (
    <Modal
      open={true}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(6px)",
          background: "rgba(153, 153, 153, 0.12)",
        },
      }}
    >
      <Box className="login_modal">
        {currentStep === Steps.Login && (
          <LoginStep
            onContinue={handleLoginContinue}
            onClose={handleModalClose}
            onSignup={() => setCurrentStep(Steps.Signup)}
          />
        )}

        {currentStep === Steps.Signup && (
          <SignupStep onClose={handleModal} />
        )}

        {/* {currentStep === Steps.Otp && (
          <OtpStep
            mobileNumber={mobileNumber}
            name={name}
            email={email}
            confirmationResult={confirmationResult}
            onSuccess={handleOtpSuccess}
            onBack={handleBackToSignup}
          />
        )} */}

        {currentStep === Steps.Success && (
          <div className="login_success">
            <div>
              <img
                src="/images/success-login.png"
                alt="Logged in Correct"
                className="popup_center"
              />
            </div>
            <h1>Successfully logged in</h1>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
