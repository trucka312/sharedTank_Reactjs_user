import Slider from "react-slick";
import styled from "styled-components";

import ProductItems from "../../../components/ProductItems";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";

const SimilarProductsStyle = styled.div`
  margin: 20px 0;
  .slick-slide {
    padding: 0 10px;
  }
  .slick-list {
    margin: 0 10px;
  }
`;

export default function SimilarProducts(props) {
  const { similarProduct } = props;
  const {widthScreen} = useGetScreenWidth();
  var settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <SimilarProductsStyle>
      <h3 className="text-center mb-[20px]">SẢN PHẨM TƯƠNG TỰ</h3>
      <div style={{ width: "100%" }}>
        {widthScreen > 576 ? (
          <Slider {...settings}>
            {similarProduct.map((v, i) => (
              <div key={i}>
                <ProductItems key={i} product={v} />
              </div>
            ))}
          </Slider>
        ) : (
          similarProduct.map((v, i) => (
            <div key={i} className="m-[20px_0]">
              <ProductItems key={i} product={v} />
            </div>
          ))
        )}
      </div>
    </SimilarProductsStyle>
  );
}
