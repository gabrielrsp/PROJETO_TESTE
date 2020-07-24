import React from 'react';
import { Container } from './styles';

function Button(props) {
  return (

    <Container onClick={props.onClick}>
      {props.children}
    </Container>

  );
}

export default Button;
