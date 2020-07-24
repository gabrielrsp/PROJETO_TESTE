import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { mask, unMask } from 'remask';

import { Container, AddForm, Line } from './styles';
import Input from '../Input';
import Select from '../Select'
import Button from '../Button';

import { FaTimes, FaCheck } from "react-icons/fa";

import api from '../../services/api';

export default function ModalEndereco(props) {

  const [cep, setCep] = useState('');

  const onChangeCep = event => {
    setCep(mask(unMask(formRef.current.getFieldValue('cep')), ['99999-999']));
  }

  const formRef = useRef(null);

  const options = [
    { value: '1', label: 'Residencial' },
    { value: '2', label: 'Comercial' },
    { value: '3', label: 'Alternativo' }
  ]

  const uf_options = [
    { value: 'AC', label: 'AC' },
    { value: 'AL', label: 'AL' },
    { value: 'AM', label: 'AM' },
    { value: 'AP', label: 'AP' },
    { value: 'BA', label: 'BA' },
    { value: 'CE', label: 'CE' },
    { value: 'DF', label: 'DF' },
    { value: 'ES', label: 'ES' },
    { value: 'GO', label: 'GO' },
    { value: 'MA', label: 'MA' },
    { value: 'MT', label: 'MT' },
    { value: 'MS', label: 'MS' },
    { value: 'MG', label: 'MG' },
    { value: 'PA', label: 'PA' },
    { value: 'PB', label: 'PB' },
    { value: 'PR', label: 'PR' },
    { value: 'PE', label: 'PE' },
    { value: 'PI', label: 'PI' },
    { value: 'RJ', label: 'RJ' },
    { value: 'RN', label: 'RN' },
    { value: 'RO', label: 'RO' },
    { value: 'RS', label: 'RS' },
    { value: 'RR', label: 'RR' },
    { value: 'SC', label: 'SC' },
    { value: 'SE', label: 'SE' },
    { value: 'SP', label: 'SP' },
    { value: 'TO', label: 'TO' },
  ]



  const customStyles = {
      control: (base, state) => ({
          ...base,
          height: '34px',
          width: '80px',
      }
      ),
  };

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: 'rgba(189,161,222,0.8)',
        primary: 'rgba(78,42,119,0.7)',
      }
    }
  }


  async function handleSubmit(formData) {
    try {

      formRef.current.setErrors({});

      const schema = Yup.object().shape({

        endereco: Yup.string().required('*Campo Obrigatório'),
        tipo_endereco: Yup.string().required('*Campo Obrigatório'),
        bairro: Yup.string().required('*Campo Obrigatório'),
        cep: Yup.string().required('*Campo Obrigatório'),
        cidade: Yup.string().required('*Campo Obrigatório'),
        uf: Yup.string().required('*Campo Obrigatório'),

      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const endereco = {
        cliente: {},
        docs: [{
          CLIE_CLI_ID: 0,
          CLIE_ID: 0,
          CLIE_TIPO: formData.tipo_endereco,
          CLIE_CEP: formData.cep,
          CLIE_ENDERECO: formData.endereco,
          CLIE_BAIRRO: formData.bairro,
          CLIE_CIDADE: formData.cidade,
          CLIE_UF: formData.uf,
        }
        ]
      }

      console.log(endereco)

      /*
      const response = await api.put('/v1/cadastro', endereco);
      props.onToggleModalEndereco()
      props.onConfirmAdd();
      props.onAddEndereco(formData);
      console.log(response);
      */

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

    <>



      <AddForm onSubmit={handleSubmit} ref={formRef} >

      <div className="modalHeader" >
        <h3>Formulário de Endereço</h3>
        <FaTimes color='#4E2A77' size='18px' onClick={props.onToggleModalEndereco} />
      </div>
      <Line />

        <div id="tei" style={{display: 'flex', marginBottom: '10px'}}>

        <div className="identity" >
          <h4>Logradouro</h4>
          <Input
            name="endereco"
            className="largeInput"
            type="text"
          />
        </div>

        <div className="identity" >
          <h4>Bairro</h4>
          <Input
            name="bairro"
            className="largeInput"
            type="text"
          />
        </div>

        <div className="cep" >
          <h4>CEP</h4>
          <Input
            name="cep"
            className="cep"
            type="text"
            onChange={onChangeCep}
            value={cep}
          />
        </div>

        <div className="cep" >
          <h4 >Cidade</h4>
          <Input
            className="largeInput"
            name="cidade"
            type="text"
          />
        </div>

        <div className="identity" >
        <h4>UF</h4>
          <Select
            name="uf"
            options={uf_options}
            theme={customTheme}
            styles={customStyles}
            placeholder="UF"
          />
        </div>

        <div className="identity" >
          <h4>Tipo</h4>
          <Select
            name="tipo_endereco"
            options={options}
            theme={customTheme}
            styles={customStyles}
            placeholder="Tipo"
          />
        </div>

        </div>

        <Button type="submit"  >
          <FaCheck color='#4E2A77' size='18px' />
          <span className="spanButton">Adicionar</span>
        </Button>

      </AddForm>

    </>

  );
}
