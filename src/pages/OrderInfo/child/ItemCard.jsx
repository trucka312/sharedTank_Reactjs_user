// import { formatPrice } from "../../../helper";

export default function ItemCard(props) {
  return (
    <a href={`/san-pham/${props.id}`} className="item-card">
      <div className="image">
        <div className="img-container">
          <img src={props.image} alt="" style={{ background: "url(/img/default_product.jpg)", backgroundSize: "contain" }} />
        </div>
      </div>
      <div className="info">
        <div className="name">
          {props.name}
        </div>
        <div className="row">
          <span>{`${formatPrice(props.price)} x `}</span> {props.number}
        </div>
      </div>
    </a>
  )
}