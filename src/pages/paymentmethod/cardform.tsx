import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import PayContinue from "./paycontinue";

const AddCardForm: React.FC<any> = ({ visible }) => {
    const [cardDetails, setCardDetails] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        number: '',
        expiry: '',
        cvv: '',
    });
    const [isChecked, setIsChecked] = useState(false);
    const [payOpen, setPayOpen] = useState(false);

    const handlePayOpen = () => {
        if (validateForm()) {
            setPayOpen(true);
        }
    };

    const handlePayClose = () => {
        setPayOpen(false);
    };

    if (!visible) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { name: '', number: '', expiry: '', cvv: '' };

        if (!cardDetails.name) {
            newErrors.name = 'Name on card is required';
            valid = false;
        }
        if (!cardDetails.number) {
            newErrors.number = 'Card number is required';
            valid = false;
        }
        if (!cardDetails.expiry) {
            newErrors.expiry = 'Expiry date is required';
            valid = false;
        }
        if (!cardDetails.cvv) {
            newErrors.cvv = 'CVV is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleCheckboxChange = () => {
        if (validateForm()) {
            setIsChecked(!isChecked);
        }
    };

    return (
        <>
        <div className="cardform">
            <h2>Add a card</h2>
            <form>
                <div className="cardform_carddetails">
                    <input
                        type="text"
                        placeholder="Name on card"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                        className="cardform_input"
                    />
                </div>
                {errors.name && <p className="cardform_error">{errors.name}</p>}

                <div className="cardform_carddetails">
                    <input
                        type="text"
                        placeholder="Card Number"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        className="cardform_input"
                    />
                </div>
                {errors.number && <p className="cardform_error">{errors.number}</p>}

                <div className="cardform_validity">
                    <div className="cardform_expiry">
                        <div className="cardform_carddetails">
                            <input
                                type="text"
                                placeholder="Expiry Date"
                                name="expiry"
                                value={cardDetails.expiry}
                                onChange={handleInputChange}
                                className="cardform_input"
                            />
                        </div>
                        <div>
                            {errors.expiry && <p className="cardform_error">{errors.expiry}</p>}
                        </div>
                    </div>

                    <div className="cardform_cvv">
                        <div className="cardform_carddetails">
                            <input
                                type="text"
                                placeholder="CVV"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleInputChange}
                                className="cardform_input"
                            />
                        </div>
                        <div>
                            {errors.cvv && <p className="cardform_error cvv_error">{errors.cvv}</p>}
                        </div>
                    </div>
                </div>

                <div className="cardform_save" onClick={handleCheckboxChange}>
                    {isChecked ? (
                        <CheckBox className="cardform_checkbox_checked" />
                    ) : (
                        <CheckBoxOutlineBlank className="cardform_checkbox" />
                    )}
                    <h2 className="cardform_fastpay">Save this card for faster payments</h2>
                    <img src="/images/info.png" alt="Info" />
                </div>
            </form>
            <button className="btn" onClick={handlePayOpen}>Continue</button>
            <Modal
                open={payOpen}
                onClose={handlePayClose}
            >
                <PayContinue close={handlePayClose} />
            </Modal>
        </div>
        </>
    );
};

export default AddCardForm;


