import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { API_URL } from "../../utilities/constants";
import AddModal from "../business-components/add-modal";
import columnDefs from './../table-header/customer-table.json';
import addItemFields from './../field-defs/customer.json';
import { FcManager } from "react-icons/fc";
import { Button } from "react-bootstrap";

const Customer = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); 

  useEffect(() => {
    fetch(API_URL + "customers")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));

  }, []);

  const refreshGrid = () =>{
    fetch(API_URL + "customers")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }

  return (
    <div>
      <div id="page-header" style={{'fontSize':'20px', color: 'var(--bs-white)' }}><FcManager /> Sales {'>'} Customer</div>
      <hr />
      <AddModal header="New Customer" inputFields={addItemFields} api={API_URL + "customers"} label="Add Customer" />
      <Button onClick={refreshGrid}>Refresh</Button>
      <div className="ag-theme-alpine" style={{ width: "99%", height: "85vh" }}>
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

export default Customer;
