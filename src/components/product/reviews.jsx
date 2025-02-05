import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import {useParams} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const Reviews = () => {
    const {ReviewList}=ProductStore()

    return (
        <div>
            <ul className="list-group mt-3 ">
                {
                    ReviewList!==null?(ReviewList.map((item,i)=>{
                        return (
                            <li key={i} className="list-group-item bg-transparent">
                                <h6 className="m-0 p-0"><i className="bi bi-person"></i> {item["userprofile"]['cus_name']}</h6>
                                <StarRatings rating={parseFloat(item['rating'])} starRatedColor="Green" starDimension="15px" starSpacing="2px"/>
                                <p>Description: {item['des']}</p>

                            </li>

                    )
                    })) : (<span></span>)
                }


            </ul>
        </div>
    );
};

export default Reviews;