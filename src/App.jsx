import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/loading/Index";
import MainLayout from "./layouts/mainLayout/MainLayout";
import { getToken } from "./utils/auth";
import ProfileLayout from "./layouts/profileLayout/ProfileLayout";
import Login from "./pages/login";
import Register from "./pages/login/Register.jsx";
import Member from "./pages/member/index.jsx";
import Transaction from "./pages/walletManage/child/Transaction";
import Blog from "./pages/blog/index.jsx";
import BlogDetail from "./pages/blog/BlogDetail.jsx";
import ScrollToTop from "./components/scrollToTop/Index";
import ShippingAddress from "./pages/shippingAddress/ShippingAddress.jsx";
import Notification from "./pages/notifications";
import ForgotPassword from "./pages/login/ForgotPassword";
import { useUserStore } from "./store/userStore";

const Home = lazy(() => import("./pages/home/Index.jsx"));
const CartPage = lazy(() => import("./pages/cart/Index"));
const OrderInfo = lazy(() => import("./pages/order/Index"));
const ProfilePage = lazy(() => import("./pages/profile/Index"));
const Setting = lazy(() => import("./pages/setting/index"));
const OverviewReport = lazy(() => import("./pages/overviewReport/Index"));
const WalletManage = lazy(() => import("./pages/walletManage/Index"));
const OrdersList = lazy(() => import("./pages/orderList2"));
const OrdersInfo = lazy(() => import("./pages/OrderInfo"));
const ProductInfo = lazy(() => import("./pages/productInfo/Index"));
const Products = lazy(() => import("./pages/products/Index"));
const RechargeWithdrawHistory = lazy(() =>
  import("./pages/rechargeWithdrawHistory/index.jsx")
);

const PrivateRoute = () => {
  // const { getAllBadges } = useBadgesStore();
  // const { getAllCategories } = useCategoriesStore((state) => state);

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getToken();
      setAuthenticated(token !== null);
      setLoading(false);
    };

    checkAuthentication();
    // getAllBadges();
    // if (!profile) getInfoStore();
    // if (!categories) getAllCategories();
  }, []);

  if (loading) {
    return null;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

function App() {
  const { profile, loading } = useUserStore();
  const searchParams = new URLSearchParams(window.location.search);
  const cowcId = searchParams.get("cowc_id");
  const token = getToken();

  useEffect(() => {
    if (token) {
      if (!loading) {
        if (Object.keys(profile).length > 0) {
          if (profile.id !== parseInt(cowcId) && cowcId) {
            localStorage.setItem("cowc_id", cowcId);
            return;
          }
        }
      }
    } else {
      if (cowcId) {
        localStorage.setItem("cowc_id", cowcId);
      }
    }
  }, [loading]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/san-pham/:idProduct"
              element={
                <Suspense fallback={<Loading />}>
                  <ProductInfo />
                </Suspense>
              }
            />
            <Route
              path="/member"
              element={
                <Suspense fallback={<Loading />}>
                  <Member />
                </Suspense>
              }
            ></Route>
            <Route
              path="/products"
              element={
                <Suspense fallback={<Loading />}>
                  <Products />
                </Suspense>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route
                path="/gio-hang"
                element={
                  <Suspense fallback={<Loading />}>
                    <CartPage />
                  </Suspense>
                }
              />
              <Route
                path="/thanh-toan"
                element={
                  <Suspense fallback={<Loading />}>
                    <OrderInfo />
                  </Suspense>
                }
              />
              <Route element={<ProfileLayout />}>
                <Route
                  path="/ho-so"
                  element={
                    <Suspense fallback={<Loading />}>
                      <ProfilePage />
                    </Suspense>
                  }
                />
                <Route
                  path="/cai-dat"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Setting />
                    </Suspense>
                  }
                />
                <Route
                  path="/bao-cao-tong-quan"
                  element={
                    <Suspense fallback={<Loading />}>
                      <OverviewReport />
                    </Suspense>
                  }
                />
                <Route
                  path="/quan-ly-vi"
                  element={
                    <Suspense fallback={<Loading />}>
                      <WalletManage />
                    </Suspense>
                  }
                />
                <Route
                  path="/shipping-address"
                  element={
                    <Suspense fallback={<Loading />}>
                      <ShippingAddress />
                    </Suspense>
                  }
                />
                {/* <Route
                path="/recharge-withdraw-history"
                element={
                  <Suspense fallback={<Loading />}>
                      <RechargeWithdrawHistory />
                  </Suspense>
                }
              /> */}

                <Route
                  path="/don-hang"
                  element={
                    <Suspense fallback={<Loading />}>
                      <OrdersList />
                    </Suspense>
                  }
                />
                <Route
                  path="/don-hang/:id"
                  element={
                    <Suspense fallback={<Loading />}>
                      <OrdersInfo />
                    </Suspense>
                  }
                />

                <Route
                  path="/notifications"
                  element={
                    <Suspense fallback={<Loading />}>
                      <Notification />
                    </Suspense>
                  }
                />
              </Route>

              <Route path="/member" element={<Member />}></Route>
              <Route path="/transaction/:action" element={<Transaction />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} exact />
              {/* <Route path="/don-hang/:id" element={<OrderInfoPage />} /> */}
            </Route>
          </Route>
          {/* login route */}
          {/* <Route path="/" element={<MainLayout />}> */}
          {/* </Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </React.Fragment>
  );
}
export default App;
