import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { auth } from "../config/firebase_config";
import { persistor } from "@/services/store";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;
  const handleLogOut = async () => {
    try {
      await auth.signOut(); 
      persistor.pause();
      await persistor.purge();  
      window.location.href = "/";
    } catch (error: any) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="container">
    <div className="account-layout">
      <div className="account-layout-head">
        <div className="account-layout-head-btn" >
         
        <Link  href="/">
        <img src="../images/arrow.jpg" alt="" />
          </Link>
         
         
        </div>
        <p>Account</p>
      </div>
      <div className="account-layout_body">
        <div className="account-layout_navbar">
          <div className="account-layout_navbar-head">
            <div className="account-layout_navbar-head-link">
              <p
                className={`${
                  isActive("/my-account") ? "active-link" : "inactive-link"
                }`}
              ></p>
              <Link
                href="/my-account"
                className={`link fonts ${
                  isActive("/my-account") ? "active" : ""
                }`}
              >
                My Account
              </Link>
            </div>
            <div className="account-layout_navbar-head-link">
              <p
                className={`${
                  isActive("/my-account/address")
                    ? "active-link"
                    : "inactive-link"
                }`}
              ></p>
              <Link
                href="/my-account/address"
                className={`link fonts ${
                  isActive("/my-account/address") ? "active" : ""
                }`}
              >
                My Address
              </Link>
            </div>
            <div className="account-layout_navbar-head-link">
              <p
                className={`${
                  isActive("/my-account/orders")
                    ? "active-link"
                    : "inactive-link"
                }`}
              ></p>
              <Link
                href="/my-account/orders"
                className={`link fonts ${
                  isActive("/my-account/orders") ? "active" : ""
                }`}
              >
                My Orders
              </Link>
            </div>
          </div>

          <button className="fonts account-layout_navbar-btn" onClick={handleLogOut}>Log out</button>
        </div>
        <div className="account-layout_content">{children}</div>
      </div>
    </div>
    </div>
  );
};

export default AccountLayout;
