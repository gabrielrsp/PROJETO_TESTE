import React from 'react';

import { Container, AddButton, SearchInput, CheckBoxInput } from './styles';
import { FaPlus, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Header({ filterValue, onChangeFilterValue, onToggleCheckBox, onToggleModalAdd  }) {



  return (
    <Container>
      <div>
        <div className="contents">
          <div className="title" >
            <h1>Usuários</h1>
          </div>
          <div className="profile" >
         
            <Link to="/profile">
              <FaUserCircle color='#f26532' size={32} />
            </Link>
          </div>
        </div>
        <div className="control">
          <div className="inputBar">
            <FaSearch id='faSearch' />
            <SearchInput placeholder='Pesquisar' value={filterValue} onChange={onChangeFilterValue} />
          </div>
          <div className="searchAddBox">
            <div className="checkBoxContainer" >
              <CheckBoxInput type='checkbox'  onClick={onToggleCheckBox}  />
              <span className="spanCheckBox" >pesquisar por CPF</span>
            </div>
            <div>
              <AddButton className="addButton" onClick={onToggleModalAdd}   >
                <FaPlus color='#fff' size='25px' />
                <span>Adicionar</span>
              </AddButton>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}