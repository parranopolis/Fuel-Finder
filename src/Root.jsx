import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from './Routes/Home.jsx'
import { MonsterErrorPage } from './Components/Error/RouterErrorPage.jsx'
import { ItemDetailView } from './Routes/ItemDetailView.jsx'
import { GetRoute } from './Routes/GetRoute.jsx'
import { FilteredItemsProvider, FilterProvider, RequestProvider } from './Contexts/Context.jsx'
import { NearbySearch } from './Routes/NearbySearch.jsx'
import { Landing } from './Components/Landing.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <MonsterErrorPage />

  },
  {
    path: 'ItemDetailView/:id',
    element: <ItemDetailView />,
    errorElement: <MonsterErrorPage />
  },
  {
    path: 'getRoute/:id/',
    element: <GetRoute />
  },
  {
    path: 'nearbySearch',
    element: <NearbySearch />
  },
  {
    path: '/findStore',
    element: <Home />
  }
])




root.render(
  <React.StrictMode>
    <RequestProvider>
      <FilterProvider>
        <FilteredItemsProvider>
          <RouterProvider router={router} />
        </FilteredItemsProvider>
      </FilterProvider>
    </RequestProvider>
  </React.StrictMode>
)
