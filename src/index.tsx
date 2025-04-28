import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/layout/layout';
import Herder from './components/herder/herder';
import Footer from './components/footer/footer';
import Index from './pages/index';

// import Xetnghiem from './pages/xetnghiem/Xetnghiem';
// import ChonBacSi from './pages/bacsi/bacsi'
// import DatLich from './pages/datlich/datlich';
// import Chuyenkhoa from './pages/chuyenkhoa/chuyenkhoa';
// import Dangnhap from './pages/dangnhap/dangnhap';
// import Xacnhanthongtin from './pages/xacnhanthongtin/xacnhanthongtin';
// import Thanhtoan from './pages/thanhtoan/thanhtoan';
// import Tintuc from './pages/tintuc/tintuc';
// import Chitiettintuc from './pages/chitiettintuc/chitiettintuc';
// import Chitietthongtinbacsi from './pages/chitietthongtinbacsi/chitietthongtinbacsi';
// import Thongtinnguoidung from './pages/thongtinnguoidung/thongtinnguoidung';
// import Capnhatthongtinnguoidung from './pages/capnhatthongtin/capnhatthongtin';
// import Lichsudadatlich from './pages/lichsukhambenh/lichsukhambenh';
// import Bacsikhamquavideo from './pages/bacsikhamquavideo/bacsikhamquavideo';
// import Chondichvu from './pages/chondichvu/chondichvu';
// import Thanhcong from './pages/thanhcong/thanhcong';
// import Khamdoanhnghiep from './pages/khamdoanhnghiep/khamdoanhnghiep';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      // {
      //   path: "Xetnghiem",
      //   element: <Xetnghiem />,
      // },
      // {
      //   path: "ChonBacSi",
      //   element: <ChonBacSi />,
      // },
      // {
      //   path: "DatLich",
      //   element: <DatLich />,
      // },
      // {
      //   path: "Chuyenkhoa",
      //   element: <Chuyenkhoa />,
      // },
      // {
      //   path: "Xacnhanthongtin",
      //   element: <Xacnhanthongtin />,
      // },
      // {
      //   path: "Thanhtoan",
      //   element: <Thanhtoan />,
      // },
      // {
      //   path: "Tintuc",
      //   element: <Tintuc />,
      // },
      // {
      //   path: "Chitiettintuc",
      //   element: <Chitiettintuc />,
      // },
      // {
      //   path: "Chitietthongtinbacsi",
      //   element: <Chitietthongtinbacsi />,
      // }
      // ,
      // {
      //   path: "/Thongtinnguoidung",
      //   element: <Thongtinnguoidung />
      // }
      // ,
      // {
      //   path: "/Capnhatthongtinnguoidung",
      //   element: <Capnhatthongtinnguoidung />
      // }
      // ,
      // {
      //   path: "/Lichsudadatlich",
      //   element: <Lichsudadatlich />
      // },
      // {
      //   path: "/Bacsikhamquavideo",
      //   element: <Bacsikhamquavideo />
      // },
      // {
      //   path: "/Chondichvu",
      //   element: <Chondichvu />
      // },
      // {
      //   path: "/Khamdoanhnghiep",
      //   element: <Khamdoanhnghiep />
      // }
      

    ],
  },
  // {
  //   path: "/Dangnhap",
  //   element: <Dangnhap />
  // },
  // {
  //   path: "/Thanhcong",
  //   element: <Thanhcong />
  // }
  

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export { };
