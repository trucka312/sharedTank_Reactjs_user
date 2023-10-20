import styled from 'styled-components';
import { formatPrice } from '../../../helper';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { orderStatusAction } from '../../../actions/orderStatus';
import React, { useState } from 'react';
import CancelOrderPopup from './CancelOrderPopup';
import Button from '../../../components/Button/Button.jsx';

const DataByMenuItemStyle = styled.div`
  .wrapper{
    margin-bottom: 18px;
    background-color: #fff;
  }

  .order-container {
    background-color: #fff;
    margin: 15px 0;
    .order-pending-info {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      align-items: center;
      .payment-btn {
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
      }
      .order-status {
        color: #28a745;
      }
    }
    .shop-order-container {
      background-color: #f5f5f5;
      .shop-order-info {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        .shop-order-name {
          font-weight: 500;
          font-size: 15px;
        }
      }
    }
    .product-container {
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
      padding: 20px 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #E7E7E7;
      .product-info {
        align-items: center;
        justify-content: space-between;
        .product-img-container {
          width: 96px;
          height: 96px;
          margin-right: 7px;
          display: flex;
          .product-img {
            border-radius: 8px;
            width: 100%;
            height: 100%;
            background: url('/img/default_product.jpg') 0% 0% / contain;
          }

          .product-information {
            margin-left: 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .product-price {
              font-weight: 600;
              font-size: 18px;
              line-height: 19px;
              color: var(--primary-color);
            }
            .product-quantity{
              font-weight: 500;
              font-size: 16px;
              line-height: 22.4px;
            }
            .product-name{
              font-weight: 500;
              font-size: 16px;
              line-height: 22.4px;
            }
          }
        }
      }
      .product-status ,.product-status > span {
        font-weight: 400;
        font-size: 16px;line-height: 22.4px;
        color: var(--primary-color);
        margin: auto 0;
      }
    }
    .product-total--price{
      display: flex;
      padding: 15px 20px 25px 130px;
      justify-content: space-between;
      .total-price{
        height: 28px;
        font-size: 20px;
        line-height: 28px;
        .product-price{
          font-weight: 600;
              font-size: 18px;
              line-height: 19px;
              color: var(--primary-color);
        }
      }
    }
    .totalPrice-container {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0;
      font-size: 15px;
      align-items: center;
      .totalPrice {
        color: #3147f3;
        margin-left: 5px;
        font-size: 24px;
      }
    }
  }
`;
export default function DataByMenuItem(props) {
  const { active, item } = props;
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    dispatch(
      orderStatusAction.cancelOrder(
        {
          order_code: item.order_code,
          note: '',
        },
        active,
      ),
    );
  };

  console.log('item',item)

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const setStatusByActive = (active) => {
    switch (active) {
      case 'PACKING':
        return 'Đang chuẩn bị hàng';
      case 'SHIPPING':
        return <span style={{ color: '#4d5ef7' }}>Đang giao hàng</span>;
      case 'OUT_OF_STOCK':
        return <span style={{ color: '#f76459' }}>Đã hết hàng</span>;
      case 'USER_CANCELLED':
        return <span style={{ color: '#f76459' }}>Shop đã huỷ</span>;
      case 'CUSTOMER_CANCELLED':
        return <span style={{ color: '#f76459' }}>Đã huỷ</span>;
      case 'DELIVERY_ERROR':
        return <span style={{ color: '#f76459' }}>Lỗi giao hàng</span>;
      case 'CUSTOMER_RETURNING':
        return 'Chờ trả hàng';
      case 'CUSTOMER_HAS_RETURNS':
        return 'Đã trả hàng';
      case 'WAITING_FOR_PROGRESSING':
        return 'Chờ xác nhận';
      default:
        return '';
    }
  };

  return (
    <DataByMenuItemStyle>
      <div className="order-container">
        {/* {showPopup && <CancelOrderPopup handleCancelOrder={handleCancelOrder} handleClosePopup={handleClosePopup} />} */}
        {/* <div className="order-pending-info">
          <div>
            {item.store.name}
            <span style={{ fontSize: '13px', marginLeft: '6px' }}>
              {'('}
              {item.branch.name}
              {')'}
            </span>
            <Link to={`/nha-cung-cap?id=${item.store.id}`}>
              <i className="fas fa-store" style={{ marginLeft: '7px', color: '#0000ff' }}></i>
            </Link>
          </div>
          <div style={{ fontWeight: '500' }}>
            {item.order_code} | <span>{setStatusByActive(active)}</span>
          </div>
        </div> */}
        <div>
          {/* <Link to={`/don-hang/${item.order_code}`}> */}
            <div className="shop-order-container">
              <div>
                {item.line_items_at_time.map((product, index) => {
                  return (
                    <div className='wrapper'  key={index}>
                      <div className="product-container">
                        <div className="product-info">
                          <div className="product-img-container">
                            <img
                              className="product-img"
                              // src={product.image_url || '/img/default_product'}
                              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/350121817_1620709301750308_1755070300389425904_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=L6LPv5Hh1OoAX8dj4an&_nc_ht=scontent.fhan17-1.fna&oh=00_AfA1CdQimSVTAH_JDRYSeGeMNGopWIiSnuPn59vywJeOOg&oe=65113D7C"
                              alt="product"
                            />

                            <div className="product-information">
                              <div className="product-name">{product.name}</div>
                              <div className="product-price">{formatPrice(1899000)}</div>
                              <div className="product-quantity">Số lượng: {product.quantity}</div>
                            </div>

                            <div>
                            Hoa hồng được nhận:
                              <span style={{color:'var(--primary-color),', fontSize: '18px', fontWeight: '600'}}>{' '}{formatPrice(9090900)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="product-status">
                          <span>Đơn hàng đã được giao thành công</span> {'|'}
                          <span>{' '}HOÀN THÀNH</span>
                        </div>
                      </div>

                      <div className="product-total--price">
                        <div className="total-price">
                          <span>Thành tiền:</span> <span className='product-price'>{formatPrice(product.after_discount)}</span>
                        </div>
                        <div className="product-button">
                          <Button primary>Đánh giá</Button>
                          <Button outline style={{marginLeft: '20px'}}>Mua lại</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* </div>
            );
          })} */}
          {/* </Link> */}
        </div>
        {/* <div className="totalPrice-container">
          {active === 'WAITING_FOR_PROGRESSING' && (
            <button
              style={{
                backgroundColor: '#20409a',
                color: '#fff',
                padding: '10px 10px',
                marginRight: '7px',
                cursor: 'pointer',
                borderRadius: '6px',
              }}
              onClick={() => setShowPopup(true)}
            >
              Huỷ đơn hàng
            </button>
          )}
          <div>
            <span>Tổng tiền:</span>
            <span className="totalPrice">{formatPrice(item.total_final)}</span>
          </div>
        </div> */}
      </div>
    </DataByMenuItemStyle>
  );
}
