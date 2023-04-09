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
		getData("customers").then((res) => {
			setIsLoading(false)
			setCustomersData(res)
		})
	}, [])

	useEffect(() => {
		if (Object.keys(selectedCustomer).length !== 0 && !isLoading) {
			let activeProducts = document.getElementsByClassName("admintable__selected")[0]
			activeProducts !== undefined && activeProducts.classList.remove("admintable__selected")
			document.getElementById(selectedCustomer.uid).classList.add("admintable__selected")
			// setNewData({ price: selectedOrder.price, stock: selectedOrder.stock })
		}
	}, [selectedCustomer])

	return isLoading === true ? (
		<Loading />
		) : (
		<div className="panelcustomers flex-column">
			<div className="adminpanel__topbar flex-row">
				<div className="adminpanel__topbar--left flex-row">
					<h1>Clientes</h1>
					<p>({customersData.length})</p>
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
					{ Object.keys(selectedCustomer).length === 0 ? (
						<div className="nodata__table flex-row" style={{ fontSize: 14 }}>
							<p style={{ width: "200px", textAlign: "center" }}>Seleccione un cliente para ver los detalles</p>
						</div>
						) : (
							
						<div className="content__details flex-column">
							<h4>Información del cliente</h4>

							<div className="details__photo flex-row">
								<div className="details__photo--photo" style={{ backgroundImage: `url(${selectedCustomer.avatar})` }}></div>
								<div className="details__photo--name flex-column">
									<div>
										<p>Nombre completo:</p>
										<p>{selectedCustomer.fullname}</p>
									</div>
									<div>
										<p>Email:</p>
										<p>{selectedCustomer.email}</p>
									</div>
								</div>
							</div>

							<div className="panelcustomers__details flex-column">
								<div className="panelcustomers__details--block flex-column">
									<p className="order__details--heading">ID del cliente</p>
									<p className="order__details--text">{selectedCustomer.uid}</p>
									<p className="order__details--heading">Elementos en carrito</p>
									<p className="order__details--text">{selectedCustomer.cart.length}</p>
								</div>
								<div className="panelcustomers__details--block flex-column">
									<p className="order__details--heading" style={{ marginTop: '10px' }}>Dirección</p>
									<p className="order__details--text">{selectedCustomer.address}</p>
									<p className="order__details--heading">Código de área</p>
									<p className="order__details--text">{selectedCustomer.areacode}</p>
									<p className="order__details--heading">Teléfono</p>
									<p className="order__details--text">{selectedCustomer.telephone}</p>
								</div>
							</div>

							<div className="details__delete flex-row">
								<button className="flex-row">
									<img src="https://icons.veryicon.com/png/o/miscellaneous/jt2/reset-filter-1.png" alt="" />
									Resetear contraseña
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PanelCustomers
