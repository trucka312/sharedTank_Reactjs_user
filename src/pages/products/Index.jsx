import React, { useEffect } from "react";

import { useProductStore } from "../../store/product";
import ProductList from "../../components/ProductList";

export default function Products() {
  const { products, getAllProduct } = useProductStore();

  useEffect(() => {
    getAllProduct();
  }, []);
  
  return (
    <React.Fragment>
      <div className="w-full px-5 xs:px-4 mx-auto my-[30px]">
        <ProductList columns={3} products={products} />
      </div>
    </React.Fragment>
  );
}
