import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box, Drawer, FormControl } from '@mui/material';
import { addToCartRequest, decreaseItemQuantity, increaseItemQuantity } from '@/services/action/cartAction';
import { AppDispatch } from '@/services/store';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/auth-provider';
import { useRouter } from 'next/router';
import Cart from '../cart/cart';

const CardProduct: React.FC<any> = ({ item }) => {
  const { user } = useAuth();
  const { id, image, name, selling_price, attributes, quantity, offered_price, price } = item;
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedPrice, setSelectedPrice] = useState(price);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (attributes && Array.isArray(attributes)) {
      const kgAttribute = attributes.find((attr: any) => attr.keys === 'KG');
      const priceAttribute = attributes.find((attr: any) => attr.keys === 'price');

      if (kgAttribute && priceAttribute) {
        const defaultQuantity = kgAttribute.values[0];
        const defaultIndex = kgAttribute.values.indexOf(defaultQuantity);
        const defaultPrice = defaultIndex !== -1 ? priceAttribute.values[defaultIndex] : price;

        setSelectedQuantity(defaultQuantity);
        setSelectedPrice(defaultPrice);
      } else {
        setSelectedQuantity('1');
        setSelectedPrice(price);
      }
    } else {
      setSelectedQuantity('1');
      setSelectedPrice(price);
    }
  }, [attributes, price]);

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    
    setSelectedQuantity(selectedValue);

    if (attributes && Array.isArray(attributes)) {
      const kgAttribute = attributes.find((attr: any) => attr.keys === 'KG');
      const priceAttribute = attributes.find((attr: any) => attr.keys === 'price');

      if (kgAttribute && priceAttribute) {
        const selectedIndex = kgAttribute.values.indexOf(selectedValue);

        if (selectedIndex !== -1) {
          setSelectedPrice(priceAttribute.values[selectedIndex]);
          // dispatch(updateAttributes(id, selectedValue, priceAttribute.values[selectedIndex]));
        
        }
      }
    } else {
      setSelectedPrice(price);
    }
  };

  const dispatch: AppDispatch = useDispatch();

  const handleAddClick = () => {
    console.log(selectedQuantity, "selectedvalue");
    const cartItem: any = { id, image, name, selectedQuantity, selectedPrice, quantity: 1, user_id: user?.id, offered_price, selling_price, price };

    dispatch(addToCartRequest(cartItem));

  };
  const handleGo = (ide: any) => {
    router.push(`/productDetails/${ide}`)
  }

  const handleIncrement = () => {
    dispatch(increaseItemQuantity(id,user?.id,offered_price,selling_price));
  };

  const handleDecrement = (val:number|null) => {
    dispatch(decreaseItemQuantity(id,user?.id,val,offered_price,selling_price));
  };

  return (
    <div className='card' key={id}>
      <div className="card-main" onClick={() => handleGo(id)}>
        <div className='card-head'>
          <img src={image} width="100%" className='card-image' alt="." />

        </div>
        <div className='card-body'>
          <h2 className="card-title">{name}</h2>

          {/* <p className="card-leftcontent">
              {description}
            </p> */}
            <p  className='card-offer'>Price : <span className='card-offer-price'> ₹ { offered_price }</span> <span className='selling_price'> ₹ {selling_price}</span>
            </p>


        </div>
      </div>
      <div className="card-action">
        {/* <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select value={selectedQuantity} onChange={handleChange}>
                  {attributes
                    ?.filter((attribute: any) => attribute.keys === 'KG')
                    ?.map((attribute: any) =>
                      attribute.values.map((value: any) => (
                        <MenuItem className="card-menu" value={value} key={`${attribute.keys}-${value}`}>
                          {value}
                        </MenuItem>
                      ))
                    )}
                    {!attributes &&  (
                      <MenuItem className="card-menu" value="1" key="default-1">
                        1 KG
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </Box> */}

        {/* <div className="card-button">
              {quantity!==null && quantity>0 ? (
                <div className="card-clickaction">
                  <button
                    className="card-countbutton"
                    onClick={()=>handleDecrement(quantity)}
                  >
                    -
                  </button>
                  <span className="card-clickcount">{quantity}</span>
                  <button
                    className="card-countbutton"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className="btn" onClick={handleAddClick}>
                  <span className="card-btntext">Add</span>
                </button>
              )}
            </div> */}
        <div className="card-button">
          <button className="btn" >
            <span className="card-btntext" onClick={() => handleGo(id)}>View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
