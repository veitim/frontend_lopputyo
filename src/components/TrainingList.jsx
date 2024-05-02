import { useState, useEffect, useCallback, useRef} from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TrainingList() {

    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => {fetchData()}, []);

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(error => {
          console.error(error)
        })
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => {
          console.error(error)
        })
    };

    const addTraining = customers => {
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customers),
      }
      fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', options)
      .then(fetchData)
      .catch(error => console.error(error))
    };

    const deleteTraining = href => {
      if (!confirm('Press OK to delete')) {
        return;
      }
      const options = {
        method: 'delete'
      }
      fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/"+href, options)
      .then(() => fetchData())
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
      flex: 1
    }

    const [columnDefs, setColumnDefs] = useState([
        {
         field: 'id',
         headerName: 'ID',
         cellDataType: 'number',
         width: 90,  
        },
        {
         field: 'date',
         cellDataType: 'dateString',
         cellRenderer: ({value}) => value = dayjs(value).format("DD.MM.YYYY hh.mm a")
        },
        {field: 'duration', cellDataType: 'number'},
        {field: 'activity', cellDataType: 'text'},
        {
          field: 'customer.id', 
          headerName: 'Customer ID',
          cellDataType: 'text',
         },
        {
         field: 'customer.firstname', 
         headerName: 'Firstname',
         cellDataType: 'text',
        },
        {
         field: 'customer.lastname', 
         headerName: 'Lastname',
         cellDataType: 'text',
        },
        {
         field: 'id',
         sortable: false, 
         filter: false,
         floatingFilter: false,
         headerName: '',
         cellRenderer: ({value}) => <Button variant="outlined" color="error" onClick={() => deleteTraining(value)}>Delete</Button>
        }
      ]);

    return (
        <div style={{textAlign: 'center'}}>
          <AddTraining addTraining={addTraining} customer={customers}/>
            <div className="ag-theme-material" style={{width: 1400, height: 1000, textAlign: 'left'}}>
            <AgGridReact
              ref={gridRef}
              onGridReady={ params => gridRef.current = params.api }
              rowData={trainings}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoSizeStrategy={autoSizeStrategy}
              rowSelection="single"
            />
            </div>
        </div>
    )
};
 
export default TrainingList;