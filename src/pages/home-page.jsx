import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import SliderSkeleton from "../skeleton/slider-skeleton.jsx";
import FeaturesSkeleton from "../skeleton/features-skeleton.jsx";
import CategoriesSkeleton from "../skeleton/categories-skeleton.jsx";
import ProductsSkeleton from "../skeleton/products-skeleton.jsx";
import BrandsSkeleton from "../skeleton/brands-skeleton.jsx";
import FeatureStore from "../store/FeatureStore.js";
import Features from "../components/features/features.jsx";
import Slider from "../components/product/slider.jsx";
import ProductStore from "../store/ProductStore.js";
import Categories from "../components/product/categories.jsx";
import Products from "../components/product/products.jsx";
import Brands from "../components/product/brands.jsx";

const HomePage = () => {
    const {BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest}=ProductStore()
    const {FeatureListRequest}=FeatureStore();

    useEffect(()=>{
        (async ()=>{
            await SliderListRequest()
            await FeatureListRequest()
            await CategoryListRequest()
            await ListByRemarkRequest("new")
            await BrandListRequest()


        })()
    },[])

    return (
      <Layout>
          <Slider/>
          <Features/>
          <Categories/>
          <Products/>
          <Brands/>


      </Layout>
    );
};

export default HomePage;