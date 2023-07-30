import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App, { navAction } from './App'
import './index.css'
import Search, { searchAction } from './layouts/Search'
import './media.css'
import NoData from './pages/NoData'
import Subjects, { subjectsLoader } from './pages/Subjects'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    action: navAction,
    errorElement: <NoData />,
  },
  {
    path: 'search',
    element: <Search />,
    action: searchAction,
    children: [{
      path: ':semester/:branch',
      element: <Subjects />,
      loader: subjectsLoader,
    }]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
