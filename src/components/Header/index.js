import React from 'react';

import { Container } from './styles';
import logo from '../../assets/logo.svg';

export default function Header(props) {

  return (
    <>
      <img src={logo} alt="saib" width="135px" style={{ marginTop: '10px', marginLeft: '10px' }} />
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
