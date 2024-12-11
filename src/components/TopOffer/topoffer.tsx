import React, { useRef, useState } from 'react';
import Image from 'next/image';
import LeftArrow from '../Auth/lefticon';
import RightArrow from '../Auth/righticon';
import bannerSmall from "../../../public/images/smallbannernew1.png";
import bannerSmall2 from "../../../public/images/smallbanner3.png";
import bannerSmall3 from "../../../public/images/smallbanner2.png";

const TopOffer = () => {
  const topOffers = [
    {
      src: bannerSmall,
      title: 'Summer Offer',
      discount: '50% off',
      buttonText: 'Order Now'
    },
    {
      src: bannerSmall2,
      title: 'Summer Offer',
      discount: '50% off',
      buttonText: 'Order Now'
    },
    {
      src: bannerSmall3,
      title: 'Summer Offer',
      discount: '50% off',
      buttonText: 'Order Now'
    },
  ];

  const containerRef = useRef<any>(null);
  const [hoveredArrow, setHoveredArrow] = useState<number | null>(null);

  const handleScroll = (scrollOffset: number) => {
    const container = containerRef.current;
    container.scrollLeft += scrollOffset;
  };

  const handleMouseEnter = (index: number) => {
    setHoveredArrow(index);
  };

  const handleMouseLeave = () => {
    setHoveredArrow(null);
  };

  return (
    <div className="topoffer">
      <div className="topoffer_categories">
        <div className="topoffer_heading">
          <div className="topoffer_sidebar"></div>
          <h2>Top Offers</h2>
        </div>
        <div className="topoffer_views">
          <div className="topoffer_arrows">
            <div
              className={`arrow ${hoveredArrow === 0 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleScroll(-200)}
            >
              <RightArrow className="" />
            </div>
            <div
              className={`arrow ${hoveredArrow === 1 ? 'hovered' : ''}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleScroll(200)}
            >
              <LeftArrow className="" />
            </div>
          </div>
        </div>
      </div>
      <div className="topoffer_lists" ref={containerRef}>
        {topOffers.map((offer, index) => (
          <div key={index} className="topoffer_banner">
            <Image src={offer.src} alt={`Offer ${index + 1}`} />
            {/* Uncomment and style this content as needed */}
            {/* <div className="topoffer_content">
              <h1>{offer.title}</h1>
              <h4>{offer.discount}</h4>
              <button className="btn">{offer.buttonText}</button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopOffer;
