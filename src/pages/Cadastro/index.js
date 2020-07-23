import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import { mask, unMask } from 'remask';
import * as Yup from 'yup';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { FaSave, FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";

import { Overlay, Container, ClienteForm, AddButton } from './styles';
import DatePicker from '../../components/DatePicker';
import api from '../../services/api';
import Header from '../../components/Header';
import ModalEndereco from '../../components/ModalEndereco';
import { format } from 'date-fns';
import Input from '../../components/Input';

export default function Cadastro() {

  const [overlay, setOverlay] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const [confirmAdd, setConfirmAdd] = useState(false);

  const [cliente, setCliente] = useState([] | null);
  const [idClick, setIdClick] = useState(1);

  const [endereco, setEndereco] = useState([] | null);

  const [filter, setFilter] = useState('');

  const [cpf_cnpj, setCpf_cnpj] = useState('');
  const [fone, setFone] = useState('');

  const onChange_cpf_cnpj = event => {
    setCpf_cnpj(mask(unMask(formRef.current.getFieldValue('cpf_cnpj')), ['999.999.999-99', '99.999.999/9999-99']));
  }

  const onChangeFone = event => {
    setFone(mask(unMask(formRef.current.getFieldValue('fone')), ['(99) 9999-9999', '(99) 9 9999-9999']));
  }

  function FormataStringData(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '/' + ("0" + mes).slice(-2) + '/' + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  const formRef = useRef(null);

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

      const cliente = {
        cliente: {
          CLI_ID: 0,
          CLI_CNPJ_CPF: formData.cpf_cnpj,
          CLI_NOME: formData.nome,
          CLI_DATACAD: format(new Date(), 'yyyy/MM/dd'),
          CLI_DATANASC: format(formData.data_nasc, 'yyyy/MM/dd'),
          CLI_FONE: formData.fone,
        },
        docs: []
      }

      const response = await api.post('/v1/cadastro', cliente);
      toast.success('Cliente cadastrado!');

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

  const toggleModalEndereco = useCallback(() => {
    toggleOverlay()
    setAddModal(!addModal)
  }, [addModal, toggleOverlay]);

  const modules = AllCommunityModules

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('v1/cadastro')
      setCliente(response.data.retorno)

    }
    loadUsers();
  }, [confirmAdd, idClick])

  const rowData = []

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
      headerName: 'ID', field: 'CLIE_ID', checkboxSelection: true,
    },
    {
      headerName: 'Tipo', field: 'CLIE_TIPO', flex: 1
    },
    {
      headerName: 'Logradouro', field: 'CLIE_ENDERECO', flex: 1
    },
    {
      headerName: 'Bairro', field: 'CLIE_BAIRRO', flex: 1
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

  return (
    <Container>
      <Header
        filterValue={filter}
        onChangeFilterValue={(e) => setFilter(e.target.value)}
        onToggleModalEndereco={toggleModalEndereco}>
        Formulário de Cliente
      </Header>

      <h4>Dados Pessoais</h4>
      <div style={{ textAlign: '-webkit-center' }} >
        <hr className="line" />
      </div>

      <AddButton type="submit" className="addButton" onClick={handleSubmitCliente} form="my-form" >
        <FaSave color='#4E2A77' size='18px' style={{ alignSelf: 'center', marginLeft: '10px' }} />
        <span>Salvar Cadastro</span>
      </AddButton>

      <ClienteForm onSubmit={handleSubmitCliente} ref={formRef} id="my-form"  >
        <div className="identity" >
          <h5>Nome Completo:</h5>
          <Input
            name="nome"
            type="text"
            placeholder="Nome"
          />
        </div>

        <div className="identity" >
          <h5>CPF/CNPJ:</h5>
          <Input
            onChange={onChange_cpf_cnpj}
            name="cpf_cnpj"
            type="text"
            placeholder="CPF/CNPJ"
            value={cpf_cnpj}
          />
        </div>

        <div className="identity" >
          <h5>Telefone:</h5>
          <Input
            name="fone"
            placeholder="(XX) - XXXXX XXXX"
            onChange={onChangeFone}
            type="text"
            value={fone}
          />
        </div>

        <div >
          <h5>Data de Nascimento</h5>
          <DatePicker
            name="data_nasc"
            type="text"
          />
        </div>

      </ClienteForm>

      <h4>Endereços</h4>
      <div style={{ textAlign: '-webkit-center' }} >
        <hr className="line" />
      </div>

      <div style={{display: 'flex'}}>
        <AddButton type="submit" className="addButton" onClick={toggleModalEndereco} >
          <FaPlusCircle color='#4E2A77' size='18px' style={{ alignSelf: 'center', marginLeft: '10px' }} />
          <span>Novo Endereço</span>
        </AddButton>


        <AddButton type="submit" className="addButton" onClick={toggleModalEndereco} >
          <FaEdit color='#4E2A77' size='18px' style={{ alignSelf: 'center', marginLeft: '10px' }} />
          <span>Alterar Endereço</span>
        </AddButton>


        <AddButton type="submit" className="addButton" onClick={toggleModalEndereco} >
          <FaTrashAlt color='#4E2A77' size='18px' style={{ alignSelf: 'center', marginLeft: '10px' }} />
          <span>Excluir Endereço</span>
        </AddButton>
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
        >
        </AgGridReact>

      </div>

      {
        overlay && addModal ?
          <>
            <Overlay>
              <ModalEndereco
                onToggleModalEndereco={toggleModalEndereco}
                onConfirmAdd={updateStateAdd}
              />
            </Overlay>
          </>
          : <></>
      }
    </Container>
  );
}
