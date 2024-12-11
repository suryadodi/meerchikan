import React, { useEffect, useState } from "react";
import Productcart from "./productcart";
import Address from "./addresss";
import { Button, Drawer, Modal } from "@mui/material";
import Navbar from "../Navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
import { cartOpenAction, initialCartRequest } from "@/services/action/cartAction";
import { useAuth } from "@/auth-provider";
import { useRouter } from "next/router";
import { fetchUserAddressRequest } from "@/services/action/addressAction";
import AuthModal from "../Auth/authmodal";

const Cart: React.FC<any> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [authModule, setAuthModule] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [addressMsg, setAddressMsg] = useState(false);

  const { addresses, selectedAddress } = useSelector(
    (state: RootState) => state.address
  );
  const { item, total, savedTotal,cartOpen } = useSelector(
    (state: RootState) => state.cart
  );
  const isCartEmpty = !item || item.length === 0;

  useEffect(() => {
    if (user) {
      dispatch(initialCartRequest(user.id));
      dispatch(fetchUserAddressRequest(user.id));
    }
  }, [user, dispatch, addressMsg]);


  const handleChangeAddress = () => {
    if (!user) {
      handleOpen(); // Open the login modal if no user is logged in
    }else {
      setOpenAddress(true); // Open the address selection modal if addresses are available
    }
  };

  const handleOff = () => {
    dispatch(cartOpenAction(false))
  };

  const handleAddressSelection = (address: any) => {
    dispatch({
      type: "SET_SELECTED_ADDRESS",
      payload: address,
    });
    setOpenAddress(false);
  };

  const handleProceed = () => {
    if (!user) {
      handleOpen(); // Call handleOpen if user is not logged in
    } else if (addresses.length < 1) {
      setAddressMsg(true);
    } else {
      dispatch(cartOpenAction(false))
      router.push("/cartproducts");
    }
  };

  const handleOpen = () => {
    setAuthModule(true); // Show auth modal if user is not logged in
  };

  const handleModalClose = () => {
    setAuthModule(false); // Close the modal
  };

  return (
    <>
      {cartOpen ? (
        <>
          {!openAddress ? (
            <div className="cart">
              <div className="cart-head">
                <p className="cart-title">My cart</p>
                <p className="cart-off" onClick={handleOff}>
                  &times;
                </p>
              </div>
              <hr className="cart-line" />
              <div className="cart-body">
                {isCartEmpty ? (
                  <p className="cart-emptycart">Your cart is empty</p>
                ) : (
                  <>
                    <p className="cart-total">Total Savings</p>
                    <p className="cart-total">₹{savedTotal}</p>
                  </>
                )}
              </div>
              <div className="cart-bodycontent">
                {!isCartEmpty &&
                  item?.map((data: any) => (
                    <Productcart
                      key={data.product_id}
                      url={data.image}
                      name={data.product_name}
                      count={data.quantity}
                      id={data.product_id}
                      quantity={data?.attributes?.prices?.selectedQuantity || 0}
                      originalPrice={data?.original_price}
                      price={data.price}
                      offered_price={data?.offered_price}
                      selling_price={data?.selling_price}
                      savedPrice={data?.saved_price}
                    />
                  ))}
              </div>
              {!isCartEmpty && (
                <>
                  <div className="cart-bill">
                    <h6 className="cart-billtitle">Bill Details</h6>
                    <hr className="cart-billline" />
                    <div className="cart-billcontent">
                      <p className="cart-billsub">Sub Total </p>
                      <p className="cart-billtotal">₹{total}</p>
                    </div>
                    <div className="cart-billcontent">
                      <p className="cart-billdelivery">Delivery Fee </p>
                      <p className="cart-billprice">₹0</p>
                    </div>
                    <hr />
                    <div className="cart-billcontent">
                      <p>Grand Total</p>
                      <p className="cart-billprice">₹{total}</p>
                    </div>
                  </div>

                  <div className="cart-delivery">
                    <div className="cart-deliveryimage">
                      <img src="/images/location.jpg" alt="location" />
                    </div>
                    <div>
                      <div className="cart-deliverylocation">
                        {(selectedAddress && selectedAddress.save_address_as) ||
                        (addresses &&
                          addresses[0] &&
                          addresses[0].save_address_as) ? (
                          <h2>
                            Delivering to
                            {selectedAddress && selectedAddress.save_address_as
                              ? ` ${selectedAddress.save_address_as}`
                              : ` ${addresses[0].save_address_as}`}
                          </h2>
                        ) : null}
                        <p className="cart-deliverycontent">
                          {selectedAddress
                            ? `${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.landmark}, ${selectedAddress.pincode}`
                            : addresses && addresses.length > 0
                            ? `${addresses[0]?.address}, ${addresses[0]?.city}, ${addresses[0]?.landmark}, ${addresses[0]?.pincode}`
                            : "Address Not Available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {addressMsg && (
                    <p className="address-error"> *Please give your Address</p>
                  )}

                  <div>
                    <button
                      onClick={handleChangeAddress}
                      className="cart-addressbutton"
                    >
                      {addresses && addresses.length > 0
                        ? "Change Address"
                        : "Add New Address"}
                    </button>
                  </div>
                  <div>
                    <button className="btn">
                      <div>
                        <p className="cart-deliverytotal">Total</p>
                        <p className="cart-deliveryprice">₹{total}</p>
                      </div>
                      <div
                        className="cart-deliveryproceed"
                        onClick={handleProceed}
                      >
                        Proceed
                        <img
                          className="cart-deliveryproceedimg"
                          src="/images/arrow.png"
                          alt="location"
                        />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Address
              close={setOpenAddress}
              onSelectAddress={handleAddressSelection}
            />
          
          )}
        </>
      ) : (
        <Navbar />
      )}

      {/* Auth Modal */}
      <Modal
        open={authModule}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <AuthModal onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default Cart;
