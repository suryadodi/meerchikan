import React, { useEffect, useRef, useState } from 'react';
import LeftArrow from '../Auth/lefticon';
import RightArrow from '../Auth/righticon';
import Skeleton from '@mui/material/Skeleton';
import { AppDispatch } from '@/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/services/reducers';
import { categoryRequestAction, productRequestAction } from '@/services/action/productAction';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth-provider';
import { categoryProductRequestAction, setPageAction } from '@/services/action/productAction';
import { categoryIdAction } from '@/services/action/cartAction';


const Categories: React.FC<any> = () => {
  const router = useRouter();
  const [filterCategories, setFilterCategories] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const { categorys, products, loading, itemsPerPage, currentPage, error } = useSelector((state: RootState) => state.product);
  useEffect(() => {
    dispatch(categoryRequestAction({}));
    dispatch(categoryIdAction(null));

    dispatch(productRequestAction(currentPage, null, user?.id)) // Dispatch action to fetch categories
  }, [dispatch]);




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
    if (startIndex + visibleCount < categorys.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    // Move left: Add one item to the start and remove one from the end
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };
  
  const visibleItems = categorys.slice(startIndex, startIndex + visibleCount);

  const handleMouseEnter = (index: number) => {
    setHoveredArrow(index);
  };

  const handleMouseLeave = () => {
    setHoveredArrow(null);
  };

  const handleCategoryClick = (category: string) => {

    dispatch(categoryIdAction(category));

    router.push(`/products`);
  };

  const viewAllProduct = () => {
    router.push(`/products`);
  };

  // // Function to get the product count for each category
  // const getProductCountForCategory = (categoryId: string) => {
  //   // Filter the products array and count how many products match the categoryId
  //   const productsInCategory = products.filter((product) => product.categoryId === categoryId);
  //   return productsInCategory.length;
  // };

  return (
    <div className="category">
      <div className="category_categories">
        <div className="category_heading">
          <div className="category_sidebar"></div>
          <h2>Categories</h2>
        </div>
        {/* <div className="category_views">
          <p onClick={viewAllProduct}>View All</p>
          <div className="category_arrows">
            <div
              className={`arrow ${hoveredArrow === 0 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              // onClick={() => handleScroll(-410)}
              onClick={handlePrev}
            >
              <RightArrow className='' />
            </div>
            <div
              className={`arrow ${hoveredArrow === 1 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              // onClick={() => handleScroll(405)}
              onClick={handleNext}
            >
              <LeftArrow className='' />
            </div>
          </div>
        </div> */}
      </div>

      <div className="category_lists" ref={containerRef}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <div className="category_item" key={index}>
              <Skeleton variant="rectangular" width={120} height={120} />
            </div>
          ))
        ) : (
          categorys?.map((category: any, index: number) => (
            <div className="category_item" key={index} onClick={() => handleCategoryClick(category?.id)}>
              <img src={category.image} alt={category.category} />
              <div className="category_details">
                <h1>{category.category}</h1>
                <span>{`(${products?.filter(product => product.category === category.id).length} items)`}</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Categories;
