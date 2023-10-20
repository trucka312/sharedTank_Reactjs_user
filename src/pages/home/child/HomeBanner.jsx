import { useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { useBannerStore } from "../../../store/bannerStore";

const HomeBannerStyle = styled.div`
  background-color: #fff;
  width: 100%;
  /* .slick-arrow {
    background-color: rgba(0, 0, 0, 0.2) !important;
    width: 30px;
    height: 40px;
    z-index: 1;
  } */
`;
export default function HomeBanner() {
  const { banners, getBanners } = useBannerStore();

  const bannersSetting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dot:true,
    autoplay:true
  };
  
  useEffect(() => {
    getBanners();
  }, []);

  return (
    <HomeBannerStyle>
      <Slider {...bannersSetting}>
        {banners.map((item) => {
          return (
            <img
              src={item.image_url}
              alt="banner"
              key={item.id}
              className="xs:h-[144px] h-[450px] object-cover w-full"
            />
          );
        })}
      </Slider>
    </HomeBannerStyle>
  );
}
