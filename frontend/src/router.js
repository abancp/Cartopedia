import CartPage from './Pages/CartPage/CartPage'
import HomePage from './Pages/HomePage/HomePage'
import OrderPage from './Pages/OrdersPage/OrderPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import AdminHome from './Pages/AdminHome/AdminHome'
import LoadingPage from './Pages/LoadingPage/LoadingPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage'
import UserProfilePage from './Pages/UserProfilePage/UserProfilePage'
import ProductDetailed from './Pages/ProductDetailed/ProductDetailed'
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage'
import VerifyAccountPage from './Pages/VerifyAccountPage'
import RegisterAsCompanyPage from './Pages/RegisterAsCompanyPage/RegisterAsCompanyPage'
import AddCompanyProductPage from './Pages/AddCompanyProductPage/AddCompanyProductPage'
import { createBrowserRouter } from 'react-router-dom'

export default createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },  
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <RegisterPage />,
  },
  {
    path: "/user-profile/:type",
    element: <UserProfilePage />,
  },
  {
    path: "/register-as-company",
    element: <RegisterAsCompanyPage />
  },
  {
    path: "/add-company-product",
    element: <AddCompanyProductPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyAccountPage />
  },
  {
    path: "/search",
    element: <SearchResultPage />
  },
  {
    path: "/loading",
    element: <LoadingPage />
  },
  {
    path: "/product/:id",
    element: <ProductDetailed />
  },
  {
    path: "/admin",
    element: <h1>Admin</h1>
  },
  {
    path: "/admin/:page",
    element: <AdminHome />
  },
  {
    path: "/cart",
    element: <CartPage />
  },
  {
    path: "/place-order/:item",
    element: <PlaceOrderPage />
  },
  {
    path: "/orders/:userId",
    element: <OrderPage />
  }
])