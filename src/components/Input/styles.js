import styled from 'styled-components';

export const InputUnform = styled.input `

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


    &:focus {
      box-shadow: 0 0 6px rgba(78,42,119,0.7);
      border: 1px solid rgba(78,42,119,0.7);
    }


  `;
