import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../helper';

import { constants as c } from '../../constants';
import { cartActions } from '../../actions/cartActions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ListOrderPending from './child/ListOrderPending';
import ListOrderAll from './child/ListOrderAll';
import { useLocation, useHistory } from 'react-router-dom';
import OrderCompleted from './child/OrderCompleted';
import ShipperDelivered from './child/ShipperDelivered';
import GetDataByMenu from './child/GetDataByMenu';
import ProfileMobile from '../ProfileMobile/ProfileMobile';
import ProfileLayout from '../../layout/ProfileLayout/ProfileLayout';

const OrderListPageStyles = styled.div`
  .search-bar {
    flex-wrap: wrap;
  }

  .orders-list-page {
    margin: auto 20px auto 0;
    display: flex;
  }

  .orders-list-page .main {
    width: 100%;
    background-color: transparent;
  }

  .orders-list-page .main .filter {
    display: flex;
    z-index: 10;
    background-color: white;
    height: 50px;
  }

  .orders-list-page .main .filter a:hover {
    color: var(--primary-color);
  }

  .orders-list-page .main .filter p {
    cursor: pointer;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  .orders-list-page .main .filter .active {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
    font-weight: 450;
    padding: 0 0 16px 0;
  }

  .orders-list-page .main .filter p:hover {
    color: var(--primary-color);
  }

  .orders-list-page .main .details {
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: white;
  }

  .orders-list-page .main .status {
    font-size: 14px;
    color: #757575;
  }

  .orders-list-page .main .footer-order {
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    padding: 24px 24px 12px;
  }

  .orders-list-page .main .footer-order .total-money {
    display: flex;
    justify-content: flex-end;
  }

  .orders-list-page .main .footer-order .btn {
    display: flex;
    justify-content: flex-end;
  }

  .orders-list-page .main .footer-order .btn > div {
    margin: 0 0 0 10px;
    cursor: pointer;
  }

  .orders-list-page .main .footer-order .btn button {
    border: 1px solid rgba(0, 0, 0, 0.09);
    min-width: 150px;
    min-height: 40px;
  }

  .orders-list-page .main .footer-order .btn .repurchase {
    color: #fff;
    background-color: var(--primary-color);
  }

  .orders-list-page .main .footer-order .btn button {
    cursor: pointer;
  }

  .orders-list-page .main .sort-option {
    //background-color: rgba(0,0,0,0.029);
    background-color: #eaeaea;
    margin-top: 15px;
    border-radius: 6px;
  }

  .search-container {
    height: 48px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 8px 16px 8px 32px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .search-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  .tab2-header {
    display: flex;
    background-color: white;
    padding: 20px;
    height: max-content;
    gap: 70px;
    &--item {
      line-height: 24px;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

function OrdersListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentStatus, setCurrentStatus] = useState('Trạng thái');
  const [query, setQuery] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [active, setActive] = useState();
  const [tab, setTab] = useState(1);
  const profile = useSelector((state) => state.user.profile);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // life cyscle
  useEffect(() => {
    dispatch(cartActions.getOrdersList());
  }, []);

  const listOrdersAll = useSelector((state) => state.cart.ordersList.list);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.title = 'Danh sách đơn hàng';
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    handleChangeQueryString(query);
  }, [query]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = queryParams.get('active');
    setActive(currentPage ? currentPage : 'WAIT_FOR_PAYMENT');
  }, [location]);

  useEffect(() => {
    setQuery({
      ...query,
      search: searchValue,
    });
  }, [searchValue]);

  function handleShowInfo(id) {
    window.location.href = `/don-hang/${id}`;
  }

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  function handleChangeQueryString(q) {
    let queryKeys = [...Object.keys(q)];
    console.log(queryKeys);
    let queryStr = queryKeys.reduce((rs, v) => `${rs}${v}=${q[v]}&`, '?');
    console.log(queryStr);
    dispatch({ type: c.RESET_ORDERS_LIST_STATUS });
    dispatch(a.getOrdersList(queryStr));
  }

  function handleRebuy(e, productsList) {
    e.stopPropagation();
    productsList.map((v) => {
      dispatch(
        cartActions.addCart(
          {
            product_id: v.id,
            quantity: v.quantity,
            distributes: v.distributes_selected,
          },
          true,
        ),
      );
      return null;
    });
  }

  function handleSort(option, e) {
    let newQuery = { ...query };
    let keys = [...Object.keys(option)];
    hideParentElement(e);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'title') newQuery[keys[i]] = option[keys[i]];
      else {
        if (currentStatus === option.title) return;
        if (option.title === 'Tất cả') newQuery = {};
        setCurrentStatus(option.title);
        newQuery.page = 1;
      }
    }
    setQuery(newQuery);
  }

  function handlePageSelect(page) {
    let cloneQuery = { ...query, ...page };
    handleChangeQueryString(cloneQuery);
  }

  function handleSearch() {
    setQuery({ search: searchValue });
  }

  function handleEnter(e) {
    if (e.key === 'Enter') handleSearch();
  }

  function openPaymentDialog(e, order) {
    e.stopPropagation();
    dispatch({
      type: c.CHANGE_POPUP,
      popupType: c.ORDER_POPUP,
      orderPopupTitle: {
        title: 'Thanh toán!',
        subTitle: 'Hãy thanh toán ngay hoặc thay đổi hình thức thanh toán.',
      },
      paymentMethod: {
        payment_method_name: order.payment_method_name,
        payment_method_id: order.payment_method_id,
        order_code: order.order_code,
        payment_partner_name: order.payment_partner_name,
        payment_partner_id: order.payment_partner_id,
        orderInfo: order,
      },
    });
  }

  function onChangeDate(queryChange) {
    var arrQ = queryChange.split('&');

    var from = arrQ[0].replace('?', '').split('=');
    var to = arrQ[1].replace('?', '').split('=');

    var time_to = to[1];
    var time_from = from[1];

    let cloneQuery = { ...query, time_from, time_to };

    setQuery(cloneQuery);
  }

  function handleCancelOrder(order_code) {
    dispatch(
      a.cancelOrder({
        order_code: order_code,
      }),
    );
  }
  return (
    <React.Fragment>
      {windowWidth > 600 ? (
        <React.Fragment>
          {/* main here */}
          <ProfileLayout>
            {/* table order here */}
            <OrderListPageStyles>
              <div className="orders-list-page container">
                <div className="main">
                  {/* tab here */}
                  <div
                    style={{
                      gap: '30px',
                      padding: '20px 20px 10px 20px',
                      display: 'flex',
                      background: '#ffffff',
                      marginBottom: '6px',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: tab === 2 ? '400' : '500',
                        fontSize: '20px',
                        lineHeight: '28px',
                        paddingBottom: '8px',
                        color: tab === 1 ? 'var(--primary-color)' : '#333333',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setTab(1);
                      }}
                    >
                      Đơn hàng của tôi
                    </div>
                    <div
                      style={{
                        fontWeight: tab === 1 ? '400' : '500',
                        fontSize: '20px',
                        lineHeight: '28px',
                        paddingBottom: '8px',
                        color: tab === 2 ? 'var(--primary-color)' : '#333333',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setTab(2);
                      }}
                    >
                      Đơn hàng đã giới thiệu
                    </div>
                  </div>

                  {tab === 1 && (
                    <React.Fragment>
                      {/* menu here */}
                      <div
                        className="filter"
                        style={{
                          justifyContent: 'space-between',
                          padding: '20px 20px 0 20px',
                          height: 'max-content',
                          gap: '20px',
                        }}
                      >
                        <Link to="don-hang?active=ALL">
                          <p className={active === 'ALL' ? 'active' : ''}>
                            Tất cả{' '}
                            {listOrdersAll?.data?.length > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>({listOrdersAll?.data?.length})</span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>

                        <Link to="don-hang?active=WAIT_FOR_PAYMENT">
                          <p className={active === 'WAIT_FOR_PAYMENT' ? 'active' : ''}>
                            Chờ thanh toán
                            {listOrdersAll?.WAIT_FOR_PAYMENT > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>({listOrdersAll?.WAIT_FOR_PAYMENT})</span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>

                        <Link to="don-hang?active=PACKING">
                          <p className={active === 'PACKING' ? 'active' : ''}>
                            Đang chuẩn bị{' '}
                            {listOrdersAll?.PACKING > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>({listOrdersAll?.PACKING})</span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>

                        <Link to="don-hang?active=SHIPPING">
                          <p className={active === 'SHIPPING' ? 'active' : ''}>
                            Đang giao{' '}
                            {listOrdersAll?.SHIPPING > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>({listOrdersAll?.SHIPPING})</span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>

                        <Link to="don-hang?active=COMPLETED">
                          <p className={active === 'COMPLETED' ? 'active' : ''}>
                            Hoàn thành
                            {listOrdersAll?.COMPLETED > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>({listOrdersAll?.COMPLETED})</span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>

                        <Link to="don-hang?active=CUSTOMER_CANCELLED">
                          <p className={active === 'CUSTOMER_CANCELLED' ? 'active' : ''}>
                            Đã hủy{' '}
                            {listOrdersAll?.CUSTOMER_CANCELLED > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>
                                ({listOrdersAll?.CUSTOMER_CANCELLED})
                              </span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>

                        <Link to="don-hang?active=CUSTOMER_HAS_RETURNS">
                          <p className={active === 'CUSTOMER_HAS_RETURNS' ? 'active' : ''}>
                            Trả hàng/Hoàn tiền{' '}
                            {listOrdersAll?.CUSTOMER_HAS_RETURNS > 0 ? (
                              <span style={{ color: 'var(--primary-color)' }}>
                                ({listOrdersAll?.CUSTOMER_HAS_RETURNS})
                              </span>
                            ) : (
                              ''
                            )}
                          </p>
                        </Link>
                      </div>

                      {/* search here */}
                      <div
                        style={{
                          width: '100%',
                          padding: '20px',
                          gap: '10px',
                          background: '#ffffff',
                          marginTop: '3px',
                          marginBottom: '12px',
                        }}
                      >
                        <div class="search-container">
                          <i className="fas fa-search" style={{ color: '#a2a2a2', fontSize: '18px' }}></i>
                          <input
                            type="text"
                            class="search-input"
                            placeholder="Tìm kiếm tên đơn hàng, mã đơn hàng,..."
                          />
                        </div>
                      </div>

                      {active === 'ALL' && <ListOrderAll dataTable={listOrdersAll} />}
                      {active === 'WAIT_FOR_PAYMENT' && <ListOrderPending />}
                      {active === 'DELIVERED' && <ShipperDelivered />}
                      {active === 'COMPLETED' && <OrderCompleted />}
                      {!(active === 'WAIT_FOR_PAYMENT' || active === 'DELIVERED' || active === 'COMPLETED') && (
                        <GetDataByMenu active={active} />
                      )}
                    </React.Fragment>
                  )}

                  {tab === 2 && (
                    <React.Fragment>
                      {/* menu here */}
                      <div className="tab2-header">
                        <div className="tab2-header--item">
                          Tổng số đơn hàng <span style={{ color: 'var(--primary-color)' }}>{6}</span>
                        </div>
                        <div className="tab2-header--item">
                          Tổng giá trị đơn đã giao{' '}
                          <span style={{ color: 'var(--primary-color)' }}>{formatPrice(100000)}</span>
                        </div>
                        <div className="tab2-header--item">
                          Hoa đồng từ đơn đã hoàn thành{' '}
                          <span style={{ color: 'var(--primary-color)' }}>{formatPrice(100000)}</span>
                        </div>
                      </div>

                      {active === 'ALL' && <ListOrderAll />}
                      {active === 'WAIT_FOR_PAYMENT' && <ListOrderPending />}
                      {active === 'DELIVERED' && <ShipperDelivered />}
                      {active === 'COMPLETED' && <OrderCompleted />}
                      {!(active === 'WAIT_FOR_PAYMENT' || active === 'DELIVERED' || active === 'COMPLETED') && (
                        <GetDataByMenu active={active} />
                      )}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </OrderListPageStyles>
          </ProfileLayout>
        </React.Fragment>
      ) : (
        <ProfileMobile />
      )}
    </React.Fragment>
  );
}

export default OrdersListPage;
