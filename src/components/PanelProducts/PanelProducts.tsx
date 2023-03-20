import { useEffect, useState } from "react"
import "./panelproducts.css"

import { getData, saveData, deleteData } from "../../services/firebase.service"

import Table from "../Table/Table"
import Modal from "../Modal/Modal"
import Loading from "../Loading/Loading"

function PanelProducts() {
	const [selectedProduct, setSelectedProduct] = useState({})
	const [productData, setProductData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const [showModal, setShowModal] = useState(false)
	const [modalType, setModalType] = useState("")

	const activeDeleteButton = "invert(71%) sepia(51%) saturate(6983%) hue-rotate(347deg) brightness(106%) contrast(101%)"
	const inactiveDeleteButton = "invert(96%) sepia(0%) saturate(2%) hue-rotate(126deg) brightness(86%) contrast(91%)"

	const addProductModal = () => {
		setShowModal(true)
		setModalType("addProduct")
	}

	const deleteProductModal = () => {
		setShowModal(true)
		setModalType("deleteProduct")
	}

	const modalClose = () => setShowModal(false)

	const refreshData = () => {
		setShowModal(false)
		getData("products").then((response) => {
			setProductData(response)
			setIsLoading(false)
		})
	}

	const deleteProduct = () => {
		setShowModal(false)
		deleteData('products', selectedProduct.uid).then(refreshData())
	}

	useEffect(() => productData.length === 0 && refreshData(), [])

	useEffect(() => {
		if (Object.keys(selectedProduct).length !== 0 && !isLoading) {
			let activeProducts = document.getElementsByClassName("admintable__selected")[0]
			activeProducts !== undefined && activeProducts.classList.remove("admintable__selected")
			document.getElementById(selectedProduct.uid).classList.add("admintable__selected")
		}
	}, [selectedProduct])

	return isLoading === true ? (
		<Loading />
	) : (
		<div className="adminpanelproducts flex-column">
			{showModal === true && <Modal modalClose={modalClose} saveData={saveData} refreshData={refreshData} modalType={modalType}  selectedProduct={selectedProduct} deleteProduct={deleteProduct} />}

			<div className="adminpanel__topbar flex-row">
				<div className="adminpanel__topbar--left flex-row">
					<h1>Productos</h1>
					<p>({productData.length})</p>
				</div>

				<div className="adminpanel__topbar--right flex-row">
					<input type="text" name="" id="" placeholder="Buscar producto" />
					<button onClick={addProductModal}>Agregar producto</button>
				</div>
			</div>

			<div className="adminpanel__filterbar flex-row">
				<select name="" id="">
					<option value="" defaultValue={""} hidden>
						Tipo
					</option>
					<option value="">Escolar</option>
					<option value="">Artística</option>
					<option value="">Regalería</option>
				</select>

				<select name="" id="">
					<option value="" defaultValue={""} hidden>
						Categoría
					</option>
					<option value="">Categoría 1</option>
					<option value="">Categoría 2</option>
					<option value="">Categoría 3</option>
					<option value="">Categoría 4</option>
				</select>
				<button>+</button>
			</div>

			<div className="adminpanelproducts__content">
				<div className="content__list">
					<Table data={productData} type={"products"} setSelectedProduct={setSelectedProduct} />
				</div>

				{Object.keys(selectedProduct).length === 0 ? (
					<div className="content__details flex-column">
						<h5>Seleccione un producto para ver los detalles</h5>
					</div>
				) : (
					<div className="content__details flex-column">
						<h4>Detalles del producto</h4>
						<div className="details__photo flex-row">
							<div className="details__photo--photo" style={{ backgroundImage: `url(${selectedProduct.photo})` }}></div>
							<div className="details__photo--name flex-column">
								<div>
									<p>Nombre del producto:</p>
									<p>{selectedProduct.name}</p>
								</div>
								<div>
									<p>ID:</p>
									<p>{selectedProduct.uid}</p>
								</div>
							</div>
						</div>

						<div className="details__price flex-row">
							<div className="details__price--card flex-row">
								<img src="https://cdn-icons-png.flaticon.com/512/126/126169.png" alt="" />
								<div>
									<p>Precio unitario</p>
									<p>$ {selectedProduct.price}</p>
								</div>
							</div>

							<div className="details__price--card flex-row">
								<img src="https://cdn-icons-png.flaticon.com/512/5166/5166970.png" alt="" />
								<div>
									<p>Stock</p>
									<p>{selectedProduct.stock}</p>
								</div>
							</div>
						</div>

						<div className="details__timestamp flex-row">
							<img src="https://cdn-icons-png.flaticon.com/512/3917/3917267.png" alt="" />
							<p>
								Creado el: <b>{selectedProduct.timestamp}</b>
							</p>
						</div>

						<div className="details__delete flex-row">
							<button
								className="flex-row"
								style={{ filter: Object.keys(selectedProduct).length === 0 ? inactiveDeleteButton : activeDeleteButton }}
                                onClick={deleteProductModal}
							>
								<img src="https://cdn-icons-png.flaticon.com/512/542/542724.png" alt="" />
                                Eliminar producto
							</button>
						</div>
					</div>
				)}

				<div className="content__price">
					{Object.keys(selectedProduct).length === 0 ? (
						<div className="content__details flex-column">
							<h5>Seleccione un producto para modificar su precio y stock</h5>
						</div>
					) : (
						<div className="content__stock flex-column">
							<h4>Precio y stock</h4>

							<div>
								<div className="content__stock--row flex-column">
									<p>Precio unitario</p>
									<div className="flex-row">
										<input type="text" name="" id="" value={selectedProduct.price} />
										<img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="" />
									</div>
								</div>

								<div className="content__stock--row flex-column">
									<p>Stock</p>
									<div className="flex-row">
										<input type="text" name="" id="" value={selectedProduct.stock} />
										<img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" alt="" />
									</div>
								</div>
							</div>

							<button className="flex-row">
								<img src="https://cdn2.iconfinder.com/data/icons/picol-vector/32/accept-512.png" alt="" />
								Modificar producto
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PanelProducts
