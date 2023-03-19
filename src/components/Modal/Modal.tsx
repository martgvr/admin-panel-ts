import { useState } from 'react'
import './modal.css'

function Modal({ productModalClose, saveData, refreshData }) {
  const [data, setData] = useState({})

  const changeHandler = (event) => setData({ ...data, [event.target.name]: event.target.value })    
  const addProductHandler = () => {
      const time = new Date()
      const timestamp = time.toLocaleString("es-AR")
      saveData('products', {...data, timestamp }).then(refreshData())
  }

  return (
      <div className='modal__container flex-row'>
          <div className='modal__content flex-column'>
              <div className='modal__content--header flex-row'>
              <div>Agregar nuevo producto</div>
              </div>
              <div className='modal__content--main flex-column'>
              <input type='text' name='name' id='name' className='textinput' placeholder='Nombre del producto' required onChange={changeHandler} />
              <input type='text' name='price' id='price' className='textinput' placeholder='Precio' required onChange={changeHandler} />
              <input type='text' name='stock' id='stock' className='textinput' placeholder='Stock' required onChange={changeHandler} />
              <input type='text' name='photo' id='photo' className='textinput' placeholder='URL de foto' required onChange={changeHandler} />
              
              <div className='adminpanel__filterbar flex-row'>
                  <select name="type" id="type" required onChange={changeHandler}>
                      <option value="" defaultValue={''} hidden>Tipo</option>
                      <option value="Escolar">Escolar</option>
                      <option value="Artistica">Artística</option>
                      <option value="Regaleria">Regalería</option>
                  </select>

                  <select name="category" id="category" required onChange={changeHandler}>
                      <option value="" defaultValue={''} hidden>Categoría</option>
                      <option value="Categoria 1">Categoría 1</option>
                      <option value="Categoria 2">Categoría 2</option>
                      <option value="Categoria 3">Categoría 3</option>
                      <option value="Categoria 4">Categoría 4</option>
                  </select>
              </div>

              </div>
              <div className='modal__content--footer flex-row'>
              <button onClick={productModalClose}>Cancelar</button>
              <button onClick={addProductHandler}>Agregar</button>
              </div>
          </div>
      </div>
  )
}

export default Modal