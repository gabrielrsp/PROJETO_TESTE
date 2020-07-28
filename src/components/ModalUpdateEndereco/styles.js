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
  }

  @media(max-width: 900px ) {
    height: 600px;

    input {
        width: 90%;
      }

    #input-container{
      display: block !important;
      align-self: center;
    }
    .group_select{
      display: flex;
    }

    #responsive-input{
      width: 100%;
    }

    .wrapper-input {
      margin-left: 20px;
      justify-content: flex-start !important;
  }

  }


  #select_uf {
      .react-select__control {
        width: 85px;

        .react-select__value-container {
          .react-select__placeholder {
              color: black;
          }
        }
      }
    }

    #select_tipo {
      .react-select__control {
        width: 155px;

        .react-select__value-container {
          .react-select__placeholder {
              color: black;
          }
        }
      }
    }


  .grayBorder {
    border: 1px solid rgba(191,191,191,0.8);
    border-radius: 5px;
    width: 98%;
    padding: 10px;
    padding-top: 0;
  }

  #flex {
    display: flex;
    place-content: center;
  }

  #input-container {
    display: flex;
    place-content: center;
    margin-top: 15px;
    margin-bottom: 25px;
  }

  .wrapper-input {
    display: flex;
    justify-content: center;
    margin-left: 10px;
  }

  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  background-color: #fff;
  z-index: 2;
  width: 1300px;
  max-width: 95%;
  height: 270px;
  border-radius: 3px;
  margin-top: 30px !important;
  padding-bottom: 40px;


  #wrapper {
    display: flex;
    margin-bottom: 10px;
  }

  button {
    align-self: flex-start;
    margin-left: 10px;
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


  .group_select{
    display: flex;
    width: 100%;
  }

  .select {
    margin-right: 10px;
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
