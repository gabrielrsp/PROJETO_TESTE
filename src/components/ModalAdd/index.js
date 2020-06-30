import React, { useRef, useEffect } from 'react';
import { AddForm } from './styles';
import { FaPlus } from "react-icons/fa";

export default function ModalAdd({ onAddModal, onAddUser, onChangeName, onChangeFone, onChangeCPFCNPJ, onChangeCep, onChangeDataCad, onChangeDataNasc, onChangeEndereco, onChangeBairro, onChangeCidade, onChangeUF }) {




  const useOutsideClick = (ref, callback) => {

    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {

        document.removeEventListener("click", handleClick);
      };
    });
  };

  const ref = useRef();

  useOutsideClick(ref, () => {
    onAddModal()
  });

  return (
    <AddForm onSubmit={onAddUser} ref={ref} >
      <div>
        <FaPlus style={{ marginRight: '5px' }} color="#f26532" size="25px" />
        <h2>Cadastrar Usuário</h2>
      </div>

      <h4 className="title" >Nome</h4>
      <input
        type="text"
        placeholder="Nome"
        onChange={onChangeName} autoFocus
      />

      <h4 className="title" >CPF/CNPJ</h4>
      <input
        type="text"
        placeholder="CPF/ CNPJ"
        onChange={onChangeCPFCNPJ}
      />

      <h4 className="title" >Fone</h4>
      <input
        placeholder="(XX) - XXXX XXXX"
        onChange={onChangeFone}
      />


    <h4 className="title"  >Data de Cadastro</h4>
      <input
        type="text"
        placeholder="dd/mm/aa"
        onChange={onChangeDataCad} 
      />

    <h4 className="title" >Data de Nascimento</h4>
          <input
            type="text"
            placeholder="dd/mm/aa"
            onChange={onChangeDataNasc} 
    />

    <div className="Address1" >

 
      <h4 className="title" >CEP</h4>
          <input
            type="text"
            onChange={onChangeCep} 
    />

      <h4 className="title" >Endereco</h4>
            <input
              type="text"
              onChange={onChangeEndereco} 
      />

      <h4 className="title" >Bairro</h4>
            <input
              type="text"
              onChange={onChangeBairro} 
      />

    </div>

    <div className="Location">

      <h4 className="title" >Cidade</h4>
            <input
              type="text"
              onChange={onChangeCidade} 
      />

      <h4 className="title" >UF</h4>
          <input
            type="text"
            onChange={onChangeUF} 
          />
      </div>


      
      <div className="button">
        <button type="button" className="addButton" onClick={onAddModal} >
          <span>Cancelar</span>
        </button>
        <button type="submit" className="addButton" >
          <span>Adicionar</span>
        </button>
      </div>
    </AddForm>
  );

}