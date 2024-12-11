import { useAuth } from '@/auth-provider';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { categoryRequestAction } from '@/services/action/productAction';
import { RootState } from '@/services/reducers';
import { useRouter } from 'next/router';
import { categoryIdAction } from '@/services/action/cartAction';
import logoImg from '../../../public/images/Sraees/footer_logo.png';
import phone from '../../../public/images/Sraees/footer_phone.png';
import email from '../../../public/images/Sraees/footer_mail.png'
import visa from '../../../public/images/Sraees/visa.png'
import masterCard from '../../../public/images/Sraees/masterCard.png'
import payPal from '../../../public/images/Sraees/paypal.png'
import razorpay from '../../../public/images/Sraees/razropay.png';
import upi from '../../../public/images/Sraees/upi.png'
import Link from 'next/link';




const Footer: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        dispatch(categoryRequestAction({})); // Dispatch action to fetch categories
    }, [dispatch]);

    const { categorys, products, loading, itemsPerPage, error } = useSelector((state: RootState) => state.product);
    const filterTitles = ["Best Seller", "Trending Products", "Feature Products"];

    const handleCategoryClick = (category: string) => {
        dispatch(categoryIdAction(category));
        router.push(`/products`);
    };


    return (
        <footer>
            <div className="footer ">
                <div className="container">
                    {/* <img className='footer_logo' src={logoImg.src} alt="Logo" /> */}
                    <div className="footer_inner">
                        <div className="footer_useful">
                            <h4 className="footer_heading" >Quick Links</h4>
                            <ul className="footer_content">
                                {filterTitles.map((title, index) => (
                                    <li key={index} onClick={(e) => handleCategoryClick(title)}>{title}</li>

                                ))}
                            </ul>
                        </div>

                        <div className="footer_category">
                            <h4 className="footer_heading">Categories</h4>
                            <div className="footer_items">
                                <div>
                                    <ul className="footer_content">
                                        {categorys.map((value: any, index: number) => (
                                            <li onClick={() => handleCategoryClick(value?.id)} key={index}>{value.category}</li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div className='footer_abouts'>
                            <div className="footer_useful">
                                <h4 className="footer_heading" >About Karthika’s Saree Paradise</h4>
                                <p>your destination for exquisite sarees that
                                    blend timeless tradition with modern elegance.
                                    Discover the perfect drape for every
                                    occasion and celebration.</p>

                            </div>

                            <div className="footer_useful">
                                <h4 className="footer_heading" >Supported Payments</h4>
                                <div className='footer_payment'>
                                    <img src={visa.src} alt="payment" />
                                    <img src={masterCard.src} alt="payment" />
                                    <img src={payPal.src} alt="payment" />
                                    <img src={razorpay.src} alt="payment" />
                                    <img src={upi.src} alt="payment" />

                                </div>

                            </div>
                        </div>

                        <div className="footer_contactus">
                            <h4 className="footer_heading" >Contact us</h4>
                            <ul className="footer_follower">
                                <li className="footer_followList">
                                    <img className='footer_contact-img' src={phone.src} alt='' />
                                    <p>+91 9876543210</p>
                                </li>
                                <li className="footer_followList">
                                    <img className='footer_contact-img' src={email.src} alt='' />
                                    <p>karthikacollections2174@gmail.com</p>
                                </li>

                            </ul>
                        </div>

                        <div className="footer_follow">
                            <h4 className="footer_heading" >Follow us on</h4>
                            <div className="footer_follower">
                                <Link href="" passHref className="footer_followList">
                                    <img src="/images/fb-icon.png" />
                                    <p>Facebook</p>
                                </Link>
                                <Link href="" passHref className="footer_followList">
                                    <img src="/images/ig-icon.png" />
                                    <p>Instagram</p>
                                </Link>
                                <Link href="" passHref className="footer_followList">
                                    <img src="/images/threads-icon.png" />
                                    <p>Threads</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer; 