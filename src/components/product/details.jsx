import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductImages from "./ProductImages.jsx";
import ProductStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/details-skeleton.jsx";
import parse from "html-react-parser";
import Reviews from "./reviews.jsx";
import CartStore from "../../store/CartStore.js";

const Details = () => {
    const { ProductDetails, ReviewList } = ProductStore();
    const { CartForm, CartFormChange, CartSaveRequest, CartListRequest } = CartStore();
    const [Quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("Speci");

    // Quantity ইনক্রিমেন্ট এবং ডিক্রিমেন্ট
    const QuantityIncrement = () => {
        const newQuantity = Quantity + 1;
        setQuantity(newQuantity);
        CartFormChange("qty", newQuantity); // CartForm-এ Quantity আপডেট করুন
    };

    const QuantityDecrement = () => {
        if (Quantity > 1) {
            const newQuantity = Quantity - 1;
            setQuantity(newQuantity);
            CartFormChange("qty", newQuantity); // CartForm-এ Quantity আপডেট করুন
        }
    };

    // কার্টে প্রোডাক্ট যোগ করুন
    const AddToCart = async (productID) => {
        let res = await CartSaveRequest(CartForm, productID);
        if (res) {
            await CartListRequest(); // কার্ট লিস্ট রিফ্রেশ করুন
        }
    };

    // টাব পরিবর্তন করুন
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // প্রোডাক্ট ডিটেইলস লোড না হলে সkeleton দেখান
    if (ProductDetails === null) {
        return <DetailsSkeleton />;
    }

    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-7 p-3">
                        <ProductImages />
                    </div>
                    {ProductDetails.map((item) => (
                        <div key={item["_id"]} className="col-md-5 p-3">
                            <h4>{item["title"]}</h4>
                            <p className="text-muted bodySmal my-1">
                                Category: {item["category"]["categoryName"]}
                            </p>
                            <p className="text-muted bodySmal my-1">
                                Brand: {item["brand"]["brandName"]}
                            </p>
                            <p className="bodySmal mb-2 mt-1">{item.shortDes}</p>

                            {item["discount"] ? (
                                <span className="bodyXLarge">
                                    <strike className="text-secondary">
                                        TK: {item["price"]}
                                    </strike>{" "}
                                    {item["discountPrice"]}
                                </span>
                            ) : (
                                <span className="text-secondary">{item["price"]}</span>
                            )}

                            <div className="row">
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Size</label>
                                    <select
                                        value={CartForm.size}
                                        onChange={(e) => {
                                            CartFormChange("size", e.target.value);
                                        }}
                                        className="form-control my-2 form-select"
                                    >
                                        <option value="">Size</option>
                                        {item["productdetail"]["size"]
                                            .split(",")
                                            .map((size, i) => (
                                                <option key={i} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Color</label>
                                    <select
                                        value={CartForm.color}
                                        onChange={(e) => {
                                            CartFormChange("color", e.target.value);
                                        }}
                                        className="form-control my-2 form-select"
                                    >
                                        <option value="">Color</option>
                                        {item["productdetail"]["color"]
                                            .split(",")
                                            .map((color, i) => (
                                                <option key={i} value={color}>
                                                    {color}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Quantity</label>
                                    <div className="input-group my-2">
                                        <button
                                            onClick={QuantityDecrement}
                                            className="btn btn-outline-secondary"
                                        >
                                            -
                                        </button>
                                        <input
                                            value={Quantity}
                                            type="text"
                                            className="form-control bg-light text-center"
                                            readOnly
                                        />
                                        <button
                                            onClick={QuantityIncrement}
                                            className="btn btn-outline-secondary"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <button
                                        onClick={async () => {
                                            await AddToCart(ProductDetails[0]["_id"]);
                                        }}
                                        className="btn w-100 btn-success"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                                <div className="col-4 p-2">
                                    <button className="btn w-100 btn-success">
                                        Add to Wish
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mt-3">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "Speci" ? "active" : ""}`}
                                id="Speci-tab"
                                onClick={() => handleTabChange("Speci")}
                                data-bs-toggle="tab"
                                data-bs-target="#Speci-tabpane"
                                type="button"
                                role="tab"
                                aria-controls="Speci-tab-pane"
                                aria-selected={activeTab === "Speci"}
                            >
                                Specifications
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "Review" ? "active" : ""}`}
                                id="Review-tab"
                                onClick={() => handleTabChange("Review")}
                                data-bs-toggle="tab"
                                data-bs-target="#Review-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="Review-tab-pane"
                                aria-selected={activeTab === "Review"}
                            >
                                Review
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div
                            className={`tab-pane fade ${activeTab === "Speci" ? "show active" : ""}`}
                            id="Speci-tab-pane"
                            role="tabpanel"
                            aria-labelledby="Speci-tab"
                            tabIndex="0"
                        >
                            {parse(ProductDetails[0]["productdetail"]["des"])}
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === "Review" ? "show active" : ""}`}
                            id="Review-tab-pane"
                            role="tabpanel"
                            aria-labelledby="Review-tab"
                            tabIndex="0"
                        >
                            <Reviews />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;