import React from 'react';
import ProductStore from "../../store/ProductStore.js";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"



const ProductImages = () => {
    const {ProductDetails}=ProductStore()
    let images = [
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},
        {original:ProductDetails[0]['productdetail']['img1'], thumbnail:ProductDetails[0]['productdetail']['img1']},


    ]


    return (
        <div>
            <ImageGallery autoPlay={true} items={images}/>
        </div>
    );
};

export default ProductImages;