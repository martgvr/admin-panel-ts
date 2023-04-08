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

  useEffect(() => {
		if (Object.keys(selectedOrder).length !== 0 && !isLoading) {
			let activeProducts = document.getElementsByClassName("admintable__selected")[0]
			activeProducts !== undefined && activeProducts.classList.remove("admintable__selected")
			document.getElementById(selectedOrder.uid).classList.add("admintable__selected")
			// setNewData({ price: selectedOrder.price, stock: selectedOrder.stock })
		}
	}, [selectedOrder])

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
          <Table data={ordersData} type={"orders"} setSelectedOrder={setSelectedOrder} />
        </div>
        <div className="panelorders__content--details flex-column">

          {
            Object.keys(selectedOrder).length === 0 ?
            <div className="nodata__table flex-row" style={{ fontSize: 14 }}>
              <p style={{ width: '200px', textAlign: 'center' }}>Seleccione una orden para ver los detalles</p>
            </div>
            :
            <div className="order__details flex-column">

              <div className="order__details--top flex-column">
                <h4>Información de la orden</h4>

                <div className="flex-column">
                  <p className="order__details--heading">Email del cliente</p>
                  <p className="order__details--text">{selectedOrder.customer}</p>
                  <p className="order__details--heading">ID de orden</p>
                  <p className="order__details--text">{selectedOrder.uid}</p>
                </div>

                <div className="flex-row">
                  <img src="https://cdn-icons-png.flaticon.com/512/3917/3917267.png" alt="" className="order__details--icon"/>
                  <p className="order__details--heading">Generada el: <b>13/3/2023, 01:16:24</b></p>
                </div>

                <div className="flex-column">
                  <p className="order__details--heading">Items en orden</p>
                </div>

                <div className="flex-row">
                  <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/truck-512.png" alt="" className="order__details--icon"/>
                  <p className="order__details--heading">Estado de orden: <b>Sin enviar</b></p>
                </div>
              </div>

              <div className="order__details--bottom flex-row">
                <div className="details__delete flex-row">
                  <button className="flex-row">
                    <img src="https://cdn.onlinewebfonts.com/svg/img_411213.png" alt="" />
                    Cambiar estado de orden
                  </button>
                </div>
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  );
}

export default PanelOrders;
