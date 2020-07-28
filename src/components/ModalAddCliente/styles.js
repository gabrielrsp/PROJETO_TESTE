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


@media(max-width: 1316px ) {
    width: 100%;
  }

  @media(max-width: 900px ) {
    height: 977px;


    #wrapper {
        display: block !important;
    }

  }

  #wrapper {
        display: flex;
    }

  align-items: center;
  align-self: center;
  flex-direction: column;
  background-color: #fff;
  z-index: 2;
  width: 1200px;
  border-radius: 3px;
  max-width: 95%;


h3 {
    font-size: 23px;
    margin-top: 3px;
    color: #4E2A77;
    font-weight: normal;
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
  max-width: 99.6%;
  }

  button {
    margin-right: 10px;
  }

#save {
    display: flex;
    align-self: center;
    margin-left: 3px;
    flex: 1;
    color: #4E2A77;
    text-align: center;
    font-weight: bold;
}

  .grayBorder {
    border: 1px solid rgba(191,191,191,0.8);
    border-radius: 5px;

    padding: 8px;
    padding-top: 25px;
    margin: 10px;

  }


  .modalHeader {
    display: flex;
    padding: 20px ;
    width: 100% ;

    svg {
      margin-left: auto;
    }
  }

`;


export const ClienteForm = styled(Form)`

  display: block;
  margin-top: 20px;
  margin-bottom: 20px;

  span {
      color: #e65c00;
      align-self: flex-start;
      margin-left: 20px;
      font-weight: bold;
      font-size: 13px;
    }


    .input-wrapper{
      margin-bottom: 15px;
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
    margin-left: 20px;

    &:focus {
      box-shadow: 0 0 6px rgba(78,42,119,0.7);
      border: 1px solid rgba(78,42,119,0.7);
    }
  }

`;


export const Line = styled.hr`

  margin-bottom: 8px;
  display: block; height: 1px;
  border: 0; border-top: 1px solid ;
  color: #4E2A77;
  margin-top: 5px;
  max-width: 98%;

  margin-top: -12px;
  margin-bottom: 20px;



`;
