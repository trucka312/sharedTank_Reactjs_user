import { formatPrice } from "../../../helper"
export default function OrderCard(props) {
  return (
      <>
          {props.nItems.map((item,key) => (
              <div key={key} className="order-card" onClick={() => props.onClick(props.orderCode)}>

                  <div className="row">
                      <div className="image">
                          <div className="img-container">
                              <img src={item.image_url} alt="" style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
                          </div>
                      </div>
                      <div className="info">
                          <div>{item.name}</div>
                          <span> x{item.quantity} sản phẩm</span>
                          <span style={{textAlign: "right"}}>{formatPrice(item.item_price)}</span>
                      </div>
                  </div>
              </div>
          ))}

      </>

  )
}