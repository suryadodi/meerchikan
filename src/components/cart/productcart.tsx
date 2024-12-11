import { useAuth } from "@/auth-provider";
import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from "@/services/action/cartAction";
import { RootState } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ProductcartProps {
  url: string;
  name: string;
  count: number;
  id: string;
  quantity: number;
  price: number;
  originalPrice: number;
  offered_price: number;
  selling_price: number;
  savedPrice: number;
}



const Productcart: React.FC<ProductcartProps> = ({ url, name, count, id, quantity, price, originalPrice, offered_price, selling_price, savedPrice }) => {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();

  const handleIncrement = (val: any) => {
    dispatch(increaseItemQuantity(val, user?.id, offered_price, selling_price))

  };

  const handleDecrement = (data: any, val: number) => {
    dispatch(decreaseItemQuantity(data, user?.id, val, offered_price, selling_price))

  }

  const handleDelete = (value: any) => {
    dispatch(removeItemFromCart(value, user?.id))

  }
  // const totalPrice=count*fixedPrice

  return (
    <>
      <div className="cart_product" key={id}>
        <div className="cart_product-img" >
          <img className="cart_product-coke" src={url} alt="coke" />
        </div>
        <div className="cart_product-body">
          <div className="cart_product-inner">
            <div className="cart_product-leftcontent">{name}
            </div>
            {/* <div className="cart_product-rightcontent">
                      <p> {count} x {quantity}</p>
                    </div> */}
          </div>
          <div className="cart_product-inner">
            {/* <div className="cart_product-leftoffer">{quantity} - 30% off 
                    </div>
                    <div className="cart_product-rightoffer"> ₹{count*originalPrice}<br/>
                    <span className="cart_product-saveprice">Saved:</span><span className="cart_product-price">{savedPrice}</span>
                    </div> */}
            <div className="cart_product-leftoffer">Size: One Size</div>
          </div>
          <div className="cart_product-inner">
            <h4 className="cart_product-offerprice">
            <span className="cart_product-totalprice">{count*selling_price}</span> ₹{price}<span className="cart_product-offer">50% OFF</span>
            </h4>
          </div>
          <div className="cart_product-inner">
            <div className='cart_product-clickaction'>
              <button className='cart_product-countbutton' onClick={() => handleDecrement(id, count)}>-</button>
              <span className='cart_product-clickcount'>{count}</span>
              <button className='cart_product-countbutton' onClick={() => handleIncrement(id)}>+</button>
            </div>
          </div>
        </div>
        <div className="cart_product-cancel" onClick={() => handleDelete(id)} >
          &times;
        </div>
      </div>
    </>
  );
};
export default Productcart