import React, { useEffect, useState } from "react"
import "./panelorders.css"

import { getData, updateData } from "../../services/firebase.service"
import Loading from "../Loading/Loading"
import Table from "../Table/Table"

function PanelOrders() {
  const [ordersData, setOrdersData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [selectedOrder, setSelectedOrder] = useState({})

  useEffect(() => {
    getData("orders").then(res => {
      setIsLoading(false)
      setOrdersData(res)
    })
  }, [])

  return (
    isLoading === true ?
    <Loading />
    :
    <div className="panelorders flex-column">
      <div className="adminpanel__topbar flex-row">
        <div className="adminpanel__topbar--left flex-row">
          <h1>Ordenes</h1>
          <p>(120)</p>
        </div>
        <div className="adminpanel__topbar--right flex-row">
          <input type="text" name="" id="" placeholder="Buscar orden" />
        </div>
      </div>

      <div className="adminpanel__filterbar flex-row">
        <select name="" id="">
          <option value="" defaultValue={""}>
            Entregadas
          </option>
          <option value="">Sin entregar</option>
        </select>
      </div>

      <div className="panelorders__content">
        <div className="panelorders__content--list">
          <Table data={ordersData} type={"orders"} setSelectedProduct={setSelectedOrder} />
        </div>
        <div className="panelorders__content--details flex-column">

          {
            Object.keys(selectedOrder).length === 0 ?
            <div className="nodata__table flex-row" style={{ fontSize: 14 }}>
              <p style={{ width: '200px', textAlign: 'center' }}>Seleccione una orden para ver los detalles</p>
            </div>
            :
            <h4>Información de la orden</h4>
          }

        </div>
      </div>
    </div>
  );
}

export default PanelOrders;
