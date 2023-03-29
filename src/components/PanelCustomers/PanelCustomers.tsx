import React, { useEffect, useState } from "react"
import "./panelcustomers.css"

import { getData, updateData } from "../../services/firebase.service"
import Loading from "../Loading/Loading"
import Table from "../Table/Table"

function PanelCustomers() {
  const [customersData, setCustomersData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [selectedCustomer, setSelectedCustomer] = useState({})

  useEffect(() => {
    getData("customers").then(res => {
      setIsLoading(false)
      setCustomersData(res)
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
        <div className="panelcustomers__content--list">
          <Table data={customersData} type={"customers"} setSelectedCustomer={setSelectedCustomer} />
        </div>
        <div className="panelcustomers__content--details">

        {
          Object.keys(selectedCustomer).length === 0 ?
            <div className="nodata__table flex-row" style={{ fontSize: 14 }}>
              <p style={{ width: '200px', textAlign: 'center' }}>Seleccione un cliente para ver los detalles</p>
            </div>
            :
            <h4>Información del cliente</h4>
        }

        </div>
      </div>
    </div>
  );
}

export default PanelCustomers;
