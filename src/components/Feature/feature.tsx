import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import CardProduct from "../cards/card";
import LeftArrow from "../Auth/lefticon";
import RightArrow from "../Auth/righticon";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/reducers";
import { AppDispatch } from "@/services/store";
import { featureRequestAction } from "@/services/action/featureAction";
import { useAuth } from "@/auth-provider";
import { categoryIdAction } from "@/services/action/cartAction";
import { useRouter } from "next/router";

const FeatureProduct: React.FC<any> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredArrow, setHoveredArrow] = useState<number | null>(null);

const router=useRouter();
  useEffect(() => {
    dispatch(featureRequestAction(user?.id)); // Dispatch action to fetch banners
  }, [dispatch, user]);
  const { features, loading, error } = useSelector(
    (state: RootState) => state.feature
  );

  const [startIndex, setStartIndex] = useState(0); // Starting index of visible items
  const visibleCount = 4; // Number of items visible at a time

  const handleNext = () => {
    // Move right: Add one item to the end and remove one from the start
    if (startIndex + visibleCount < features.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    // Move left: Add one item to the start and remove one from the end
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };
  
  const visibleItems = features.slice(startIndex, startIndex + visibleCount);



  const handleScroll = (scrollOffset: number) => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollOffset;
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredArrow(index);
  };

  const handleMouseLeave = () => {
    setHoveredArrow(null);
  };

  const handlego=()=>{
    dispatch(categoryIdAction("Feature Products"))
    router.push('/products')
  }
  if (error) return <p>Error: {error}</p>;


  return (
    <>
    <div className="container">
      <div className="featureProduct">
        <div className="featureProduct_categories">
          <div className="featureProduct_heading">
            <div className="featureProduct_sidebar"></div>
            <h2>Feature Products</h2>
          </div>
          <div className="featureProduct_views">
            {/* <Link href="products">
            <p>View All</p>
            </Link> */}
            <p onClick={handlego}>View All</p>
            <div className="featureProduct_arrows">
              <div
                className={`arrow ${hoveredArrow === 0 ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                // onClick={() => handleScroll(-370)}
                onClick={handlePrev}
              >
                <RightArrow className="" />
              </div>
              <div
                className={`arrow ${hoveredArrow === 1 ? "hovered" : ""}`}
                // onMouseEnter={() => handleMouseEnter(1)}
                // onMouseLeave={handleMouseLeave}
                // onClick={() => handleScroll(370)}
                onClick={handleNext}
              >
                <LeftArrow className="" />
              </div>
            </div>
          </div>
        </div>

        <div className="featureProduct_lists" ref={containerRef} >
          {loading
            ? Array.from(new Array(3)).map((_, index) => (
                <div className="category_item" key={index}>
                  <Skeleton variant="rectangular" width={300} height={400} />
                  {/* <Skeleton variant="text" /> */}
                </div>
              ))
            : visibleItems?.map((product: any, index: number) => (
                <div className="featureProduct_item" key={index}>
                  <CardProduct item={product} />
                </div>
              ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default FeatureProduct;
