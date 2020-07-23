import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { mask, unMask } from 'remask';
import { FaPlus } from "react-icons/fa";

import { AddForm, AddButton } from './styles';
import Input from '../Input';
import DatePicker from '../DatePicker'

import api from '../../services/api';

export default function ModalCliente(props) {

  const [cpf_cnpj, setCpf_cnpj] = useState('');
  const [fone, setFone] = useState('');

  const onChange_cpf_cnpj = event => {
    setCpf_cnpj(mask(unMask(formRef.current.getFieldValue('cpf_cnpj')), ['999.999.999-99', '99.999.999/9999-99']));
  }

  const onChangeFone = event => {
    setFone(mask(unMask(formRef.current.getFieldValue('fone')), ['(99) 9999-9999', '(99) 9 9999-9999']));
  }

  const formRef = useRef(null);

  function FormataStringData(data) {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];

    return ano + '/' + ("0" + mes).slice(-2) + '/' + ("0" + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  async function handleSubmit(formData) {
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
      props.onToggleModalCliente()
      props.onConfirmAdd();
      props.onAddUser(formData);
      console.log(response);

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

  return (
    <AddForm onSubmit={handleSubmit} ref={formRef} >

      <div style={{ display: 'flex', margin: '20px' }} >
        <FaPlus style={{ marginRight: '5px' }} color="#4E2A77" size="25px" />
        <h3>Cadastrar Cliente</h3>
      </div>

      <div className="form" >
        <div style={{ display: 'block' }}>

          <div className="dates" >

            <div className="identity" >
              <h4 >Nome</h4>
              <Input
                className="nome"
                name="nome"
                type="text"
                placeholder="Nome"
              />
            </div>

            <div className="datepicker" >
              <h4>Data de Nascimento</h4>
              <DatePicker
                name="data_nasc"
                type="text"
              />
            </div>

          </div>

          <div className="dates" >
            <div className="identity" >
              <h4 >Fone</h4>
              <Input
                className="largeInput"
                name="fone"
                placeholder="(XX) - XXXXX XXXX"
                onChange={onChangeFone}
                type="text"
                value={fone}
              />
            </div>

            <div className="identity" >
              <h4  >CPF/CNPJ</h4>
              <Input
                className="largeInput"
                onChange={onChange_cpf_cnpj}
                name="cpf_cnpj"
                type="text"
                placeholder="CPF/CNPJ"
                value={cpf_cnpj}
              />
            </div>

          </div>
        </div>

        <div className="buttons" >
          <AddButton type="button" className="addButton" onClick={props.onToggleModalCliente} >
            <span className="addButton" >Cancelar</span>
          </AddButton>
          <AddButton type="submit" className="addButton" >
            <span className="addButton" >Adicionar</span>
          </AddButton>
        </div>
      </div>

    </AddForm>
  );
}