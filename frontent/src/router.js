import HomePage from './Pages/HomePage/HomePage'
import UsedPage from './Pages/UsedPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import LoadingPage from './Pages/LoadingPage/LoadingPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import UserProfilePage from './Pages/UserProfilePage'
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage'
import VerifyAccountPage from './Pages/VerifyAccountPage'
import RegisterAsCompanyPage from './Pages/RegisterAsCompanyPage/RegisterAsCompanyPage'
import AddCompanyProductPage from './Pages/AddCompanyProductPage/AddCompanyProductPage'
import { createBrowserRouter } from 'react-router-dom'

export default  createBrowserRouter([
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
      path: "/add-company-product",
      element: <AddCompanyProductPage/>,
    },
    {
      path: "/verify-email",
      element: <VerifyAccountPage/>
    },
    {
      path: "/search",
      element: <SearchResultPage />
    },
    {
      path: "/loading",
      element: <LoadingPage/>
    }
])