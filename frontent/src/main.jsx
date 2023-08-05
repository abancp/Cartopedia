import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import UsedPage from './Pages/UsedPage';
import RegisterAsCompanyPage from './Pages/RegisterAsCompanyPage/RegisterAsCompanyPage';
import CompanyPage from './Pages/CompanyPage';
import VerifyAccountPage from './Pages/VerifyAccountPage';
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage';
import UserProfilePage from './Pages/UserProfilePage';
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
    path:"/user-profile",
    element:<UserProfilePage/>,
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
    element: <VerifyAccountPage/>
  },
  {
    path: "/search",
    element: <SearchResultPage/>
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

