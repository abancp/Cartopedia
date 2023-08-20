import { createBrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import UsedPage from './Pages/UsedPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import LoadingPage from './Pages/LoadingPage/LoadingPage'
import CompanyPage from './Pages/CompanyPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import UserProfilePage from './Pages/UserProfilePage'
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage'
import VerifyAccountPage from './Pages/VerifyAccountPage'
import RegisterAsCompanyPage from './Pages/RegisterAsCompanyPage/RegisterAsCompanyPage'

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
    },
    {
      path: "/loading",
      element: <LoadingPage/>
    }
])