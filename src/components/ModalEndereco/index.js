import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { mask, unMask } from 'remask';

import { AddForm, AddButton, Line } from './styles';
import Input from '../Input';
import Select from '../Select'

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
        { value: 'Acre', label: 'Acre' },
        { value: 'Alagoas', label: 'Alagoas' },
        { value: 'Amapá', label: 'Amapá' },
        { value: 'Amazonas', label: 'Amazonas' },
        { value: 'Bahia', label: 'Bahia' },
        { value: 'Ceará', label: 'Ceará' },
        { value: 'Espírito Santo', label: 'Espírito Santo' },
        { value: 'Goiás', label: 'Goiás' },
        { value: 'Maranhão', label: 'Maranhão' },
        { value: 'Mato Grosso', label: 'Mato Grosso' },
        { value: 'Mato Grosso do Sul', label: 'Mato Grosso do Sul' },
        { value: 'Minas Gerais', label: 'Minas Gerais' },
        { value: 'Pará', label: 'Pará' },
        { value: 'Paraíba', label: 'Paraíba' },
        { value: 'Paraná', label: 'Paraná' },
        { value: 'Pernambuco', label: 'Pernambuco' },
        { value: 'Piauí', label: 'Piauí' },
        { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
        { value: 'Rio Grande do Norte', label: 'Rio Grande do Norte' },
        { value: 'Rio Grande do Sul', label: 'Rio Grande do Sul' },
        { value: 'Rondônia', label: 'Rondônia' },
        { value: 'Roraima', label: 'Roraima' },
        { value: 'São Paulo', label: 'São Paulo' },
        { value: 'Sergipe', label: 'Sergipe' },
        { value: 'Tocantins', label: 'Tocantins' },
    ]

    const customStyles = {
        control: (base, state) => ({
            ...base,
            height: '34px',
            width: '380px',
        }
        ),
    };


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
        <AddForm onSubmit={handleSubmit} ref={formRef} >

            <div style={{ display: 'flex', margin: '20px' }} >
                <h3>Formulário de Endereço</h3>
            </div>
                <Line/>

            <div style={{ margin: 'auto' }} >
                <div style={{ display: 'block' }}>

                </div>

                <div className="dates">
                    <div className="identity" >
                        <h4 >Endereco</h4>
                        <Input
                            name="endereco"
                            className="largeInput"
                            type="text"
                        />
                    </div>

                    <div className="identity" >
                        <h4>Tipo </h4>
                        <Select
                            name="tipo_endereco"
                            options={options}
                            styles={customStyles}
                            width='200px'
                        />
                    </div>
                </div>

                <div className="dates">
                    <div className="identity" >
                        <h4>CEP</h4>
                        <Input
                            name="cep"
                            className="largeInput"
                            type="text"
                            onChange={onChangeCep}
                            value={cep}
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
                </div>

                <div className="dates">
                    <div className="identity" >
                        <h4 >Cidade</h4>
                        <Input
                            className="largeInput"
                            name="cidade"
                            type="text"
                        />
                    </div>

                    <div className="identity" >
                        <h4 >UF</h4>
                        <Select
                            name="uf"
                            options={uf_options}
                            styles={customStyles}
                        />
                    </div>
                </div>


                <div className="buttons" >
                    <AddButton type="button" className="addButton" onClick={props.onToggleModalEndereco} >
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