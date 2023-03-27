import React from 'react'
import './App.css'
import './theme.css'

import { BrowserRouter as Ruter, Link, useLocation } from "react-router-dom"

import PanelOrders from './components/PanelOrders/PanelOrders'
import PanelProducts from './components/PanelProducts/PanelProducts'
import PanelCustomers from './components/PanelCustomers/PanelCustomers'

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const themeChangeHandler = () => {
  const adminpanel = document.getElementById('adminpanel')
  
  if (adminpanel?.classList.contains('dark-theme')) {
    adminpanel?.classList.replace("dark-theme", "light-theme");
  } else {
    adminpanel?.classList.replace("light-theme", "dark-theme");
  }
}

const signOutHandler = () => {
  console.log('Cerrar sesión');
}

function App() {
  let query = useQuery().get("tab");

  return (
    <section className='adminpanel dark-theme' id='adminpanel'>
      <article className='adminpanel__sidebar flex-column'>
        <div className='adminpanel__sidebar--top flex-column'>
          <p className='sidebar__logo'>logo</p>

          <div className='sidebar__menu flex-column'>
            <Link to="/cpanel?tab=products">
              <div className={`sidebar__menu--item flex-row ${query === 'products' && 'active'}`}>
                <img src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png" alt="" />
                <p>Productos</p>
              </div>
            </Link>

            <Link to="/cpanel?tab=orders">
              <div className={`sidebar__menu--item flex-row ${query === 'orders' && 'active'}`}>
                <img src="https://cdn-icons-png.flaticon.com/512/3496/3496156.png" alt="" />
                <p>Ordenes</p>
              </div>
            </Link>

            <Link to="/cpanel?tab=customers">
              <div className={`sidebar__menu--item flex-row ${query === 'customers' && 'active'}`}>
                <img src="https://icon-library.com/images/customer-icon/customer-icon-2.jpg" alt="" />
                <p>Clientes</p>
              </div>
            </Link>
          </div>
        </div>

        <div className='adminpanel__sidebar--bottom flex-column'>

          <div className='sidebar__menu--item flex-row' onClick={themeChangeHandler}>
            <img src="https://static-00.iconduck.com/assets.00/dark-theme-icon-512x512-185rlszm.png" alt=""/>
            <p>Modo oscuro</p>   
          </div>

          <div className='sidebar__menu--item flex-row' onClick={signOutHandler}>
            <img src="https://cdn-icons-png.flaticon.com/512/2767/2767155.png" alt="" />
            <p>Cerrar sesión</p>   
          </div>

        </div>
      </article>
      
      <article className='adminpanel__content'>
        { query === 'products' && <PanelProducts /> }
        { query === 'orders' && <PanelOrders /> }
        { query === 'customers' && <PanelCustomers /> }
        { query === null && <div><h2>Bienvenido!</h2>Seleccione una de las opciones del menú.</div> }
      </article>
    </section>
  )
}

export default App
