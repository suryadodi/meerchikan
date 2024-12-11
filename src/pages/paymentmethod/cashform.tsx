import { CheckBox, CheckBoxOutlineBlank, CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import React, { useState } from "react";

const CashForm: React.FC<any> = ({ visible }) => {
    const [isChecked, setIsChecked] = useState(false);

    if (!visible) return null;

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };


    return(
        <>
        <div className="cashform">
            <div className="cashform_details">
                <h1>Cash On Delivery</h1>
                <div className="cashform_checkinfo" onClick={handleCheckboxClick}>
                {isChecked ? (
                        <CheckBox className="cardform_checkbox_checked" />
                    ) : (
                        <CheckBoxOutlineBlank className="cardform_checkbox" />
                    )}                 
                    <p>Make this as my payment default option</p>
                </div>
                <p className="cashform_service">Please keep exact change handy to help us serve you better</p>

            </div>

        </div>
        </>
    )

}
export default CashForm;