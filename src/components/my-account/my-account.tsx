import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchUserRequest,
  updateUserRequest,
} from "@/services/action/profileAction";
import { Modal } from "antd";
import { useAuth } from "@/auth-provider";
import accountEdit from "../../../public/images/Sraees/accountEdit.png";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";

interface Details {
  name: string;
  email: string;
  mobile: string;
}

const MyAccount: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [accountDetails, setAccountDetails] = useState<Details | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null); // Track which field to edit (name or email)

  const showModal = (field: string) => {
    setFieldToEdit(field); // Set which field to edit
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserRequest(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (user) {
      setAccountDetails({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const handleEdit = () => {
    setEditIndex(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (accountDetails) {
      setAccountDetails({ ...accountDetails, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountDetails && user?.id) {
      dispatch(updateUserRequest(user.id, accountDetails));
      setEditIndex(null);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="my-account">
      <p className="my-account-heading fonts">My Account</p>
      <div className="my-account-body">
        {accountDetails ? (
          <>
            {editIndex === null ? (
              <div className="profile-details">
                <div className="profile-details_head">
                  <p className="fonts profile-details-heading">
                    Profile Details
                  </p>
                  <Button
                    className="profile-details_head-btn"
                    onClick={handleEdit}
                  >
                    Edit <img src={accountEdit.src} alt="" />
                  </Button>
                </div>
                <div className="profile-details_body">
                  <div>
                    <p className="profile-details_body-para">
                      {accountDetails.name}
                    </p>
                  </div>

                  <p className="profile-details_body-para">
                    <img src="./images/mail-icon.jpg" alt="" />
                    {accountDetails.email}
                  </p>
                  <p className="profile-details_body-para">
                    <img src="./images/phone-icon.jpg" alt="" />
                    {accountDetails.mobile}
                  </p>
                </div>
              </div>
            ) : (
              <div className="profile-edit-bodys">
              <form className="profile-edit_form" onSubmit={handleSubmit}>
                <div className="profile-edit_form-bodys">
                  <div className="profile-edit_content">
                    <div className="profile-edit-box">
                      <p>Name:</p>
                      <p>{accountDetails.name}</p>
                      <div
                        onClick={() => showModal("name")}
                        style={{ cursor: "pointer", marginLeft: "auto" }}
                      >
                        <img className="profile-icon-box" src="/images/my-account/edit-icon.png" alt="Edit" />
                      </div>
                    </div>
                  </div>
                  <div className="profile-edit_content">
                    <div className="profile-edit-box">
                      <p>Email:</p>
                      <p>{accountDetails.email}</p>
                      <div
                        onClick={() => showModal("email")}
                        style={{ cursor: "pointer", marginLeft: "auto" }}
                      >
                        <img className="profile-icon-box" src="/images/my-account/edit-icon.png" alt="Edit" />
                      </div>
                    </div>
                  </div>
                  <div className="profile-edit_content">
                    <label className="profile-edit_label" htmlFor="mobile">
                      Mobile number:
                    </label>
                    <input
                      type="text"
                      required
                      name="mobile"
                      value={accountDetails.mobile}
                      className="profile-edit-input3"
                    />
                  </div>
                </div>
              </form>
            </div>
            
            )}
          </>
        ) : (
          <p>No account details available</p>
        )}
      </div>

      {/* Modal for editing the name or email */}
      <Dialog open={isModalVisible} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {fieldToEdit === "name" ? (
            <TextField
              style={{
                font: "Source Serif Pro",
                marginTop: "30px",
                width: "100%",
              }}
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8E8E8E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8E8E8E",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#8E8E8E",
                },
              }}
              FormHelperTextProps={{
                style: {
                  color: "#343434",
                },
              }}
              className="modal-textfield"
              id="outlined-name"
              label="Update your name"
              type="text"
              name="name"
              value={accountDetails?.name || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          ) : (
            <TextField
              style={{
                font: "Source Serif Pro",
                marginTop: "30px",
                width: "100%",
              }}
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8E8E8E",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8E8E8E",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#8E8E8E",
                },
              }}
              FormHelperTextProps={{
                style: {
                  color: "#343434",
                },
              }}
              className="modal-textfield"
              id="outlined-email"
              label="Update your email"
              type="email"
              name="email"
              value={accountDetails?.email || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          )}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              style={{
                backgroundColor: "#343434",
                color: "#FFFFFF",
                height: "30px",
                width: "234px",
                font: "Source Serif Pro",
              }}
              className="modal-button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    
    </Dialog>
    </div>
  );
};

export default MyAccount;
