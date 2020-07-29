import React, { useEffect, useState, useCallback, useRef } from 'react';
import { mask, unMask } from 'remask';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { FaSave, FaTrashAlt, FaTimes } from "react-icons/fa";
import * as Yup from 'yup';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import { Overlay, Container, ClienteForm, Line } from './styles';

import Input from '../Input';
import DatePicker from '../DatePicker'
import api from '../../services/api';
import Button from '../../components/Button';

import ModalUpdateEndereco from '../../components/ModalUpdateEndereco';

export default function ModalAddCliente(props) {

  const [cpf_cnpj, setCpf_cnpj] = useState('');
  const [fone, setFone] = useState('');
  const [dataSelected, setDataSelected] = useState([]);

  const onChange_cpf_cnpj = event => {
    setCpf_cnpj(mask(unMask(formRef.current.getFieldValue('cpf_cnpj')), ['999.999.999-99', '99.999.999/9999-99']));
  }

  const onChangeFone = event => {
    setFone(mask(unMask(formRef.current.getFieldValue('fone')), ['(99) 9999-9999', '(99) 9 9999-9999']));
  }

  const formRef = useRef(null);

  const [overlay, setOverlay] = useState(false);

  const [modalEndereco, setModalEndereco] = useState(false);

  const [confirmAdd, setConfirmAdd] = useState(false);

  const [cliente, setCliente] = useState([] | null);
  const [idClick, setIdClick] = useState(1);

  const [endereco, setEndereco] = useState([]);

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
          CLI_FONE: unMask(formData.fone)
        },
        docs: []
      }

      await api.post('v1/cadastro', cliente);

      const response = await api.get('v1/cadastro');

      const { retorno } = response.data

      const clienteID = retorno.filter(registro => registro.CLI_CNPJ_CPF === formData.cpf_cnpj)

      const newEndereco = endereco

      const { CLI_ID } = clienteID[0]


      newEndereco.map(endereco => endereco.CLIE_CLI_ID = CLI_ID)

      setEndereco(newEndereco)

      const enderecoPost = {
        cliente: {},
        docs: endereco
      }

      await api.post('/v1/cadastro', enderecoPost);

      toast.success('Cliente cadastrado!');
      props.onToggleModalCliente();

      setCliente(cliente)
      props.onConfirmAdd();

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


  const toggleModalUpdateEndereco = useCallback(() => {
    toggleOverlay()
    setModalEndereco(false)
    setModalEndereco(true)
  }, [toggleOverlay]);

  const modules = AllCommunityModules;

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('v1/cadastro')

    }
    loadUsers();
  }, [cliente, endereco, confirmAdd, idClick])

  const rowData = endereco || [];

  function updateState() {
    setConfirmAdd(!confirmAdd);
  }

  const formatTipoEndereco = (params) => {
    const { value } = params;

    let data

    switch (value) {
      case '1':
        data = 'Residencial'
        break;
      case '2':
        data = 'Comercial'
        break;
      case '3':
        data = 'Cobrança'
        break;
    }

    return data
  }

  const columns = [

    {
      headerName: 'Tipo', field: 'CLIE_TIPO', flex: 1, checkboxSelection: true, valueFormatter: formatTipoEndereco,
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


  let gridApi;
  let gridColumnApi;


  function updateStateEndereco(newEndereco) {

    const [docs] = newEndereco.docs

    const novoEndereco = endereco.filter(endereco => endereco !== dataSelected[0])

    setEndereco([...novoEndereco, docs])

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

        <ClienteForm onSubmit={handleSubmitCliente} ref={formRef} id="cliente_form"  >

          <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <Button type="submit" onClick={handleSubmitCliente} form="cliente_form" >
              <FaSave color='#4E2A77' size='18px' />
              <span id="save">Salvar Cadastro</span>
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
                onChange={onChange_cpf_cnpj}
                name="cpf_cnpj"
                type="text"
                placeholder="CPF/CNPJ"
                value={cpf_cnpj}
              />
            </div>

            <div className="input-wrapper">
              <h5>Telefone:</h5>
              <Input
                name="fone"
                placeholder="(XX) - XXXXX XXXX"
                onChange={onChangeFone}
                type="text"
                value={fone}
              />
            </div>

            <div className="input-wrapper">
              <h5>Data de Nascimento</h5>
              <DatePicker
                name="data_nasc"
                type="text"
                required
              />
            </div>

          </div>

        </ClienteForm>

      </div>

      {
        overlay && modalEndereco ?
          <>
            <Overlay>
              <ModalUpdateEndereco
                rowDataSelected={dataSelected}
                returnEndereco={newEndereco => updateStateEndereco(newEndereco)}
                onToggleModalEndereco={toggleModalUpdateEndereco}
                onConfirmAdd={updateState}
              />
            </Overlay>
          </>
          : <></>
      }
    </Container>

  );
}
