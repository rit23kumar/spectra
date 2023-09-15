import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { API_URL } from "../../utilities/constants";
import AddModal from "../business-components/add-modal";
import { MdCategory } from 'react-icons/md';
import columnDefs from './../table-header/prod-cat-table.json';
import addCategoryFields from './../field-defs/product-category.json';
import { Button } from "react-bootstrap";

const ProductCategory = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  useEffect(() => {
    fetch(API_URL + "categories")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const refreshGrid = () =>{
    fetch(API_URL + "categories")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }

  return (
    <div>
      <div id="page-header" style={{'fontSize':'15px', color: 'var(--bs-white)' }}><MdCategory /> Product {'>'} Category</div>
      <hr />
      <AddModal header="New Category" inputFields={addCategoryFields} api={API_URL + "categories"} label="Add Category" />
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

export default ProductCategory;
