import AccountLayout from "@/components/my-account/AccountLayout";
import { Button, colors, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import dots from "../../../../public/images/my-account/black-dots.svg";
import edit from "../../../../public/images/edit-icon.jpg";
import del from "../../../../public/images/my-account/delete-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/auth-provider";
import { deleteAddressRequest, fetchUserAddressRequest } from "@/services/action/addressAction";
import NewAddress from "@/components/cart/addAddress";
import accountEdit from '../../../../public/images/Sraees/accountEdit.png'
import locationImg from '../../../../public/images/Sraees/location.svg';

interface AddressType {
  id: string;
  mobile: string;
  state: string;
  user: string;
  email: string;
  city: string;
  address: string;
  landmark: string;
  save_address_as: string;
  name: string;
  pincode: string; // Add the missing property
}

const MyAddress: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addressData, setAddressData] = useState<AddressType | null>(null);
  const { addresses } = useSelector((state: any) => state.address);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserAddressRequest(user.id));
    }
  }, [dispatch, user?.id]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setAddressData(null);
    setOpenIndex(null);
  };

  const handleOpen = (index: number) => {
    setOpenIndex(index);
  };

  const addressDelete = (index: number) => {
    setDeleteIndex(index);
    setOpenIndex(index);
  };

  const addressCancel = () => {
    setDeleteIndex(null);
  };

  const addressDeleteConfirm = (index: number) => {
    if (addresses[index]) {
      dispatch(deleteAddressRequest(addresses[index].id));
    }
    setDeleteIndex(null);
  };

  const handleAddressTypeChange = (newType: string) => {
    console.log('Selected address type:', newType);
  };

  const handleEdit = (index: number) => {
    setOpenIndex(index);
    setAddressData(addresses[index]);
    handleDrawerOpen();
  };


  return (
    <>
      <AccountLayout>
        <div className="my-address">
          <div className="my-address-head my-account-heading">
            <p className="fontes">My Addresses</p>
            <Button
  style={{ color: 'blue' }}
  className="my-address-head-add fonts"
  onClick={handleDrawerOpen}
  disableRipple
>
  + Add New Addresses
</Button>

          </div>
          <div className="my-account-body">
            <div className="my-address-body">
              {addresses.length > 0 ? (
                addresses.map((address: AddressType, index: number) => (
                  <div className="my-address_contents" key={address.id}>
                    <div className="my-address_content">
                    <img
                      src={locationImg.src}
                      alt={address.save_address_as}
                    width={40}
                    height={38}
                    />

                    <div>
                      <p className="address-save">{address.save_address_as}</p>
                    <p className="address-new">
                        {address.address}, {address.city},{address.pincode}
                      </p>
                    </div>
                    </div>
                    {openIndex !== index && (
                      <Button onClick={() => handleOpen(index)} disableRipple>
                        <img
                          className="my-address_contents-img"
                          src={dots.src}
                          alt="img"
                        />
                      </Button>
                    )}
                    {openIndex === index && (
                      <div className="my-address_contents-btn">
                        <Button className="btn1 my-address-fonts" onClick={() => handleEdit(index)}>
                        <img src={accountEdit.src} alt="edit-icon" />
                        Edit
                        </Button>
                        <Button
                          className="btn2 my-address-fonts"
                          onClick={() => addressDelete(index)}
                        >
                          <img src={del.src} alt="delete-icon" />
                          Delete
                        </Button>
                      </div>
                    )}
                    {deleteIndex === index ? (
                      <div className="my-address_delete">
                        <p className="my-address-fonts">
                          Are you sure you want to delete this address?
                        </p>
                        <div className="my-address_delete-btn">
                          <Button
                            className="my-address-fonts delete-btn"
                            onClick={() => addressDeleteConfirm(index)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={addressCancel}
                            className="my-address-fonts cancel-btn"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <p>No addresses available</p>
              )}
            </div>
          </div>
        </div>
      </AccountLayout>
      <Drawer open={drawerOpen} sx={{
        "& .MuiDrawer-paper": {
          width: "500px", // Set your desired width
        },
      }} onClose={handleDrawerClose} anchor="right">
        <NewAddress
          closeAddress={handleDrawerClose}
          onAddressTypeChange={handleAddressTypeChange}
          addressToEdit={addressData || undefined}

        />
      </Drawer>
    </>
  );
};

export default MyAddress;
