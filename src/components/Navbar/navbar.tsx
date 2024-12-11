import React, { useEffect, useState } from "react";
import { Modal, Drawer } from "@mui/material";
import Cart from "../cart/cart";
import Link from "next/link";
import { useAuth } from "@/auth-provider";
import AuthModal from "../Auth/authmodal";
import { AppDispatch } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { cartOpenAction, initialCartRequest } from "@/services/action/cartAction";
import meerchikalogo from "../../../public/images/meerchikalogo.svg";
import searchIcon from "../../../public/images/Sraees/searchIcon.svg";
import profileIcon from "../../../public/images/Sraees/profileIcon.svg";

import cartIcon from "../../../public/images/Sraees/cartIcon.svg";
import { useRouter } from "next/router";
import { RootState } from "@/services/reducers";

const Navbar: React.FC = () => {
  const { user } = useAuth() || { user: null };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [authModule, setAuthModule] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { item,cartOpen } = useSelector((state: RootState) => state.cart);

  const quickLinks = ["Categories", "Feature Products", "Best Seller", "Top Offers"]
  const [count, setCount] = useState<number>()
  const router = useRouter()
  const handleOpen = () => {
    if (user) {
      router.push('/my-account')
    }
    else {
      setAuthModule(true);
    }
  };

  const handleClose = () => {
    setAuthModule(false);
  };

  const handleDrawer = () => {
   dispatch(cartOpenAction(true));
   setOpen(cartOpen);
  
  };

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    if (user) {
      dispatch(initialCartRequest(user.id));
    }
  }, [user])
  return (

    <>
    <div className="container">
      <div className="navbar">
        <div className="navbar_icon">
        <Link href="/">
  <img src={meerchikalogo.src} height="90px" width="90px" alt="Grocery Icon" />
</Link>

        </div>

        {/* <div className="navbar_search">
          <div className="navbar_search_inner">
            <img
              src="/images/search-icon.png"
              alt="Search Icon"
              className="navbar_search_icon"
            />
            <input
              type="text"
              className="navbar_search_input"
              placeholder="Search"
              onChange={handelChange}
            />
          </div>
        </div> */}

        <div className="nav_icon">
          {/* <img src={searchIcon.src} alt="search" /> */}
          <img src={profileIcon.src} alt="profile" onClick={handleOpen} />
          {/* <img src={likeIcon.src} alt="like" /> */}
          <img src={cartIcon.src} alt="cart" onClick={handleDrawer} />
        </div>
        {
          item.length ? (
            <div className="cart_count">
              <span>{item.length}</span>
            </div>
          ) : (
            <></>
          )
        }







        <Modal
          open={authModule}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <AuthModal onClose={handleClose} />
        </Modal>

        <Drawer open={cartOpen} anchor="right" sx={{
          "& .MuiDrawer-paper": {
            width: "500px", 
          },
        }}>
          <Cart />

        </Drawer>
      </div>

    </div>
      {/* <ProductDetail setOpen={setOpen} /> */}
    </>
  );
};

export default Navbar;
