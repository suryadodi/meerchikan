import React, { useState } from "react";
import AddCardForm from "./cardform";
import CashForm from "./cashform";

const products = [
    { id: 1, name: "Coca Cola 250 ml (2)", price: 100, imgSrc: "/images/ccoco.png" },
    { id: 2, name: "Coca Cola 250 ml (2)", price: 100, imgSrc: "/images/capple.png" },
    { id: 3, name: "Coca Cola 250 ml (2)", price: 100, imgSrc: "/images/corange.png" },
    { id: 4, name: "Coca Cola 250 ml (2)", price: 100, imgSrc: "/images/ccoco.png" },
];

const PaymentMethod: React.FC<any> = () => {
    const [activeCategory, setActiveCategory] = useState("");
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [showCashForm, setShowCashForm] = useState(false);

    const handleCategoryClick = (category: any) => {
        setActiveCategory(category);

        if (category === "Add credit or debit card") {
            setShowAddCardForm(true);
        } else {
            setShowAddCardForm(false);
        }

        if (category === "Cash") {
            setShowCashForm(true);
        } else {
            setShowCashForm(false);
        }
    };

    return (
        <>
            <div className="paymethod">
                <div className="paymethod_title">
                    <img src="/images/backarrow.png" alt="Back Arrow" />
                    <h1>Select Payment method</h1>
                </div>
                
                <div className="paymethod_content">
                    <div className="paymethod_selection">
                        <div className="paymethod_categories">
                            <h2
                                className={activeCategory === "Wallets" ? "active" : ""}
                                onClick={() => handleCategoryClick("Wallets")}
                            >
                                Wallets
                            </h2>
                            <h2
                                className={activeCategory === "Add credit or debit card" ? "active" : ""}
                                onClick={() => handleCategoryClick("Add credit or debit card")}
                            >
                                Add credit or debit card
                            </h2>
                            <h2
                                className={activeCategory === "Net banking" ? "active" : ""}
                                onClick={() => handleCategoryClick("Net banking")}
                            >
                                Net banking
                            </h2>
                            <h2
                                className={activeCategory === "Add new UPI ID" ? "active" : ""}
                                onClick={() => handleCategoryClick("Add new UPI ID")}
                            >
                                Add new UPI ID
                            </h2>
                            <h2
                                className={`no-border ${activeCategory === "Cash" ? "active" : ""}`}
                                onClick={() => handleCategoryClick("Cash")}
                            >
                                Cash
                            </h2>
                        </div>
                        <AddCardForm visible={showAddCardForm} />
                        <CashForm visible={showCashForm} />
                    </div>
                    <div className="paymethod_cart">
                        <div className="paymethod_location">
                            <img src="/images/location.png" alt="Location" />
                            <div className="paymethod_locationdetails">
                                
                            </div>
                        </div>
                        
                        <div className="paymethod_items">
                                <h1>My Cart</h1>
                                <h1 className="paymethod_count">6 Items</h1>
                        </div>

                        <div className="paymethod_allproducts">
                            {products.map((product) => (
                                <div key={product.id} className="paymethod_products">
                                    <img src={product.imgSrc} alt={product.name} />
                                    <div className="paymethod_prolists">
                                        <h1>{product.name}</h1>
                                        <h1>₹ {product.price}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn">Pay Now</button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentMethod;

 