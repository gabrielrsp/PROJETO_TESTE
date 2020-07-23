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
    border-radius: 2px;
    resize: vertical;
    width: 90%;
    height: 30px;
    padding: 15px;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 20px;

    &:focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      border: 1px solid rgba(81, 203, 238, 1);
    }

  }

`;

export const AddButton = styled.button`

  display: flex;
  background:  transparent;
  margin-left: 20px;
  height:  34px;
  border:  2px solid #4E2A77;
  border-radius: 30px;
  text-align:  center;
  width:  160px;
  font-size:  14px;
  color:  #4E2A77;
  margin-bottom: 20px;

  span {
    display: flex;
    align-self: center;
    margin: auto;
    margin-left: 5px;
    margin-top: 8px;
    flex: 1;
    color: #4E2A77;
    text-align: center;
    font-weight: bold;
  }

  &:hover {
    background: #d9d9d9;
  }
  &:active {
    background: #b3b3b3;
  }
`;