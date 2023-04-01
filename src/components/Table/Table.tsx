import React from "react"
import "./table.css"

function Table({ data, type, setSelectedProduct, setSelectedOrder, setSelectedCustomer }) {
	console.log("data param:", data)

	return (
		data.length === 0 ?
		<div className="nodata__table flex-row">No hay información en la base de datos</div>
		:
		<table className="admintable">
			
				{ 
				type === "products" && (
					<>
						<thead>
							<tr>
								<th style={{ width: "100px" }}>Foto</th>
								<th>Nombre del producto</th>
								<th>Tipo</th>
								<th>Categoría</th>
								<th>Stock</th>
								<th>Precio</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map(product => (
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
						</tbody>
					</>
					
				)}

				{ 
				type === "orders" && (
					<>					
						<thead>
							<tr>
								<th style={{ width: "100px" }}></th>
								<th>Email del comprador</th>
								<th>Estado</th>
								<th>Total</th>
								<th>Cantidad de items</th>
							</tr>
						</thead>
						<tbody>
							{ 
								data.map(order => (
									<tr key={order.uid} onClick={() => setSelectedOrder(order)} id={order.uid}>
										<td>
											<img src={order.status === 'delivered' ? 'check.png' : 'cancel.png'} alt="" style={{ width: '30px' }}/>
										</td>
										<td>{order.customer}</td>
										<td>{order.status}</td>
										<td>0</td>
										<td>{order.products.length}</td>
									</tr>
								))
							}
						</tbody>
					</>
				)}

				{ 
				type === "customers" && (
					<>					
						<thead>
							<tr>
								<th style={{ width: "100px" }}>Foto</th>
								<th>Nombre completo</th>
								<th>Email</th>
								<th style={{ width: "150px" }}>Items Carrito</th>
							</tr>
						</thead>
						<tbody>
							{ 
							
								data.map(customer => (
									<tr key={customer.uid} onClick={() => setSelectedCustomer(customer)} id={customer.uid}>
										<td>
											<img src={customer.avatar} alt="" />
										</td>
										<td>{customer.fullname}</td>
										<td>{customer.email}</td>
										<td>{customer.cart.length}</td>
									</tr>
								))
							}
						</tbody>
					</>
				)}
		</table>
	)
}

export default Table
