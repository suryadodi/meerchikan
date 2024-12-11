import { useAuth } from "@/auth-provider";
import Cart from "@/components/cart/cart";
import {
  addToCartRequest,
  cartOpenAction,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "@/services/action/cartAction";
import {
  productDetailRequestAction,
  productRequestAction,
} from "@/services/action/productAction";
import { RootState } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
import { Filter } from "@mui/icons-material";
import { Button, Drawer } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail: React.FC<any> = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { slug } = router.query;
  const { productDetail } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const { id, name, image, quantity, offered_price, selling_price, price } =
    productDetail;
  const [filterImage, setFilterImage] = useState([]);
  // const [getProduct, setGetProduct] = useState<any>({});
  useEffect(() => {
    dispatch(productDetailRequestAction(slug, user?.id));
  }, [slug, user]);

  const produc = Array(5).fill(image);

  const policy = [
    {
      url: "../images/productdetail-images/quality.png",
      heading: "Quality",
      para: "You can trust",
    },
    {
      url: "../images/productdetail-images/on-time.png",
      heading: "On Time",
      para: "Guarantee",
    },
    {
      url: "../images/productdetail-images/return.png",
      heading: "Return Policy",
      para: "No question asked",
    },
  ];

  const units = [
    { quantity: "250 ml", rate: 50, mrp: 80 },
    { quantity: "2 x 250 ml", rate: 100, mrp: 160 },
    { quantity: "4 x 250 ml", rate: 50, mrp: 80 },
  ];

  const displayImage = (data: any) => {
    const val: any = produc.filter((item: any, index: any) => index == data);
    setFilterImage(val);
    console.log(filterImage);
  };

  const handleAddClick = () => {
    const cartItem: any = {
      id,
      image,
      name,
      selectedQuantity: 1,
      selectedPrice: offered_price,
      quantity: 1,
      user_id: user?.id,
      offered_price,
      selling_price,
      price,
    };

    dispatch(addToCartRequest(cartItem));
    setTimeout(() => {
    dispatch(cartOpenAction(true));
      
    }, 500);
  };

  const handleIncrement = () => {
    dispatch(increaseItemQuantity(id, user?.id, offered_price,selling_price));
  };

  const handleDecrement = (val: number | null) => {
    dispatch(decreaseItemQuantity(id, user?.id, val, offered_price,selling_price));
  };


  return (
    <>
    <div className="container">
      <div className="one-product">
        <div className="product-detail">
          <div className="product-detail_side">
            <div className="product-detail_side-img">
              {/* {filterImage.length > 0 ? (
                filterImage.map((item: any, index: any) => (
                  <img key={index} src={item.url} alt="cocacola" />
                ))
              ) : ( */}
              <img src={image} alt="saree-img" />
              {/* )} */}
              <div className="product-detail_side-img-body">
                {produc?.map((value: any, index: any) => (
                  <img
                    key={index}
                    src={value}
                    alt="saree"
                    onClick={() => displayImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="product-detail_right">
            <div className="product-detail_right-head">
              <h1 className="product-detail_side-content-head content-head">
                {name}
              </h1>
              <div className="fonts product-detail_right-head-rate">
                <p>
                  MRP : <span>₹{selling_price}</span>
                </p>
              </div>
              <div className="product-detail_right-head-prices">
                <p className="original-price">
                  Price :<span>₹{offered_price}</span>
                </p>
                <p className="fonts offer">
                  You Save : <span>30% OFF</span>
                </p>
                <p className="all-taxes">(Inclusive of all taxes)</p>
              </div>
            </div>
            <div className="product-detail_right-body">
              <div className="detail-size"></div>
              <div className="detail-colors"></div>
               <div className="detail-cards">
                {quantity !== null && quantity > 0 ? (
                  <div className="card-clickaction">
                    <button
                      className="card-countbutton"
                      onClick={() => handleDecrement(quantity)}
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
                  <button className="detail-addCart" onClick={handleAddClick}>
                    Add to Cart
                  </button>
                )}
                {/* <button className="detail-whishlist">Add to Wishlist</button> */}
               </div>  
      

            </div>
            <div className="product-detail_right-foot">
              <p className="product-detail_right-foot-head">
                Why choose Karthika's Saree Paradise ?
              </p>
              {policy?.map((item: any, index: any) => (
                <div className="product-detail_right-foot-content" key={index}>
                  <img src={item.url} alt="image" />
                  <div className="product-detail_right-foot-body">
                    <p className="product-detail_right-foot-heading">
                      {item.heading}
                    </p>
                    <p className="product-detail_right-foot-para">
                      {item.para}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="product-detail_side-content">
          <p className="product-detail_side-content-head">Product Details</p>
          <div className="product-detail_side-content-para">
            <div className="details-div">
              <h3 className="fonts">Description</h3>
              <p>
                Drape yourself in luxury with the Golden Aura Party Wear Saree,
                a masterpiece crafted for elegance and sophistication. Perfect
                for weddings, receptions, and festive occasions, this saree
                combines traditional craftsmanship with modern glamour. The
                shimmering fabric and intricate embellishments will make you the
                center of attention at any event.
              </p>
            </div>
            <div className="details-div">
              <h3 className="fonts">Key features</h3>
              <table>
                <tr>
                  <td>Fabric:</td>
                  <td>Premium Georgette with metallic sheen.</td>
                </tr>
                <tr>
                  <td>Design: </td>
                  <td>Hand-embroidered sequins and zari work.</td>
                </tr>
                <tr>
                  <td>Color:</td>
                  <td>Gold with subtle rose undertones.</td>
                </tr>
                <tr>
                  <td>Occasion:</td>
                  <td>Perfect for parties, festive gatherings, and evening events.</td>
                </tr>
                <tr>
                  <td>Length:</td>
                  <td>6.5 meters (including blouse piece).</td>
                </tr>
                <tr>
                  <td>Care Instructions:</td>
                  <td>Dry clean only to maintain its shine and texture.</td>
                </tr>
               
              </table>
            </div>
           
            <div className="details-div">
              <h3 className="fonts">Manufacturer Details</h3>
              <ul>
                <li><span>Manufacturer Name:</span> Karthika Saree Creations Pvt. Ltd.</li>
                <li><span>Manufacturing Location:</span> xxx,yyy,zzz.</li>
                <li><span>Date of Manufacturing:</span> August 2024.</li>
                <li><span>Quality Assurance:</span> Tested and certified for durability, colorfastness, and premium fabric standards.</li>
                <li><span>Material Source:</span> Handpicked fabrics from trusted Indian textile mills.</li>
              </ul>
            </div>
            <div className="details-div">
              <h3 className="fonts">Additional Information:</h3>
             <ul>
              <li><span>Country of Origin:</span> India</li>
              <li><span>Packaging Details: </span>Packed in eco-friendly, reusable materials to ensure the product reaches you safely.</li>
             
             </ul>
            </div>
            <div className="details-div">
              <h3 className="fonts">Manufacturing Process:</h3>
              <ul>
                <li>Designed by skilled artisans.</li>
                <li>Handwoven with intricate detailing.</li>
                <li>Embellished with sequins and zari work using advanced craftsmanship techniques.</li>
              </ul>
            </div>
          
          </div>
        </div>
      </div>
      <Drawer open={open} anchor="right" sx={{
          "& .MuiDrawer-paper": {
            width: "500px", // Set your desired width
          },
        }}>
          <Cart closeCart={setOpen} />
        </Drawer>
      </div>
    </>
  );
};
export default ProductDetail;
