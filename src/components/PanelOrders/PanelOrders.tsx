import React from "react";
import "./panelorders.css";

function PanelOrders() {
  return (
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
        <div className="panelorders__content--list">content__list</div>
        <div className="panelorders__content--details">
          <h4>Información de la orden</h4>
        </div>
      </div>
    </div>
  );
}

export default PanelOrders;
