import React, { Children, useState } from 'react';
import { Layout } from 'antd';
import { StyledContent } from './MainLayout.style';
import { Outlet } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../../components/header/Index';
import Footer from '../../components/footer/Index';
import useGetScreenWidth from '../../hooks/useGetScreenWidth';
import HeaderMobile from '../../components/header/HeaderMobile';

const MainLayout = () => {
  const {widthScreen} = useGetScreenWidth()
  const isMobile = widthScreen < 576;
  return (
    <Layout>
      {/* <Sidebar collapsed={collapsed} /> */}
      {/* <Scrollbars style={{ height: '100vh', marginTop: 30 }} autoHide autoHideTimeout={1000} autoHideDuration={200}> */}
        <Layout>
          {!isMobile ? <Header /> : <HeaderMobile />}
          <StyledContent>
            <Outlet />
          </StyledContent>
          <Footer />
        </Layout>
      {/* </Scrollbars> */}
    </Layout>
  );
};
export default MainLayout;
