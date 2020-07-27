import React from 'react';
import { FaBars, FaPlus, FaSearch, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { Container, Wrapper } from './styles';
import logo from '../../assets/logo.svg';

export default function Header(props) {

  return (
    <>
    <Wrapper >

    <FaBars onClick={ props.onToggleSideBar } color='#4E2A77' size='28px'  style={{ marginRight: '10px'}}  />
        <img src={logo} alt="saib" width="135px" style={{ marginTop: '0px', marginLeft: '10px' }} />
    </Wrapper>
      <Container>

        <div className="contents">
          <div className="title" >
            <h3>{props.children}</h3>
            <div style={{ textAlign: '-webkit-center' }} >
              <hr />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
