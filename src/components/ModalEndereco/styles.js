import styled from 'styled-components';
import { Form } from '@unform/web';

export const SelectBox = styled.select`
    font-size: 15px;
    border: 0;
    border-radius: 3px;
    width: 180px !important;
    height: 34px;
    background: #e6e6e6; 
    color: black;
    font-size: 15px;
    margin-left: 10px;
    inline-size: auto;
    margin: 4px;

       option {
         color: black;
         background: white;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
       }
`;

export const Line = styled.hr`
  width: 96%;
  color: #4E2A77; 
  margin-top: -12px;
  display: block; height: 1px;
  border: 0; border-top: 1px solid ;
  color: #4E2A77; 
`;


export const AddButton = styled.button`

    background: #0099cc;
    margin-bottom: 8px;
    margin-left: 20px;
    margin-right: 0;

    border: 0;
    padding: 5px 10px;
    border-radius: 3px;


    &:hover {
      background: #0086b3;
    }
    &:active {
      background: #006080;
    }

    .addButton{
        color: #fff;
        flex: 1;
        text-align: center;
        font-weight: bold;
        display: contents;
        font-size: 20px;
      }
`;

export const AddForm = styled(Form)`
@media(max-width: 900px ) {
  width: 100%;
  height: 100%;
  margin: 0 !important;
 }
  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  background-color: #fff;
  z-index: 2;
  width: 900px;
  border-radius: 3px;
  margin-top: 30px !important;

  .dates {
    margin-top: 15px;
    display: flex;
    width: -webkit-fill-available;
  }

  span {
      color: #e65c00;
      align-self: flex-start;
      font-weight: bold;
      font-size: 13px;
    }


  div {
    align-self: flex-start !important;
    align-items: center;

    .cadastro {
    display: flex;
    align-self: flex-start !important;
    align-items: center;
    margin: 20px ;
    margin-bottom: 0;

  }
    .endereco {
      display: block;
    }

    .buttons {
      margin-top: 20px !important;
      text-align: end;
    }

  }


  input {

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
   

    &:focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      border: 1px solid rgba(81, 203, 238, 1);
    }
  }

  .identity {
    display: block;
    margin-bottom: 0;
    
    h4 {
      margin-left: 8px;
      color: #999999;
    }

    .endereco {
      width: 580px;
    }

    .largeInput {
      width: 380px;
    }

    .nome {
      width: 547px;
    }
  }


  .datepicker {
    display: block;
  }

  .title {
    align-self: flex-start ;
    margin-left: 46px;
    margin-top: 30px;
  }
  h4 {
    font-size: 15px;
    margin-top: 5px;
    color: black;
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
