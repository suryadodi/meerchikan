import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/services/reducers';
import { AppDispatch } from '@/services/store';
import { bannerRequestAction } from '@/services/action/bannerAction';
import { Skeleton } from '@mui/material';

const Banner = () => {
  const dispatch: AppDispatch = useDispatch();
  const { banners, loading, error } = useSelector((state: RootState) => state.banner);
  useEffect(() => {
    dispatch(bannerRequestAction({})); 
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <div className="category_item" key={index}>
              <Skeleton variant="rectangular" width="100%" height={500} />
              {/* <Skeleton variant="text" /> */}
            </div>
          ))
        ) : (
          banners?.map((banner: any, index) => (
            <div key={index} className="carousel-item">
              <img src={banner.image} alt={banner.title} />
              <div className="carousel-overlay">
                {/* <div className="carousel-caption">
                  <h1>Embrace Elegance, Celebrate Tradition</h1>
                  <h5 className="carousel-title">Discover a stunning collection of sarees crafted with care
                    and timeless artistry. Perfect for every occasion,
                    from weddings to everyday wear.</h5>

                  <button className="btn">Buy Now</button>
                </div>  */}
              </div>
            </div>
          ))
        )}
      </Slider>
    </div>
  );
};

export default Banner;
