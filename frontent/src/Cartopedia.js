import React from 'react'
import store from './store'
import router from './router'
import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom"

function  Cartopedia() {
  return (
      <React.StrictMode>
        <Provider store={store} >
          <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
  )
}

export default Cartopedia
