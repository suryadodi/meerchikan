import { RootState } from '@/services/reducers';
import {
  Button,
  colors,
  Drawer,
} from '@mui/material';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; // Example icon
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import sha256 from "crypto-js/sha256";
import { CREATE_BOOKING_PRODUCT, BOOKED_PRODUCT, DELETE_CART_ITEM } from '../../helpers/mutation';
import { useMutation } from '@apollo/client';
import { useAuth } from '@/auth-provider';
import { log } from 'console';
import Address from '@/components/cart/addresss';
import { AppDispatch } from '@/services/store';
import { initialCartRequest } from '@/services/action/cartAction';
import { fetchUserAddressRequest } from '@/services/action/addressAction';



const CartProducts: React.FC<any> = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { item, total } = useSelector((state: RootState) => state.cart);
  const router = useRouter()
  const [createBooking, { loading: createLoading, error: createError, data: createData }] = useMutation(CREATE_BOOKING_PRODUCT, {
    errorPolicy: 'all',
  });
  const [bookedProduct, { loading: bookedLoading, error: bookedError, data: bookedData }] = useMutation(BOOKED_PRODUCT, {
    errorPolicy: 'all',
  });
  const [clearCartItems, { data: clearCart }] = useMutation(DELETE_CART_ITEM, {
    errorPolicy: 'all',
  }); const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { addresses, selectedAddress } = useSelector((state: RootState) => state.address);

  console.log(addresses, "addresses");
  console.log(selectedAddress, "selectedAddress");


  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  // Function to calculate row total
  const calculateRowTotal = (originalPrice: number, quantity: number): number => {
    return originalPrice * quantity;
  };
  const columns = [
    { title: 'S.No', dataIndex: 'sno', key: 'sno' },
    { title: 'Product Name', dataIndex: 'product_name', key: 'product_name' },
    { title: 'Price', dataIndex: 'offered_price', key: 'price' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quanity' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
  const microseconds = `${milliseconds}000`.slice(0, 6);
  const formattedDate = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${microseconds}`;


  const clearCartItem = async (res: any) => {
    try {
      if (!user?.id) {
        console.error("User ID is missing. Cannot clear cart items.");
        return;
      }
      const payload = {
        user_id: user?.id
      }

      const response = await clearCartItems({ variables: payload }).then((res) => {
        dispatch(initialCartRequest(user.id));
        router.push('/my-account/orders')
      });

    } catch (error) {
      console.error("Error clearing cart items:", error);
    }
  };

  const paymentGetWay = async (req: any) => {

    const bookingResponse = await createBooking({ variables: req })
    
      .then(async (res: any) => {
        console.log("res.data.insert_mst_bookings.returning",res.data.insert_mst_bookings.returning)
        const bookingID = res.data.insert_mst_bookings.returning.map((value: any) => value.id);
        console.log(`Booking product stored successfully in the table.`);

        for (const value of item) {
          const payload = {
            sub_total: value.price,
            quantity: value.quantity,
            booking_id: bookingID[0],
            product: value.product_id,
            attributes: [],
            coupon_price: null,
            saved_price: null,
            paid_price: null,
          };

          // Booked the product
          const bookedResponse = await bookedProduct({ variables: payload }).then((res: any) => {
console.log(payload,"booked response")
            clearCartItem(res)
          }).catch((error: any) => error)
        }
      }).catch((error) => {
        return error
      })

  }

  const handlePayment = async () => {
    setLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: 'Karthika Sarees',
      description: 'Test Transaction',

      handler: async function (response: any) {
        // alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

        try {
          const req = {
            status: "Pending",
            payment_type: "Razorpay",
            total: total,
            address: selectedAddress?.id || addresses[0]?.id,
            customer: user.id,
            coupon_code: null,
            coupon_used: null,
            created_at: formattedDate,
          };

          let response = await paymentGetWay(req)
        } catch (error) {
          console.error("An error occurred:", error);
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '6381583562',
      },
      theme: {
        color: 'rgb(83, 144, 213)',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  // const initiatePayment = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/phonepe/initiatePayment', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         amount: total,
  //         orderId: `ORDER-${Date.now()}`,
  //         customerPhone: '9876543210',
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       alert('Payment initiation success')
  //       const redirect = data.data.instrumentResponse.redirectInfo.url;
  //       router.push(redirect);
  //       alert('Payment completed success')


  //     } else {
  //       alert('Payment initiation failed');
  //     }
  //   } catch (error) {
  //     console.error('Error initiating payment:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log("Addresses in Redux:", addresses); // Check the addresses here

    if (addresses && addresses.length > 0) {
      console.log("User address:", addresses[0]);  // Log the first address
    }
  }, [addresses]); // Ensure this runs when the `addresses` state updates

  useEffect(() => {
    if (user) {
      dispatch(initialCartRequest(user.id));
      dispatch(fetchUserAddressRequest(user.id));
    }
  }, [user, dispatch]);

  const handleAddressSelection = (address: any) => {
    // Logic to update selected address (assume a Redux action or local state update)
    dispatch({
      type: 'SET_SELECTED_ADDRESS',
      payload: address,
    });

    // Close the drawer
    closeDrawer();
  };



  return (
    <>
      <div className='address'>
        <div className="address_detials">
          <div>
            {selectedAddress ? (
              <p>{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.landmark},{selectedAddress.pincode}</p>
            ) : (
              addresses.length > 0 && <p>{addresses[0]?.address},{addresses[0]?.city},{addresses[0]?.landmark},{addresses[0]?.pincode}</p>
            )}
          </div>

          <div>
            <button onClick={showDrawer} className='address-btn'>Change Address</button>
          </div>
        </div>
      </div>
      <div className='product-list'>
      <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        {columns.map((col: any) => (
          <TableCell key={col.key}>{col.title}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {item.length > 0 ? (
        item.map((row: any, index) => (
          <TableRow key={index}>
            {columns.map((col: any) => (
              <TableCell key={col.key}>
                {col.dataIndex === 'sno'
                  ? index + 1 // Serial number
                  : col.dataIndex === 'total'
                  ? calculateRowTotal(row.offered_price, row.quantity)
                  : row[col.dataIndex]}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={5}>
              <SentimentDissatisfiedIcon style={{ fontSize: '48px', color: '#888' }} />
              <Typography variant="h6" style={{ marginTop: '10px', color: '#888' }}>
                No data available
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

        <div className="total">
          <button className='payment_btn' onClick={handlePayment}>
            Pay
          </button>

          {/* <button className='payment_btn' onClick={initiatePayment} disabled={loading}>
            {loading ? 'Processing...' : 'Pay with PhonePe'}
          </button> */}
          <p className='full-total'>
            ₹ {total}
          </p>
        </div>
        <Drawer
          anchor="right"
          open={isDrawerVisible}
          onClose={closeDrawer}
        >
          <div style={{ width: 500 }}>
            <Address close={closeDrawer} onSelectAddress={handleAddressSelection} />
          </div>
        </Drawer>

      </div>

    </>
  )
}

export default CartProducts;