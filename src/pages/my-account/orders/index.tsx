import AccountLayout from "@/components/my-account/AccountLayout";
import React, { useEffect, useState } from "react";
import orderImg from "../../../../public/images/my-account/order_Icon.png";
import { Button, Dialog, DialogContent } from "@mui/material";
import { useAuth } from '@/auth-provider';
import coco from "../../../../public/images/productdetail-images/coco-1.jpg";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_PLACE_ORDERS } from "../../../helpers/query";
import blackBag from '../../../assets/scss/pages/blackbag.png';



const MyOrder: React.FC<any> = () => {
  const [viewOrder, setViewOrder] = useState<any>([]);
  const [viewDetils, setViewDetils] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();



  const [ refetOrders, { loading: loadingOrder, error: orderError, data: orders, refetch: refetord },] = useLazyQuery(GET_PLACE_ORDERS);
console.log(orders,"orders");

  useEffect(() => {
   if (user) {
     
      refetOrders({ variables: { user: user?.id } });
    }
    refetord()
  }, [user,orders]);


const orderView = (data: any) => {

    setViewOrder(data);
    setViewDetils(true)
  };

  const handleBack = () => {
    setViewDetils(false)


  }

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div>
      {viewDetils ?
        (
          <div>
            <div className="order-summary">
              <AccountLayout>
                <div
                  className={`order ${viewOrder == null ? "order" : "order-hide"}`}
                >
                  <p className="my-account-heading fonts">My Orders</p>
                  <div className="my-account-body">
                    <div className="my-order_summary">
                      <div className="order-summary_head">
                        <div className="summary-head_details">
                          <div className="summary-content">
                            <div className="summary-content_details">

                              <img src="../images/arrow.jpg" alt="" onClick={handleBack} />

                              <p className="fonts">{viewOrder?.id.split("-")[0]}</p>
                              <p
                                className={`my-order-fonts ${viewOrder?.status == "Pending"
                                  ? "order-shipping"
                                  : "order-delivered"
                                  }`}
                              >
                                {viewOrder?.status || "Unknown Status"}
                              </p>
                            </div>

                            <p className="order-summary-fonts order-time">
                              {`Placed on: ${viewOrder?.created_at
                                ? new Intl.DateTimeFormat('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true,
                                }).format(new Date(viewOrder?.created_at))
                                : "N/A"
                                }`}
                            </p>


                          </div>
                        </div>
                        <p className="my-order-fonts">
                              <span className="my-order-quantity">{viewOrder.mst_booked_products.length}</span> Items in this order
                            </p>
                        {viewOrder.mst_booked_products.map((item: any) => (
                          <div className="summary-head_orders" key={item.id}>
                           
                            <div className="summary-header">
                              {item?.mst_products?.map((val: any) => (
                                <div className="head-orders" key={val.id}>
                                  <div className="head-orders_right">
                                    <img src={val.image} alt="image" />
                                    <div className="head-orders_right-details">
                                      <p className="my-order-fonts">{val.name}</p>
                                      {/* <p className="order-summary-fonts summary-color">{val.quantity}</p> */}
                                    </div>
                                  </div>
                                  <div className="head-orders_left-details">
                                    <p className="order-summary-fonts">{item?.sub_total}</p>
                                    {/* Uncomment if needed */}
                                    <p className="order-summary-fonts summary-color selling-price">{val.selling_price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AccountLayout>

              <div className="order-summary_body">
                <div className="order-summary_bill">
                  <p className="order-summary_bill-detail fonts">Bill Details</p>
                  <div className="sub-total">
                    <p className="my-order-fonts">Sub Total </p>
                    <div className="sub-total-price">
                      {/* <p className="my-order-fonts summary-color original-price">
                        ₹2200
                      </p> */}
                      <p className="my-order-fonts summary-green">₹{viewOrder?.total}</p>
                    </div>
                  </div>
                  <div className="delivery-fee">
                    <p className="my-order-fonts">Delivery Fee</p>
                    <p className="my-order-fonts summary-color">₹0</p>
                  </div>
                  <div className="grand-total">
                    <p className="my-order-fonts">Grand Total</p>
                    <p className="my-order-fonts summary-green">₹ {viewOrder?.total}</p>
                  </div>
                </div>
                <div className="order-summary_foot">
  <p className="fonts summary-foot_order">Order Details</p>
  <div className="summary-foot_flex">
    {/* First Order Details */}
    <div className="summary-foot_details">
      <div className="">
        <p className="my-order-fonts">Order id</p>
        <p className="order-summary-fonts summary-color">
          {viewOrder?.id.split("-")[0]}
        </p>
      </div>
     
      <div className="">
        <p className="my-order-fonts">Payment :</p>
        <p className="order-summary-fonts summary-color">
          {viewOrder?.payment_type}
        </p>
      </div>
      
      <div className="">
        <p className="my-order-fonts">Delivered to :</p>
        <p className="order-summary-fonts summary-color">
          {viewOrder?.userAddress?.address}, {viewOrder?.userAddress?.city}, {viewOrder?.userAddress?.pincode}
        </p>
      </div>
      <div className="">
        <p className="my-order-fonts">Order Placed :</p>
        <p className="order-summary-fonts summary-color">
          {/* <p className="order-summary-fonts order-time"> */}
            {`Placed on: ${viewOrder?.created_at
              ? new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                }).format(new Date(viewOrder?.created_at))
              : "N/A"
            }`}
          {/* </p> */}
        </p>
      </div>
    </div>
    {viewOrder?.tracking_id ? (
  // Second Order Details
  <div className="summary-foot_details">
    <p className="my-order-fonts">Tracking id</p>
    <p className="order-summary-fonts summary-color">
      {viewOrder?.tracking_id}
    </p>
    
    <div className="">
      <p className="my-order-fonts">Payment :</p>
      <div className="order-summary-fonts summary-color">
        {viewOrder?.tracking_image ? (
          <img
            src={viewOrder.tracking_image}
            alt="Order Tracking"
            style={{
              width: '100px',
              height: '100px', 
              objectFit: 'cover', 
              borderRadius: '5px', 
            }}
            onClick={handleImageClick}
            
          />
        ) : (
          <p>No Tracking Image Available</p>
        )}
      </div>
    </div>
  </div>
) : (
  <div>
    {/* Placeholder for when tracking ID is not available */}
  </div>
)}

  </div>
</div>

              </div>
            </div>
          </div>
        ) : (
          <AccountLayout>
            <div className="order">
              <p className="my-account-heading fonts">My Orders</p>
              <div className="my-account-body">
                <div className="my-orders">
                  {orders?.mst_bookings?.map((data: any) => (
                    <div className="my-orders_details" key={data.id}>
                      <div className="order-content">
                      <img src={blackBag.src} alt="icon" />
                        <div className="order-content_details">
                          <p className="my-order-fonts">
                            {data?.id.split("-")[0]}

                            <span className="my-order-price">₹{data?.total}</span>  </p>
                          <p className="order-summary-fonts summary-time">
                            {`Placed on: ${data?.created_at
                              ? new Intl.DateTimeFormat('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true,
                              }).format(new Date(data.created_at))
                              : "N/A"
                              }`}
                          </p>

                        </div>
                        <p
                          className={`my-order-fonts ${data?.status == "Pending"
                            ? "order-shipping"
                            : "order-delivered"
                            }`}
                        >
                          {data?.status || "Unknown Status"}
                        </p>
                      </div>
                      <Button
                        className="order-view"
                        variant="outlined"
                        onClick={() => orderView(data)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </AccountLayout>
        )
      }
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogContent>
          <img
            src={viewOrder?.tracking_image}
            alt="Order Tracking Large"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MyOrder;
