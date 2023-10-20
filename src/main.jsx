import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/styles/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#CF5763",
        },
      }}
    >
      <App />
    </ConfigProvider>
  // </React.StrictMode>,
)
