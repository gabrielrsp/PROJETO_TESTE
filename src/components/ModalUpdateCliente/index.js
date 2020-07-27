import React, { useEffect, useState, useCallback, useRef } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { FaSave, FaPlusCircle, FaEdit, FaTimes } from "react-icons/fa";
import * as Yup from 'yup';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import { Overlay, Container, ClienteForm, Line } from './styles';

import Input from '../Input';
import DatePicker from '../DatePicker'
import api from '../../services/api';
import Button from '../../components/Button';
import ModalUpdateEndereco from '../../components/ModalUpdateEndereco';
import ModalAddEndereco from '../../components/ModalAddEndereco';

export default function ModalUpdateCliente(props) {

  const formRef = useRef(null);

  const [overlay, setOverlay] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [confirmAdd, setConfirmAdd] = useState(false);

  const [idClick] = useState(1);

  const [endereco, setEndereco] = useState([]);

  const [dataSelected, setDataSelected] = useState([]);

  async function handleSubmitCliente(formData) {
    try {

      formRef.current.setErrors({});

      const schema = Yup.object().shape({

        nome: Yup.string().required('*Campo Obrigatório'),
        cpf_cnpj: Yup.string().required('*Campo Obrigatório'),
        data_nasc: Yup.string().required('*Campo Obrigatório'),
        fone: Yup.string().required('*Campo Obrigatório'),

      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const newEndereco = endereco

      newEndereco.map(endereco => endereco.CLIE_CLI_ID = dataObj.CLI_ID)

      newEndereco.map(endereco => endereco.CLIE_ID = newEndereco.indexOf(endereco) + 1)

      setEndereco(newEndereco)


      if (dataObj.CLIENTE_E.length === 0) {

        newEndereco.map(endereco => endereco.CLIE_CLI_ID = dataObj.CLI_ID)

        setEndereco(newEndereco)

        const enderecoPost = {
          cliente: {},
          docs: endereco
        }

        await api.post('v1/cadastro', enderecoPost);

        const clientePost = {
          cliente: {
            CLI_ID: dataObj.CLI_ID,
            CLI_CNPJ_CPF: formData.cpf_cnpj,
            CLI_NOME: formData.nome,
            CLI_DATACAD: format(new Date(), 'yyyy/MM/dd'),
            CLI_DATANASC: format(formData.data_nasc, 'yyyy/MM/dd'),
            CLI_FONE: formData.fone
          },
          docs: endereco
        }


        //Apenas Modifica um cadastro já existente
        await api.put('v1/cadastro', clientePost);

        toast.success('Cliente Alterado!');
        props.onToggleModalCliente();
        props.onConfirmAdd();

      }

      else {

        const cliente = {
          cliente: {
            CLI_ID: dataObj.CLI_ID,
            CLI_CNPJ_CPF: formData.cpf_cnpj,
            CLI_NOME: formData.nome,
            CLI_DATACAD: format(new Date(), 'yyyy/MM/dd'),
            CLI_DATANASC: format(formData.data_nasc, 'yyyy/MM/dd'),
            CLI_FONE: formData.fone
          },
          docs: endereco
        }

        await api.put('v1/cadastro', cliente);

        toast.success('Cliente cadastrado!');
        props.onToggleModalCliente();
        props.onConfirmAdd();

      }

    }
    catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  const toggleOverlay = useCallback(() => {
    setOverlay(!overlay)
  }, [overlay]);


  const toggleModalAddEndereco = useCallback(() => {
    toggleOverlay()
    setAddModal(!addModal)
    setUpdateModal(false)
  }, [addModal, toggleOverlay]);

  const toggleModalUpdateEndereco = useCallback(() => {
    if (! window.enderecoCheckBox ||  window.enderecoCheckBox.length === 0) {
      toast.error("Selecione um endereço para alterar")
      return
    }

    toggleOverlay()
    setAddModal(false)
    setUpdateModal(true)
  }, [ toggleOverlay]);


  const modules = AllCommunityModules;

  useEffect(() => {
    async function loadEnderecos() {
      const [dataObj] = props.rowDataSelected;


      setEndereco(dataObj.CLIENTE_E)
      window.enderecoCheckBox = 0
    }
    loadEnderecos();
  }, [ props.rowDataSelected, confirmAdd, idClick])


  const selectedData = props.rowDataSelected;

  const [dataObj] = selectedData

  const data = new Date(dataObj.CLI_DATANASC.substring(0, 10));

  const cpf_cnpj = dataObj.CLI_CNPJ_CPF
  const nome = dataObj.CLI_NOME
  const data_nasc = data
  const fone = dataObj.CLI_FONE
  const id = dataObj.CLI_ID

  const editValues = {
    id,
    cpf_cnpj,
    nome,
    data_nasc,
    fone,
  }

  const rowData = endereco || [];

  function updateStateAdd() {
    setConfirmAdd(!confirmAdd);
  }

  const columns = [

    {
      headerName: 'Tipo', field: 'CLIE_TIPO', flex: 1, checkboxSelection: true
    },
    {
      headerName: 'Logradouro', field: 'CLIE_ENDERECO', flex: 1
    },
    {
      headerName: 'Bairro', field: 'CLIE_BAIRRO', flex: 1
    },
    {
      headerName: 'CEP', field: 'CLIE_CEP', flex: 1
    },
    {
      headerName: 'Cidade', field: 'CLIE_CIDADE', flex: 1
    },
    {
      headerName: 'UF', field: 'CLIE_UF', flex: 1
    },
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


  function updateStateEndereco(newEndereco) {

    const [docs] = newEndereco.docs

    const novoEndereco = endereco.filter(endereco => endereco.CLIE_ID !== docs.CLIE_ID)

    setEndereco([...novoEndereco, docs])

  }

  function addStateEndereco(newEndereco) {

    const [docs] = newEndereco.docs
    setEndereco([...endereco, docs])

  }


  const onSelectionChanged = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;

    const selectedRows = gridApi.getSelectedRows();

    setDataSelected(selectedRows);

    window.enderecoCheckBox = selectedRows

  };

  return (

    <Container>

      <div className="modalHeader" >
        <h3>Formulário de Cliente</h3>
        <FaTimes color='#4E2A77' size='20px' onClick={props.onToggleModalCliente} />
      </div>

      <div style={{ textAlign: '-webkit-center' }} >
        <Line />
      </div>

      <div className="grayBorder">

        <h4>Dados Pessoais</h4>
        <div style={{ textAlign: '-webkit-center' }} >
          <hr className="line" />
        </div>

        <ClienteForm initialData={editValues} onSubmit={handleSubmitCliente} ref={formRef} id="cliente_form"  >

          <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <Button type="submit" onClick={handleSubmitCliente} form="cliente_form" >
              <FaSave color='#4E2A77' size='18px' />
              <span>Salvar Cadastro</span>
            </Button>
          </div>

          <div id="wrapper" >

            <div className="input-wrapper">
              <h5>Nome Completo:</h5>
              <Input
                name="nome"
                type="text"
                placeholder="Nome"
              />
            </div>

            <div className="input-wrapper">
              <h5 >CPF/CNPJ:</h5>
              <Input
                name="cpf_cnpj"
                type="text"
                placeholder="CPF/CNPJ"

              />
            </div>

            <div className="input-wrapper">
              <h5>Telefone:</h5>
              <Input
                name="fone"
                placeholder="(XX) - XXXXX XXXX"
                type="text"

              />
            </div>

            <div className="input-wrapper">
              <h5>Data de Nascimento</h5>
              <DatePicker
                name="data_nasc"
                type="text"
              />
            </div>

          </div>

        </ClienteForm>

        <h4>Endereços</h4>
        <div style={{ textAlign: '-webkit-center' }} >
          <hr className="line" />
        </div>

        <div style={{ display: 'flex', marginTop: '10px', marginBottom: '25px', marginLeft: '20px' }}>

        <Button type="submit" onClick={toggleModalAddEndereco} >
            <FaPlusCircle color='#4E2A77' size='18px' />
            <span>Novo Endereço</span>
          </Button>


          {endereco.length ?
            <Button type="submit" onClick={toggleModalUpdateEndereco} >
              <FaEdit color='#4E2A77' size='18px' />
              <span>Alterar Endereço</span>
            </Button>
            : <></>
          }

        </div>

        <div
          className="ag-theme-alpine"
          style={{
            height: '380px',
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
            onSelectionChanged={onSelectionChanged}
          >
          </AgGridReact>

        </div>

      </div>

      {
        overlay && addModal ?
          <>
            <Overlay>
              <ModalAddEndereco
                rowDataSelected={dataSelected}
                returnEndereco={newEndereco => addStateEndereco(newEndereco)}
                onToggleModalEndereco={toggleModalAddEndereco}
                onConfirmAdd={updateStateAdd}
              />
            </Overlay>
          </>
          : <></>
      }

      {
        overlay && updateModal && window.enderecoCheckBox ?
          <>
            <Overlay>
              <ModalUpdateEndereco
                rowDataSelected={dataSelected}
                returnEndereco={newEndereco => updateStateEndereco(newEndereco)}
                onToggleModalEndereco={toggleModalUpdateEndereco}
                onConfirmAdd={updateStateAdd}
              />
            </Overlay>
          </>
          :
           <></>
      }
    </Container>

  );
}
