import React, { useEffect, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { toast } from 'react-toastify';

import { Overlay, Container } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';
import ModalUpdateCliente from '../../components/ModalUpdateCliente';
import ModalAddCliente from '../../components/ModalAddCliente';
import Sidebar from '../../components/Sidebar';
import { FaPlus, FaSearch, FaEdit, FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";
import { format } from 'date-fns';

import Button from '../../components/Button';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import logoSaib from '../../assets/logoSaib.svg';
import logo from '../../assets/logo.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Clientes() {

  const [overlay, setOverlay] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [confirmAdd, setConfirmAdd] = useState(false);

  const [user, setUser] = useState([] | null);
  const [idClick] = useState(1);

  const [filter, setFilter] = useState('');

  const [dataSelected, setDataSelected] = useState([]);

  const [isToggled, setIsToggled] = useState(false);

  const toggleHandler = () => {
    setIsToggled(!isToggled)
  }

  const toggleOverlay = useCallback(() => {
    setOverlay(!overlay)
  }, [overlay]);

  const toggleAddModalCliente = useCallback(() => {
    toggleOverlay()
    setAddModal(!addModal)
  }, [addModal, toggleOverlay]);

  const toggleUpdateModalCliente = useCallback(() => {

    if (!window.value || window.value.length === 0) {

      toast.error("Selecione um cadastro para alterar")
      return
    }

    else {
      toggleOverlay()
      setUpdateModal(!updateModal)
    }


  }, [updateModal, toggleOverlay]);

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

  function formatDateToTable(data) {
    const newDate = new Date(data.substring(0, 10));
    const dateFormatted = format(newDate, 'dd/MM/yyyy');
    return dateFormatted;
  }

  function formatTipoEndereco(tipo) {

    let formatedTipo

    switch (tipo) {
      case '1':
        formatedTipo = 'Residencial'
        break;
      case '2':
        formatedTipo = 'Comercial'
        break;
      case '3':
        formatedTipo = 'Cobrança'
        break;
    }

    return formatedTipo
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

    setDataSelected(selectedRows);

    window.value = selectedRows

  };

  function generatePdf() {

    var docDefinition = {

      header: {
        alignment: 'left',
        margin: [20, 20, 10, 20],
        svg: logo(),
        fit: [100, 50]

      },

      pageMargins: [ 40, 60, 40, 80 ] ,

      content: formatPdf(),

      styles: {
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 10],
        },
        medium: {
          fontSize: 14,
          bold: true
        },
        small: {
          fontSize: 12,
          bold: true
        },

        table: {
          margin: [0, 10, 0, 20],
          widths: [65, 95, 95, 85, 95, 50],
        }
      }
    }
    pdfMake.createPdf(docDefinition).open();
  }

  function formatPdf() {

    let container = [


      '         ',

      {
        text: 'Relatório de Clientes',
        style: 'subheader',
        alignment: 'left',


      },

    ]

    user.map(user => {

      container.push(

        '   _______________________________________________________________________________________________',
        '         ',
        '         ',
        {
          text: `Cliente: ${user.CLI_NOME}`,
          style: 'medium'
        },

        {
          style: 'table',
          table: {
            widths: [120, 400],
            body: [
              ['ID', `${user.CLI_ID}`],
              ['CPF', `${user.CLI_CNPJ_CPF}`],
              ['Fone', `${user.CLI_FONE}`],
              ['Data de Nascimento', `${formatDateToTable(user.CLI_DATANASC)}`],
              ['Data de Cadastro', `${formatDateToTable(user.CLI_DATACAD)}`]
            ]
          }
        },
        '         ',
      )

      if (user.CLIENTE_E.length) {

        user.CLIENTE_E.map(endereco => {
          container.push(

            {
              text: `Endereço: `,
              style: 'small'
            },

            {
              style: 'table',
              table: {
                alignment: 'left',

                headerRows: 1,
                body: [
                  [{ text: 'Tipo' }, { text: 'Logradouro' }, { text: 'Bairro' }, { text: 'CEP' }, { text: 'Cidade' }, { text: 'UF' }],
                  [`${formatTipoEndereco(endereco.CLIE_TIPO)}`, `${endereco.CLIE_ENDERECO}`, `${endereco.CLIE_BAIRRO}`, `${endereco.CLIE_CEP}`, `${endereco.CLIE_CIDADE}`, `${endereco.CLIE_UF}`],
                ]
              },

            },

            '         ',
            '         ',
          )
        })
      }

    })

    return container

  }

  return (
    <>
      <Header
        filterValue={filter}
        onChangeFilterValue={(e) => setFilter(e.target.value)}
        onToggleSideBar={toggleHandler}
      >
        Cadastro de Clientes
      </Header>

      <Sidebar
        toggled={isToggled}
        closeSideBar={() => setIsToggled(false)}
      />

      <Container>

        <div style={{ display: 'flex', marginTop: '-25px', marginBottom: '10px', marginLeft: '20px' }}>
          <Button onClick={toggleAddModalCliente}>
            <FaPlus color='#4E2A77' size='18px' />
            <span>Novo Cliente</span>
          </Button>

          <Button onClick={toggleUpdateModalCliente}>
            <FaEdit color='#4E2A77' size='18px' />
            <span>Alterar Cadastro</span>
          </Button>

          <Button type="button" onClick={generatePdf}>
            <FaFilePdf color='#4E2A77' size='18px' />
            <span>Gerar Relatorio</span>
          </Button>

        </div>

      </Container>

      <div
        className="ag-theme-alpine"
        style={{
          height: '800px',
          width: '100%',
          padding: '10px',
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
              <ModalAddCliente
                onToggleModalCliente={toggleAddModalCliente}
                onConfirmAdd={updateStateAdd}
              />
            </Overlay>
          </>
          : <></>
      }

      {
        overlay && updateModal && dataSelected ?
          <>
            <Overlay>
              <ModalUpdateCliente
                rowDataSelected={dataSelected}
                onToggleModalCliente={toggleUpdateModalCliente}
                onConfirmAdd={updateStateAdd}
              />
            </Overlay>
          </>
          : <></>
      }
    </>
  );
}
