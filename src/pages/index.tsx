import Categories from "../components/Categories/categories";
import Banner from "@/components/Banner/banner";
import BestSeller from "@/components/BestSeller/bestseller";
import TopSellingProduct from "@/components/BestSeller/bestseller";

import FeatureProduct from "@/components/Feature/feature";
import TopOffer from "@/components/TopOffer/topoffer";
import TrendingProduct from "@/components/Trending/trending";


export default function Home() {

  return (
    <>
      <div className="container">
       <div className="home-body"> 

          <Banner />
          <Categories />
          <FeatureProduct />
          <BestSeller />
          <TopOffer />
          <TrendingProduct />
       
          </div>
      </div>

    </>
  );
}
