import React, { useEffect, useRef, useState } from 'react';
import CardProduct from '../cards/card';
import LeftArrow from '../Auth/lefticon';
import RightArrow from '../Auth/righticon';
import { GET_BESTSELLER } from '@/helpers/query';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@mui/material';
import { AppDispatch } from '@/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/services/reducers';
import { sellerRequestAction } from '@/services/action/sellerAction';
import { useAuth } from '@/auth-provider';
import { useRouter } from 'next/router';
import { categoryIdAction } from '@/services/action/cartAction';

const BestSeller: React.FC<any> = () => {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();
  const router=useRouter();
  useEffect(() => {
    dispatch(sellerRequestAction(user?.id));
  }, [dispatch, user]);
  const { sellers, loading, error } = useSelector((state: RootState) => state.seller);


  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredArrow, setHoveredArrow] = useState<number | null>(null);

  const handleScroll = (scrollOffset: number) => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += scrollOffset;
    }
  };

  const [startIndex, setStartIndex] = useState(0); // Starting index of visible items
  const visibleCount = 4; // Number of items visible at a time

  const handleNext = () => {
    // Move right: Add one item to the end and remove one from the start
    if (startIndex + visibleCount < sellers.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    // Move left: Add one item to the start and remove one from the end
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };
  
  const visibleItems = sellers.slice(startIndex, startIndex + visibleCount);

  const handleMouseEnter = (index: any) => {
    setHoveredArrow(index);
  };

  const handleMouseLeave = () => {
    setHoveredArrow(null);
  };

  if (error) return <p>Error: {error}</p>;
  const handlego=()=>{
    dispatch(categoryIdAction("Best Seller"))
    router.push('/products')
  }
  return (
    <>
      <div className="bestSeller">
        <div className="bestSeller_categories">
          <div className="bestSeller_heading">
            <div className="bestSeller_sidebar"></div>
            <h2>Best Seller</h2>
          </div>
          <div className="bestSeller_views">
            <p onClick={handlego}>View All</p>
            <div className="bestSeller_arrows">
              <div
                className={`arrow ${hoveredArrow === 0 ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                // onClick={() => handleScroll(-350)}
                onClick={handlePrev}
              >
                <RightArrow className='' />
              </div>
              <div
                className={`arrow ${hoveredArrow === 1 ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                // onClick={() => handleScroll(350)}
                 onClick={handleNext}
                
              >
                <LeftArrow className='' />
              </div>
            </div>
          </div>
        </div>

        <div className="bestSeller_lists" ref={containerRef}>
          {loading ? (
            Array.from(new Array(2)).map((_, index) => (
              <div className="category_item" key={index}>
                <Skeleton variant="rectangular" width={320} height={400} />
              </div>
            ))
          ) : (
            visibleItems?.map((product: any, index: number) => (
              <div className="featureProduct_item" key={index}>
                <CardProduct
                  item={product}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
export default BestSeller;