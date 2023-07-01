import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import UsedPage from './Pages/UsedPage';
import AdminHome from './components/AdminHome/AdminHome';
import UserProfilepage from './Pages/UserProfilePage';
import RegisterAsCompanyPage from './Pages/RegisterAsCompanyPage';
import CompanyPage from './Pages/CompanyPage';
import VerifyAccountPage from './Pages/VerifyAccountPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/> ,
  },
  {
    path: "/used",
    element: <UsedPage/> ,
  },
  {
    path: "/login",
    element: <LoginPage/> ,
  },
  {
    path: "/signup",
    element: <RegisterPage/>,
  },
  {
    path: "/admin",
    element: <AdminHome/>,
  },
  {
    path: "/user-profile",
    element: <UserProfilepage/>
  },
  {
    path: "/register-as-company",
    element: <RegisterAsCompanyPage/>
  },
  {
    path: "/company",
    element: <CompanyPage/>
  },
  {
    path: "/verify-email",
    element: <VerifyAccountPage type="email"/>
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

