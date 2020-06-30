import React, { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';
import { Overlay , Item, UserList  } from './styles';

import ModalAdd from '../../components/ModalAdd';

export default function Users() {

    const [user, setUser] = useState([]);
    const [idClick, setIdClick] = useState(1);
    
    const [checkBox, setCheckBox] = useState(false);
    const [filter, setFilter] = useState('');


    const [overlay, setOverlay] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const [newName, setNewName] = useState('');
    const [newFone, setNewFone] = useState('');
    const [newCPFCNPJ, setNewCPFCNPJ] = useState('');

    
    const [newDataCad, setNewDataCad] = useState('');
    const [newDataNasc, setNewDataNasc] = useState('');
    const [newCep, setNewCep] = useState('');

    const [newEndereco, setNewEndereco] = useState('');
    const [newBairro, setNewBairro] = useState('');
    const [newCidade, setNewCidade] = useState('');
    const [newUF, setNewUF] = useState('');


    useEffect(() => {
        async function loadUsers() {
          const response = await api.get('v1/cadastro')
          setUser(response.data.retorno)
        }
        loadUsers();
      }, [idClick])

      function toggleCheckBox() {
        setCheckBox(!checkBox)
      }


      const toggleOverlay = useCallback(() => {
        setOverlay(!overlay)
      }, [overlay]);


      const toggleModalAdd = useCallback(() => {
        toggleOverlay()
        setAddModal(!addModal)
      }, [addModal, toggleOverlay]);


  return(
    <>
    <Header
            filterValue={filter}
            onChangeFilterValue={(e) => setFilter(e.target.value)}
            onToggleCheckBox={toggleCheckBox}
            onToggleModalAdd={toggleModalAdd}
    />

    <UserList>

    {

    filter.trim() ?

        checkBox ?

    user.filter(user => (user.CLI_CNPJ_CPF.toLowerCase().includes(filter.toLowerCase().trim())))
        .map(user => (
        <>
        <Item >
        
        <h2> Nome:  {user.CLI_NOME}</h2>
        <p> <strong> CNPJ/CPF: </strong>  {user.CLI_CNPJ_CPF}</p>
        <p> <strong> Data de Cadastro: </strong>  {user.CLI_DATACAD}</p>
        <p> <strong> Dada de Nascimento: </strong>  {user.CLI_DATANASC}</p>
        <p> <strong> Fone: </strong>  {user.CLI_FONE}</p>

        <h2>Endereços</h2>

        <UserList>
            {
                user.CLIENTE_E.map( endereco => 
                <div>
                <div>
                    <h4> <strong> Endereço do Tipo: </strong>  {endereco.CLIE_TIPO}</h4>
                    <p> <strong> CEP: </strong> {endereco.CLIE_CEP}</p>
                    <p> <strong> Endereço: </strong> {endereco.CLIE_ENDERECO}</p>
                    <p> <strong> Bairro: </strong> {endereco.CLIE_BAIRRO}</p>
                    <p> <strong>Cidade: </strong> {endereco.CLIE_CIDADE}</p>
                    <p> <strong>UF: </strong> {endereco.CLIE_UF}</p>
                </div>       
                </div>
                )
            }
        </UserList>
    </Item>
        </>
        ))

  :

  user.filter(user => (user.CLI_NOME.toLowerCase().startsWith(filter.toLowerCase().trim())))
    .map(user => (
      <>
        <Item >
    
    <h2> Nome:  {user.CLI_NOME}</h2>
    <p> <strong> CNPJ/CPF: </strong>  {user.CLI_CNPJ_CPF}</p>
    <p> <strong> Data de Cadastro: </strong>  {user.CLI_DATACAD}</p>
    <p> <strong> Dada de Nascimento: </strong>  {user.CLI_DATANASC}</p>
    <p> <strong> Fone: </strong>  {user.CLI_FONE}</p>

    <h2>Endereços</h2>

    <UserList>
        {
            user.CLIENTE_E.map( endereco => 
            <div>
            <div>
                <h4> <strong> Endereço do Tipo: </strong>  {endereco.CLIE_TIPO}</h4>
                <p> <strong> CEP: </strong> {endereco.CLIE_CEP}</p>
                <p> <strong> Endereço: </strong> {endereco.CLIE_ENDERECO}</p>
                <p> <strong> Bairro: </strong> {endereco.CLIE_BAIRRO}</p>
                <p> <strong>Cidade: </strong> {endereco.CLIE_CIDADE}</p>
                <p> <strong>UF: </strong> {endereco.CLIE_UF}</p>
            </div>       
            </div>
            )
        }
    </UserList>
  </Item>
      </>
    ))
:

user.map(user => (
  <>
     <Item >
    
    <h2> Nome:  {user.CLI_NOME}</h2>
    <p> <strong> CNPJ/CPF: </strong>  {user.CLI_CNPJ_CPF}</p>
    <p> <strong> Data de Cadastro: </strong>  {user.CLI_DATACAD}</p>
    <p> <strong> Dada de Nascimento: </strong>  {user.CLI_DATANASC}</p>
    <p> <strong> Fone: </strong>  {user.CLI_FONE}</p>

    <h2>Endereços</h2>

    <UserList>
        {
            user.CLIENTE_E.map( endereco => 
            <div>
            <div>
                <h4> <strong> Endereço do Tipo: </strong>  {endereco.CLIE_TIPO}</h4>
                <p> <strong> CEP: </strong> {endereco.CLIE_CEP}</p>
                <p> <strong> Endereço: </strong> {endereco.CLIE_ENDERECO}</p>
                <p> <strong> Bairro: </strong> {endereco.CLIE_BAIRRO}</p>
                <p> <strong>Cidade: </strong> {endereco.CLIE_CIDADE}</p>
                <p> <strong>UF: </strong> {endereco.CLIE_UF}</p>
            </div>       
            </div>
            )
        }
    </UserList>
  </Item>
  </>
))
}

</UserList>

{
        overlay && addModal ?
          <>
            <Overlay>
              <ModalAdd
                onAddModal={toggleModalAdd}
                onChangeName={e => setNewName(e.target.value)}
                onChangeFone={e => setNewFone(e.target.value)}
                onChangeCPFCNPJ={e => setNewCPFCNPJ(e.target.value)}
                onChangeDataCad={e => setNewDataCad(e.target.value)}
                onChangeDataNasc={e => setNewDataNasc(e.target.value)}

                onChangeCep={e => setNewCep(e.target.value)}
                onChangeEndereco={e => setNewEndereco(e.target.value)}
                onChangeBairro={e => setNewBairro(e.target.value)}
                onChangeCidade={e => setNewCidade(e.target.value)}
                onChangeUF={e => setNewUF(e.target.value)}

              />
            </Overlay>
          </>
          : <></>
      }


</>

);
}
