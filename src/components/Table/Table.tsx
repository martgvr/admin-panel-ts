import React from "react"
import "./table.css"

function Table({ data, type, setSelectedProduct, setSelectedOrder }) {
	console.log("data param:", data)

	return (
		<table className="admintable">
			<thead>
				{ type === "products" && (
					<tr>
						<th style={{ width: "100px" }}>Foto</th>
						<th>Nombre del producto</th>
						<th>Tipo</th>
						<th>Categoría</th>
						<th>Stock</th>
						<th>Precio</th>
					</tr>
				)}
				{ type === "orders" && (
					<tr>
						<th style={{ width: "100px" }}>ID</th>
						<th>Nombre del comprador</th>
						<th>Estado</th>
						<th>Total</th>
					</tr>
				)}
			</thead>

			<tbody>
				{type === "products" &&
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
				{type === "orders" && (
                    data.length === 0 ?
                        <tr>
                            <th colSpan={4} style={{ height: '60px', backgroundColor: '#f8f8f8', fontWeight: '100' }}>
                                No hay ordenes en la base de datos
                            </th>
                        </tr>
                        :
					data.map((product) => (
						<tr key={product.uid} onClick={() => setSelectedOrder(product)} id={product.uid}>
							<td>
								<img src={product.photo} alt="" />
							</td>
							<td>{product.name}</td>
							<td>{product.type}</td>
							<td>{product.category}</td>
							<td>{product.stock}</td>
							<td>$ {product.price}</td>
						</tr>)
					))
				}
			</tbody>
		</table>
	)
}

export default Table
