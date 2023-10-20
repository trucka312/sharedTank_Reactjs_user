import styled from "styled-components";
import { useState, useEffect } from "react";

import ProductItems from "./ProductItems";

const ProductListStyle = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export default function ProductList(props) {
  const { products, columns } = props;

  return (
    <ProductListStyle>
      <div
        // style={{
        //   display: "grid",
        //   gap: "16px",
        //   width: "100%",
        //   gridTemplateColumns: `repeat(${columns},1fr)`,
        // }}
        className="xs:gap-4 grid gap-4 w-full grid-cols-3 xs:grid-cols-1"
      >
        {products?.map((item) => {
          return <ProductItems key={item.id} product={item} />;
        })}
      </div>
    </ProductListStyle>
  );
}
