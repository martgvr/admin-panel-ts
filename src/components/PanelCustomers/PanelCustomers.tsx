import React, { useEffect, useState } from "react"
import "./panelcustomers.css"

import { getData, updateData } from "../../services/firebase.service"
import Loading from "../Loading/Loading"

function PanelCustomers() {
  const [customersData, setCustomersData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData("customers").then(res => {
      setIsLoading(false)
      console.log('response:', res)
    })
  }, [])

  return (
    isLoading === true ?
    <Loading />
    :
    <div className="panelcustomers flex-column">
      <div className="adminpanel__topbar flex-row">
        <div className="adminpanel__topbar--left flex-row">
          <h1>Clientes</h1>
          <p>(850)</p>
        </div>
        <div className="adminpanel__topbar--right flex-row">
          <input type="text" name="" id="" placeholder="Buscar cliente" />
        </div>
      </div>

      <div className="panelcustomers__content">
        <div className="panelcustomers__content--list">content__list</div>
        <div className="panelcustomers__content--details">
          <h4>Información del cliente</h4>
        </div>
      </div>
    </div>
  );
}

export default PanelCustomers;
