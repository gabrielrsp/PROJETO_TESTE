import React from 'react';
import { FaBars, FaPlus, FaSearch, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { Container, Wrapper } from './styles';
import logo from '../../assets/logo.svg';

export default function Header(props) {

  return (
    <>
      <Container>
        <Wrapper >

          <div style={{ display: 'flex', marginTop: '10px', }} >
            <FaBars onClick={props.onToggleSideBar} color='#4E2A77' size='28px' style={{ marginRight: '10px' }} />
            <h3>{props.children}</h3>
          </div>

          <img src={logo} alt="saib" width="135px" style={{ marginTop: '0px', marginLeft: '10px' }} />
        </Wrapper>

        <div style={{ textAlign: '-webkit-center' }} >
          <hr />
        </div>

      </Container>
    </>
  );
}
