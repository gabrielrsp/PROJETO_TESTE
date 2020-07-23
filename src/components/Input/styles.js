import styled from 'styled-components';

export const InputUnform = styled.input `

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
  

  `;