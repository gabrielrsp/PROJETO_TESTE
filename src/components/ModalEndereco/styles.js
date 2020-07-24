import styled from 'styled-components';
import { Form } from '@unform/web';

export const Line = styled.hr`
  width: 97.6%;
  color: #4E2A77;
  margin-top: -12px;
  display: block; height: 1px;
  border: 0; border-top: 1px solid ;
  color: #4E2A77;
`;


export const AddForm = styled(Form)`

  @media(max-width: 1316px ) {
    width: 100%;
    height: 220px;

  }

  @media(max-width: 900px ) {
    height: 600px;

    #tei{
      display: block !important;
      width: inherit;

    input {
      width: 100%;
      margin: 0 20px;
    }
    }


  }

  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  background-color: #fff;
  z-index: 2;
  width: 1300px;
  height: 220px;
  border-radius: 3px;
  margin-top: 30px !important;
  padding-bottom: 40px;


  #wrapper {
    display: flex;
    margin-bottom: 10px;
  }


  button {
    align-self: flex-start;
    margin-left: 20px;
  }

  .modalHeader {
    display: flex;
    padding: 20px ;
    width: 100% ;

    svg {
      margin-left: auto;
    }

  }

  span {
      color: #e65c00;
      align-self: flex-start;
      font-weight: bold;
      font-size: 13px;
    }


  .spanButton {
    display: flex;
    align-self: center;
    margin-left: 3px;
    flex: 1;
    color: #4E2A77;
    text-align: center;
    font-weight: bold;

  }

  .identity {
    display: block;
    margin-bottom: 0;
  }

  .cep {
    display: block;
    margin-bottom: 0;

  }

  h4 {
    font-size: 15px;
    margin-top: 5px;
    margin-left: 3px;
      color: #999999;
  }

  h3 {
    font-size: 23px;
    margin-top: 3px;
    color: #4E2A77;
    font-weight: normal;
  }

  h2 {
    margin-top: 3px;
    margin-left: 5px;
    font-size: 25px;
    color: black;
  }

`;
