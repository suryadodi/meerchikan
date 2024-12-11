import { Box, Modal } from "@mui/material";
import React from "react";

const PayContinue: React.FC<any> = ({ close }) => {
    return (
        <Modal
            open={true}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                '& .MuiBackdrop-root': {
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(153, 153, 153, 0.12)',
                },
            }}
        >
            <Box className="paymodal">
                <div className="paymodal_close" onClick={close}>
                    <span>&times;</span>
                </div>
                <div className="paycontinue_success">
                    <img src="/images/success.png" alt="Order Success" />
                    <h1>Order Confirmation</h1>
                    <p>Thank you for your purchase!</p>
                    <p>Order Number: #32109876</p>
                    <p>Estimated Delivery Time: 10 Mins</p>
                    <button className="btn" onClick={close}>Okay</button>
                </div>
            </Box>
        </Modal>
    );
};

export default PayContinue;

