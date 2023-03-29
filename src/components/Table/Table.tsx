import React from "react"
import "./table.css"

function Table({ data, type, setSelectedProduct, setSelectedOrder, setSelectedCustomer }) {
	console.log("data param:", data)

	return (
		data.length === 0 ?
		<div className="nodata__table flex-row">No hay información en la base de datos</div>
		:
		<table className="admintable">
			<thead>
				{ 
				type === "products" && (
					<tr>
						<th style={{ width: "100px" }}>Foto</th>
						<th>Nombre del producto</th>
						<th>Tipo</th>
						<th>Categoría</th>
						<th>Stock</th>
						<th>Precio</th>
					</tr>
				)}

				{ 
				type === "orders" && (
					<tr>
						<th>Email del comprador</th>
						<th>Estado</th>
						<th>Total</th>
						<th>Cantidad de items</th>
					</tr>
				)}

				{ 
				type === "customers" && (
					<tr>
						<th style={{ width: "100px" }}>Foto</th>
						<th>Nombre completo</th>
						<th>Email</th>
						<th style={{ width: "150px" }}>Items Carrito</th>
					</tr>
				)}
			</thead>

			<tbody>
				{
				type === "products" &&
					data.map((product) => (
						<tr key={product.uid} onClick={() => setSelectedProduct(product)} id={product.uid}>
							<td>
								<img src={product.photo} alt="" />
							</td>
							<td>{product.name}</td>
							<td>{product.type}</td>
							<td>{product.category}</td>
							<td>{product.stock}</td>
							<td>$ {product.price}</td>
						</tr>
					))
                }

				{ 
				type === "orders" && (
					data.map((order) => (
						<tr key={order.uid} onClick={() => setSelectedOrder(order)} id={order.uid}>
							<td>{order.customer}</td>
							<td>{order.status}</td>
							<td>0</td>
							<td>{order.products.length}</td>
						</tr>)
					))
				}

				{ 
				type === "customers" && (
					data.map((customer) => (
						<tr key={customer.uid} onClick={() => setSelectedCustomer(customer)} id={customer.uid}>
							<td>
								<img src={customer.avatar} alt="" />
							</td>
							<td>{customer.fullname}</td>
							<td>{customer.email}</td>
							<td>{customer.cart.length}</td>
						</tr>)
					))
				}
			</tbody>
		</table>
	)
}

export default Table
