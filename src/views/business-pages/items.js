import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { API_URL } from "../../utilities/constants";
import AddModal from "../business-components/add-modal";
import columnDefs from './../table-header/item-table.json';
import addItemFields from './../field-defs/item.json';
import { MdAddShoppingCart } from "react-icons/md";
import { Button } from "react-bootstrap";

const Items = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [category, setCategory] = useState([{"categoryId": 0, "name": "No category present"}]);

  useEffect(() => {
    fetch(API_URL + "items")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));

      fetch(API_URL + "categories")
      .then((result) => result.json())
      .then((category) => setCategory(category));

  }, []);

  const refreshGrid = () =>{
    fetch(API_URL + "items")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }

  return (
    <div>
      <div id="page-header" style={{'fontSize':'15px', color: 'var(--bs-white)' }}><MdAddShoppingCart /> Product {'>'} Items</div>
      <hr />
      <AddModal header="New Item" inputFields={addItemFields} api={API_URL + "items"} label="Add Item" options={category} />
      <Button onClick={refreshGrid}>Refresh</Button>
      <div className="ag-theme-alpine" style={{ width: "99%", height: "90vh" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={true}
          animateRows={true}
          rowSelection="single"
        />
      </div>
    </div>
  );
};

export default Items;
