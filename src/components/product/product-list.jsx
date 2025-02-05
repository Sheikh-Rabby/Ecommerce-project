import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const ProductList = () => {
    const {ProductList}=ProductStore()

    if(ProductList===null){
        return <ProductsSkeleton/>
    }else {
        return (
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-3 p-2">
                        <div className="card vh-100 p-3 shadow-sm">
                            <label className="form-label mt-3">Brands</label>
                            <select className="form-control form-select">
                                <option value="">Choose Brand</option>
                            </select>
                            <label className="form-label mt-3">Categories</label>
                            <select className="form-control form-select">
                                <option value="">Choose Category</option>
                            </select>
                            <label className="form-label mt-3">Maximun Price Tk{}</label>
                            <input min={0} max={100000} step={1000} type="range" className="form-range"/>
                            <label className="form-label mt-3">Minimum Price Tk{}</label>
                            <input min={0} max={100000} step={1000} type="range" className="form-range"/>
                        </div>
                    </div>
                    <div className="col-md-9 p-2">
                        <div className="container">
                            <div className="row">
                                {
                                    ProductList.map((item, index) => {

                                        let price=<p className="bodyMedium text-dark my-1">Price : Tk{item['price']}</p>
                                        if(item['discount']===true){
                                            price=<p className="bodyMedium text-dark my-1">Price:<strike>Tk{item['price']}</strike> {item['discountPrice']}</p>
                                        }

                                        return (
                                            <div key={index} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                                <Link to={`/details/${item['_id']}`}
                                                      className="card shadow-sm h-100 rounded-3 bg-white">
                                                    <img className="w-100 rounded-top-2" src={item['image']}/>
                                                    <div className="card-body">
                                                        <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                        {price}
                                                        <StarRatings rating={parseFloat(item['star'])} starRatedColor="red"
                                                                     starDimension="15px"
                                                                     starSpacing="2px"/>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>

                    </div>
                </div>


            </div>
        );

    }


};

export default ProductList;