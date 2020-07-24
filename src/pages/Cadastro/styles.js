import styled from 'styled-components';
import { Form } from '@unform/web';

export const Overlay = styled.div`
position: fixed;
display: flex;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,0,0,0.7);
z-index: 1;
flex-direction: column;
`;

export const Container = styled.div`

  h4 {
    font-size: 18px;
    color: #999999;
    margin-left: 20px;

  }

  h5 {
    font-size: 14px;
    color: #999999;
    margin-left: 20px;
  }

  .line {
  margin-bottom: 8px;
  display: block; height: 1px;
  border: 0; border-top: 1px solid ;
  color: #999999;
  margin-top: 5px;
  max-width: 99%;
  }

  button {
    margin-right: 10px;
  }

  .group_buttons {
     display: flex;
     margin-bottom: 15px;
  }

`;




export const ClienteForm = styled(Form)`

  display: flex;
  margin: 40px 0px;

  span {
      color: #e65c00;
      align-self: flex-start;
      margin-left: 20px;
      font-weight: bold;
      font-size: 13px;
    }

  input {

    border-radius: 5px;
    display: block;
    background: #fff;
    color: black;
    font-size: 15px;
    border: 1px solid #a6a6a6;
    border-radius: 5px;
    resize: vertical;
    width: 90%;
    height: 30px;
    padding: 15px;
    margin-top: 5px;
    margin-right: 5px;
    margin-left: 20px;

    &:focus {
      box-shadow: 0 0 6px rgba(78,42,119,0.7);
      border: 1px solid rgba(78,42,119,0.7);
    }

  }

`;
