import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import { Overlay, AddButton } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';
import ModalCliente from '../../components/ModalCliente';
import { FaPlus } from "react-icons/fa";
import { format } from 'date-fns';

export default function Users() {

  const [overlay, setOverlay] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [confirmAdd, setConfirmAdd] = useState(false);

  const [user, setUser] = useState([] | null);
  const [idClick, setIdClick] = useState(1);

  const [filter, setFilter] = useState('');


  const toggleOverlay = useCallback(() => {
    setOverlay(!overlay)
  }, [overlay]);

  const toggleModalCliente = useCallback(() => {
    toggleOverlay()
    setAddModal(!addModal)
  }, [addModal, toggleOverlay]);

  const modules = AllCommunityModules

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('v1/cadastro')
      setUser(response.data.retorno)

    }
    loadUsers();
  }, [confirmAdd, idClick])

  const rowData = user

  const formatar = (params) => {
    const { value } = params;
    const data = new Date(value.substring(0, 10));
    const dateFormatted = format(data, 'dd/MM/yyyy');
    return dateFormatted;
  }

  function updateStateAdd() {
    setConfirmAdd(!confirmAdd);
  }


  const columns = [

    {
      headerName: 'ID', field: 'CLI_ID', checkboxSelection: true,
    },
    {
      headerName: 'Nome', field: 'CLI_NOME', flex: 1
    },
    {
      headerName: 'CPF', field: 'CLI_CNPJ_CPF', flex: 1
    },
    {
      headerName: 'Fone', field: 'CLI_FONE', flex: 1
    },
    {
      headerName: 'Data de Cadastro',
      field: 'CLI_DATACAD',
      valueFormatter: formatar,
      flex: 1
    },
    {
      headerName: 'Data de Nascimento', field: 'CLI_DATANASC',
      valueFormatter: formatar,
      flex: 1
    }
  ]

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  }

  let gridApi;
  let gridColumnApi;

  const onGridReady = params => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
  }

  const onSelectionChanged = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;

    const selectedRows = gridApi.getSelectedRows();
    console.log(selectedRows)

  };

  return (
    <>
      <Header
        filterValue={filter}
        onChangeFilterValue={(e) => setFilter(e.target.value)}
      >Clientes
      </Header>

      <div style={{ marginTop: '-25px' }} >
        <Link style={{ textDecoration: 'none' }} to="/cadastro">
          <AddButton >
            <FaPlus color='#4E2A77' size='23px' style={{ alignSelf: 'center', marginLeft: '10px' }} />
            <span>Novo Cliente</span>
          </AddButton>
        </Link>
      </div>

      <div
        className="ag-theme-alpine"
        style={{
          height: '800px',
          width: '100%',
        }}
      >
        <AgGridReact
          modules={modules}
          columnDefs={columns}
          rowData={rowData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection='single'
          rowDeselection='true'
          onSelectionChanged={onSelectionChanged}
        >
        </AgGridReact>

      </div>

      {
        overlay && addModal ?
          <>
            <Overlay>
              <ModalCliente
                onToggleModalCliente={toggleModalCliente}
                onConfirmAdd={updateStateAdd}
              />
            </Overlay>
          </>
          : <></>
      }
    </>
  );
}
