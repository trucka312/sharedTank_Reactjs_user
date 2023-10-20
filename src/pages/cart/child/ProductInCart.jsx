import { useEffect, useState } from "react";
import styled from "styled-components";

import { useDebounced } from "../../../hooks/useDebounce";
import { formatPrice } from "../../../utils";
import DefaultProduct from "../../../assets/images/image-default.jpg";
import DeleteIcon from "../../../assets/images/zin/delete-icon.svg";

const ProductInCartStyle = styled.div`
  border-bottom: 1px solid #00000017;
`;
export default function ProductInCart(props) {
  const { v, handleUpdateCart } = props;
  const [quantity, setQuantity] = useState(v.quantity);

  const debounceQuantity = useDebounced(quantity, 300);

  useEffect(() => {
    setQuantity(v.quantity);
  }, [v]);

  useEffect(() => {
    if (quantity !== v.quantity) {
      handleUpdateCart({
        quantity: quantity,
        product_id: v.product.id,
        line_item_id: v.id,
      });
    }
  }, [debounceQuantity]);

  return (
    <ProductInCartStyle>
      <div className="p-[20px] flex items-center">
        <div className="flex-1">
          <div className="product-image-container">
            <div className="product-image gap-[15px]">
              <img
                src={
                  v.product.images.length > 0
                    ? v.product.images[0].image_url
                    : DefaultProduct
                }
                alt="cart_accessibility_product_image"
                className="rounded-[6px] w-[80px] h-[80px]"
              />
              <div className="flex flex-1 flex-col justify-between gap-[5px]">
                <p className="font-medium text-[15px] xs:line-clamp-1">{v.product.name}</p>
                <div className="total text-[#CF5763]">
                  <span>
                    {formatPrice(v.product.retail_price * v.quantity)}
                  </span>
                </div>
                <div className="input-quantity flex justify-between">
                  <div>
                    <button
                      onClick={() => {
                        setQuantity(quantity - 1);
                      }}
                      style={{
                        cursor: v.quantity === 1 ? "not-allowed" : "pointer",
                        width: "2em",
                        border: "1px solid #ECECEC",
                        padding: "3px 0",
                        borderTopLeftRadius: "4px",
                        backgroundColor: "#fff",
                        borderBottomLeftRadius: "4px",
                      }}
                    >
                      -
                    </button>
                    <input
                      style={{
                        width: "3em",
                        textAlign: "center",
                        border: "none",
                        borderTop: "1px solid #ECECEC",
                        borderBottom: "1px solid #ECECEC",
                        padding: "3px 0",
                      }}
                      value={quantity}
                      onChange={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, "");
                        if (!value) {
                          value = 1;
                        }
                        setQuantity(parseInt(value));
                      }}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        cursor: "pointer",
                        width: "2em",
                        border: "1px solid #ECECEC",
                        padding: "3px 0",
                        borderTopRightRadius: "4px",
                        borderBottomRightRadius: "4px",
                        backgroundColor: "#fff",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <img
                    src={DeleteIcon}
                    alt="delete-icon"
                    style={{
                      width: "unset",
                      height: "unset",
                      objectFit: "unset",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleUpdateCart({
                        quantity: 0,
                        product_id: v.product.id,
                        code_voucher: "",
                        line_item_id: v.id,
                        distributes: [
                          {
                            name: v.distributes_selected?.name,
                            value: v.distributes_selected?.value,
                            sub_element_distributes: null,
                          },
                        ],
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductInCartStyle>
  );
}
