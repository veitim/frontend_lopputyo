import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => {fetchData()}, []);

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => {
          console.error(error)
        })
    };

    const addCustomer = customers => {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customers)
      }
      fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', options)
      .then(fetchData)
      .catch(error => console.error(error))
    };

    const deleteCustomer = href => {
      if (!confirm('Press OK to delete')) {
        return;
      }
      const options = {
        method: 'delete'
      }
      fetch(href, options)
      .then(() => fetchData())
      .catch(error => console.error(error))
    };

    const editCustomer = (customer, link) => {
        const options = {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
        }
        fetch(link, options)
        .then(fetchData)
        .catch(error => console.error(error))
    };

    const defaultColDef = {
      filter: true,
      sortable: true,
      floatingFilter: true,
    };

    const autoSizeStrategy = {
      type: 'fitGridWidth',
      defaultMinWidth: 70,
      flex: 1,
    }

    const [columnDefs, setColumnDefs] = useState([
        {
          field: '_links.self.href',
          headerName: 'ID',
          cellDataType: 'number',
          width: 90,
          cellRenderer: ({value}) => value = value.substr(-4)
        },
        {field: 'firstname', cellDataType: 'text', width: 150},
        {field: 'lastname', cellDataType: 'text'},
        {field: 'email', cellDataType: 'text'},
        {field: 'phone', cellDataType: 'text'},
        {field: 'streetaddress', cellDataType: 'text'},
        {field: 'postcode', cellDataType: 'text', headerName: 'Postcode'},
        {field: 'city', cellDataType: 'text'},
        {
          field: '_links.self.href',
          filter: false,
          sortable: false,
          floatingFilter: false, 
          headerName: '',
          flex: 0.5,
          cellRenderer: row => <EditCustomer editCustomer={editCustomer} customer={row.data}/>
        },
        {
          field: '_links.self.href',
          filter: false,
          sortable: false,
          floatingFilter: false,  
          headerName: '',
          flex: 0.5,
          cellRenderer: ({value}) => <Button variant="outlined" color="error" onClick={() => deleteCustomer(value)}>Delete</Button>
        }
      ]);

    return (
      <>
        <div style={{textAlign: 'center'}}>
        <AddCustomer addCustomer={addCustomer}/>
            <div className="ag-theme-material" style={{width: 1500, height: 1000, textAlign: 'left'}}>
            <AgGridReact
              ref={gridRef}
              onGridReady={ params => gridRef.current = params.api }
              rowData={customers}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoSizeStrategy={autoSizeStrategy}
              rowSelection="single"
            />
            </div>
        </div>
      </>
    )
};

export default CustomerList;