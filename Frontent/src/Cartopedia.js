import React from 'react'
import router from './router'
import store from './store'
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom"
import axios from 'axios'
import collections from './configurations/collections'
import { createContext } from 'react'

const UserContext = createContext()

const Cartopedia = () => {

  if (window.localStorage.getItem('token')) {
    axios.post(collections.server_base + '/get-user-details', { token: window.localStorage.getItem("token") }).then(({ data }) => {
      store.dispatch({ type: 'user', payload: { user: data } })
    })
  }

  return (
    <React.StrictMode>
      <UserContext.Provider value={{}}>
        <Provider store={store} >
          <RouterProvider router={router} />
        </Provider>
      </UserContext.Provider>
    </React.StrictMode>
  )
}



export default Cartopedia
